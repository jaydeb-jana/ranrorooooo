'use client';
import {
  Eye,
  FileEdit,
  ClipboardCheck,
  MousePointerClick,
  TrendingUp,
  Activity,
  Calendar,
} from 'lucide-react';

export default function AnalyticsClient({ stats, activities, businessName }) {
  const totalVisits = stats.totalVisits || 0;
  const draftsGenerated = stats.draftsGenerated || 0;
  const reviewsCopied = stats.reviewsCopied || 0;
  const googleClicks = stats.googleClicks || 0;

  // Calculation of conversion funnel percentages
  const draftRate = totalVisits > 0 ? Math.round((draftsGenerated / totalVisits) * 100) : 0;
  const copyRate = draftsGenerated > 0 ? Math.round((reviewsCopied / draftsGenerated) * 100) : 0;
  const clickRate = reviewsCopied > 0 ? Math.round((googleClicks / reviewsCopied) * 100) : 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-[#202124]">
          Review Collection Funnel &amp; Analytics
        </h2>
        <p className="text-xs text-[#5f6368] mt-1">
          Track customer engagement from the moment they scan your QR code to when they copy their review onto Google.
        </p>
      </div>

      {/* Visual Funnel Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Step 1 */}
        <div className="bg-white rounded-2xl p-5 border border-[#dadce0] google-card-shadow relative overflow-hidden">
          <div className="flex items-center justify-between text-[#5f6368] mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#1a73e8]">
              Step 1: Scans &amp; Visits
            </span>
            <Eye className="w-4 h-4 text-[#1a73e8]" />
          </div>
          <p className="text-3xl font-bold text-[#202124]">{totalVisits}</p>
          <p className="text-xs text-[#5f6368] mt-1">Customers opened review link</p>
          <div className="mt-3 pt-2 border-t border-[#f1f3f4] text-[11px] text-[#9aa0a6]">
            100% of pipeline
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-white rounded-2xl p-5 border border-[#dadce0] google-card-shadow relative overflow-hidden">
          <div className="flex items-center justify-between text-[#5f6368] mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#b06000]">
              Step 2: Drafts Created
            </span>
            <FileEdit className="w-4 h-4 text-[#fbbc04]" />
          </div>
          <p className="text-3xl font-bold text-[#202124]">{draftsGenerated}</p>
          <p className="text-xs text-[#5f6368] mt-1">Services selected &amp; drafted</p>
          <div className="mt-3 pt-2 border-t border-[#f1f3f4] text-[11px] font-medium text-[#b06000]">
            {draftRate}% visit-to-draft rate
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-white rounded-2xl p-5 border border-[#dadce0] google-card-shadow relative overflow-hidden">
          <div className="flex items-center justify-between text-[#5f6368] mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#137333]">
              Step 3: Text Copied
            </span>
            <ClipboardCheck className="w-4 h-4 text-[#1e8e3e]" />
          </div>
          <p className="text-3xl font-bold text-[#202124]">{reviewsCopied}</p>
          <p className="text-xs text-[#5f6368] mt-1">Customer approved &amp; copied</p>
          <div className="mt-3 pt-2 border-t border-[#f1f3f4] text-[11px] font-medium text-[#137333]">
            {copyRate}% approved draft
          </div>
        </div>

        {/* Step 4 */}
        <div className="bg-white rounded-2xl p-5 border border-[#dadce0] google-card-shadow relative overflow-hidden">
          <div className="flex items-center justify-between text-[#5f6368] mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#1a73e8]">
              Step 4: Sent to Google
            </span>
            <MousePointerClick className="w-4 h-4 text-[#1a73e8]" />
          </div>
          <p className="text-3xl font-bold text-[#202124]">{googleClicks}</p>
          <p className="text-xs text-[#5f6368] mt-1">Redirected to Google page</p>
          <div className="mt-3 pt-2 border-t border-[#f1f3f4] text-[11px] font-medium text-[#1a73e8]">
            {clickRate}% went to Google
          </div>
        </div>
      </div>

      {/* Real-time Activity Log */}
      <div className="bg-white rounded-2xl p-6 border border-[#dadce0] google-card-shadow">
        <div className="flex items-center space-x-2 mb-4">
          <Activity className="w-4 h-4 text-[#1a73e8]" />
          <h3 className="text-sm font-semibold text-[#202124]">
            Detailed Interaction Log
          </h3>
        </div>

        {activities.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#f8f9fa] text-[#5f6368] border-b border-[#dadce0] uppercase text-[10px] tracking-wider font-semibold">
                <tr>
                  <th className="py-2.5 px-3">Event Type</th>
                  <th className="py-2.5 px-3">Services Involved</th>
                  <th className="py-2.5 px-3">Sentiment</th>
                  <th className="py-2.5 px-3 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f1f3f4] text-[#3c4043]">
                {activities.map((item, idx) => {
                  let badge = 'bg-[#f1f3f4] text-[#5f6368]';
                  if (item.type === 'VISIT') badge = 'bg-[#e8f0fe] text-[#1a73e8]';
                  if (item.type === 'DRAFT_GENERATED') badge = 'bg-[#fef7e0] text-[#b06000]';
                  if (item.type === 'COPIED') badge = 'bg-[#e6f4ea] text-[#137333]';
                  if (item.type === 'GOOGLE_REDIRECT') badge = 'bg-[#e8f0fe] text-[#1a73e8] font-bold';

                  return (
                    <tr key={item._id || idx} className="hover:bg-[#f8f9fa]">
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${badge}`}>
                          {item.type}
                        </span>
                      </td>
                      <td className="py-3 px-3 max-w-xs truncate">
                        {item.servicesSelected?.length > 0
                          ? item.servicesSelected.join(', ')
                          : '—'}
                      </td>
                      <td className="py-3 px-3 capitalize">
                        {item.sentiment || '—'}
                      </td>
                      <td className="py-3 px-3 text-right text-[#70757a] whitespace-nowrap">
                        {new Date(item.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 text-center text-xs text-[#70757a]">
            No activity logged yet. Customer actions on your review page will automatically appear here.
          </div>
        )}
      </div>
    </div>
  );
}
