import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Voice Agents for Legal Practices in DFW | Forsythe Publishing',
  description: 'Professional lead capture for DFW law firms. AI voice agents handle consultations, case intake, and appointment scheduling with attorney-level qualification.',
  keywords: 'AI voice agent legal, Dallas law firm automation, Fort Worth attorney leads, legal consultation booking, legal lead conversion, DFW legal marketing',
  openGraph: {
    title: 'AI Voice Agents for Legal Practices in DFW',
    description: 'Professional lead capture for DFW law firms. AI voice agents handle consultations, case intake, and appointment scheduling with attorney-level qualification.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Forsythe Publishing & Marketing',
    url: 'https://forsythepublishing.com/legal',
  },
};

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-[#0b0c0d] text-slate-100">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#111315] to-[#0f1112]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#d9c4aa]/10 border border-[#d9c4aa]/30 rounded-full text-[#d9c4aa] font-sans uppercase text-[10px] tracking-[0.12em] mb-6">
              <div className="w-2 h-2 bg-[#d9c4aa] rounded-full animate-pulse"></div>
              <span>DFW LEGAL PRACTICES</span>
            </div>
            <h1 className="font-display text-[#d9c4aa] uppercase tracking-[0.15em] text-3xl md:text-5xl mb-6">
              AI Voice Agents for <span className="text-white">Legal Practices</span>
            </h1>
            <p className="text-slate-300/90 text-lg mb-8">
              Capture high-value legal consultations with AI voice agents trained in attorney intake protocols. Our system handles case classification, conflict checks, and consultation scheduling while maintaining attorney-client privilege standards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#contact" 
                className="rounded-xl bg-gradient-to-br from-[#d9c4aa] to-[#b89463] text-black font-sans font-extrabold px-8 py-4 text-center shadow-[0_10px_26px_rgba(216,184,138,.25)] hover:shadow-[0_14px_32px_rgba(216,184,138,.35)] transition-all"
              >
                Get Started in DFW
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

      {/* Legal Industry Challenges */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-[#d9c4aa] uppercase tracking-[0.18em] text-2xl md:text-3xl mb-4">
              Dallas-Fort Worth <span className="text-white">Legal Practice Challenges</span>
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Legal leads in DFW are high-value but require immediate attention and sensitive handling. Our AI agents are designed for attorney intake protocols.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#111315] rounded-2xl p-6 border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#d9c4aa] to-[#b89463] flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-black">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.9 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 9H14V4H5V21H19V9Z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="font-display text-white uppercase tracking-[0.22em] mb-3">Time-Sensitive Legal Matters</h3>
              <p className="text-slate-300/90">
                Legal issues often have deadlines. Our AI agents immediately classify case types, provide initial guidance, and prioritize urgent matters for immediate attorney contact.
              </p>
            </div>

            <div className="bg-[#111315] rounded-2xl p-6 border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#d9c4aa] to-[#b89463] flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-black">
                  <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.11 3.89 21 5 21H19C20.11 21 21 20.11 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM17 12H15V7H13V12H11L14 16L17 12Z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="font-display text-white uppercase tracking-[0.22em] mb-3">Confidential Case Intake</h3>
              <p className="text-slate-300/90">
                Our AI agents conduct initial case intake while preserving confidentiality. They classify case types, gather essential details, and schedule appropriate attorney consultations.
              </p>
            </div>

            <div className="bg-[#111315] rounded-2xl p-6 border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#d9c4aa] to-[#b89463] flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-black">
                  <path d="M17 10.5V7C17 6.45 16.55 6 16 6H4C3.45 6 3 6.45 3 7V17C3 17.55 3.45 18 4 18H16C16.55 18 17 17.55 17 17V13.5L21 17.5V6.5L17 10.5Z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="font-display text-white uppercase tracking-[0.22em] mb-3">Attorney Availability Matching</h3>
              <p className="text-slate-300/90">
                Match clients with available attorneys based on specialty, schedule, and case priority. Book consultations at times that work best for both attorney and client.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How AI Helps Legal Practices */}
      <section className="py-16 md:py-24 bg-[#111315]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-[#d9c4aa] uppercase tracking-[0.18em] text-2xl md:text-3xl mb-4">
              AI Voice Agents <span className="text-white">Transforming DFW Legal Services</span>
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Our AI agents are specifically programmed for legal practice protocols and client confidentiality requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-display text-[#d9c4aa] uppercase tracking-[0.22em] text-xl mb-6">Legal Industry Specialization</h3>
              <ul className="space-y-4 text-slate-300/90">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#d9c4aa]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-[#d9c4aa]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Initial case classification and conflict check initiation</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#d9c4aa]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-[#d9c4aa]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Attorney-client privilege preservation during intake</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#d9c4aa]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-[#d9c4aa]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Contingency vs. hourly fee structure qualification</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#d9c4aa]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-[#d9c4aa]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Emergency legal matter identification and routing</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-display text-[#d9c4aa] uppercase tracking-[0.22em] text-xl mb-6">Legal Practice Results</h3>
              <ul className="space-y-4 text-slate-300/90">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#d9c4aa]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#d9c4aa] font-bold text-sm">62%</span>
                  </div>
                  <span>Contact rate increase for initial consultations</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#d9c4aa]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#d9c4aa] font-bold text-sm">2-5min</span>
                  </div>
                  <span>Initial response time vs 6-12 hours manual</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#d9c4aa]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#d9c4aa] font-bold text-sm">2.8x</span>
                  </div>
                  <span>More qualified consultation requests booked</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#d9c4aa]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#d9c4aa] font-bold text-sm">$28k</span>
                  </div>
                  <span>Average monthly revenue increase from captured consultations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* DFW Legal Case Study */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-br from-[#d9c4aa]/10 to-[#b89463]/10 rounded-2xl border border-[#d9c4aa]/20 p-8">
            <div className="text-center mb-8">
              <h2 className="font-display text-[#d9c4aa] uppercase tracking-[0.18em] text-2xl md:text-3xl mb-4">
                Fort Worth Injury Law <span className="text-white">Case Study</span>
              </h2>
              <p className="text-slate-300">
                How a personal injury firm in Fort Worth increased consultation bookings by 180% with AI voice agents
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-[#0f1112] p-6 rounded-xl border border-white/10">
                <div className="text-3xl font-num text-[#d9c4aa] mb-2">30%</div>
                <div className="text-slate-300/90">Contact Rate (Before)</div>
              </div>
              <div className="bg-[#0f1112] p-6 rounded-xl border border-white/10">
                <div className="text-3xl font-num text-[#d9c4aa] mb-2">72%</div>
                <div className="text-slate-300/90">Contact Rate (After)</div>
              </div>
              <div className="bg-[#0f1112] p-6 rounded-xl border border-white/10">
                <div className="text-3xl font-num text-[#d9c4aa] mb-2">180%</div>
                <div className="text-slate-300/90">Consultation Increase</div>
              </div>
            </div>

            <div className="mt-8 text-slate-300/90 space-y-4">
              <p className="ui-track">
                Fort Worth Injury Law was missing personal injury leads during critical time windows after accidents. Many potential clients were contacting competitors after not receiving an immediate response. The firm needed to respect attorney-client privilege while capturing time-sensitive leads.
              </p>
              <p className="ui-track">
                After implementing our AI voice agent, they saw immediate improvement in consultation booking and lead capture. The AI agent handles initial case classification, preserves confidentiality during intake, schedules attorney consultations, and qualifies contingency cases.
              </p>
              <p className="ui-track">
                "Our consultation bookings increased by 180% in the first month. The AI perfectly handles the sensitive nature of injury cases and ensures we never miss a time-sensitive lead again. The system respects attorney-client privilege while gathering essential case details," said Jennifer Walsh, Senior Partner at Fort Worth Injury Law.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="bg-gradient-to-br from-[#d9c4aa]/10 to-[#b89463]/10 rounded-2xl border border-[#d9c4aa]/20 p-8">
            <h2 className="font-display text-[#d9c4aa] uppercase tracking-[0.18em] text-2xl md:text-3xl mb-4">
              Elevate Your <span className="text-white">DFW Legal Practice</span>
            </h2>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
              Join the growing number of Dallas-Fort Worth law firms using our AI voice agents to capture time-sensitive legal consultations and maintain attorney-client confidentiality. Start your 5-day free trial today.
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
            <p className="text-slate-300/80 ui-track">AI voice agents for DFW legal practices.</p>
            <div className="text-[#d9c4aa] font-display uppercase tracking-[var(--ls-sub)]">Dallas-Fort Worth • Serving All North Texas Legal Practices</div>
          </div>
          <div>
            <div className="font-display uppercase tracking-[var(--ls-sub)]">Contact</div>
            <ul className="mt-2 space-y-1 text-slate-300/80 ui-track">
              <li><a href="tel:+18172108487" className="hover:text-white">Call / Text: (817) 210‑8487</a></li>
              <li><a href="mailto:forsythpublishing@gmail.com" className="hover:text-white">forsythpublishing@gmail.com</a></li>
              <li>Fort Worth, TX — DFW Metroplex</li>
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
          <div>© 2025 Forsythe Publishing & Marketing. All rights reserved.</div>
          <div>TCPA & DNC rules respected. Reply STOP to opt‑out.</div>
        </div>
      </footer>
    </div>
  );
}