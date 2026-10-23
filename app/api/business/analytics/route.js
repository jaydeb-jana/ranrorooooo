import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import { activityRepo, userRepo } from '@/lib/repositories';

export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const freshUser = await userRepo.findById(user._id);
    const recentActivities = await activityRepo.getRecentByBusiness(user._id, 30);

    const stats = freshUser?.stats || {
      totalVisits: 0,
      draftsGenerated: 0,
      reviewsCopied: 0,
      googleClicks: 0,
    };

    // Calculate conversion rates
    const copyRate = stats.totalVisits > 0
      ? Math.round((stats.reviewsCopied / stats.totalVisits) * 100)
      : 0;

    const clickRate = stats.totalVisits > 0
      ? Math.round((stats.googleClicks / stats.totalVisits) * 100)
      : 0;

    return NextResponse.json({
      success: true,
      stats: {
        ...stats,
        copyRate,
        clickRate,
      },
      recentActivities,
    });
  } catch (err) {
    console.error('[Analytics GET Error]:', err);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
