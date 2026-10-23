'use client';
import { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import {
  Download,
  Printer,
  Copy,
  Check,
  ExternalLink,
  Star,
  Info,
  LayoutTemplate,
} from 'lucide-react';
import { useToast } from '@/components/Toast';

const TEMPLATES = [
  {
    id: 'classic',
    name: 'Classic Rankaro',
    blurb: 'Clean white table tent',
  },
  {
    id: 'google-five-star',
    name: 'Google Five Star',
    blurb: 'Official Google review look',
  },
  {
    id: 'google-review',
    name: 'Review on Google',
    blurb: 'G logo + Google wordmark',
  },
  {
    id: 'navy-standee',
    name: 'Navy Standee',
    blurb: 'Dark professional counter card',
  },
  {
    id: 'gold-premium',
    name: 'Gold Premium',
    blurb: 'Warm luxury poster',
  },
  {
    id: 'mint-modern',
    name: 'Mint Modern',
    blurb: 'Soft green thank-you card',
  },
  {
    id: 'bold-counter',
    name: 'Bold Counter',
    blurb: 'High-contrast desk sign',
  },
];

function GoogleG({ className = 'w-10 h-10' }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
      />
      <path
        fill="#FF3D00"
        d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l.003.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
      />
    </svg>
  );
}

function GoogleWordmark({ className = 'text-2xl' }) {
  return (
    <span className={`font-medium tracking-tight ${className}`} aria-label="Google">
      <span className="text-[#4285F4]">G</span>
      <span className="text-[#EA4335]">o</span>
      <span className="text-[#FBBC05]">o</span>
      <span className="text-[#4285F4]">g</span>
      <span className="text-[#34A853]">l</span>
      <span className="text-[#EA4335]">e</span>
    </span>
  );
}

function FiveStars({ size = 'w-6 h-6', className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-1 ${className}`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} className={`${size} fill-[#fbbc04] text-[#fbbc04]`} />
      ))}
    </div>
  );
}

function QrFrame({ dataUrl, size = 'w-48 h-48', frameClass = '' }) {
  return (
    <div className={`inline-block bg-white ${frameClass}`}>
      {dataUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={dataUrl} alt="Scan to review" className={`${size} object-contain mx-auto`} />
      ) : (
        <div className={`${size} flex items-center justify-center bg-[#f8f9fa] text-[10px] text-[#70757a]`}>
          Generating...
        </div>
      )}
    </div>
  );
}

