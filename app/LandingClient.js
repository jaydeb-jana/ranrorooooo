'use client';
import { useState } from 'react';
import {
  Star,
  QrCode,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  ChevronDown,
  Layers,
  Smartphone,
  BarChart3,
  MessageSquare,
  Users,
  Zap,
} from 'lucide-react';

export default function LandingClient() {
  // Interactive live demo states on the landing page
  const [demoSelectedServices, setDemoSelectedServices] = useState(['1', '3']);
  const [demoSentiment, setDemoSentiment] = useState('exceptional');
  const [demoCopied, setDemoCopied] = useState(false);

  // FAQ accordion
  const [openFaq, setOpenFaq] = useState(0);

  const demoServices = [
    { id: '1', name: 'Pain-Free Dental Cleaning', category: 'Care' },
    { id: '2', name: 'Thorough Exam & Consultation', category: 'Doctor' },
    { id: '3', name: 'Friendly Front Desk Reception', category: 'Staff' },
    { id: '4', name: 'Zero Waiting Room Delay', category: 'Timeliness' },
  ];

  const toggleDemoService = (id) => {
    setDemoSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getDemoDraft = () => {
    const selectedNames = demoServices
      .filter((s) => demoSelectedServices.includes(s.id))
      .map((s) => s.name);

    if (selectedNames.length === 0) {
      return 'Please pick at least one service above to generate your live draft...';
    }

    const servicesList =
      selectedNames.length === 1
        ? selectedNames[0]
        : selectedNames.slice(0, -1).join(', ') + ' and ' + selectedNames[selectedNames.length - 1];

    if (demoSentiment === 'exceptional') {
      return `I had an outstanding visit at Horizon Dental Studio! I came in for ${servicesList}, and the entire staff was remarkably courteous, punctual, and attentive to detail. The procedure was gentle and completely painless. I highly recommend them to anyone seeking dependable dental care!`;
    } else if (demoSentiment === 'great') {
      return `Great experience with Horizon Dental Studio for ${servicesList}. Everything was handled efficiently and the team was welcoming from the moment I arrived. Solid 5-star service!`;
    } else {
      return `Visited Horizon Dental Studio for ${servicesList}. The appointment was straightforward and handled as expected.`;
    }
  };

  const handleCopyDemo = () => {
    navigator.clipboard.writeText(getDemoDraft());
    setDemoCopied(true);
    setTimeout(() => setDemoCopied(false), 2000);
  };

  const faqs = [
    {
      q: 'Does Rankaro comply with Google’s official Review Policies?',
      a: 'Yes, 100%. Rankaro does not manipulate ratings, engage in deceptive "review gating", or submit fake reviews. Rankaro simply provides customers with a guided writing assistant based solely on services they confirm, copies the text to their clipboard, and allows them to independently post their honest review directly onto Google.',
    },
    {
      q: 'How do customers access my personalized review page?',
      a: 'Rankaro creates both a shareable URL (which you can send via SMS, WhatsApp, or email) and a high-resolution scannable QR code. You can download and print ready-made table tents or counter displays to place on your checkout desk.',
    },
    {
      q: 'Is Rankaro really completely free?',
      a: 'Yes! Rankaro was built as a clean, open SaaS platform for business owners. There are no credit cards required, no monthly paywalls, and no locked features.',
    },
    {
      q: 'Can I customize the services for my specific industry?',
      a: 'Absolutely. Rankaro allows you to add, edit, and organize your own custom services or load industry templates for Healthcare, Home Services, Restaurants, Auto Repair, Salons, and Professional Services.',
    },
    {
      q: 'Can customers write their own words?',
      a: 'Yes, always. The suggested draft is completely editable. Customers can change words, add personal memories, or delete the suggestion entirely before copying.',
    },
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Compliance pill */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#f8f9fa] border border-[#dadce0] text-xs font-medium text-[#5f6368] mb-8 hover:border-[#1a73e8] transition-colors">
          <span className="w-2 h-2 rounded-full bg-[#34a853] animate-pulse" />
          <span>Independent Google Review Growth Engine</span>
          <span className="text-[#dadce0]">|</span>
          <span className="text-[#1a73e8] font-semibold">100% Policy Compliant</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl font-extrabold text-[#202124] tracking-tight max-w-4xl mx-auto leading-[1.15]">
          Turn Happy Customer Visits into{' '}
          <span className="bg-gradient-to-r from-[#1a73e8] via-[#4285f4] to-[#1e8e3e] bg-clip-text text-transparent">
            Detailed Google Reviews
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-[#5f6368] max-w-2xl mx-auto leading-relaxed">
          Most satisfied customers want to leave a good review, but struggle with writer&apos;s block.
          Rankaro gives them scannable QR codes and guided prompts based on their real experience.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/register"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 text-base font-semibold text-white bg-[#1a73e8] hover:bg-[#1557b0] rounded-full shadow-sm hover:shadow-md transition-all group"
          >
            <span>Create Your Review Page</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#demo"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-3.5 text-base font-medium text-[#3c4043] bg-white hover:bg-[#f8f9fa] border border-[#dadce0] rounded-full transition-colors"
          >
            <span>Try Interactive Demo</span>
          </a>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-[#5f6368]">
          <div className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#34a853]" />
            <span>No fake reviews or hallucinations</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#34a853]" />
            <span>Valid scannable QR codes</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#34a853]" />
            <span>100% Free SaaS platform</span>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE DEMO WIDGET */}
      <section id="demo" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#f8f9fa] border border-[#dadce0] rounded-3xl p-6 sm:p-10 google-card-shadow">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1a73e8]">
              Interactive Preview
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#202124] mt-1">
              See how Rankaro works for your customers
            </h2>
            <p className="text-xs sm:text-sm text-[#5f6368] mt-2">
              Select services below to watch the authentic review draft assemble instantly.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#dadce0] shadow-xs space-y-6">
            {/* Step 1: Select services */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5f6368] mb-3">
                1. Tap services experienced (Example: Horizon Dental Studio):
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {demoServices.map((svc) => {
                  const isSelected = demoSelectedServices.includes(svc.id);
                  return (
                    <button
                      key={svc.id}
                      type="button"
                      onClick={() => toggleDemoService(svc.id)}
                      className={`text-left p-3 rounded-xl border text-xs font-medium transition-all flex items-center space-x-2.5 ${
                        isSelected
                          ? 'bg-[#e8f0fe] border-[#1a73e8] text-[#1a73e8]'
                          : 'bg-white border-[#dadce0] text-[#3c4043] hover:border-[#1a73e8]'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                          isSelected
                            ? 'bg-[#1a73e8] border-[#1a73e8] text-white'
                            : 'border-[#dadce0] bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="truncate">{svc.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Sentiment */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5f6368] mb-2">
                2. Experience Sentiment:
              </label>
              <div className="flex flex-wrap gap-2">
                {['exceptional', 'great', 'neutral'].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setDemoSentiment(s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize border ${
                      demoSentiment === s
                        ? 'bg-[#e8f0fe] border-[#1a73e8] text-[#1a73e8]'
                        : 'bg-white border-[#dadce0] text-[#5f6368]'
                    }`}
                  >
                    {s === 'exceptional' ? '★★★★★ Exceptional' : s === 'great' ? '★★★★☆ Great' : '★★★☆☆ Good'}
                  </button>
                ))}
              </div>
            </div>

            {/* Output Draft Preview Box */}
            <div className="p-4 bg-[#f8f9fa] rounded-2xl border border-[#dadce0] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1a73e8] flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generated Authentic Draft:</span>
                </span>
                <span className="text-[11px] text-[#70757a]">100% editable by customer</span>
              </div>

              <p className="text-sm text-[#202124] leading-relaxed italic bg-white p-4 rounded-xl border border-[#e8eaed]">
                &ldquo;{getDemoDraft()}&rdquo;
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCopyDemo}
                  className={`w-full sm:w-auto inline-flex items-center justify-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-2xs ${
                    demoCopied
                      ? 'bg-[#1e8e3e] text-white'
                      : 'bg-[#1a73e8] hover:bg-[#1557b0] text-white'
                  }`}
                >
                  {demoCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{demoCopied ? 'Review Copied!' : 'Copy Review Text'}</span>
                </button>

                <div className="flex items-center space-x-1.5 text-xs text-[#5f6368]">
                  <span>Then open official Google review link</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#1a73e8]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS (3 Simple Steps) */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1a73e8]">
            Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#202124] mt-2">
            Effortless for owners, seamless for customers
          </h2>
          <p className="mt-3 text-sm text-[#5f6368]">
            Rankaro bridges the gap between satisfied clients and authentic Google search presence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-white rounded-3xl p-8 border border-[#dadce0] google-card-shadow flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#e8f0fe] text-[#1a73e8] flex items-center justify-center font-bold text-lg mb-6">
                1
              </div>
              <h3 className="text-lg font-bold text-[#202124] mb-2">
                Configure &amp; Print QR Code
              </h3>
              <p className="text-xs text-[#5f6368] leading-relaxed">
                Add your business services, paste your Google review URL, and print our ready-made table tent or counter display card in seconds.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#f1f3f4] text-xs text-[#1a73e8] font-medium flex items-center space-x-1">
              <QrCode className="w-4 h-4" />
              <span>Instant QR generation</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-3xl p-8 border border-[#dadce0] google-card-shadow flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#fef7e0] text-[#f29900] flex items-center justify-center font-bold text-lg mb-6">
                2
              </div>
              <h3 className="text-lg font-bold text-[#202124] mb-2">
                Customer Scans &amp; Selects
              </h3>
              <p className="text-xs text-[#5f6368] leading-relaxed">
                The customer points their phone camera at your code. They tap what they experienced, and Rankaro drafts a detailed, natural review without writer&apos;s block.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#f1f3f4] text-xs text-[#b06000] font-medium flex items-center space-x-1">
              <Sparkles className="w-4 h-4" />
              <span>Assisted drafting</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-3xl p-8 border border-[#dadce0] google-card-shadow flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#e6f4ea] text-[#137333] flex items-center justify-center font-bold text-lg mb-6">
                3
              </div>
              <h3 className="text-lg font-bold text-[#202124] mb-2">
                Copy &amp; Post on Google
              </h3>
              <p className="text-xs text-[#5f6368] leading-relaxed">
                With one tap, the customer copies the review text and is redirected straight to your Google Business Profile review prompt to paste and publish.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#f1f3f4] text-xs text-[#137333] font-medium flex items-center space-x-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Direct Google redirect</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CORE FEATURES */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1a73e8]">
            Platform Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#202124] mt-2">
            Built for modern local business operations
          </h2>
          <p className="mt-3 text-sm text-[#5f6368]">
            Everything you need to gather authentic social proof without the headaches of subscription traps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-[#dadce0] google-card-shadow space-y-3">
            <div className="p-3 w-11 h-11 rounded-xl bg-[#e8f0fe] text-[#1a73e8] flex items-center justify-center">
              <QrCode className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#202124]">Valid Scannable QR Codes</h3>
            <p className="text-xs text-[#5f6368] leading-relaxed">
              Download crisp PNG and vector SVG QR codes. Print matching table tents or counter display cards directly from your browser.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#dadce0] google-card-shadow space-y-3">
            <div className="p-3 w-11 h-11 rounded-xl bg-[#fef7e0] text-[#f29900] flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#202124]">Custom Service Presets</h3>
            <p className="text-xs text-[#5f6368] leading-relaxed">
              Add your exact menu of offerings, or pick from pre-configured industry templates for dentists, contractors, cafes, and auto shops.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#dadce0] google-card-shadow space-y-3">
            <div className="p-3 w-11 h-11 rounded-xl bg-[#e6f4ea] text-[#137333] flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#202124]">Funnel Analytics</h3>
            <p className="text-xs text-[#5f6368] leading-relaxed">
              Monitor total QR scans, drafts generated, text copies, and Google clicks with conversion rates to understand your pipeline.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#dadce0] google-card-shadow space-y-3">
            <div className="p-3 w-11 h-11 rounded-xl bg-[#fce8e6] text-[#d93025] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#202124]">Authentic &amp; Ethical</h3>
            <p className="text-xs text-[#5f6368] leading-relaxed">
              Zero review gating. Customers remain 100% free to write whatever they want or provide private feedback if they had an issue.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#dadce0] google-card-shadow space-y-3">
            <div className="p-3 w-11 h-11 rounded-xl bg-[#e8f0fe] text-[#1a73e8] flex items-center justify-center">
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#202124]">Mobile-First Simplicity</h3>
            <p className="text-xs text-[#5f6368] leading-relaxed">
              Blazingly fast on smartphones. No apps for customers to download, no sign-ups, and no intrusive tracking cookies.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#dadce0] google-card-shadow space-y-3">
            <div className="p-3 w-11 h-11 rounded-xl bg-[#f8f9fa] text-[#202124] border border-[#dadce0] flex items-center justify-center font-bold text-sm">
              100%
            </div>
            <h3 className="text-base font-bold text-[#202124]">Zero Subscription Fees</h3>
            <p className="text-xs text-[#5f6368] leading-relaxed">
              No artificial plan limits, billing portals, or payment lock-in. Built purely to support local business growth.
            </p>
          </div>
        </div>
      </section>

      {/* 5. ETHICS & COMPLIANCE SECTION */}
      <section id="ethics" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#f8f9fa] rounded-3xl p-8 sm:p-12 border border-[#dadce0] text-center space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-[#e6f4ea] text-[#1e8e3e] flex items-center justify-center mx-auto">
            <ShieldCheck className="w-7 h-7" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-[#202124]">
            Our Ethical Review Pledge
          </h2>

          <p className="text-sm text-[#5f6368] max-w-2xl mx-auto leading-relaxed">
            Google maintains strict anti-spam guidelines to safeguard review authenticity. Rankaro is built to respect and uphold these guidelines to protect your business reputation:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left text-xs pt-4">
            <div className="bg-white p-4 rounded-xl border border-[#e8eaed] space-y-1">
              <span className="font-semibold text-[#202124] block">No Gating</span>
              <p className="text-[#5f6368]">
                We never block or hide Google links from customers who share critical feedback.
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[#e8eaed] space-y-1">
              <span className="font-semibold text-[#202124] block">No Hallucinations</span>
              <p className="text-[#5f6368]">
                Drafts are generated purely from services and answers the customer manually confirmed.
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[#e8eaed] space-y-1">
              <span className="font-semibold text-[#202124] block">Customer Control</span>
              <p className="text-[#5f6368]">
                The customer reviews, edits, and personally posts their review on Google.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1a73e8]">
            FAQ
          </span>
          <h2 className="text-3xl font-bold text-[#202124] mt-2">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl border border-[#dadce0] google-card-shadow overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full text-left p-5 flex items-center justify-between text-sm font-semibold text-[#202124] hover:bg-[#f8f9fa] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#5f6368] transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#1a73e8]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-[#5f6368] leading-relaxed border-t border-[#f1f3f4] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. BOTTOM CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-tr from-[#1a73e8] to-[#1557b0] rounded-3xl p-8 sm:p-12 text-center text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to collect authentic Google reviews that boost your local ranking?
            </h2>
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
              Create your account in under 2 minutes. No subscription fees, no credit card required.
            </p>
            <div className="pt-2">
              <a
                href="/register"
                className="inline-flex items-center space-x-2 px-8 py-3.5 bg-white text-[#1a73e8] font-bold text-sm rounded-full shadow-lg hover:bg-[#f8f9fa] transition-all"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
