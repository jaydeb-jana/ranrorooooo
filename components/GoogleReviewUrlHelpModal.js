'use client';
import { ExternalLink, Check, Copy, X, HelpCircle, MapPin } from 'lucide-react';
import { useState } from 'react';

export default function GoogleReviewUrlHelpModal({ isOpen, onClose }) {
  const [copiedExample, setCopiedExample] = useState(false);

  if (!isOpen) return null;

  const exampleUrl = 'https://search.google.com/local/writereview?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4';

  const handleCopyExample = () => {
    navigator.clipboard.writeText(exampleUrl);
    setCopiedExample(true);
    setTimeout(() => setCopiedExample(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#dadce0] max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-[#f1f3f4]">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-[#e8f0fe] text-[#1a73e8]">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-[#202124]">
              Where to find your Google Review link
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#5f6368] hover:text-[#202124] p-1 rounded-full hover:bg-[#f1f3f4]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4 text-sm text-[#3c4043]">
          <p>
            Your Google Review Link directly opens Google&apos;s review dialog for your business so customers don&apos;t have to search or get lost. Here is the easiest way to find yours:
          </p>

          {/* Step 1 */}
          <div className="p-3 bg-[#f8f9fa] rounded-xl border border-[#e8eaed]">
            <span className="font-semibold text-[#1a73e8] block mb-1">Method 1 (Fastest via Google Business Profile):</span>
            <ol className="list-decimal list-inside space-y-1.5 text-xs text-[#5f6368]">
              <li>Go to <a href="https://business.google.com" target="_blank" rel="noopener noreferrer" className="text-[#1a73e8] underline">Google Business Profile Manager</a> or search your business on Google.</li>
              <li>Click the button that says <strong>&quot;Ask for reviews&quot;</strong> or <strong>&quot;Promote &gt; Ask for reviews&quot;</strong>.</li>
              <li>A window will pop up showing your short review link (e.g. <code className="bg-[#e8eaed] px-1 py-0.5 rounded">https://g.page/r/.../review</code>).</li>
              <li>Click <strong>Copy link</strong> and paste it into Rankaro!</li>
            </ol>
          </div>

          {/* Step 2 */}
          <div className="p-3 bg-[#f8f9fa] rounded-xl border border-[#e8eaed]">
            <span className="font-semibold text-[#1a73e8] block mb-1">Method 2 (Using Google Maps):</span>
            <ol className="list-decimal list-inside space-y-1.5 text-xs text-[#5f6368]">
              <li>Open Google Maps and search for your business location.</li>
              <li>Scroll down to the <strong>Reviews</strong> section.</li>
              <li>Click the <strong>&quot;Write a review&quot;</strong> button.</li>
              <li>Copy the URL from your browser&apos;s address bar.</li>
            </ol>
          </div>

          <div className="pt-2">
            <span className="text-xs font-medium text-[#5f6368] block mb-1.5">
              Testing or don&apos;t have a listing yet? Use this test link format:
            </span>
            <div className="flex items-center space-x-2 bg-[#f1f3f4] p-2 rounded-lg text-xs font-mono text-[#202124] overflow-hidden">
              <span className="truncate flex-1">{exampleUrl}</span>
              <button
                type="button"
                onClick={handleCopyExample}
                className="inline-flex items-center space-x-1 px-2.5 py-1 bg-white hover:bg-[#e8eaed] border border-[#dadce0] rounded text-xs font-sans font-medium text-[#1a73e8]"
              >
                {copiedExample ? <Check className="w-3.5 h-3.5 text-[#1e8e3e]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedExample ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#f1f3f4] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-medium text-white bg-[#1a73e8] hover:bg-[#1557b0] rounded-lg transition-colors"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
}