function DisplayCard({ templateId, user, dataUrl }) {
  if (templateId === 'google-five-star') {
    return (
      <div className="bg-white rounded-2xl overflow-hidden max-w-md mx-auto text-center border border-[#dadce0] shadow-xs">
        <div className="flex h-1.5">
          <div className="flex-1 bg-[#4285F4]" />
          <div className="flex-1 bg-[#EA4335]" />
          <div className="flex-1 bg-[#FBBC05]" />
          <div className="flex-1 bg-[#34A853]" />
        </div>
        <div className="px-8 py-8">
          <div className="flex flex-col items-center mb-5">
            <GoogleG className="w-12 h-12 mb-2" />
            <GoogleWordmark className="text-[28px] leading-none" />
          </div>

          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#5f6368] mb-1">
            Leave us a
          </p>
          <h2 className="text-[34px] leading-none font-black tracking-tight text-[#202124] mb-3">
            FIVE STAR
          </h2>
          <FiveStars size="w-7 h-7" className="mb-2" />
          <p className="text-xs text-[#5f6368] mb-5">
            review on Google
          </p>

          <QrFrame
            dataUrl={dataUrl}
            frameClass="p-3 rounded-xl border border-[#e8eaed] shadow-sm mb-5"
          />

          <p className="text-sm font-semibold text-[#202124] mb-1">
            {user.businessName}
          </p>
          <p className="text-[11px] text-[#5f6368]">
            Point your phone camera at this QR code
          </p>
        </div>
      </div>
    );
  }

  if (templateId === 'google-review') {
    return (
      <div className="bg-white rounded-2xl overflow-hidden max-w-md mx-auto text-center border border-[#dadce0] shadow-xs">
        <div className="px-8 pt-8 pb-7">
          <div className="flex items-center justify-center gap-2 mb-4">
            <GoogleG className="w-8 h-8" />
            <GoogleWordmark className="text-xl" />
          </div>
          <p className="text-xs font-medium text-[#5f6368] mb-1">Rate your visit</p>
          <h2 className="text-xl font-bold text-[#202124] mb-3">{user.businessName}</h2>
          <FiveStars className="mb-5" />
          <QrFrame
            dataUrl={dataUrl}
            frameClass="p-4 rounded-2xl border-2 border-[#f1f3f4] mb-5"
          />
          <p className="text-xs font-semibold text-[#202124]">Scan to review on Google</p>
          <p className="text-[11px] text-[#5f6368] mt-1">
            Your five-star feedback takes less than a minute
          </p>
        </div>
      </div>
    );
  }

  if (templateId === 'navy-standee') {
    return (
      <div className="bg-[#0b1f3a] rounded-2xl overflow-hidden max-w-md mx-auto text-center border border-[#0b1f3a] shadow-xs">
        <div className="px-8 py-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#8ab4f8] mb-2">
            We value your visit
          </p>
          <h2 className="text-2xl font-bold text-white mb-3">{user.businessName}</h2>
          <FiveStars className="mb-5" />
          <QrFrame
            dataUrl={dataUrl}
            frameClass="p-3 rounded-2xl mb-5"
          />
          <p className="text-sm font-semibold text-white">Scan &amp; share your review</p>
          <p className="text-[11px] text-[#9aa0a6] mt-1">
            Draft copies straight to Google in one tap
          </p>
        </div>
      </div>
    );
  }

  if (templateId === 'gold-premium') {
    return (
      <div className="bg-[#1c1408] rounded-2xl overflow-hidden max-w-md mx-auto text-center border border-[#c9a227] shadow-xs">
        <div className="px-8 py-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#e8c547] mb-2">
            A five star thank you
          </p>
          <h2 className="text-2xl font-serif font-bold text-[#f8f1d8] mb-3">{user.businessName}</h2>
          <FiveStars className="mb-5" />
          <QrFrame
            dataUrl={dataUrl}
            frameClass="p-3 rounded-xl border border-[#c9a227] mb-5"
          />
          <p className="text-sm font-medium text-[#f8f1d8]">Scan to leave a Google review</p>
          <p className="text-[11px] text-[#d4b56a] mt-1">
            Your kind words help others find us
          </p>
        </div>
      </div>
    );
  }

  if (templateId === 'mint-modern') {
    return (
      <div className="bg-[#f1fbf4] rounded-2xl overflow-hidden max-w-md mx-auto text-center border border-[#ceead6] shadow-xs">
        <div className="px-8 py-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#137333] mb-2">
            Thank you
          </p>
          <h2 className="text-2xl font-bold text-[#202124] mb-2">{user.businessName}</h2>
          <p className="text-xs text-[#5f6368] mb-4">
            If we earned it, a five-star review means the world.
          </p>
          <FiveStars className="mb-5" />
          <QrFrame
            dataUrl={dataUrl}
            frameClass="p-4 rounded-2xl border border-[#ceead6] shadow-sm mb-5"
          />
          <p className="text-xs font-semibold text-[#137333]">Point your camera here</p>
        </div>
      </div>
    );
  }

  if (templateId === 'bold-counter') {
    return (
      <div className="bg-white rounded-2xl overflow-hidden max-w-md mx-auto text-center border-2 border-[#202124] shadow-xs">
        <div className="bg-[#1a73e8] px-6 py-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">
            Scan to review
          </p>
          <h2 className="text-xl font-black text-white">{user.businessName}</h2>
        </div>
        <div className="px-8 py-6">
          <p className="text-lg font-black tracking-tight text-[#202124] mb-2">FIVE STAR</p>
          <FiveStars className="mb-5" />
          <QrFrame
            dataUrl={dataUrl}
            frameClass="p-2 rounded-xl border border-[#dadce0] mb-4"
          />
          <p className="text-xs font-semibold text-[#202124]">Open your camera and scan</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border-2 border-[#dadce0] rounded-2xl p-8 max-w-md mx-auto text-center shadow-xs">
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

      <FiveStars size="w-5 h-5" className="mb-4" />

      <QrFrame
        dataUrl={dataUrl}
        frameClass="p-4 rounded-2xl border border-[#dadce0] shadow-sm mb-4"
      />

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
  );
}

function TemplateThumb({ template, selected }) {
  const swatch = {
    classic: 'bg-white border-[#dadce0]',
    'google-five-star': 'bg-white border-[#dadce0]',
    'google-review': 'bg-white border-[#dadce0]',
    'navy-standee': 'bg-[#0b1f3a] border-[#0b1f3a]',
    'gold-premium': 'bg-[#1c1408] border-[#c9a227]',
    'mint-modern': 'bg-[#f1fbf4] border-[#ceead6]',
    'bold-counter': 'bg-white border-[#202124]',
  }[template.id];

  const titleColor = ['navy-standee', 'gold-premium'].includes(template.id)
    ? 'text-white'
    : 'text-[#202124]';

  return (
    <div
      className={`rounded-xl border p-3 h-[132px] flex flex-col items-center justify-center ${swatch} ${
        selected ? 'ring-2 ring-[#1a73e8] ring-offset-2' : ''
      }`}
    >
      {template.id === 'google-five-star' || template.id === 'google-review' ? (
        <GoogleG className="w-6 h-6 mb-1.5" />
      ) : template.id === 'bold-counter' ? (
        <div className="w-full h-4 bg-[#1a73e8] rounded-sm mb-2" />
      ) : null}
      {(template.id === 'google-five-star' || template.id === 'bold-counter') && (
        <p className={`text-[10px] font-black tracking-tight ${titleColor} mb-1`}>FIVE STAR</p>
      )}
      <FiveStars size="w-3 h-3" className="mb-2" />
      <div className="w-10 h-10 bg-white border border-[#e8eaed] rounded-sm grid grid-cols-3 gap-px p-1">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className={`${[0, 2, 6, 8].includes(i) ? 'bg-[#202124]' : 'bg-[#e8eaed]'}`} />
        ))}
      </div>
    </div>
  );
}

