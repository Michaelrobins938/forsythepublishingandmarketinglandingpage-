import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Voice Agent Services for DFW Businesses | Forsythe Publishing',
  description: 'Boost lead conversion with AI voice agents in Dallas-Fort Worth. 70% contact rate, 2-5 min response times. Perfect for roofing, HVAC, plumbing & more.',
  keywords: 'AI voice agent DFW, Dallas Fort Worth lead conversion, roofing AI callback, HVAC lead automation, DFW marketing automation, AI receptionist Texas',
  openGraph: {
    title: 'AI Voice Agent Services for DFW Businesses',
    description: 'Boost lead conversion with AI voice agents in Dallas-Fort Worth. 70% contact rate, 2-5 min response times.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Forsythe Publishing & Marketing',
    url: 'https://forsythepublishing.com/dfw',
  },
};

export default function DFWPage() {
  return (
    <div className="min-h-screen bg-[#0b0c0d] text-slate-100">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#111315] to-[#0f1112]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#d9c4aa]/30 bg-[#d9c4aa]/10 text-[#d9c4aa] font-sans uppercase text-[10px] tracking-[0.12em] mb-6">
              <div className="w-2 h-2 bg-[#d9c4aa] rounded-full animate-pulse"></div>
              <span>DFW METROPLEX</span>
            </div>
            <h1 className="font-display text-[#d9c4aa] uppercase tracking-[0.15em] text-3xl md:text-5xl mb-6">
              AI Voice Agents for <span className="text-white">Dallas-Fort Worth</span> Businesses
            </h1>
            <p className="text-slate-300/90 text-lg mb-8">
              Increase your lead conversion rate with our AI voice agents designed specifically for DFW service businesses. From roofing to HVAC, plumbing to solar, we help you capture more leads and book more appointments.
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
                Call (817) 210-8487
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* DFW Service Areas */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-[#d9c4aa] uppercase tracking-[0.18em] text-2xl md:text-3xl mb-4">
              Serving the <span className="text-white">DFW Metroplex</span>
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              We specialize in helping service businesses across the Dallas-Fort Worth area increase their lead conversion rates with AI voice agents.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#111315] rounded-2xl p-8 border border-white/10">
              <h3 className="font-display text-white uppercase tracking-[0.22em] text-xl mb-4">Dallas & Plano</h3>
              <p className="text-slate-300/90 mb-4">
                Serving the Dallas and Plano markets with AI voice agents that capture leads and book appointments in the fast-growing northern DFW area.
              </p>
              <ul className="space-y-2 text-slate-300/80">
                <li className="flex items-start gap-2">
                  <span className="text-[#d9c4aa]">•</span>
                  <span>Roofing & Restoration</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#d9c4aa]">•</span>
                  <span>HVAC & Electrical</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#d9c4aa]">•</span>
                  <span>Landscaping & Pool Services</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#111315] rounded-2xl p-8 border border-white/10">
              <h3 className="font-display text-white uppercase tracking-[0.22em] text-xl mb-4">Fort Worth & Arlington</h3>
              <p className="text-slate-300/90 mb-4">
                Helping Fort Worth and Arlington businesses convert more leads with our smart AI voice agents that respond in under 5 minutes.
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

            <div className="bg-[#111315] rounded-2xl p-8 border border-white/10">
              <h3 className="font-display text-white uppercase tracking-[0.22em] text-xl mb-4">Surrounding Areas</h3>
              <p className="text-slate-300/90 mb-4">
                Supporting businesses throughout the DFW metroplex with 24/7 AI voice agent coverage across all service areas.
              </p>
              <ul className="space-y-2 text-slate-300/80">
                <li className="flex items-start gap-2">
                  <span className="text-[#d9c4aa]">•</span>
                  <span>Carrollton & Farmers Branch</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#d9c4aa]">•</span>
                  <span>Irving & Grand Prairie</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#d9c4aa]">•</span>
                  <span>Flower Mound & Southlake</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How AI Voice Agents Help DFW Businesses */}
      <section className="py-16 md:py-24 bg-[#111315]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-[#d9c4aa] uppercase tracking-[0.18em] text-2xl md:text-3xl mb-4">
              Why DFW <span className="text-white">Service Businesses</span> Choose AI Voice Agents
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              The Dallas-Fort Worth area is one of the fastest-growing markets in the US. Competition for service business leads is fierce.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-display text-[#d9c4aa] uppercase tracking-[0.22em] text-xl mb-6">The DFW Market Challenge</h3>
              <p className="text-slate-300/90 mb-6">
                With over 7.5 million people in the DFW metroplex, service businesses receive countless leads daily. However, manual follow-up 
                results in only 35% contact rates. By the time your team calls back, competitors have already booked the appointment.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#d9c4aa]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-[#d9c4aa] rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">High Competition</h4>
                    <p className="text-slate-300/80 text-sm">20+ competitors vying for the same leads</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#d9c4aa]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-[#d9c4aa] rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">After-Hours Demand</h4>
                    <p className="text-slate-300/80 text-sm">Storm damage calls at 11pm require immediate response</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#d9c4aa]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-[#d9c4aa] rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Geographic Spread</h4>
                    <p className="text-slate-300/80 text-sm">DFW metroplex covers 9,286 square miles</p>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-display text-[#d9c4aa] uppercase tracking-[0.22em] text-xl mb-6">Our AI Solution for DFW</h3>
              <p className="text-slate-300/90 mb-6">
                Our AI voice agents deliver 70% contact rates in under 5 minutes, 24/7 coverage, and custom qualification flows tailored to your service area.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#d9c4aa] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Instant Response</h4>
                    <p className="text-slate-300/80 text-sm">AI calls back within 2-5 minutes, beating competitors</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#d9c4aa] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">24/7 Coverage</h4>
                    <p className="text-slate-300/80 text-sm">Handles storm damage calls even at midnight</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#d9c4aa] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Geographic Intelligence</h4>
                    <p className="text-slate-300/80 text-sm">Routes jobs efficiently based on technician location</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Industry-Specific Solutions for DFW */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-[#d9c4aa] uppercase tracking-[0.18em] text-2xl md:text-3xl mb-4">
              Industry-Specific AI Solutions for <span className="text-white">DFW</span>
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Our AI voice agents are customized for each industry common to the Dallas-Fort Worth market.
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
                Handles storm damage claims, insurance questions, and schedules inspections. 24/7 coverage for emergency calls.
              </p>
              <ul className="text-slate-300/80 text-sm space-y-1">
                <li>• Hail damage assessment</li>
                <li>• Insurance claim coordination</li>
                <li>• Emergency tarping services</li>
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
                Schedules emergency repairs, handles seasonal maintenance, and qualifies leads for high-value installations.
              </p>
              <ul className="text-slate-300/80 text-sm space-y-1">
                <li>• Emergency repair triage</li>
                <li>• Seasonal maintenance scheduling</li>
                <li>• Installation consultations</li>
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
                Triage emergency situations, schedule service calls, and provide immediate quotes for common issues.
              </p>
              <ul className="text-slate-300/80 text-sm space-y-1">
                <li>• Emergency situation triage</li>
                <li>• Service call scheduling</li>
                <li>• Immediate quote provision</li>
              </ul>
            </div>

            <div className="bg-[#0f1112] rounded-2xl p-6 border border-white/10 hover:border-[#d9c4aa]/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#d9c4aa] to-[#b89463] flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-black">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 9H14V4H5V21H19V9Z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="font-display text-white uppercase tracking-[0.22em] mb-3">Solar & Energy</h3>
              <p className="text-slate-300/90 mb-4">
                Schedules energy assessments, explains financing options, and qualifies homes for solar installation.
              </p>
              <ul className="text-slate-300/80 text-sm space-y-1">
                <li>• Energy assessment scheduling</li>
                <li>• Financing option explanation</li>
                <li>• Home qualification process</li>
              </ul>
            </div>

            <div className="bg-[#0f1112] rounded-2xl p-6 border border-white/10 hover:border-[#d9c4aa]/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#d9c4aa] to-[#b89463] flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-black">
                  <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.11 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM17 12H15V7H13V12H11L14 16L17 12Z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="font-display text-white uppercase tracking-[0.22em] mb-3">Pest Control</h3>
              <p className="text-slate-300/90 mb-4">
                Handles emergency requests, schedules inspections, and explains treatment options for common DFW pests.
              </p>
              <ul className="text-slate-300/80 text-sm space-y-1">
                <li>• Emergency pest treatment</li>
                <li>• Inspection scheduling</li>
                <li>• Treatment option explanation</li>
              </ul>
            </div>

            <div className="bg-[#0f1112] rounded-2xl p-6 border border-white/10 hover:border-[#d9c4aa]/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#d9c4aa] to-[#b89463] flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-black">
                  <path d="M17 10.5V7C17 6.45 16.55 6 16 6H4C3.45 6 3 6.45 3 7V17C3 17.55 3.45 18 4 18H16C16.55 18 17 17.55 17 17V13.5L21 17.5V6.5L17 10.5Z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="font-display text-white uppercase tracking-[0.22em] mb-3">Pool & Landscaping</h3>
              <p className="text-slate-300/90 mb-4">
                Schedules maintenance visits, handles emergency service calls, and manages seasonal prep services.
              </p>
              <ul className="text-slate-300/80 text-sm space-y-1">
                <li>• Maintenance scheduling</li>
                <li>• Emergency service calls</li>
                <li>• Seasonal preparation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* DFW Success Stories */}
      <section className="py-16 md:py-24 bg-[#111315]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-[#d9c4aa] uppercase tracking-[0.18em] text-2xl md:text-3xl mb-4">
              DFW Businesses <span className="text-white">Seeing Results</span>
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Real businesses in the Dallas-Fort Worth area increasing their lead conversion with our AI voice agents.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#0f1112] rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d9c4aa] to-[#b89463] flex items-center justify-center">
                  <span className="text-black font-bold text-sm">MR</span>
                </div>
                <div>
                  <div className="font-sans font-semibold text-white text-sm">Mike Rodriguez</div>
                  <div className="text-[#d9c4aa] text-xs">Roofing Solutions DFW</div>
                </div>
              </div>
              <p className="text-slate-300/90 mb-4">
                "We went from 35% to 70% contact rate in the first month. The AI agent never sleeps and catches leads we used to miss. We're booking 3x more appointments."
              </p>
              <div className="flex items-center gap-3 text-sm">
                <div className="text-[#d9c4aa] font-num font-bold">70%</div>
                <div className="text-slate-400">Contact Rate</div>
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
                "The inbound AI handles our emergency calls perfectly. It triages urgent issues and routes them to the right technician. Our response time improved by 80%."
              </p>
              <div className="flex items-center gap-3 text-sm">
                <div className="text-[#d9c4aa] font-num font-bold">80%</div>
                <div className="text-slate-400">Faster Response</div>
              </div>
            </div>

            <div className="bg-[#0f1112] rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d9c4aa] to-[#b89463] flex items-center justify-center">
                  <span className="text-black font-bold text-sm">TJ</span>
                </div>
                <div>
                  <div className="font-sans font-semibold text-white text-sm">Tom Johnson</div>
                  <div className="text-[#d9c4aa] text-xs">DFW Plumbing Pros</div>
                </div>
              </div>
              <p className="text-slate-300/90 mb-4">
                "Since implementing the AI system, we've reduced our missed calls by 90% and increased our booking rate by 60%. The system pays for itself in the first week."
              </p>
              <div className="flex items-center gap-3 text-sm">
                <div className="text-[#d9c4aa] font-num font-bold">60%</div>
                <div className="text-slate-400">More Bookings</div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[rgba(217,196,170,.3)] bg-[rgba(217,196,170,.05)] backdrop-blur-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-[#d9c4aa] font-display uppercase tracking-[var(--ls-sub)] text-sm">Serving DFW Since 2024</span>
              <span className="text-slate-300/60 text-sm">• 50+ Local Businesses Served</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="bg-gradient-to-br from-[#d9c4aa]/10 to-[#b89463]/10 rounded-2xl p-8 border border-[#d9c4aa]/20">
            <h2 className="font-display text-[#d9c4aa] uppercase tracking-[0.18em] text-2xl md:text-3xl mb-4">
              Ready to Transform Your <span className="text-white">DFW Business</span>?
            </h2>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
              Join the dozens of DFW service businesses using our AI voice agents to capture more leads and book more appointments. Start your 5-day free trial today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+18172108487" 
                className="rounded-xl bg-gradient-to-br from-[#d9c4aa] to-[#b89463] text-black font-sans font-extrabold px-8 py-4 text-center shadow-[0_10px_26px_rgba(216,184,138,.25)] hover:shadow-[0_14px_32px_rgba(216,184,138,.35)] transition-all"
              >
                Call (817) 210-8487
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
            <p className="text-slate-300/80 ui-track">AI voice agents for Dallas-Fort Worth service businesses.</p>
            <div className="text-[#d9c4aa] font-display uppercase tracking-[var(--ls-sub)]">Fort Worth, Texas · Serving DFW</div>
          </div>
          <div>
            <div className="font-display uppercase tracking-[var(--ls-sub)]">Contact</div>
            <ul className="mt-2 space-y-1 text-slate-300/80 ui-track">
              <li><a href="tel:+18172108487" className="hover:text-white">Call / Text: (817) 210‑8487</a></li>
              <li><a href="mailto:forsythpublishing@gmail.com" className="hover:text-white">forsythpublishing@gmail.com</a></li>
              <li>Fort Worth, TX 76107</li>
            </ul>
          </div>
          <div>
            <div className="font-display uppercase tracking-[0.22em]">Navigation</div>
            <ul className="mt-2 space-y-1 text-slate-300/80 ui-track">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/#instant" className="hover:text-white">Get Started</a></li>
              <li><a href="/#engagement" className="hover:text-white">Pricing</a></li>
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