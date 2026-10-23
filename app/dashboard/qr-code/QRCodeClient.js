'use client';
import { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import {
  Download,
  Printer,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  Star,
  Info,
} from 'lucide-react';
import { useToast } from '@/components/Toast';

export default function QRCodeClient({ user }) {
  const { showToast } = useToast();
  const [dataUrl, setDataUrl] = useState('');
  const [svgString, setSvgString] = useState('');
  const [copied, setCopied] = useState(false);
  const printCardRef = useRef(null);

  const reviewUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/r/${user.slug}`
    : `/r/${user.slug}`;

  useEffect(() => {
    // Generate high resolution QR Code
    QRCode.toDataURL(reviewUrl, {
      width: 800,
      margin: 2,
      errorCorrectionLevel: 'H',
      color: {
        dark: '#202124',
        light: '#ffffff',
      },
    })
      .then((url) => setDataUrl(url))
      .catch((err) => console.error('QR generation error:', err));

    QRCode.toString(reviewUrl, {
      type: 'svg',
      margin: 2,
      errorCorrectionLevel: 'H',
      color: {
        dark: '#202124',
        light: '#ffffff',
      },
    })
      .then((svg) => setSvgString(svg))
      .catch((err) => console.error('SVG QR error:', err));
  }, [reviewUrl]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(reviewUrl);
    setCopied(true);
    showToast('Review link copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPng = () => {
    if (!dataUrl) return;
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `rankaro-${user.slug}-qrcode.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('High-resolution QR code PNG downloaded!', 'success');
  };

  const handleDownloadSvg = () => {
    if (!svgString) return;
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rankaro-${user.slug}-qrcode.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Vector QR code SVG downloaded!', 'success');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div>
        <h2 className="text-xl font-bold text-[#202124]">
          Downloadable QR Code & Counter Displays
        </h2>
        <p className="text-xs text-[#5f6368] mt-1">
          Provide your customers with an instant scan target that launches your personalized Rankaro review assistant on any smartphone camera.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: QR Code Visual & Downloads */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-[#dadce0] google-card-shadow flex flex-col items-center text-center">
            <span className="text-xs font-semibold text-[#5f6368] uppercase tracking-wider mb-4">
              Scannable QR Code
            </span>

            {/* QR Code Canvas/Image */}
            <div className="p-4 bg-white rounded-2xl border-2 border-[#e8eaed] shadow-xs mb-4">
              {dataUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={dataUrl}
                  alt={`QR code for ${user.businessName}`}
                  className="w-56 h-56 object-contain"
                />
              ) : (
                <div className="w-56 h-56 flex items-center justify-center bg-[#f8f9fa] text-xs text-[#70757a]">
                  Generating QR code...
                </div>
              )}
            </div>

            <p className="text-xs text-[#202124] font-medium mb-1">
              {user.businessName}
            </p>
            <p className="text-[11px] font-mono text-[#5f6368] mb-4 truncate max-w-xs">
              {reviewUrl}
            </p>

            {/* Download Buttons */}
            <div className="grid grid-cols-2 gap-2 w-full">
              <button
                type="button"
                onClick={handleDownloadPng}
                disabled={!dataUrl}
                className="flex items-center justify-center space-x-1.5 py-2.5 px-3 text-xs font-semibold text-white bg-[#1a73e8] hover:bg-[#1557b0] rounded-xl transition-colors shadow-2xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PNG</span>
              </button>
              <button
                type="button"
                onClick={handleDownloadSvg}
                disabled={!svgString}
                className="flex items-center justify-center space-x-1.5 py-2.5 px-3 text-xs font-semibold text-[#3c4043] bg-white hover:bg-[#f8f9fa] border border-[#dadce0] rounded-xl transition-colors shadow-2xs"
              >
                <Download className="w-3.5 h-3.5 text-[#5f6368]" />
                <span>Vector SVG</span>
              </button>
            </div>

            <div className="w-full pt-3 mt-4 border-t border-[#f1f3f4] flex items-center justify-between">
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center space-x-1 text-xs text-[#1a73e8] hover:underline font-medium"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#1e8e3e]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Link Copied!' : 'Copy Direct Link'}</span>
              </button>

              <a
                href={reviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-xs text-[#5f6368] hover:text-[#202124]"
              >
                <span>Open Link</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="bg-[#f8f9fa] rounded-2xl p-4 border border-[#e8eaed] text-xs text-[#5f6368] space-y-2">
            <div className="flex items-center space-x-2 text-[#202124] font-semibold">
              <Info className="w-4 h-4 text-[#1a73e8]" />
              <span>Where to place your QR code</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-[11px] text-[#5f6368]">
              <li>Front desk / reception checkout counter</li>
              <li>Dining table tents or receipt bill presentation booklets</li>
              <li>Business cards, appointment reminders, and work order invoices</li>
              <li>Follow-up thank you emails or SMS texts</li>
            </ul>
          </div>
        </div>

        {/* Right Column: Printable Table Tent / Counter Display Stand */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-[#dadce0] google-card-shadow">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-[#202124]">
                  Printable Table Tent / Counter Card
                </h3>
                <p className="text-xs text-[#5f6368]">
                  Print this clean display card to place right at your checkout desk or tables.
                </p>
              </div>

              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#1e8e3e] hover:bg-[#188038] rounded-xl shadow-2xs transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Display Card</span>
              </button>
            </div>

            {/* Printable Frame Preview */}
            <div
              ref={printCardRef}
              id="printable-display-card"
              className="bg-white border-2 border-[#dadce0] rounded-2xl p-8 max-w-md mx-auto text-center shadow-xs"
            >
              <div className="flex items-center justify-center space-x-1.5 mb-2">
                <span className="text-xs uppercase font-bold tracking-widest text-[#1a73e8]">
                  Share Your Thoughts
                </span>
              </div>

              <h2 className="text-xl font-bold text-[#202124] mb-1">
                {user.businessName}
              </h2>

              <p className="text-xs text-[#5f6368] max-w-xs mx-auto mb-4">
                Thank you for visiting us! Your feedback helps us grow and assists others in finding honest service.
              </p>

              {/* Star Rating Graphic */}
              <div className="flex items-center justify-center space-x-1 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-5 h-5 fill-[#fbbc04] text-[#fbbc04]" />
                ))}
              </div>

              {/* QR Box in display card */}
              <div className="inline-block p-4 bg-white rounded-2xl border border-[#dadce0] shadow-sm mb-4">
                {dataUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={dataUrl}
                    alt="Scan to review"
                    className="w-48 h-48 object-contain mx-auto"
                  />
                )}
              </div>

              <div className="space-y-1">
                <p className="text-xs font-semibold text-[#202124]">
                  Point your phone camera here
                </p>
                <p className="text-[11px] text-[#5f6368]">
                  Select the services you received &amp; copy your draft directly to Google!
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[#f1f3f4] flex items-center justify-between text-[10px] text-[#9aa0a6]">
                <span>Powered by Rankaro</span>
                <span>Fast • Easy • Authentic</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print Specific CSS Styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-display-card,
          #printable-display-card * {
            visibility: visible;
          }
          #printable-display-card {
            position: absolute;
            left: 50%;
            top: 10%;
            transform: translateX(-50%);
            width: 80% !important;
            max-width: 500px !important;
            border: 2px solid #202124 !important;
            box-shadow: none !important;
            padding: 40px !important;
          }
        }
      `}</style>
    </div>
  );
}
