import { NextResponse } from 'next/server';
import { getSessionUser, generateSlug } from '@/lib/auth';
import { userRepo } from '@/lib/repositories';

export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ success: true, profile: user });
  } catch (err) {
    console.error('[Profile GET Error]:', err);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const allowedFields = [
      'businessName',
      'ownerName',
      'phone',
      'googleReviewUrl',
      'businessCategory',
      'address',
      'city',
      'website',
      'description',
      'slug',
      'welcomeHeadline',
      'instructions',
    ];

    const updates = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updates[field] = typeof body[field] === 'string' ? body[field].trim() : body[field];
      }
    }

    // Google review URL validation: must be a real Google link (not the Rankaro page itself)
    if (updates.googleReviewUrl) {
      let parsed;
      try {
        parsed = new URL(updates.googleReviewUrl);
      } catch {
        return NextResponse.json({ error: 'Please enter a valid URL starting with https://' }, { status: 400 });
      }
      const host = parsed.hostname.toLowerCase();
      const isGoogle =
        /(^|\.)google\.[a-z.]+$/.test(host) ||
        host === 'g.page' ||
        host === 'goo.gl' ||
        host.endsWith('.goo.gl') ||
        host === 'g.co';
      if (!['http:', 'https:'].includes(parsed.protocol) || !isGoogle) {
        return NextResponse.json(
          {
            error:
              'This must be your Google review link (e.g. https://g.page/r/.../review or https://search.google.com/local/writereview?placeid=...). Your Rankaro page link cannot be used here.',
          },
          { status: 400 }
        );
      }
    }

    // Slug validation and collision check
    if (updates.slug) {
      const cleanSlug = generateSlug(updates.slug);
      if (cleanSlug !== user.slug) {
        const existing = await userRepo.findBySlug(cleanSlug);
        if (existing && existing._id.toString() !== user._id.toString()) {
          return NextResponse.json(
            { error: 'This URL handle is already taken. Please choose another.' },
            { status: 409 }
          );
        }
        updates.slug = cleanSlug;
      }
    }

    const updatedUser = await userRepo.updateById(user._id, updates);
    const { password, ...safeUser } = updatedUser;

    return NextResponse.json({
      success: true,
      message: 'Business profile updated successfully.',
      profile: safeUser,
    });
  } catch (err) {
    console.error('[Profile PATCH Error]:', err);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
