import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Voice Agent Services for Dallas Businesses | Forsythe Publishing',
  description: 'Boost lead conversion with AI voice agents in Dallas. 70% contact rate, 2-5 min response times. Perfect for roofing, HVAC, plumbing & more in Dallas, TX.',
  keywords: 'AI voice agent Dallas, Dallas lead conversion, roofing AI callback, HVAC lead automation, Dallas marketing automation, AI receptionist Texas',
  openGraph: {
    title: 'AI Voice Agent Services for Dallas Businesses',
    description: 'Boost lead conversion with AI voice agents in Dallas. 70% contact rate, 2-5 min response times.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Forsythe Publishing & Marketing',
    url: 'https://forsythepublishing.com/dallas',
  },
};

export default function DallasPage() {
  return (
    <div className="min-h-screen bg-[#0b0c0d] text-slate-100">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#111315] to-[#0f1112]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#d9c4aa]/30 bg-[#d9c4aa]/10 text-[#d9c4aa] font-sans uppercase text-[10px] tracking-[0.12em] mb-6">
              <div className="w-2 h-2 bg-[#d9c4aa] rounded-full animate-pulse"></div>
              <span>DALLAS SERVICE BUSINESSES</span>
            </div>
            <h1 className="font-display text-[#d9c4aa] uppercase tracking-[0.15em] text-3xl md:text-5xl mb-6">
              AI Voice Agents for <span className="text-white">Dallas</span> Service Companies
            </h1>
            <p className="text-slate-300/90 text-lg mb-8">
              Increase your lead conversion rate with our AI voice agents designed specifically for Dallas service businesses. From roofing to HVAC, plumbing to solar, we help you capture more leads and book more appointments in the Dallas area.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#contact" 
                className="rounded-xl bg-gradient-to-br from-[#d9c4aa] to-[#b89463] text-black font-sans font-extrabold px-8 py-4 text-center shadow-[0_10px_26px_rgba(216,184,138,.25)] hover:shadow-[0_14px_32px_rgba(216,184,138,.35)] transition-all"
              >
                Get Started in Dallas
              </a>
              <a 
                href="tel:+18172108487" 
                className="rounded-xl border border-[#d9c4aa]/40 px-8 py-4 text-center ui-track hover:bg-[#d9c4aa]/5 transition-all"
              >
                Call (817) 210‑8487
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Dallas Service Areas */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-[#d9c4aa] uppercase tracking-[0.18em] text-2xl md:text-3xl mb-4">
              Serving Dallas and <span className="text-white">Major Suburbs</span>
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              We specialize in helping Dallas service businesses increase their lead conversion rates with AI voice agents.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#111315] rounded-2xl p-8 border border-white/10">
              <h3 className="font-display text-white uppercase tracking-[0.22em] text-xl mb-4">Downtown Dallas</h3>
              <p className="text-slate-300/90 mb-4">
                Serving the Dallas central business district with AI voice agents that capture leads and book appointments quickly in the bustling downtown area.
              </p>
              <ul className="space-y-2 text-slate-300/80">
                <li className="flex items-start gap-2">
                  <span className="text-[#d9c4aa]">•</span>
                  <span>Commercial HVAC</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#d9c4aa]">•</span>
                  <span>Office Building Maintenance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#d9c4aa]">•</span>
                  <span>Professional Services</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#111315] rounded-2xl p-8 border border-white/10">
              <h3 className="font-display text-white uppercase tracking-[0.22em] text-xl mb-4">North Dallas / Plano</h3>
              <p className="text-slate-300/90 mb-4">
                Helping North Dallas and Plano businesses convert more leads with our smart AI voice agents that respond in under 5 minutes.
              </p>
              <ul className="space-y-2 text-slate-300/80">
                <li className="flex items-start gap-2">
                  <span className="text-[#d9c4aa]">•</span>
                  <span>Residential Roofing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#d9c4aa]">•</span>
                  <span>Luxury Home Services</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#d9c4aa]">•</span>
                  <span>Pool & Landscaping</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#111315] rounded-2xl p-8 border border-white/10">
              <h3 className="font-display text-white uppercase tracking-[0.22em] text-xl mb-4">Southern Dallas</h3>
              <p className="text-slate-300/90 mb-4">
                Supporting businesses throughout southern Dallas with 24/7 AI voice agent coverage across all service areas.
              </p>
              <ul className="space-y-2 text-slate-300/80">
                <li className="flex items-start gap-2">
                  <span className="text-[#d9c4aa]">•</span>
                  <span>Emergency Plumbing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#d9c4aa]">•</span>
                  <span>Storm Damage Specialists</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#d9c4aa]">•</span>
                  <span>Home Security Systems</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Local Success Stories */}
      <section className="py-16 md:py-24 bg-[#111315]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-[#d9c4aa] uppercase tracking-[0.18em] text-2xl md:text-3xl mb-4">
              Dallas Businesses <span className="text-white">Seeing Results</span>
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Real Dallas businesses increasing their lead conversion with our AI voice agents.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#0f1112] rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d9c4aa] to-[#b89463] flex items-center justify-center">
                  <span className="text-black font-bold text-sm">MR</span>
                </div>
                <div>
                  <div className="font-sans font-semibold text-white text-sm">Michael Rodriguez</div>
                  <div className="text-[#d9c4aa] text-xs">Dallas Roofing Solutions</div>
                </div>
              </div>
              <p className="text-slate-300/90 mb-4">
                "We went from 35% to 70% contact rate in the first month in Dallas. The AI agent never sleeps and catches leads we used to miss during storm season."
              </p>
              <div className="flex items-center gap-3 text-sm">
                <div className="text-[#d9c4aa] font-num font-bold">$78k/mo</div>
                <div className="text-slate-400">Additional Revenue</div>
              </div>
            </div>

            <div className="bg-[#0f1112] rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d9c4aa] to-[#b89463] flex items-center justify-center">
                  <span className="text-black font-bold text-sm">SC</span>
                </div>
                <div>
                  <div className="font-sans font-semibold text-white text-sm">Sarah Chen</div>
                  <div className="text-[#d9c4aa] text-xs">Elite HVAC Services</div>
                </div>
              </div>
              <p className="text-slate-300/90 mb-4">
                "The inbound AI handles our Dallas emergency calls perfectly. It triages urgent issues and routes them to the right technician. Our response time improved by 80%."
              </p>
              <div className="flex items-center gap-3 text-sm">
                <div className="text-[#d9c4aa] font-num font-bold">80%</div>
                <div className="text-slate-400">Faster Response</div>
              </div>
            </div>

            <div className="bg-[#0f1112] rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d9c4aa] to-[#b89463] flex items-center justify-center">
                  <span className="text-black font-bold text-sm">JL</span>
                </div>
                <div>
                  <div className="font-sans font-semibold text-white text-sm">James Lawson</div>
                  <div className="text-[#d9c4aa] text-xs">Lawson & Associates</div>
                </div>
              </div>
              <p className="text-slate-300/90 mb-4">
                "Our custom video ads are driving 3x more qualified leads in Dallas. The AI voice agent books consultations while we're in court. It's like having a 24/7 receptionist."
              </p>
              <div className="flex items-center gap-3 text-sm">
                <div className="text-[#d9c4aa] font-num font-bold">3x</div>
                <div className="text-slate-400">More Qualified Leads</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="bg-gradient-to-br from-[#d9c4aa]/10 to-[#b89463]/10 rounded-2xl p-8 border border-[#d9c4aa]/20">
            <h2 className="font-display text-[#d9c4aa] uppercase tracking-[0.18em] text-2xl md:text-3xl mb-4">
              Ready to Transform Your <span className="text-white">Dallas Business</span>?
            </h2>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
              Join the dozens of Dallas service businesses using our AI voice agents to capture more leads and book more appointments. Start your 5-day free trial today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+18172108487" 
                className="rounded-xl bg-gradient-to-br from-[#d9c4aa] to-[#b89463] text-black font-sans font-extrabold px-8 py-4 text-center shadow-[0_10px_26px_rgba(216,184,138,.25)] hover:shadow-[0_14px_32px_rgba(216,184,138,.35)] transition-all"
              >
                Call (817) 210‑8487
              </a>
              <a 
                href="mailto:forsythpublishing@gmail.com" 
                className="rounded-xl border border-white/15 px-8 py-4 text-center ui-track hover:bg-white/5 transition-all"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#111315]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 grid md:grid-cols-3 gap-6">
          <div>
            <div className="font-display uppercase tracking-[var(--ls-sub)]">Forsythe Publishing & Marketing</div>
            <p className="text-slate-300/80 ui-track">AI voice agents for Dallas service businesses.</p>
            <div className="text-[#d9c4aa] font-display uppercase tracking-[var(--ls-sub)]">Dallas, Texas · Serving DFW</div>
          </div>
          <div>
            <div className="font-display uppercase tracking-[var(--ls-sub)]">Contact</div>
            <ul className="mt-2 space-y-1 text-slate-300/80 ui-track">
              <li><a href="tel:+18172108487" className="hover:text-white">Call / Text: (817) 210‑8487</a></li>
              <li><a href="mailto:forsythpublishing@gmail.com" className="hover:text-white">forsythpublishing@gmail.com</a></li>
              <li>Dallas, TX — DFW Metroplex</li>
            </ul>
          </div>
          <div>
            <div className="font-display uppercase tracking-[0.22em]">Navigation</div>
            <ul className="mt-2 space-y-1 text-slate-300/80 ui-track">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/#demo" className="hover:text-white">How it works</a></li>
              <li><a href="/#book" className="hover:text-white">Book call</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-8 text-sm text-slate-400 flex items-center justify-between ui-track">
          <div>© 2025 Forsythe Publishing & Marketing.</div>
          <div>TCPA & DNC rules respected. Reply STOP to opt‑out.</div>
        </div>
      </footer>
    </div>
  );
}