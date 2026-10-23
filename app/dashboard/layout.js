import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

export const dynamic = 'force-dynamic';

export default async function DashboardLayout({ children }) {
  const user = await getSessionUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col md:flex-row text-[#202124]">
      {/* Sidebar */}
      <DashboardSidebar user={user} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
        <DashboardHeader user={user} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
