import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Voice Agents for Dental Practices in DFW | Forsythe Publishing',
  description: 'Increase patient appointments with AI voice agents for dental practices in Dallas-Fort Worth. Automated recall scheduling, emergency handling, and new patient qualification.',
  keywords: 'AI voice agent dental, Dallas dental automation, Fort Worth dental leads, dental appointment booking, dental lead conversion, DFW dental marketing',
  openGraph: {
    title: 'AI Voice Agents for Dental Practices in DFW',
    description: 'Increase patient appointments with AI voice agents for dental practices in Dallas-Fort Worth. Automated recall scheduling, emergency handling, and new patient qualification.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Forsythe Publishing & Marketing',
    url: 'https://forsythepublishing.com/dental',
  },
};

export default function DentalPage() {
  return (
    <div className="min-h-screen bg-[#0b0c0d] text-slate-100">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#111315] to-[#0f1112]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#d9c4aa]/10 border border-[#d9c4aa]/30 rounded-full text-[#d9c4aa] font-sans uppercase text-[10px] tracking-[0.12em] mb-6">
              <div className="w-2 h-2 bg-[#d9c4aa] rounded-full animate-pulse"></div>
              <span>DFW DENTAL PRACTICES</span>
            </div>
            <h1 className="font-display text-[#d9c4aa] uppercase tracking-[0.15em] text-3xl md:text-5xl mb-6">
              AI Voice Agents for <span className="text-white">Dental Practices</span>
            </h1>
            <p className="text-slate-300/90 text-lg mb-8">
              Capture dental leads before patients call competitors. Our HIPAA-compliant AI agents schedule cleanings, handle emergencies, and qualify new patients in under 5 minutes, 24/7 in the Dallas-Fort Worth area.
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

      {/* Dental Industry Challenges */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-[#d9c4aa] uppercase tracking-[0.18em] text-2xl md:text-3xl mb-4">
              Dallas-Fort Worth <span className="text-white">Dental Practice Challenges</span>
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              The DFW dental market is highly competitive, with patients expecting immediate responses and convenient scheduling. AI voice agents solve key challenges.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#111315] rounded-2xl p-6 border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#d9c4aa] to-[#b89463] flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-black">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 9H14V4H5V21H19V9Z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="font-display text-white uppercase tracking-[0.22em] mb-3">Missed Recall Opportunities</h3>
              <p className="text-slate-300/90">
                60% of dental practices struggle with patient recall scheduling. Our AI follows up on hygiene appointments to schedule next visits and preventive care.
              </p>
            </div>

            <div className="bg-[#111315] rounded-2xl p-6 border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#d9c4aa] to-[#b89463] flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-black">
                  <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.11 3.89 21 5 21H19C20.11 21 21 20.11 21 19V5C21 3.9 20.11 3 19 3ZM19 19H5V5H19V19ZM17 12H15V7H13V12H11L14 16L17 12Z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="font-display text-white uppercase tracking-[0.22em] mb-3">Emergency After-Hours</h3>
              <p className="text-slate-300/90">
                Handle tooth pain and dental emergencies outside office hours. AI assesses urgency, provides relief guidance, and schedules emergency appointments.
              </p>
            </div>

            <div className="bg-[#111315] rounded-2xl p-6 border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#d9c4aa] to-[#b89463] flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-black">
                  <path d="M17 10.5V7C17 6.45 16.55 6 16 6H4C3.45 6 3 6.45 3 7V17C3 17.55 3.45 18 4 18H16C16.55 18 17 17.55 17 17V13.5L21 17.5V6.5L17 10.5Z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="font-display text-white uppercase tracking-[0.22em] mb-3">New Patient Qualification</h3>
              <p className="text-slate-300/90">
                Qualify new patients with insurance verification, treatment interest, and availability confirmation before forwarding to your scheduling team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How AI Helps Dental Practices */}
      <section className="py-16 md:py-24 bg-[#111315]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-[#d9c4aa] uppercase tracking-[0.18em] text-2xl md:text-3xl mb-4">
              AI Voice Agents <span className="text-white">Transforming DFW Dental</span>
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Our AI voice agents are specifically programmed for dental practice workflows and patient communication.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-display text-[#d9c4aa] uppercase tracking-[0.22em] text-xl mb-6">Specialized Dental Scripting</h3>
              <ul className="space-y-4 text-slate-300/90">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#d9c4aa]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-[#d9c4aa]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Recall appointment scheduling with patient preference options</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#d9c4aa]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-[#d9c4aa]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Emergency triage with pain assessment and urgency classification</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#d9c4aa]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-[#d9c4aa]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Insurance verification and new patient onboarding</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#d9c4aa]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-[#d9c4aa]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Payment plan options discussion and confirmation</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-display text-[#d9c4aa] uppercase tracking-[0.22em] text-xl mb-6">Results for Dental Practices</h3>
              <ul className="space-y-4 text-slate-300/90">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#d9c4aa]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#d9c4aa] font-bold text-sm">68%</span>
                  </div>
                  <span>Contact rate compared to 32% manual follow-up</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#d9c4aa]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#d9c4aa] font-bold text-sm">2-5min</span>
                  </div>
                  <span>Response time vs 3+ hours for manual response</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#d9c4aa]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#d9c4aa] font-bold text-sm">24/7</span>
                  </div>
                  <span>Emergency coverage during nights, weekends, and holidays</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#d9c4aa]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#d9c4aa] font-bold text-sm">40%</span>
                  </div>
                  <span>Increase in hygiene recall appointments</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* DFW Dental Case Study */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-br from-[#d9c4aa]/10 to-[#b89463]/10 rounded-2xl border border-[#d9c4aa]/20 p-8">
            <div className="text-center mb-8">
              <h2 className="font-display text-[#d9c4aa] uppercase tracking-[0.18em] text-2xl md:text-3xl mb-4">
                Fort Worth Dental Practice <span className="text-white">Case Study</span>
              </h2>
              <p className="text-slate-300">
                How Dr. Martinez's Dental increased hygiene appointments by 150% with AI voice agents
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-[#0f1112] p-6 rounded-xl border border-white/10">
                <div className="text-3xl font-num text-[#d9c4aa] mb-2">32%</div>
                <div className="text-slate-300/90">Contact Rate (Before)</div>
              </div>
              <div className="bg-[#0f1112] p-6 rounded-xl border border-white/10">
                <div className="text-3xl font-num text-[#d9c4aa] mb-2">68%</div>
                <div className="text-slate-300/90">Contact Rate (After)</div>
              </div>
              <div className="bg-[#0f1112] p-6 rounded-xl border border-white/10">
                <div className="text-3xl font-num text-[#d9c4aa] mb-2">150%</div>
                <div className="text-slate-300/90">Hygiene Appointment Increase</div>
              </div>
            </div>

            <div className="mt-8 text-slate-300/90 space-y-4">
              <p className="ui-track">
                Dr. Martinez's dental practice in Fort Worth was losing patients who called after business hours or during busy periods. Hygiene recall appointments were particularly affected, with low response rates to mailed postcards.
              </p>
              <p className="ui-track">
                After implementing our AI voice agent, they saw immediate improvement in patient lead capture and recall scheduling. The AI handles appointment requests, verifies insurance, discusses payment options, and schedules directly to the dentist's calendar.
              </p>
              <p className="ui-track">
                "Our hygiene recall appointments increased by 150% in the first month. The AI perfectly handles our recall campaigns and emergency situations, even during weekend orthodontic emergencies," said Dr. Martinez.
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
              Transform Your <span className="text-white">DFW Dental Practice</span>
            </h2>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
              Join the dozens of Dallas-Fort Worth dental practices using our AI voice agents to capture more appointment requests and reduce missed opportunities. Start your 5-day free trial today.
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
            <p className="text-slate-300/80 ui-track">AI voice agents for DFW dental practices.</p>
            <div className="text-[#d9c4aa] font-display uppercase tracking-[var(--ls-sub)]">Dallas-Fort Worth • Serving All DFW Dental Practices</div>
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