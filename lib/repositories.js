import connectDB, { isFallbackStorage, fallbackStore } from './db';
import User from '@/models/User';
import Otp from '@/models/Otp';
import ReviewActivity from '@/models/ReviewActivity';

/**
 * Converts Mongoose/BSON documents (ObjectId, Date, etc.) into plain JSON objects
 * so they can be safely passed from Server Components to Client Components.
 */
function toPlain(doc) {
  if (doc === null || doc === undefined) return null;
  return JSON.parse(JSON.stringify(doc));
}

const AFTER = { returnDocument: 'after' };

async function isOffline() {
  const conn = await connectDB();
  return !conn || isFallbackStorage();
}

export const userRepo = {
  async findByEmail(email) {
    if (!email) return null;
    const cleanEmail = email.toLowerCase().trim();
    if (await isOffline()) {
      return fallbackStore.findOne('users', { email: cleanEmail });
    }
    return toPlain(await User.findOne({ email: cleanEmail }).lean());
  },

  async findById(id) {
    if (!id) return null;
    if (await isOffline()) {
      return fallbackStore.findOne('users', { _id: String(id) });
    }
    if (!/^[0-9a-fA-F]{24}$/.test(String(id))) return null;
    return toPlain(await User.findById(id).lean());
  },

  async findBySlug(slug) {
    if (!slug) return null;
    const cleanSlug = slug.toLowerCase().trim();
    if (await isOffline()) {
      return fallbackStore.findOne('users', { slug: cleanSlug });
    }
    return toPlain(await User.findOne({ slug: cleanSlug }).lean());
  },

  async create(userData) {
    if (await isOffline()) {
      return fallbackStore.create('users', userData);
    }
    const created = await User.create(userData);
    return toPlain(created.toObject());
  },

  async updateById(id, updateData) {
    if (await isOffline()) {
      return fallbackStore.updateOne('users', { _id: String(id) }, updateData);
    }
    return toPlain(await User.findByIdAndUpdate(id, updateData, AFTER).lean());
  },

  async updateByEmail(email, updateData) {
    const cleanEmail = email.toLowerCase().trim();
    if (await isOffline()) {
      return fallbackStore.updateOne('users', { email: cleanEmail }, updateData);
    }
    return toPlain(await User.findOneAndUpdate({ email: cleanEmail }, updateData, AFTER).lean());
  },

  async incrementStats(idOrSlug, statKey) {
    if (await isOffline()) {
      const user =
        fallbackStore.findOne('users', { slug: idOrSlug }) ||
        fallbackStore.findOne('users', { _id: idOrSlug });
      if (user) {
        return fallbackStore.updateOne('users', { _id: user._id }, { $inc: { [`stats.${statKey}`]: 1 } });
      }
      return null;
    }
    const query = /^[0-9a-fA-F]{24}$/.test(String(idOrSlug)) ? { _id: idOrSlug } : { slug: idOrSlug };
    return toPlain(
      await User.findOneAndUpdate(query, { $inc: { [`stats.${statKey}`]: 1 } }, AFTER).lean()
    );
  },
};

export const otpRepo = {
  async createOtp({ email, code, purpose, expiresAt }) {
    const cleanEmail = email.toLowerCase().trim();
    if (await isOffline()) {
      const existing = fallbackStore.find('otps', { email: cleanEmail, purpose, used: false });
      for (const item of existing) {
        fallbackStore.updateOne('otps', { _id: item._id }, { used: true });
      }
      return fallbackStore.create('otps', {
        email: cleanEmail,
        code,
        purpose,
        expiresAt: expiresAt.toISOString(),
        used: false,
      });
    }

    await Otp.updateMany({ email: cleanEmail, purpose, used: false }, { used: true });
    const created = await Otp.create({ email: cleanEmail, code, purpose, expiresAt, used: false });
    return toPlain(created.toObject());
  },

  async findValidOtp({ email, code, purpose }) {
    const cleanEmail = email.toLowerCase().trim();
    const now = new Date();

    if (await isOffline()) {
      const otps = fallbackStore.find('otps', { email: cleanEmail, purpose, used: false });
      return otps.find((o) => o.code === code && new Date(o.expiresAt) > now) || null;
    }

    return toPlain(
      await Otp.findOne({
        email: cleanEmail,
        code,
        purpose,
        used: false,
        expiresAt: { $gt: now },
      }).lean()
    );
  },

  async markUsed(otpId) {
    if (await isOffline()) {
      return fallbackStore.updateOne('otps', { _id: String(otpId) }, { used: true });
    }
    return toPlain(await Otp.findByIdAndUpdate(otpId, { used: true }, AFTER).lean());
  },
};

export const activityRepo = {
  async recordActivity({ businessId, slug, type, servicesSelected = [], sentiment = '' }) {
    if (await isOffline()) {
      return fallbackStore.create('activities', {
        businessId: String(businessId || ''),
        slug,
        type,
        servicesSelected,
        sentiment,
        createdAt: new Date().toISOString(),
      });
    }

    const created = await ReviewActivity.create({
      businessId,
      slug,
      type,
      servicesSelected,
      sentiment,
    });
    return toPlain(created.toObject());
  },

  async getRecentByBusiness(businessId, limit = 20) {
    if (await isOffline()) {
      const all = fallbackStore.find('activities', { businessId: String(businessId) });
      return all.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, limit);
    }
    const rows = await ReviewActivity.find({ businessId }).sort({ createdAt: -1 }).limit(limit).lean();
    return toPlain(rows) || [];
  },
};
