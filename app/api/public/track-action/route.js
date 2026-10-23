import { NextResponse } from 'next/server';
import { userRepo, activityRepo } from '@/lib/repositories';

export async function POST(request) {
  try {
    const body = await request.json();
    const { slug, action } = body;

    if (!slug || !['COPIED', 'GOOGLE_REDIRECT'].includes(action)) {
      return NextResponse.json({ error: 'Valid slug and action are required' }, { status: 400 });
    }

    const cleanSlug = slug.toLowerCase().trim();
    const user = await userRepo.findBySlug(cleanSlug);

    if (user) {
      const statField = action === 'COPIED' ? 'reviewsCopied' : 'googleClicks';
      await userRepo.incrementStats(user.slug, statField);
      await activityRepo.recordActivity({
        businessId: user._id,
        slug: user.slug,
        type: action,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
