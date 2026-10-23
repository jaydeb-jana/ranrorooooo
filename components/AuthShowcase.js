import { Star, ShieldCheck, Sparkles, QrCode, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function AuthShowcase({ quoteTitle = "Transforming how local businesses build trust", highlightStat = "3.4x" }) {
  return (
    <div className="relative hidden lg:flex flex-col justify-between w-full lg:w-[48%] p-12 bg-gradient-to-br from-[#1a73e8] via-[#1557b0] to-[#0d47a1] text-white rounded-3xl overflow-hidden shadow-2xl">
      {/* Background Decorative Glow Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#34a853]/20 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#fbbc04]/10 blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between">
        <a href="/" className="flex items-center space-x-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-white text-[#1a73e8] flex items-center justify-center font-extrabold text-xl shadow-md group-hover:scale-105 transition-transform">
            R
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">
            Rankaro
          </span>
        </a>

        <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-medium text-white">
          <ShieldCheck className="w-3.5 h-3.5 text-[#34a853]" />
          <span>Google Review Compliant</span>
        </div>
      </div>

      {/* Center Interactive Visual: Live Simulated Google Review Card */}
      <div className="relative z-10 my-auto py-8 space-y-6">
        <div className="space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-semibold text-white/90">
            <Sparkles className="w-3.5 h-3.5 text-[#fbbc04]" />
            <span>AI Guided Customer Reviews</span>
          </div>

          <h2 className="text-3xl xl:text-4xl font-extrabold text-white leading-tight">
            {quoteTitle}
          </h2>

          <p className="text-blue-100 text-sm leading-relaxed max-w-md">
            Rankaro eliminates customer writer&apos;s block by turning service selections into authentic, detailed Google review drafts with 1-click copy.
          </p>
        </div>

        {/* Live Floating Testimonial Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-xl text-left space-y-3 transform hover:scale-[1.02] transition-transform duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-full bg-white text-[#1a73e8] font-bold text-sm flex items-center justify-center shadow-xs">
                Dr
              </div>
              <div>
                <p className="text-xs font-bold text-white">Dr. Sarah Jenkins</p>
                <p className="text-[10px] text-blue-200">Apex Dental Studio, Seattle</p>
              </div>
            </div>
            <div className="flex items-center space-x-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-3.5 h-3.5 fill-[#fbbc04] text-[#fbbc04]" />
              ))}
            </div>
          </div>

          <p className="text-xs text-white/90 leading-relaxed italic">
            &ldquo;Placing our Rankaro QR stand at the checkout counter doubled our authentic Google reviews in 3 weeks. Customers love that they don&apos;t have to think about what to write!&rdquo;
          </p>

          <div className="pt-2 border-t border-white/15 flex items-center justify-between text-[11px] text-blue-100">
            <span className="flex items-center space-x-1">
              <CheckCircle2 className="w-3 h-3 text-[#34a853]" />
              <span>Verified Business Owner</span>
            </span>
            <span className="font-semibold text-white">4.9 ★ Rating Boost</span>
          </div>
        </div>

        {/* Highlight Metrics */}
        <div className="grid grid-cols-3 gap-3 pt-2">
          <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-3 text-center">
            <p className="text-xl font-bold text-white">{highlightStat}</p>
            <p className="text-[10px] text-blue-200 mt-0.5">More Reviews</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-3 text-center">
            <p className="text-xl font-bold text-white">100%</p>
            <p className="text-[10px] text-blue-200 mt-0.5">Free SaaS</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-3 text-center">
            <p className="text-xl font-bold text-white">&lt; 30s</p>
            <p className="text-[10px] text-blue-200 mt-0.5">Customer Time</p>
          </div>
        </div>
      </div>

      {/* Bottom Footer Info */}
      <div className="relative z-10 pt-4 border-t border-white/15 flex items-center justify-between text-xs text-blue-200">
        <span>© {new Date().getFullYear()} Rankaro Platform</span>
        <a href="/" className="hover:text-white transition-colors flex items-center space-x-1">
          <span>Back to website</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
