import { getSessionUser } from '@/lib/auth';
import { userRepo, activityRepo } from '@/lib/repositories';
import AnalyticsClient from './AnalyticsClient';

export const dynamic = 'force-dynamic';

export default async function AnalyticsPage() {
  const user = await getSessionUser();
  const freshUser = await userRepo.findById(user._id);
  const activities = await activityRepo.getRecentByBusiness(user._id, 50);

  const stats = freshUser?.stats || {
    totalVisits: 0,
    draftsGenerated: 0,
    reviewsCopied: 0,
    googleClicks: 0,
  };

  return (
    <AnalyticsClient
      stats={stats}
      activities={activities || []}
      businessName={freshUser?.businessName || user.businessName}
    />
  );
}
