import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/rankaro';

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null, isFallback: false };
}

// Fallback JSON-file persistent storage directory for offline dev environments
const DATA_DIR = path.join(process.cwd(), '.data');
if (!fs.existsSync(DATA_DIR)) {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  } catch (err) {
    // Ignore if directory exists
  }
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      dbName: 'rankaro',
      serverSelectionTimeoutMS: 8000,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        cached.isFallback = false;
        console.log('[Database] Connected to MongoDB successfully.');
        return mongooseInstance;
      })
      .catch((err) => {
        console.warn(
          `[Database] Note: Could not connect to MongoDB at "${MONGODB_URI}". Enabling local persistent storage fallback.`
        );
        cached.isFallback = true;
        return null;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    cached.isFallback = true;
  }

  return cached.conn;
}

export function isFallbackStorage() {
  return cached.isFallback;
}

/**
 * Persistent Fallback Store Helper
 * When MongoDB is not reachable (e.g. offline dev or demo without mongod running),
 * these helpers provide full CRUD persistence to disk in .data/<collection>.json
 * so the app remains 100% functional.
 */
export const fallbackStore = {
  getCollection(name) {
    const filePath = path.join(DATA_DIR, `${name}.json`);
    if (!fs.existsSync(filePath)) {
      return [];
    }
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data || '[]');
    } catch {
      return [];
    }
  },

  saveCollection(name, items) {
    const filePath = path.join(DATA_DIR, `${name}.json`);
    fs.writeFileSync(filePath, JSON.stringify(items, null, 2), 'utf8');
  },

  find(name, query = {}) {
    const items = this.getCollection(name);
    return items.filter((item) => {
      for (const [key, val] of Object.entries(query)) {
        if (item[key] !== val) return false;
      }
      return true;
    });
  },

  findOne(name, query = {}) {
    const items = this.getCollection(name);
    return items.find((item) => {
      for (const [key, val] of Object.entries(query)) {
        if (key === '_id') {
          if (String(item._id) !== String(val)) return false;
        } else if (item[key] !== val) {
          return false;
        }
      }
      return true;
    }) || null;
  },

  create(name, data) {
    const items = this.getCollection(name);
    const newItem = {
      _id: 'fb_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    items.push(newItem);
    this.saveCollection(name, items);
    return newItem;
  },

  updateOne(name, query = {}, updates = {}) {
    const items = this.getCollection(name);
    const index = items.findIndex((item) => {
      for (const [key, val] of Object.entries(query)) {
        if (key === '_id') {
          if (String(item._id) !== String(val)) return false;
        } else if (item[key] !== val) {
          return false;
        }
      }
      return true;
    });

    if (index === -1) return null;

    // Handle $inc or direct update
    const updated = { ...items[index] };
    if (updates.$inc) {
      for (const [incKey, incVal] of Object.entries(updates.$inc)) {
        const parts = incKey.split('.');
        if (parts.length === 2) {
          updated[parts[0]] = updated[parts[0]] || {};
          updated[parts[0]][parts[1]] = (updated[parts[0]][parts[1]] || 0) + incVal;
        } else {
          updated[incKey] = (updated[incKey] || 0) + incVal;
        }
      }
      delete updates.$inc;
    }

    if (updates.$set) {
      Object.assign(updated, updates.$set);
      delete updates.$set;
    }

    Object.assign(updated, updates, { updatedAt: new Date().toISOString() });
    items[index] = updated;
    this.saveCollection(name, items);
    return updated;
  },

  deleteOne(name, query = {}) {
    let items = this.getCollection(name);
    const initialLen = items.length;
    items = items.filter((item) => {
      for (const [key, val] of Object.entries(query)) {
        if (key === '_id') {
          if (String(item._id) === String(val)) return false;
        } else if (item[key] === val) {
          return false;
        }
      }
      return true;
    });
    this.saveCollection(name, items);
    return items.length < initialLen;
  },
};

export default connectDB;
