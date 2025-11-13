import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Voice Agent Services for Arlington Businesses | Forsythe Publishing',
  description: 'Boost lead conversion with AI voice agents in Arlington. 70% contact rate, 2-5 min response times. Perfect for roofing, HVAC, plumbing & more in Arlington, TX.',
  keywords: 'AI voice agent Arlington, Arlington lead conversion, roofing AI callback, HVAC lead automation, Arlington marketing automation, AI receptionist Texas',
  openGraph: {
    title: 'AI Voice Agent Services for Arlington Businesses',
    description: 'Boost lead conversion with AI voice agents in Arlington. 70% contact rate, 2-5 min response times.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Forsythe Publishing & Marketing',
    url: 'https://forsythepublishing.com/arlington',
  },
};

export default function ArlingtonPage() {
  return (
    <div className="min-h-screen bg-[#0b0c0d] text-slate-100">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#111315] to-[#0f1112]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#d9c4aa]/30 bg-[#d9c4aa]/10 text-[#d9c4aa] font-sans uppercase text-[10px] tracking-[0.12em] mb-6">
              <div className="w-2 h-2 bg-[#d9c4aa] rounded-full animate-pulse"></div>
              <span>ARLINGTON SERVICE BUSINESSES</span>
            </div>
            <h1 className="font-display text-[#d9c4aa] uppercase tracking-[0.15em] text-3xl md:text-5xl mb-6">
              AI Voice Agents for <span className="text-white">Arlington</span> Service Companies
            </h1>
            <p className="text-slate-300/90 text-lg mb-8">
              Increase your lead conversion rate with our AI voice agents designed specifically for Arlington service businesses. From roofing to HVAC, plumbing to solar, we help you capture more leads and book more appointments in the Arlington area.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#contact" 
                className="rounded-xl bg-gradient-to-br from-[#d9c4aa] to-[#b89463] text-black font-sans font-extrabold px-8 py-4 text-center shadow-[0_10px_26px_rgba(216,184,138,.25)] hover:shadow-[0_14px_32px_rgba(216,184,138,.35)] transition-all"
              >
                Get Started in Arlington
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

      {/* Arlington Service Areas */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-[#d9c4aa] uppercase tracking-[0.18em] text-2xl md:text-3xl mb-4">
              Serving Arlington and <span className="text-white">Surrounding Areas</span>
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              We specialize in helping Arlington service businesses increase their lead conversion rates with AI voice agents.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#111315] rounded-2xl p-8 border border-white/10">
              <h3 className="font-display text-white uppercase tracking-[0.22em] text-xl mb-4">Downtown Arlington</h3>
              <p className="text-slate-300/90 mb-4">
                Serving the vibrant downtown Arlington area with AI voice agents that capture leads and book appointments quickly for commercial and residential services.
              </p>
              <ul className="space-y-2 text-slate-300/80">
                <li className="flex items-start gap-2">
                  <span className="text-[#d9c4aa]">•</span>
                  <span>Commercial Services</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#d9c4aa]">•</span>
                  <span>University Area Services</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#d9c4aa]">•</span>
                  <span>Entertainment District Support</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#111315] rounded-2xl p-8 border border-white/10">
              <h3 className="font-display text-white uppercase tracking-[0.22em] text-xl mb-4">East Arlington</h3>
              <p className="text-slate-300/90 mb-4">
                Helping East Arlington businesses convert more leads with our smart AI voice agents that respond in under 5 minutes during and after business hours.
              </p>
              <ul className="space-y-2 text-slate-300/80">
                <li className="flex items-start gap-2">
                  <span className="text-[#d9c4aa]">•</span>
                  <span>Residential Maintenance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#d9c4aa]">•</span>
                  <span>Emergency Services</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#d9c4aa]">•</span>
                  <span>Seasonal Services</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#111315] rounded-2xl p-8 border border-white/10">
              <h3 className="font-display text-white uppercase tracking-[0.22em] text-xl mb-4">West Arlington</h3>
              <p className="text-slate-300/90 mb-4">
                Supporting West Arlington businesses with 24/7 AI voice agent coverage across all service areas, ensuring no leads are missed.
              </p>
              <ul className="space-y-2 text-slate-300/80">
                <li className="flex items-start gap-2">
                  <span className="text-[#d9c4aa]">•</span>
                  <span>Suburban Home Services</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#d9c4aa]">•</span>
                  <span>Luxury Property Maintenance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#d9c4aa]">•</span>
                  <span>Specialized Installations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Arlington Industry Focus */}
      <section className="py-16 md:py-24 bg-[#111315]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-[#d9c4aa] uppercase tracking-[0.18em] text-2xl md:text-3xl mb-4">
              Industry-Specific AI Solutions for <span className="text-white">Arlington</span>
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Our AI voice agents are customized for each industry common to the Arlington market.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[#0f1112] rounded-2xl p-6 border border-white/10 hover:border-[#d9c4aa]/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#d9c4aa] to-[#b89463] flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-black">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 9H14V4H5V21H19V9Z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="font-display text-white uppercase tracking-[0.22em] mb-3">Roofing & Restoration</h3>
              <p className="text-slate-300/90 mb-4">
                Handles storm damage claims, insurance questions, and schedules inspections. Specialized for Arlington's weather patterns.
              </p>
              <ul className="space-y-2 text-slate-300/80 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-[#d9c4aa]">•</span>
                  <span>Hail damage assessment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#d9c4aa]">•</span>
                  <span>Insurance claim coordination</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#d9c4aa]">•</span>
                  <span>Emergency tarping services</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#0f1112] rounded-2xl p-6 border border-white/10 hover:border-[#d9c4aa]/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#d9c4aa] to-[#b89463] flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-black">
                  <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM17 12H15V7H13V12H11L14 16L17 12Z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="font-display text-white uppercase tracking-[0.22em] mb-3">HVAC Services</h3>
              <p className="text-slate-300/90 mb-4">
                Schedules emergency repairs, handles seasonal maintenance, and qualifies leads for high-value installations in Arlington's climate.
              </p>
              <ul className="space-y-2 text-slate-300/80 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-[#d9c4aa]">•</span>
                  <span>Emergency repair triage</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#d9c4aa]">•</span>
                  <span>Seasonal maintenance scheduling</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#d9c4aa]">•</span>
                  <span>Installation consultations</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#0f1112] rounded-2xl p-6 border border-white/10 hover:border-[#d9c4aa]/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#d9c4aa] to-[#b89463] flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-black">
                  <path d="M17 10.5V7C17 6.45 16.55 6 16 6H4C3.45 6 3 6.45 3 7V17C3 17.55 3.45 18 4 18H16C16.55 18 17 17.55 17 17V13.5L21 17.5V6.5L17 10.5Z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="font-display text-white uppercase tracking-[0.22em] mb-3">Plumbing & Electrical</h3>
              <p className="text-slate-300/90 mb-4">
                Triage emergency situations, schedule service calls, and provide immediate quotes for common issues in Arlington homes.
              </p>
              <ul className="space-y-2 text-slate-300/80 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-[#d9c4aa]">•</span>
                  <span>Emergency situation triage</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#d9c4aa]">•</span>
                  <span>Service call scheduling</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#d9c4aa]">•</span>
                  <span>Immediate quote provision</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Local Success Stories */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-[#d9c4aa] uppercase tracking-[0.18em] text-2xl md:text-3xl mb-4">
              Arlington Businesses <span className="text-white">Seeing Results</span>
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Real Arlington businesses increasing their lead conversion with our AI voice agents.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#111315] rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d9c4aa] to-[#b89463] flex items-center justify-center">
                  <span className="text-black font-bold text-sm">MR</span>
                </div>
                <div>
                  <div className="font-sans font-semibold text-white text-sm">Michael Rodriguez</div>
                  <div className="text-[#d9c4aa] text-xs">Arlington Roofing Solutions</div>
                </div>
              </div>
              <p className="text-slate-300/90 mb-4">
                "We went from 35% to 70% contact rate in the first month in Arlington. The AI agent never sleeps and catches leads we used to miss during storm season."
              </p>
              <div className="flex items-center gap-3 text-sm">
                <div className="text-[#d9c4aa] font-num font-bold">$78k/mo</div>
                <div className="text-slate-400">Additional Revenue</div>
              </div>
            </div>

            <div className="bg-[#111315] rounded-2xl p-6 border border-white/10">
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
                "The inbound AI handles our Arlington emergency calls perfectly. It triages urgent issues and routes them to the right technician. Our response time improved by 80%."
              </p>
              <div className="flex items-center gap-3 text-sm">
                <div className="text-[#d9c4aa] font-num font-bold">80%</div>
                <div className="text-slate-400">Faster Response</div>
              </div>
            </div>

            <div className="bg-[#111315] rounded-2xl p-6 border border-white/10">
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
                "Our custom video ads are driving 3x more qualified leads in Arlington. The AI voice agent books consultations while we're in court. It's like having a 24/7 receptionist."
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
              Ready to Transform Your <span className="text-white">Arlington Business</span>?
            </h2>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
              Join the dozens of Arlington service businesses using our AI voice agents to capture more leads and book more appointments. Start your 5-day free trial today.
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
            <p className="text-slate-300/80 ui-track">AI voice agents for Arlington service businesses.</p>
            <div className="text-[#d9c4aa] font-display uppercase tracking-[var(--ls-sub)]">Arlington, Texas · Serving DFW</div>
          </div>
          <div>
            <div className="font-display uppercase tracking-[var(--ls-sub)]">Contact</div>
            <ul className="mt-2 space-y-1 text-slate-300/80 ui-track">
              <li><a href="tel:+18172108487" className="hover:text-white">Call / Text: (817) 210‑8487</a></li>
              <li><a href="mailto:forsythpublishing@gmail.com" className="hover:text-white">forsythpublishing@gmail.com</a></li>
              <li>Arlington, TX — DFW Metroplex</li>
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