export default function QRCodeClient({ user }) {
  const { showToast } = useToast();
  const [dataUrl, setDataUrl] = useState('');
  const [svgString, setSvgString] = useState('');
  const [copied, setCopied] = useState(false);
  const [templateId, setTemplateId] = useState('classic');
  const [pickerOpen, setPickerOpen] = useState(false);
  const [reviewUrl, setReviewUrl] = useState(`/r/${user.slug}`);
  const printCardRef = useRef(null);

  useEffect(() => {
    setReviewUrl(`${window.location.origin}/r/${user.slug}`);
    try {
      const saved = window.localStorage.getItem('rankaro-qr-template');
      if (saved && TEMPLATES.some((t) => t.id === saved)) {
        setTemplateId(saved);
      }
    } catch {
      /* ignore */
    }
  }, [user.slug]);

  useEffect(() => {
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

  const handleSelectTemplate = (id) => {
    setTemplateId(id);
    try {
      window.localStorage.setItem('rankaro-qr-template', id);
    } catch {
      /* ignore */
    }
    const picked = TEMPLATES.find((t) => t.id === id);
    showToast(`${picked?.name || 'Template'} selected`, 'success');
  };

  const activeTemplate = TEMPLATES.find((t) => t.id === templateId) || TEMPLATES[0];

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

            <div ref={printCardRef} id="printable-display-card">
              <DisplayCard templateId={templateId} user={user} dataUrl={dataUrl} />
            </div>

            <div className="mt-4 flex flex-col items-center">
              <button
                type="button"
                onClick={() => setPickerOpen((open) => !open)}
                className="inline-flex items-center space-x-1.5 px-4 py-2.5 text-xs font-semibold text-[#1a73e8] bg-white hover:bg-[#f8f9fa] border border-[#dadce0] rounded-xl shadow-2xs transition-colors"
                aria-expanded={pickerOpen}
              >
                <LayoutTemplate className="w-3.5 h-3.5" />
                <span>Change Template</span>
              </button>
              <p className="text-[11px] text-[#5f6368] mt-2">
                Current: <span className="font-medium text-[#202124]">{activeTemplate.name}</span>
              </p>
            </div>

            {pickerOpen && (
              <div className="mt-4 pt-4 border-t border-[#f1f3f4]">
                <p className="text-xs font-semibold text-[#202124] mb-3">
                  Choose a display template
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {TEMPLATES.map((template) => {
                    const selected = template.id === templateId;
                    return (
                      <button
                        key={template.id}
                        type="button"
                        onClick={() => handleSelectTemplate(template.id)}
                        className="text-left"
                      >
                        <TemplateThumb template={template} selected={selected} />
                        <p className="mt-2 text-[11px] font-semibold text-[#202124]">
                          {template.name}
                        </p>
                        <p className="text-[10px] text-[#5f6368]">{template.blurb}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

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
            top: 8%;
            transform: translateX(-50%);
            width: 80% !important;
            max-width: 500px !important;
            box-shadow: none !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>
    </div>
  );
}
