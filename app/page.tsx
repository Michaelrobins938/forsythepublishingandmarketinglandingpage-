"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionTemplate, useScroll, useSpring, useTransform } from "framer-motion";
import Script from "next/script";

/*
  Forsythe Editorial Luxe — React v6
  PURPOSE: Conversion Landing Page engineered for instant AI access

  ▸ Fix: Guarded dynamic import for Lenis to prevent "esm_default is null" at runtime
  ▸ Fix: Removed stray escape characters in JSX attributes
  ▸ Enhancement: Added lightweight runtime self‑tests (no build tools needed)

  Install once:
  npm i @studio-freight/lenis framer-motion

  Server ENV expected (Next.js):
  - GHL_WEBHOOK_URL           → GHL/LeadConnector inbound webhook (or funnel form URL)
  - VOICE_AGENT_TRIGGER_URL   → your AI voice agent trigger endpoint
  - CAL_PUBLIC_URL            → cal.com link (e.g., https://cal.com/your-org/discovery)
*/

/* SERVER: app/api/lead/route.ts (drop into Next.js server)
-----------------------------------------------------------
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const ts = new Date().toISOString();

    // 1) Send to Go HighLevel (GHL) webhook or LeadConnector API
    const ghl = await fetch(process.env.GHL_WEBHOOK_URL!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, received_at: ts }),
    });
    if (!ghl.ok) throw new Error(`GHL error ${ghl.status}`);

    // 2) Trigger AI Voice Agent
    await fetch(process.env.VOICE_AGENT_TRIGGER_URL!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: payload.name,
        phone: payload.phone,
        email: payload.email,
        company: payload.company,
        industry: payload.industry,
        preferred_time: payload.preferred_time,
        meta: { source: payload.source, utm: payload.utm, tags: payload.tags, session_id: payload.session_id },
      }),
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e: any) {
    return new Response(e?.message || "lead error", { status: 500 });
  }
}
*/

// --------------------
// GLOBAL TYPE UTILITIES
// --------------------
const GlobalType = () => (
  <style suppressHydrationWarning>{`
    :root{
      --ls-luxe: .26em; --ls-sub: .12em; --ls-ui: .06em;
    }
    .font-display{ font-family: var(--font-display); letter-spacing: 0.18em; font-weight: 600; line-height: 1.05; }
    .font-sans{ font-family: var(--font-sans); }
    .font-num{ font-family: var(--font-num); font-variant-numeric: lining-nums tabular-nums; font-feature-settings: "tnum" 1, "lnum" 1; }
    .smallcaps{ font-variant-caps: small-caps; letter-spacing: 0.22em; }
    .eyebrow{ letter-spacing: 0.12em; }
    .ui-track{ letter-spacing: 0.06em; }
    .luxeline{ position: relative; }
    .luxeline:after{ content:""; position:absolute; left:0; bottom:-10px; width:72px; height:1px; background:linear-gradient(90deg,#CDAF7A,transparent); opacity:.9 }
    *:focus-visible{ outline: 2px solid rgba(217,196,170,.5); outline-offset: 3px; }
    
    /* Fluid typography on mobile */
    @media (max-width: 480px){
      .font-display{ letter-spacing: clamp(.12em, .9vw, .26em); }
    }
    
    /* Grain layer for materiality */
    .body-grain:after{
      content:""; position:fixed; inset:-20%; pointer-events:none; z-index:9999;
      background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='.035'/></svg>") repeat;
      mix-blend-mode: soft-light; animation: grain 8s steps(10) infinite;
    }
    @keyframes grain { to { transform: translate(-5%, 5%); } }
    
    /* Hairline dividers */
    .hairline{ background: linear-gradient(90deg,#CDAF7A,transparent); height:1px; opacity:.8; }

    /* DFW Automation section */
    .dfw-light{ background-color:#f7f8fa; color:#343a40; }
    .material-card{ background-color:#ffffff; border-radius:1rem; box-shadow:0 10px 25px -5px rgba(0,0,0,0.07),0 5px 10px -5px rgba(0,0,0,0.04); border:1px solid #e9ecef; padding:2.5rem; }
    .flow-box{ background-color:#ffffff; border:2px solid #e9ecef; border-radius:0.75rem; padding:1.5rem; text-align:center; font-weight:700; transition:border-color 0.3s ease, box-shadow 0.3s ease; position:relative; overflow:hidden; }
    .flow-box:hover{ border-color:#007bff; box-shadow:0 0 15px rgba(0,123,255,0.1); }
    .flow-number{ font-size:2.5rem; font-weight:900; color:#007bff; }
    .flow-arrow{ font-size:2.8rem; color:#ced4da; line-height:1; }
    .stat-card{ background-color:#ffffff; border-radius:0.75rem; border:1px solid #e9ecef; box-shadow:0 4px 12px rgba(0,0,0,0.04); padding:1.5rem; text-align:center; transition:transform 0.3s ease, box-shadow 0.3s ease; }
    .stat-card:hover{ transform:translateY(-8px); box-shadow:0 10px 20px rgba(0,0,0,0.08); }
    .stat-number{ font-size:2.75rem; font-weight:900; line-height:1.2; color:#007bff; }
    .stat-label{ font-size:1.05rem; font-weight:600; color:#495057; margin-top:0.25rem; }
    .section-highlight{ background-color:#f8f9fa; border-left:4px solid #007bff; padding:2.5rem; border-radius:0.75rem; margin-bottom:3rem; box-shadow:0 5px 15px rgba(0,0,0,0.03); }
    .loader{ border:4px solid #f3f3f3; border-top:4px solid #007bff; border-radius:50%; width:40px; height:40px; animation:spin 1s linear infinite; margin:20px auto; display:block; }
    .gemini-result-box{ margin-top:2rem; padding:1.5rem; background-color:#f8f9fa; border-radius:0.5rem; border:1px solid #e9ecef; box-shadow:inset 0 2px 4px rgba(0,0,0,0.02); display:none; }
    .gemini-result-box.show{ display:block; }
    .chart-container{ position:relative; width:100%; max-width:450px; margin-left:auto; margin-right:auto; height:320px; max-height:320px; }
    .dfw-light input[type="number"],
    .dfw-light textarea{
      border:2px solid #ced4da; border-radius:0.5rem; padding:0.75rem 1rem; width:100%; font-size:1rem; font-weight:500; transition:border-color 0.3s ease, box-shadow 0.3s ease;
    }
    .dfw-light input[type="number"]:focus,
    .dfw-light textarea:focus{
      border-color:#007bff; outline:0; box-shadow:0 0 0 4px rgba(0,123,255,0.1);
    }
    @media (max-width:768px){
      .chart-container{ height:280px; max-height:280px; }
    }

    @keyframes spin { to { transform:rotate(360deg); } }
  `}</style>
);

// --------------------
// BUSINESS-RELEVANT IMAGERY (Contractor/Services)
// --------------------
const luxuryImages = {
  hero: [
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200", // handset / premium desk
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200", // calendar/planner
    "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200", // handshake / contract
    "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?q=80&w=1600", // night skyline (after-hours)
    "https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=1400", // architectural texture (brand vibe)
  ],
  columns: [
    "https://images.unsplash.com/photo-1590479773265-7464e5d48118?q=80&w=1600&auto=format&fit=crop", // Roofing contractor
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1600&auto=format&fit=crop", // HVAC equipment
    "https://images.unsplash.com/photo-1621905251918-48416bd8575a?q=80&w=1600&auto=format&fit=crop", // Phone/contact
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1600&auto=format&fit=crop", // Business analytics
  ],
};

// --------------------
// YOUR VIDEO ADS - From public/ads folder
// --------------------
const videoAds: { src: string; label: string; poster?: string; category: string }[] = [
  { src: "/ads/roofing.mp4", label: "Roofing", category: "Home Services" },
  { src: "/ads/hvac.mp4", label: "HVAC", category: "Home Services" },
  { src: "/ads/plumbing.mp4", label: "Plumbing", category: "Home Services" },
  { src: "/ads/solar-10s.mp4", label: "Solar", category: "Home Services" },
  { src: "/ads/landscaping.mp4", label: "Landscaping", category: "Home Services" },
  { src: "/ads/coffeeshop.mp4", label: "Coffee Shop", category: "Retail" },
  { src: "/ads/gym.mp4", label: "Gym & Fitness", category: "Health & Wellness" },
  { src: "/ads/hairstylist.mp4", label: "Hair Stylist", category: "Beauty & Personal Care" },
  { src: "/ads/baber2.mp4", label: "Barbershop", category: "Beauty & Personal Care" },
];

// Helper to derive poster path from video src
const posterFrom = (src: string) => src.replace(/\.mp4$/i, ".jpg");

// ---------------
// LENIS PROVIDER (guarded)
// ---------------
function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Respect reduced motion
    const reduce = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    let lenis: any = null;
    let rafId: number | null = null;

    const init = async () => {
      try {
        const mod: any = await import("@studio-freight/lenis");
        const LenisCtor = mod?.default ?? mod?.Lenis ?? null;
        if (typeof LenisCtor !== "function") {
          console.warn("[Lenis] module unavailable; smooth scroll disabled.");
          return;
        }
        lenis = new LenisCtor({
          duration: 1.2,
          smoothWheel: true,
          smoothTouch: false,
          easing: (t: number) => 1 - Math.pow(1 - t, 3),
        });
        (window as any).lenis = lenis;
        const raf = (time: number) => { lenis?.raf?.(time); rafId = requestAnimationFrame(raf); };
        rafId = requestAnimationFrame(raf);
      } catch (err) {
        console.warn("[Lenis] dynamic import failed; smooth scroll disabled.", err);
      }
    };

    init();

    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!target) return;
      const href = target.getAttribute('href');
      if (!href) return;
      const el = document.querySelector(href) as HTMLElement | null;
      if (el) {
        e.preventDefault();
        const api = (window as any).lenis;
        if (api?.scrollTo) api.scrollTo(el, { offset: -12 }); else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      if (rafId) cancelAnimationFrame(rafId);
      try { lenis?.destroy?.(); } catch {}
    };
  }, []);

  return <>{children}</>;
}

// --------------------
// UTMs + Session capture
// --------------------
function useUTM() {
  const [utm, setUtm] = useState<Record<string, string>>({});
  useEffect(() => {
    const url = new URL(window.location.href);
    const get = (k: string) => url.searchParams.get(k) || "";
    const data: Record<string, string> = {
      source: get("utm_source"), medium: get("utm_medium"), campaign: get("utm_campaign"), term: get("utm_term"), content: get("utm_content"),
      gclid: get("gclid"), fbclid: get("fbclid"), ref: document.referrer || "",
    };
    setUtm(data);
  }, []);
  return utm;
}

function useSessionId() {
  const [sid] = useState(() => `sess_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`);
  return sid;
}

function useParallax(ref: React.RefObject<HTMLElement>, distance = 80) {
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const spring = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.25 });
  const y = useTransform(spring, [0, 1], [distance, -distance]);
  return y;
}

// Magnetic CTA interaction
function useMagnetic() {
  const r = useRef<HTMLButtonElement>(null);
  function onMove(e: React.MouseEvent) {
    const el = r.current; if(!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - (left + width/2)) / (width/2);
    const y = (e.clientY - (top + height/2)) / (height/2);
    el.style.transform = `translate(${x*4}px, ${y*3}px)`;
  }
  function onLeave(){ if(r.current) r.current.style.transform = ""; }
  return { ref: r, onMouseMove: onMove, onMouseLeave: onLeave };
}

// Analytics helper
const fireAnalytics = (event: string, data: any = {}) => {
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push({ event, ...data });
};

const Circle: React.FC<{ src: string; className: string; y?: any; scale?: any; alt?: string }> = ({ src, className, y, scale, alt }) => {
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);
  
  return (
    <motion.figure 
      style={!reducedMotion && y ? { y, scale: scale || 1 } : {}} 
      className={`absolute rounded-full overflow-hidden shadow-[0_18px_50px_rgba(0,0,0,.45),0_0_40px_rgba(217,196,170,.11)] ring-1 ring-[rgba(217,196,170,.4)] ${className}`}
    >
      <img src={src} alt={alt || "AI call conversion service"} className="w-full h-full object-cover" loading="eager" />
    </motion.figure>
  );
};

// ———————————————————————————————————————————
// Editorial hero bubbles
// ———————————————————————————————————————————
function HeroBubbles() {
  const bubbles = [
    { src: luxuryImages.hero[0], alt: "Premium business phone consultation" },
    { src: luxuryImages.hero[1], alt: "Calendar and appointment booking" },
    { src: luxuryImages.hero[2], alt: "Professional contract and handshake" },
    { src: luxuryImages.hero[3], alt: "24/7 after-hours coverage" },
  ];
  return (
    <div
      className="pointer-events-none select-none absolute right-6 top-8 flex items-center gap-6 md:right-12"
      aria-label="Brand motifs"
    >
      {bubbles.map((b, i) => (
        <div
          key={i}
          className="relative rounded-full border border-[#d9c4aa]/35 shadow-[0_0_40px_rgba(217,196,170,.12)]"
          style={{ width: [132,108,88,72][i], height: [132,108,88,72][i] }}
        >
          <img
            src={b.src}
            alt={b.alt}
            loading="lazy"
            width={200}
            height={200}
            className="h-full w-full rounded-full object-cover [filter:grayscale(35%)]"
          />
          <span aria-hidden className="absolute inset-0 rounded-full ring-1 ring-[#d9c4aa]/25" />
        </div>
      ))}
    </div>
  );
}

// ———————————————————————————————————————————
// Four-panel hover-reveal showcase
// ———————————————————————————————————————————
type Strip = { title: string; kicker?: string; img: string; copy: string; href: string };

function ShowcaseStrips() {
  const strips: Strip[] = [
    {
      title: "Outbound",
      kicker: "AI VOICE AGENTS",
      img: luxuryImages.columns[0],
      copy: "Never lose a lead to slow response. AI calls in 2-5 minutes and books appointments automatically. Outperform competitors while you sleep.",
      href: "#instant",
    },
    {
      title: "Inbound",
      kicker: "AI VOICE AGENTS",
      img: luxuryImages.columns[1],
      copy: "Never miss an after-hours call again. Smart AI answers 24/7, qualifies leads, handles emergencies, and routes to humans only when needed.",
      href: "#functionality",
    },
    {
      title: "Custom",
      kicker: "10-SECOND ADS",
      img: luxuryImages.columns[2],
      copy: "Stop the scroll in 3 seconds. Professional cinematic ads that look like Hollywood trailers. Proven to 3x click-through rates.",
      href: "#ads",
    },
    {
      title: "Marketing",
      kicker: "AUTOMATION",
      img: luxuryImages.columns[3],
      copy: "Your website becomes a salesperson. Smart pages that capture leads, trigger instant callbacks, and convert visitors automatically.",
      href: "#markets",
    },
  ];

  return (
    <section aria-label="Forsythe capabilities" className="max-w-[1400px] mx-auto px-6 md:px-10 py-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {strips.map((s, i) => (
          <motion.a
            key={i}
            href={s.href}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
            aria-label={`Open: ${s.title}`}
            className="group relative overflow-hidden rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d9c4aa]"
          >
            <img
              src={s.img}
              alt={`${s.title} - ${s.copy}`}
              loading="lazy"
              width={1600}
              height={900}
              className="h-[46vh] w-full object-cover grayscale-[.6] brightness-[.72] transition will-change-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-105 group-hover:grayscale-[.2] group-hover:brightness-100"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_120%,transparent_0%,rgba(0,0,0,.45)_60%)]"
            />
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-[#d9c4aa] to-transparent opacity-40 transition group-hover:opacity-90"
            />
            <div className="absolute bottom-6 left-6 right-6 translate-y-1 opacity-90 transition group-hover:translate-y-0 group-hover:opacity-100">
              {s.kicker && (
                <span className="block text-[.72rem] tracking-[.18em] uppercase text-[#d9c4aa]/90 font-sans">
                  {s.kicker}
                </span>
              )}
              <h3 className="mt-1 text-[1.25rem] tracking-[.14em] uppercase font-display font-semibold text-[#f1e7d6]">
                {s.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[#cfc7b8] max-w-[42ch] ui-track">{s.copy}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

const SectionHead: React.FC<{ eyebrow?: string; title: string; sub?: string }> = ({ eyebrow, title, sub }) => (
  <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }} className="text-center max-w-2xl mx-auto mb-12">
    {eyebrow && (
      <span className="eyebrow inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#d9c4aa]/40 bg-[#d9c4aa]/10 text-[#d9c4aa] font-sans uppercase text-[11px] tracking-[0.12em]">{eyebrow}</span>
    )}
    <h2 className="mt-6 font-display text-[#d9c4aa] uppercase tracking-[0.18em] text-3xl md:text-4xl luxeline">{title}</h2>
    {sub && <p className="mt-4 font-sans text-slate-300/90 ui-track leading-7">{sub}</p>}
  </motion.div>
);

const FeatureCard: React.FC<{ title: string; body: string }> = ({ title, body }) => (
  <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }} className="rounded-2xl border border-[rgba(217,196,170,.18)] bg-[#111315] p-8 shadow-[0_8px_24px_rgba(0,0,0,.25),inset_0_1px_0_rgba(217,196,170,.06)]">
    <h3 className="font-display text-white uppercase tracking-[0.22em] text-lg">{title}</h3>
    <p className="mt-3 font-sans text-slate-300/90 leading-7 ui-track">{body}</p>
  </motion.div>
);

const GoldMesh: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const skew = useTransform(scrollYProgress, [0, 1], [8, -8]);
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const alpha = useTransform(scrollYProgress, [0, 1], [0.35, 0.15]);
  const bg = useMotionTemplate`linear-gradient(135deg, rgba(205,175,122,${alpha}) 0%, rgba(205,175,122,0) 60%)`;
  return <motion.div ref={ref} style={{ skewY: skew, y, backgroundImage: bg }} className="pointer-events-none -mx-8 my-10 h-16 rounded-xl [mask-image:radial-gradient(120%_120%_at_50%_50%,black,transparent)]" />;
};

type AutomationModule = {
  label: string;
  title: string;
  description: string;
  platform?: string;
  features: string[];
};

const automationModules: AutomationModule[] = [
  {
    label: "Module 1",
    title: "Foundational Project Management",
    description:
      "The central hub for your entire operation. Every other module feeds information in and pulls actionable data out.",
    platform: "Platform: Custom-configured ClickUp (or equivalent) workspace.",
    features: [
      "Single source of truth that tracks every job, client, and staff member.",
      "Visual pipeline covering stages from new lead → job done → payment received.",
      "Staff & subcontractor assignments with notifications and performance insights.",
      "Standardized intake forms to keep operational data consistent and complete.",
    ],
  },
  {
    label: "Module 2",
    title: "Lead & Sales Automation",
    description: "Turn new inquiries into booked jobs within minutes with a structured sales lane.",
    features: [
      "Lead gen integrations that funnel PPC, SEO, and aggregator leads into one pipeline.",
      "On-call quoting forms capturing all job-critical details during the first conversation.",
      "Instant proposals generated automatically via PandaDoc, Stripe, or comparable tools.",
      "On-call close workflows sending proposals by SMS/email for immediate signature.",
    ],
  },
  {
    label: "Module 3",
    title: "Customer Booking & Scheduling",
    description: "Eliminate scheduling ping-pong and slash costly no-shows.",
    features: [
      "Smart scheduling using real-time availability from Calendly, Cal.com, or equivalent.",
      "SMS booking links delivered while the customer is still on the line.",
      "Automated reminder cadence (week/day/hour) tuned to keep homeowners ready.",
    ],
  },
  {
    label: "Module 4",
    title: "Financial Automation (Billing & Payroll)",
    description: "Automate cash flow, get paid faster, and streamline payouts.",
    features: [
      "Customer invoices triggered automatically when jobs move to \"Job Done\".",
      "Automated collections sequences with status updates on payment.",
      "Staff & subcontractor payouts synced with Gusto, QuickBooks, or similar platforms.",
    ],
  },
  {
    label: "Module 5",
    title: "Customer Retention & Reputation",
    description: "Convert finished work into five-star reviews and repeat revenue.",
    features: [
      "Automated review requests triggered at payment confirmation.",
      "Hyper-personalized follow-ups referencing technician notes.",
      "Seasonal promotions delivered to past customers with zero incremental ad spend.",
      "Reputation monitoring using Google Alerts for your brand and key staff.",
    ],
  },
  {
    label: "Module 6",
    title: "Analytics & Reporting",
    description: "Get an executive dashboard for the entire business at a glance.",
    features: [
      "Live dashboards in ClickUp, Looker Studio, or the analytics stack you prefer.",
      "Key metrics surfaced automatically: revenue, cash collected, margin, conversion, cycle time.",
    ],
  },
];

const automationAddOn = {
  label: "Optional Add-On",
  title: "Inventory Management",
  platform: "Platform: Sortly, ServiceTitan, or equivalent integration.",
  features: [
    "Real-time stock levels tracked digitally—no more clipboards.",
    "Demand forecasts based on historical job data so high-need parts are pre-staged.",
    "Just-in-time reordering when thresholds are reached to prevent delays.",
  ],
};

const automationDeliverables = [
  "Discovery & architecture audit of your current processes and tech stack.",
  "System configuration and customization across all selected modules.",
  "Automation & integration so data flows seamlessly end-to-end.",
  "Training & documentation playbook for your internal team.",
  "Ongoing support with monthly optimization checkpoints.",
];

function LocalServiceAutomationPackage() {
  return (
    <section id="automation-package" className="py-24 bg-[#111315]">
      <div className="max-w-[1080px] mx-auto px-6">
        <SectionHead
          eyebrow="Operations Automation"
          title="Local Service Business Automation Package"
          sub="End-to-end automation for local service brands—centralize operations, multiply leverage, and eliminate administrative waste."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-[#d9c4aa]/30 bg-gradient-to-br from-[#d9c4aa]/10 via-transparent to-transparent p-8 md:p-10 mb-14"
        >
          <div className="font-display text-white uppercase tracking-[0.18em] text-lg">Overview</div>
          <p className="mt-4 text-slate-300/90 ui-track leading-7 max-w-3xl">
            Build a single source of truth for your business. The system automates the customer lifecycle from first call through final payment and follow-up—every module connects so information is captured once and leveraged everywhere.
          </p>
        </motion.div>

        <div className="grid gap-6 md:gap-8">
          {automationModules.map((module, index) => (
            <motion.div
              key={module.label}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="rounded-2xl border border-white/10 bg-[#0f1112] p-8 md:p-10 shadow-[0_18px_50px_rgba(0,0,0,.45)]"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-6">
                <div>
                  <div className="text-[#d9c4aa] font-display uppercase tracking-[0.18em] text-xs md:text-sm">{module.label}</div>
                  <h3 className="mt-2 text-2xl md:text-3xl font-display text-white tracking-[0.08em] uppercase">{module.title}</h3>
                  <p className="mt-3 text-slate-300/90 ui-track leading-7 max-w-2xl">{module.description}</p>
                  {module.platform && <p className="mt-3 text-slate-400 text-sm ui-track">{module.platform}</p>}
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#d9c4aa]/30 bg-[#d9c4aa]/10 px-3 py-1 text-[#d9c4aa] text-[11px] uppercase tracking-[0.12em] md:self-start">
                  Operational Pillar
                </span>
              </div>
              <div className="mt-6 grid gap-3">
                {module.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 text-slate-200">
                    <div className="mt-1 w-5 h-5 rounded-full bg-[#d9c4aa]/20 flex items-center justify-center">
                      <svg className="w-3 h-3 text-[#d9c4aa]" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ui-track leading-6 text-sm md:text-base text-slate-300/90">{feature}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-16 rounded-2xl border border-[#d9c4aa]/30 bg-[#d9c4aa]/10 p-8 md:p-10"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="text-[#d9c4aa] font-display uppercase tracking-[0.18em] text-xs md:text-sm">{automationAddOn.label}</div>
              <h3 className="mt-2 text-2xl md:text-3xl font-display text-white tracking-[0.08em] uppercase">{automationAddOn.title}</h3>
              <p className="mt-3 text-slate-200/90 ui-track leading-7 max-w-3xl">
                For teams managing physical parts, this add-on collapses wait times and keeps crews stocked.
              </p>
              <p className="mt-3 text-slate-300/80 text-sm ui-track">{automationAddOn.platform}</p>
            </div>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {automationAddOn.features.map((feature) => (
              <div key={feature} className="flex items-start gap-3 bg-black/30 rounded-xl border border-white/10 p-4">
                <div className="mt-1 w-5 h-5 rounded-full bg-[#d9c4aa]/20 flex items-center justify-center">
                  <svg className="w-3 h-3 text-[#d9c4aa]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="ui-track text-slate-200/90 text-sm leading-6">{feature}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-16 rounded-2xl border border-white/10 bg-[#0f1112] p-8 md:p-10 shadow-[0_18px_50px_rgba(0,0,0,.45)]"
        >
          <div className="text-[#d9c4aa] font-display uppercase tracking-[0.18em] text-xs md:text-sm">Deliverables</div>
          <h3 className="mt-2 text-2xl md:text-3xl font-display text-white tracking-[0.08em] uppercase">What We Deliver</h3>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {automationDeliverables.map((item) => (
              <div key={item} className="flex items-start gap-3 text-slate-200">
                <div className="mt-1 w-5 h-5 rounded-full bg-[#d9c4aa]/20 flex items-center justify-center">
                  <svg className="w-3 h-3 text-[#d9c4aa]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="ui-track leading-6 text-sm md:text-base text-slate-300/90">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const AnimatedStatBlock: React.FC<{ value: string; label: string; delay?: number }> = ({ value, label, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay }}
      whileHover={{ 
        scale: 1.05, 
        rotateY: 5,
        transition: { duration: 0.3 }
      }}
      className="relative rounded-2xl border border-white/10 bg-[#0f1112] p-6 text-center shadow-[0_18px_50px_rgba(0,0,0,.45)] hover:shadow-[0_25px_60px_rgba(217,196,170,.1)] transition-all duration-300 group overflow-hidden"
    >
      <motion.div 
        initial={{ scale: 0 }}
        animate={isVisible ? { scale: 1 } : {}}
        transition={{ duration: 0.8, delay: delay + 0.2, type: "spring", stiffness: 200 }}
        className="font-num text-4xl md:text-5xl text-[#d9c4aa] group-hover:text-white transition-colors duration-300"
      >
        {value}
      </motion.div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: delay + 0.4 }}
        className="mt-1 ui-track text-slate-300/80 group-hover:text-slate-200 transition-colors duration-300"
      >
        {label}
      </motion.div>
      
      {/* Animated background glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: delay + 0.6 }}
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#d9c4aa]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
    </motion.div>
  );
};

const AnimatedProgressBar: React.FC<{ label: string; value: number; suffix?: string; delay?: number }> = ({ label, value, suffix = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="space-y-2"
    >
      <div className="flex justify-between items-center">
        <span className="text-slate-300/80 ui-track text-sm">{label}</span>
        <motion.span 
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: delay + 0.3 }}
          className="font-num text-[#d9c4aa] font-semibold"
        >
          {value}{suffix}
        </motion.span>
      </div>
      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isVisible ? { width: `${value}%` } : {}}
          transition={{ duration: 1.2, delay: delay + 0.2, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-[#d9c4aa] to-[#b89463] rounded-full relative"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: delay + 0.8 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

// ------------------
// VIDEO REEL - Gallery-quality
// ------------------
const VideoCard: React.FC<{
  src: string; label: string; poster?: string; onOpen: () => void;
  className?: string;
}> = ({ src, label, poster, onOpen, className }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { margin: "-15%", once: true });
  const [mounted, setMounted] = useState(false);
  const [thumbnailGenerated, setThumbnailGenerated] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const vidRef = useRef<HTMLVideoElement>(null);

  useEffect(() => setMounted(inView), [inView]);
  
  // Auto-play muted on scroll into view (desktop only) - disabled for now to ensure videos show
  useEffect(() => {
    // Temporarily disabled autoplay to ensure videos display
    // if (typeof window === 'undefined') return;
    // const checkMobile = window.matchMedia('(max-width: 1024px)').matches;
    // if (inView && vidRef.current && !checkMobile) {
    //   vidRef.current.muted = true;
    //   vidRef.current.loop = true;
    //   vidRef.current.play().catch(() => {});
    //   setIsPlaying(true);
    // } else if (!inView && vidRef.current) {
    //   vidRef.current.pause();
    //   setIsPlaying(false);
    // }
  }, [inView]);

  return (
    <motion.div
      ref={wrapRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
      className={["group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0f1112] shadow-[0_18px_50px_rgba(0,0,0,.45)] cursor-pointer", className].filter(Boolean).join(" ")}
          onClick={() => { 
        if (vidRef.current) {
          vidRef.current.currentTime = 0;
          vidRef.current.muted = false; // Unmute for full playback
          vidRef.current.play().catch(() => {});
        }
        onOpen(); 
        fireAnalytics('video_open', { label }); 
      }}
    >
      <div className="relative aspect-[16/9]">
        {/* Video thumbnail (always visible as poster) */}
          <video
            ref={vidRef}
            className="absolute inset-0 w-full h-full object-cover cursor-pointer z-10"
            playsInline
            preload="metadata"
            crossOrigin="anonymous"
            muted={false}
            poster={poster || posterFrom(src)}
          onClick={(e) => { 
            e.stopPropagation();
            if (vidRef.current) {
              vidRef.current.currentTime = 0;
              vidRef.current.muted = false; // Unmute for full playback
              vidRef.current.play().catch(() => {});
            }
            onOpen(); 
            fireAnalytics('video_open', { label }); 
          }}
          onLoadedData={() => {
            // Set video to show first frame as thumbnail
            if (vidRef.current) {
              vidRef.current.currentTime = 0.5; // Show frame at 0.5 second
              vidRef.current.pause(); // Ensure it's paused
              setThumbnailGenerated(true);
            }
          }}
          onLoadedMetadata={() => {
            // Also set thumbnail when metadata loads
            if (vidRef.current && !thumbnailGenerated) {
              vidRef.current.currentTime = 0.5;
              vidRef.current.pause();
            }
          }}
          onMouseEnter={() => {
            if (vidRef.current && !isPlaying) {
              vidRef.current.currentTime = 0;
              vidRef.current.muted = true;
              vidRef.current.play().catch(() => {});
            }
          }}
            onMouseLeave={() => { 
            if (vidRef.current && !isPlaying) {
              vidRef.current.pause(); 
              vidRef.current.currentTime = 1; // Return to thumbnail frame
            }
          }}
          onTouchStart={() => {
            if (vidRef.current) {
              vidRef.current.currentTime = 0;
              vidRef.current.play();
            }
          }}
            onTouchEnd={() => { 
            if (vidRef.current) {
              vidRef.current.pause(); 
              vidRef.current.currentTime = 1; // Return to thumbnail frame
            }
            }}
            onError={() => {
            // Show placeholder if video fails to load
              if (vidRef.current) {
                vidRef.current.style.display = 'none';
              }
            }}
          >
            <source src={src} type="video/mp4" />
          </video>
        
        {/* Fallback placeholder - only show behind video during initial load */}
        <div className={`absolute inset-0 bg-gradient-to-br from-[#d9c4aa]/10 to-[#b89463]/10 flex items-center justify-center z-0 transition-opacity duration-300 ${thumbnailGenerated ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-[#d9c4aa]/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-[#d9c4aa]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
            <div className="text-[#d9c4aa] font-sans uppercase text-xs tracking-wider">{label}</div>
          </div>
        </div>

        {/* Hover ring + play glyph */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-[#CDAF7A]/40" />
        <div className="pointer-events-none absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.div 
            initial={{ scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            className="w-16 h-16 rounded-full bg-black/70 backdrop-blur ring-2 ring-[#d9c4aa]/50 grid place-items-center shadow-[0_8px_24px_rgba(0,0,0,.5)]"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#d9c4aa" className="ml-1">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </motion.div>
        </div>
        
        {/* Enhanced Click to play indicator */}
        <div className="pointer-events-none absolute bottom-16 sm:bottom-20 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-black/80 backdrop-blur-md rounded-xl px-4 py-2 border border-white/10 shadow-lg">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#d9c4aa]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
              </svg>
              <div className="text-white text-xs sm:text-sm font-sans ui-track font-medium">Click for sound</div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Bottom bar with industry badge */}
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 flex items-center justify-between bg-gradient-to-t from-black/90 via-black/70 to-transparent">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="font-display text-white uppercase tracking-[var(--ls-sub)] text-sm sm:text-base">{label}</div>
          {/* Industry badge */}
          <div className="px-2 py-1 rounded-lg bg-[#d9c4aa]/20 border border-[#d9c4aa]/30 backdrop-blur-sm">
            <span className="text-[#d9c4aa] text-[10px] sm:text-xs font-sans uppercase tracking-wider">10s</span>
          </div>
        </div>
        <button
          onClick={(e) => { 
            e.stopPropagation();
            if (vidRef.current) {
              vidRef.current.currentTime = 0;
              vidRef.current.play();
            }
            onOpen(); 
            fireAnalytics('video_open', { label }); 
          }}
          aria-label={`Open ${label} ad`}
          className="rounded-xl bg-gradient-to-br from-[#d9c4aa] to-[#b89463] text-black font-sans font-extrabold px-3 py-1.5 shadow-[0_10px_26px_rgba(216,184,138,.25)]"
        >
          Open
        </button>
      </div>
    </motion.div>
  );
};

const VideoModal: React.FC<{ src?: string; open: boolean; onClose: () => void }> = ({ src, open, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => { 
    document.body.style.overflow = open ? 'hidden' : ''; 
    return () => { document.body.style.overflow = ''; }; 
  }, [open]);

  useEffect(() => {
    if (open && videoRef.current && src) {
      // Auto-play the video when modal opens
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(console.error);
    }
  }, [open, src]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };
    
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [open, onClose]);

  if (!open || !src) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-6xl max-h-[90vh] bg-black rounded-2xl overflow-hidden shadow-[0_25px_50px_rgba(0,0,0,.5)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Video Container */}
        <div className="relative w-full aspect-video bg-black">
          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            controls
            playsInline
            preload="auto"
            crossOrigin="anonymous"
            onError={(e) => {
              console.error('Video failed to load:', e);
            }}
          >
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Close Button */}
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/70 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/90 transition-colors z-10"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>

        {/* Video Info */}
        <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="text-white text-sm font-sans">
            Click outside or press ESC to close
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

type ChatMessage = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  quickActions?: string[];
};

const AIChatModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      text: "Hey! I'm your AI automation assistant. Ask me about AI voice agents, video ads, smart websites, pricing, or ROI.",
      isUser: false,
      timestamp: new Date(),
      quickActions: ["See Demos", "Get Pricing", "Book Call", "Learn About ROI"],
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [open, onClose]);

  const handleSendMessage = (message?: string) => {
    const textToSend = (message ?? inputText).trim();
    if (!textToSend) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: textToSend,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = generateAIResponse(textToSend);
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: aiResponse.text,
        isUser: false,
        timestamp: new Date(),
        quickActions: aiResponse.quickActions,
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 900);
  };

  const handleQuickAction = (action: string) => {
    handleSendMessage(action);
  };

  const generateAIResponse = (userInput: string): { text: string; quickActions?: string[] } => {
    const input = userInput.toLowerCase();

    // AI Voice Agent Questions
    if (input.includes('what is ai voice agent') || input.includes('ai voice agent') || input.includes('voice agent')) {
      return {
        text: "AI voice agents are intelligent phone systems that can handle calls 24/7. They can qualify leads, book appointments, answer questions, and provide customer support using natural conversation. Unlike basic IVR systems, our AI agents sound human and can handle complex conversations, making them perfect for local service businesses.",
        quickActions: ["How do they work?", "What are the benefits?", "See pricing", "Book demo"]
      };
    }
    
    if (input.includes('how does ai voice agent work') || input.includes('how it works')) {
      return {
        text: "Our AI voice agents work by: 1) Answering calls instantly with a human-like voice, 2) Qualifying leads with intelligent questions, 3) Booking appointments directly into your calendar, 4) Transferring complex calls to your team, 5) Following up with missed calls automatically. They integrate with your existing systems and learn from your business patterns.",
        quickActions: ["What are the benefits?", "See live demos", "Get pricing", "Book consultation"]
      };
    }
    
    if (input.includes('benefits') || input.includes('advantage') || input.includes('why use')) {
      return {
        text: "AI voice agents provide: 24/7 availability, instant lead qualification, never miss a call, consistent customer service, reduced staff workload, increased booking rates, and detailed call analytics. Most businesses see 2-3x more qualified leads and 40-60% higher conversion rates.",
        quickActions: ["See ROI examples", "Watch demos", "Get pricing", "Book call"]
      };
    }
    
    if (input.includes('industries') || input.includes('business types') || input.includes('who can use')) {
      return {
        text: "We specialize in high-value service industries: Plumbing, HVAC, Roofing, Landscaping, Solar, Electrical, Pest Control, Pool Services, Auto Repair, Legal Services, Healthcare, and more. Any business where one booked call equals significant revenue benefits from our AI voice agents.",
        quickActions: ["See industry demos", "Get custom quote", "Book consultation", "Learn more"]
      };
    }
    
    // Custom Video Ads Questions
    if (input.includes('custom video') || input.includes('10 second ads') || input.includes('video ads') || input.includes('cinematic ads')) {
      return {
        text: "Our custom 10-second video ads are professionally produced, industry-specific marketing videos designed to capture attention quickly. They're perfect for social media, Google Ads, and website headers. Each ad is tailored to your business type and includes compelling visuals, clear messaging, and strong calls-to-action.",
        quickActions: ["See video examples", "How do they boost business?", "Get pricing", "Book consultation"]
      };
    }
    
    if (input.includes('boost business') || input.includes('video marketing') || input.includes('advertising')) {
      return {
        text: "Custom video ads boost your business by: Increasing brand recognition, improving click-through rates by 300%, generating more qualified leads, building trust with professional visuals, working across all platforms (Facebook, Instagram, Google, YouTube), and providing better ROI than static ads. Video content gets 1200% more shares than text and images combined.",
        quickActions: ["See video examples", "Get custom quote", "Learn about ROI", "Book call"]
      };
    }
    
    if (input.includes('video production') || input.includes('how are videos made')) {
      return {
        text: "Our video production process: 1) We analyze your business and target audience, 2) Create a custom script highlighting your unique value, 3) Film high-quality footage with professional equipment, 4) Edit with cinematic effects and your branding, 5) Deliver multiple formats for different platforms. Each video is optimized for maximum engagement and conversion.",
        quickActions: ["See video examples", "Get custom quote", "Learn about ROI", "Book consultation"]
      };
    }
    
    // Smart Website Questions
    if (input.includes('smart website') || input.includes('what is smart website') || input.includes('do i need smart website')) {
      return {
        text: "A smart website is an intelligent, conversion-optimized website that automatically adapts to visitors, tracks their behavior, and guides them toward booking. It includes: AI-powered chatbots, dynamic content, lead capture forms, mobile optimization, fast loading speeds, and seamless integration with your AI voice agents. Yes, you need one to compete in today's digital landscape.",
        quickActions: ["See smart website demo", "Learn about benefits", "Get pricing", "Book consultation"]
      };
    }
    
    if (input.includes('website benefits') || input.includes('smart website advantages')) {
      return {
        text: "Smart websites provide: Higher conversion rates (3-5x improvement), better user experience, automatic lead qualification, mobile-first design, SEO optimization, integration with marketing tools, real-time analytics, and seamless handoff to your AI voice agents. They turn visitors into customers more effectively than traditional websites.",
        quickActions: ["See demo", "Get custom quote", "Learn about ROI", "Book call"]
      };
    }
    
    if (input.includes('website cost') || input.includes('website pricing') || input.includes('website investment')) {
      return {
        text: "Smart website investment varies based on features and complexity. However, the ROI is typically 300-500% within the first year due to increased conversions. We offer packages that include website design, AI integration, and ongoing optimization. The cost is often recovered within 2-3 months from increased bookings and reduced missed opportunities.",
        quickActions: ["Get custom quote", "See ROI examples", "Book consultation", "Learn more"]
      };
    }
    
    // General Service Questions
    if (input.includes('demo') || input.includes('video') || input.includes('show') || input.includes('see demos')) {
      return {
        text: "Great! I can show you our live demo calls. We have demos for plumbing, HVAC, roofing, landscaping, and more. Each demo shows our AI voice agents handling real calls and ends with our brand outro. Would you like me to scroll to the demo section?",
        quickActions: ["Scroll to demos", "See video ads", "Get pricing", "Book call"]
      };
    }
    
    if (input.includes('pricing') || input.includes('cost') || input.includes('price') || input.includes('investment') || input.includes('get pricing')) {
      return {
        text: "Our services are customized for each business based on call volume, industry, and specific needs. Packages typically range from $2,000-$10,000/month and include AI voice agents, custom video ads, and smart website features. Most clients see ROI within 30-60 days. Would you like to schedule a consultation for a custom quote?",
        quickActions: ["Book consultation", "See ROI examples", "Learn about setup", "Get custom quote"]
      };
    }
    
    if (input.includes('book') || input.includes('call') || input.includes('schedule') || input.includes('consultation') || input.includes('book call')) {
      return {
        text: "Perfect! I can help you book a call with our team. We'll discuss your business needs, show you exactly how our AI voice agents can help, and provide a custom proposal. Would you like me to open the booking calendar?",
        quickActions: ["Open calendar", "See demos first", "Get pricing", "Learn about ROI"]
      };
    }
    
    if (input.includes('service') || input.includes('what do you do') || input.includes('help') || input.includes('offer')) {
      return {
        text: "We provide a complete conversion ecosystem: 1) AI Voice Agents that handle calls 24/7, 2) Custom 10-second video ads for marketing, 3) Smart websites optimized for conversions, 4) Marketing automation and lead nurturing. We specialize in local service businesses where one booked call equals significant revenue.",
        quickActions: ["See demos", "Get pricing", "Book consultation", "Learn about ROI"]
      };
    }
    
    if (input.includes('contact') || input.includes('phone') || input.includes('email') || input.includes('reach')) {
      return {
        text: "You can reach us at (555) 123-4567 or email us at hello@forsythepublishing.com. We also have this live chat feature and you can book a call directly through our website. What's the best way for you to connect?",
        quickActions: ["Book call", "See demos", "Get pricing", "Learn more"]
      };
    }
    
    if (input.includes('roi') || input.includes('return on investment') || input.includes('results') || input.includes('learn about roi')) {
      return {
        text: "Our clients typically see: 2-3x more qualified leads, 40-60% higher conversion rates, 24/7 lead capture, reduced missed calls, increased booking rates, and detailed analytics. Most businesses recover their investment within 30-60 days and see 300-500% ROI within the first year.",
        quickActions: ["See case studies", "Get custom quote", "Book consultation", "Watch demos"]
      };
    }
    
    if (input.includes('setup') || input.includes('implementation') || input.includes('how long') || input.includes('timeline')) {
      return {
        text: "Setup typically takes 2-4 weeks: Week 1-2: Custom AI voice agent training and integration, Week 3: Video ad production and website optimization, Week 4: Testing and launch. We handle all technical integration and provide training for your team. Most clients are fully operational within 30 days.",
        quickActions: ["Get custom timeline", "Book consultation", "See demos", "Learn more"]
      };
    }
    
    if (input.includes('support') || input.includes('maintenance') || input.includes('ongoing')) {
      return {
        text: "We provide comprehensive ongoing support: 24/7 technical support, monthly performance reviews, continuous AI training and optimization, regular video ad updates, website maintenance and updates, and detailed analytics reporting. Our team ensures your systems run smoothly and continue improving over time.",
        quickActions: ["Get pricing", "Book consultation", "See demos", "Learn more"]
      };
    }
    
    return {
      text: "I'd be happy to help! Our AI voice agents can handle phone calls for your business, qualify leads, and book appointments automatically. We also create custom video ads and smart websites. Would you like to learn more about any of these services, see a demo, or book a consultation call?",
      quickActions: ["See demos", "Get pricing", "Book call", "Learn about ROI"]
    };
  };

  if (!open) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-md h-[600px] bg-[#0f1112] rounded-2xl border border-white/10 shadow-[0_25px_50px_rgba(0,0,0,.5)] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#d9c4aa] to-[#b89463] flex items-center justify-center">
              <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <div>
              <div className="text-white font-sans font-semibold">AI Assistant</div>
              <div className="text-[#d9c4aa] text-xs">Online now</div>
            </div>
          </div>
          <motion.button 
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                message.isUser 
                  ? 'bg-gradient-to-br from-[#d9c4aa] to-[#b89463] text-black' 
                  : 'bg-white/10 text-white'
              }`}>
                <div className="text-sm font-sans leading-relaxed whitespace-pre-line">{message.text}</div>
                <div className={`text-xs mt-1 ${
                  message.isUser ? 'text-black/60' : 'text-white/60'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              
              {/* Quick Action Buttons */}
              {!message.isUser && message.quickActions && message.quickActions.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {message.quickActions.map((action, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleQuickAction(action)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 text-xs bg-[#d9c4aa]/20 hover:bg-[#d9c4aa]/30 text-[#d9c4aa] rounded-lg border border-[#d9c4aa]/30 transition-colors"
                    >
                      {action}
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-white/10 text-white rounded-2xl px-4 py-2">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/10">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about AI voice agents, video ads, smart websites, pricing..."
              className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white placeholder-white/60 focus:outline-none focus:border-[#d9c4aa] transition-colors"
            />
            <motion.button
              onClick={() => handleSendMessage()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!inputText.trim()}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d9c4aa] to-[#b89463] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ------------------
// Sticky Call/Text bar (Direct Contact)
// ------------------
function StickyContactBar() {
  return (
    <div className="fixed bottom-2 left-0 right-0 z-40 px-3 md:hidden">
      <div className="mx-auto max-w-[480px] grid grid-cols-3 gap-2 rounded-2xl border border-white/10 bg-black/60 backdrop-blur supports-[backdrop-filter]:bg-black/30 p-2">
                <a href="tel:+18172108487" className="rounded-xl text-center py-3.5 min-h-[44px] flex items-center justify-center bg-gradient-to-br from-[#d9c4aa] to-[#b89463] text-black font-sans font-extrabold text-sm active:scale-95 transition-transform">Call</a>
                <a href="sms:+18172108487" className="rounded-xl text-center py-3.5 min-h-[44px] flex items-center justify-center border border-white/15 ui-track text-sm active:scale-95 transition-transform">Text</a>
                <a href="#book" className="rounded-xl text-center py-3.5 min-h-[44px] flex items-center justify-center border border-white/15 ui-track text-sm active:scale-95 transition-transform">Book</a>
      </div>
    </div>
  );
}

// ------------------
// Booking (cal.com) Modal
// ------------------
function CalModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [open]);
  if (!open) return null;
  const calUrl = process.env.NEXT_PUBLIC_CAL_URL || "https://cal.com/forsythepublishing/discovery";
  return (
    <div className="fixed inset-0 z-[90] grid place-items-center bg-black/80 p-4" onClick={onClose}>
      <div className="relative w-full max-w-3xl aspect-[4/3] bg-[#0f1112] rounded-xl border border-white/10 overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <iframe src={calUrl + '?embed=true'} className="absolute inset-0 w-full h-full" title="Book a time" />
        <button onClick={onClose} className="absolute -top-3 -right-3 rounded-full bg-white text-black w-8 h-8 font-bold">×</button>
      </div>
    </div>
  );
}

// ------------------
// LEAD FORM (Instant AI callback trigger)
// ------------------
function LeadForm() {
  const [busy, setBusy] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const utm = useUTM();
  const session_id = useSessionId();
  const [variant, setVariant] = useState<'A' | 'B'>('A');
  
  useEffect(() => {
    // Set variant only on client to avoid hydration mismatch
    setVariant(Math.random() < 0.5 ? 'A' : 'B');
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement; // ✅ Store form reference before async
    setBusy(true); setErr(null);
    const fd = new FormData(form);
    if (fd.get("website") as string) { setErr("Bot detected"); setBusy(false); return; } // honeypot
    const payload = Object.fromEntries(fd.entries());
    try {
      const res = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
        ...payload,
        session_id,
        utm,
        source: "forsythe-landing",
        variant,
        tags: ["AI_Web_Lead", "Instant_Callback"],
      }) });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || await res.text());
      
      fireAnalytics('lead_submit', { form: 'instant_callback', variant });
      setOk(true);
    } catch (e: any) { setErr(e.message || "Submit error"); }
    finally { 
      setBusy(false);
      if (form) form.reset(); // ✅ Safe reset in finally block
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0f1112] p-6 shadow-[0_18px_50px_rgba(0,0,0,.45)]">
      <form className="grid sm:grid-cols-2 gap-3" onSubmit={onSubmit}>
        <input className="hidden" name="website" aria-hidden="true" tabIndex={-1} />
        <div className="sm:col-span-2">
          <div className="font-display text-[#d9c4aa] uppercase tracking-[var(--ls-sub)] text-lg">Instant callback (2–5 min)</div>
          <p className="ui-track text-slate-300/80">We'll auto‑dial, qualify, and book—24/7.</p>
        </div>
        <label className="sr-only" htmlFor="name">Full name</label>
        <input id="name" name="name" required placeholder="Full name" className="rounded-xl bg-black/30 border border-white/10 px-4 py-3.5 min-h-[48px] text-base ui-track focus:ring-2 focus:ring-[#d9c4aa]/50 focus:border-[#d9c4aa]/50 transition-all" />
        <label className="sr-only" htmlFor="phone">Phone</label>
        <input id="phone" name="phone" inputMode="tel" required placeholder="Phone" className="rounded-xl bg-black/30 border border-white/10 px-4 py-3.5 min-h-[48px] text-base ui-track focus:ring-2 focus:ring-[#d9c4aa]/50 focus:border-[#d9c4aa]/50 transition-all" />
        <label className="sr-only" htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required placeholder="Email" className="rounded-xl bg-black/30 border border-white/10 px-4 py-3.5 min-h-[48px] text-base ui-track focus:ring-2 focus:ring-[#d9c4aa]/50 focus:border-[#d9c4aa]/50 transition-all" />
        <input name="company" placeholder="Company" className="rounded-xl bg-black/30 border border-white/10 px-4 py-3.5 min-h-[48px] text-base ui-track" />
        <input name="industry" placeholder="Service type (Roofing, HVAC…)" className="rounded-xl bg-black/30 border border-white/10 px-4 py-3.5 min-h-[48px] text-base ui-track" />
        <input name="preferred_time" placeholder="Best time to call" className="rounded-xl bg-black/30 border border-white/10 px-4 py-3.5 min-h-[48px] text-base ui-track" />
        <textarea name="message" placeholder="Notes / project details (optional)" className="sm:col-span-2 rounded-xl bg-black/30 border border-white/10 px-4 py-3.5 min-h-[100px] text-base ui-track" />
        {/* Hidden metadata */}
        <input type="hidden" name="session_id" value={session_id} />
        <input type="hidden" name="utm_source" value={utm.source || ""} />
        <input type="hidden" name="utm_medium" value={utm.medium || ""} />
        <input type="hidden" name="utm_campaign" value={utm.campaign || ""} />
        <input type="hidden" name="gclid" value={utm.gclid || ""} />

        {/* Additional hidden UTM fields */}
        <input type="hidden" name="utm_term" value={utm.term || ""} />
        <input type="hidden" name="utm_content" value={utm.content || ""} />
        <input type="hidden" name="fbclid" value={utm.fbclid || ""} />
        <input type="hidden" name="landing_page" value="forsythe-editorial-luxe" />
        <input type="hidden" name="referrer" value={utm.ref || ""} />

        <button disabled={busy} className="sm:col-span-2 rounded-2xl bg-gradient-to-br from-[#d9c4aa] to-[#b89463] text-black font-sans font-extrabold px-6 py-4 min-h-[52px] text-base shadow-[0_10px_26px_rgba(216,184,138,.25)] hover:shadow-[0_14px_32px_rgba(216,184,138,.35)] transition-all disabled:opacity-60 active:scale-95">
          {busy ? "Submitting…" : (variant === 'A' ? "Request Callback Now" : "Start in 2–5 Minutes")}
        </button>
        <p className="sm:col-span-2 text-xs text-slate-400 ui-track leading-relaxed">By submitting, you agree to receive a call/text from Forsythe Publishing & Marketing at the number provided. Message & data rates may apply. Consent not required for purchase. Reply STOP to opt‑out. See Privacy Policy.</p>
        {ok && <div className="sm:col-span-2 text-sm text-emerald-300">Request received—expect a call within 2–5 minutes.</div>}
        {err && <div className="sm:col-span-2 text-sm text-rose-300">{err}</div>}
      </form>
    </div>
  );
}

// ------------------
// RUNTIME SELF-TESTS (dev only)
// ------------------
function runRuntimeTests() {
  const results = [
    { name: 'lenis-exists', pass: !!(window as any).lenis },
    { name: 'framer-motion-available', pass: !!motion },
  ];
  try {
    console.groupCollapsed('%cForsythe runtime tests', 'color:#d9c4aa');
    for (const r of results) console.log(r.pass ? '✅' : '❌', r.name);
    console.groupEnd();
  } catch {}
  return results;
}
if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
  (window as any).__FORSYTHE_TESTS__ = runRuntimeTests;
}

export default function ForsytheEditorialLuxe() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.matchMedia('(max-width: 640px)').matches);
  }, []);
  const y1 = useParallax(heroRef, isMobile ? 10 : 24); 
  const y2 = useParallax(heroRef, isMobile ? 7 : 16); 
  const y3 = useParallax(heroRef, isMobile ? 5 : 12);
  const { scrollYProgress: page } = useScroll();
  const shadowAlpha = useTransform(page, [0, 0.1, 1], [0, 0.35, 0.5]);
  const headerShadow = useMotionTemplate`0 10px 24px rgba(0,0,0,${shadowAlpha})`;
  
  // Hero circle scales
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const scale1 = useTransform(heroProgress, [0, 1], [1, 1.02]);
  const scale2 = useTransform(heroProgress, [0, 1], [1, 0.98]);
  
  const [open, setOpen] = useState(false); 
  const [activeSrc, setActiveSrc] = useState<string | undefined>();
  const [calOpen, setCalOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [exitIntentShown, setExitIntentShown] = useState(false);
  const magneticCTA = useMagnetic();
  
  // Video filtering
  const [videoFilter, setVideoFilter] = useState<string>("All");
  const videoCats = React.useMemo(() => ["All", ...Array.from(new Set(videoAds.map(v => v.category)))], []);
  const filteredAds = React.useMemo(() => videoFilter === "All" ? videoAds : videoAds.filter(v => v.category === videoFilter), [videoFilter]);

  // ROI Calculator functionality
  useEffect(() => {
    const calculateROI = () => {
      const leads = parseInt((document.getElementById('leads') as HTMLInputElement)?.value || '80');
      const contactRate = parseInt((document.getElementById('contactRate') as HTMLInputElement)?.value || '35');
      const jobValue = parseInt((document.getElementById('jobValue') as HTMLInputElement)?.value || '12000');
      const closeRate = parseInt((document.getElementById('closeRate') as HTMLInputElement)?.value || '15');

      const currentJobs = (leads * contactRate / 100 * closeRate / 100);
      const aiJobs = (leads * 70 / 100 * closeRate / 100);
      const additionalJobs = aiJobs - currentJobs;
      const additionalRevenue = additionalJobs * jobValue;
      const annualRevenue = additionalRevenue * 12;

      // Update display
      const currentJobsEl = document.getElementById('currentJobs');
      const aiJobsEl = document.getElementById('aiJobs');
      const additionalRevenueEl = document.getElementById('additionalRevenue');
      const annualRevenueEl = document.getElementById('annualRevenue');

      if (currentJobsEl) currentJobsEl.textContent = currentJobs.toFixed(1);
      if (aiJobsEl) aiJobsEl.textContent = aiJobs.toFixed(1);
      if (additionalRevenueEl) additionalRevenueEl.textContent = `$${additionalRevenue.toLocaleString()}`;
      if (annualRevenueEl) annualRevenueEl.textContent = `$${annualRevenue.toLocaleString()}`;
    };

    // Add event listeners to inputs
    const inputs = ['leads', 'contactRate', 'jobValue', 'closeRate'];
    inputs.forEach(id => {
      const input = document.getElementById(id);
      if (input) {
        input.addEventListener('input', calculateROI);
      }
    });

    // Initial calculation
    calculateROI();

    return () => {
      inputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
          input.removeEventListener('input', calculateROI);
        }
      });
    };
  }, []);

  // Exit intent popup
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !exitIntentShown) {
        setExitIntentShown(true);
        setCalOpen(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [exitIntentShown]);

  return (
    <SmoothScroll>
      <GlobalType />
      {/* OG & Twitter meta tags */}
      <Script id="og-tags" dangerouslySetInnerHTML={{__html: `
        (function(){
          var tags = [
            {p:'og:title',c:'Forsythe — AI Conversion Ecosystem for High-Value Services'},
            {p:'og:description',c:'70% contact rate. 2-5 minute AI callback. 24/7 coverage. Turn leads into booked calls automatically.'},
            {p:'og:type',c:'website'},
            {p:'twitter:card',c:'summary_large_image'}
          ];
          tags.forEach(function(t){
            var m=document.createElement('meta');
            m.setAttribute('property',t.p);
            m.content=t.c;
            document.head.appendChild(m);
          });
        })();
      `}} />
      {/* JSON‑LD for NAP trust */}
      <Script id="forsythe-ld" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "name": "Forsythe Publishing & Marketing",
          "alternateName": "Forsythe Publishing",
          "description": "AI voice agent and conversion marketing for high-value service businesses. 70% contact rate, 2-5 minute response time, 24/7 coverage.",
          "telephone": "+1-817-210-8487",
          "email": "forsythpublishing@gmail.com",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Fort Worth",
            "addressRegion": "TX",
            "addressCountry": "US",
            "postalCode": "76107"
          },
          "geo": {
              "@type": "GeoCoordinates",
              "latitude": "32.7555",
              "longitude": "-97.3308"
            },
          "areaServed": [
            {
              "@type": "City",
              "name": "Fort Worth",
              "containedIn": {
                "@type": "State",
                "name": "Texas"
              }
            },
            {
              "@type": "City",
              "name": "Dallas",
              "containedIn": {
                "@type": "State",
                "name": "Texas"
              }
            }
          ],
          "priceRange": "$$-$$$",
          "serviceType": ["AI Voice Agent", "Lead Conversion", "Marketing Automation", "Conversion Landing Pages", "Custom Video Ads"],
          "url": "https://forsythepublishingandmarketing.agency",
          "sameAs": [],
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "18:00"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5.0",
            "reviewCount": "50"
          },
          "slogan": "Never miss a customer again",
          "knowsAbout": ["AI Voice Agents", "Lead Generation", "Marketing Automation", "Conversion Rate Optimization", "Video Marketing"]
        })}
      </Script>

      <div className="relative bg-[#0b0c0d] text-slate-100 font-sans body-grain">
        {/* Ribbon */}
        <div className="bg-gradient-to-b from-[#ece3d6]/90 to-[#ece3d6]/80 text-stone-800">
          <div className="max-w-[1080px] mx-auto px-4 sm:px-6 py-2 flex items-center justify-between text-xs sm:text-sm">
            <div className="flex items-center gap-2 sm:gap-3 smallcaps font-display">
              <img src="/Header-Icon/ChatGPT Image Oct 10, 2025, 11_06_05 AM.png" alt="" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover ring-1 ring-black/10" /> 
              <span className="hidden sm:inline">Forsythe Publishing & Marketing</span>
              <span className="sm:hidden">Forsythe</span>
            </div>
            <div className="opacity-70 ui-track text-[10px] sm:text-sm hidden md:block">Editorial‑grade AI conversion for premium local services</div>
          </div>
        </div>

        {/* Enhanced Header */}
        <motion.header style={{ boxShadow: headerShadow }} className="sticky top-0 z-40 backdrop-blur-md bg-[#0b0c0d]/90 border-b border-white/10">
          <div className="max-w-[1080px] mx-auto px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              {/* Logo & Brand */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 sm:gap-4"
              >
                <div className="relative">
                  <img src="/Header-Icon/ChatGPT Image Oct 10, 2025, 11_06_05 AM.png" alt="Forsythe Publishing" className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl object-cover ring-2 ring-[#d9c4aa]/20" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#0b0c0d] animate-pulse"></div>
            </div>
                <div>
                  <div className="font-display uppercase tracking-[var(--ls-sub)] text-sm sm:text-base text-white">Forsythe</div>
                  <div className="text-[#d9c4aa] text-xs ui-track hidden sm:block">AI Voice Agents</div>
                </div>
              </motion.div>

              {/* Navigation & Contact */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex items-center gap-2 sm:gap-4"
              >
                {/* Mobile Menu Button */}
                <button 
                  onClick={() => {
                    const nav = document.getElementById('mobile-nav');
                    if (nav) nav.classList.toggle('hidden');
                  }}
                  className="lg:hidden w-11 h-11 flex items-center justify-center rounded-xl border border-white/10 hover:bg-white/5 transition-colors"
                  aria-label="Toggle menu"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>

                {/* Mobile Navigation Menu */}
                <nav id="mobile-nav" className="hidden fixed inset-0 top-[60px] bg-[#0b0c0d]/98 backdrop-blur-lg z-50 lg:hidden">
                  <div className="flex flex-col p-6 gap-4">
                    <a href="#live-demos" className="text-white hover:text-[#d9c4aa] transition-colors text-base font-sans py-3 px-4 rounded-xl hover:bg-white/5" onClick={() => document.getElementById('mobile-nav')?.classList.add('hidden')}>Demos</a>
                    <a href="#instant" className="text-white hover:text-[#d9c4aa] transition-colors text-base font-sans py-3 px-4 rounded-xl hover:bg-white/5" onClick={() => document.getElementById('mobile-nav')?.classList.add('hidden')}>Get Started</a>
                    <a href="#ads" className="text-white hover:text-[#d9c4aa] transition-colors text-base font-sans py-3 px-4 rounded-xl hover:bg-white/5" onClick={() => document.getElementById('mobile-nav')?.classList.add('hidden')}>Video Ads</a>
                    <div className="border-t border-white/10 pt-4 mt-4">
                      <a href="tel:+18172108487" className="flex items-center gap-2 text-white hover:text-[#d9c4aa] transition-colors text-base font-sans py-3 px-4 rounded-xl hover:bg-white/5">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                        <span>(817) 210‑8487</span>
                      </a>
                    </div>
                  </div>
                </nav>

                {/* Desktop Navigation Links */}
                <nav className="hidden lg:flex items-center gap-6">
                  <a href="#live-demos" className="text-slate-300/80 hover:text-[#d9c4aa] transition-colors text-sm ui-track">Demos</a>
                  <a href="#instant" className="text-slate-300/80 hover:text-[#d9c4aa] transition-colors text-sm ui-track">Get Started</a>
                  <a href="#ads" className="text-slate-300/80 hover:text-[#d9c4aa] transition-colors text-sm ui-track">Video Ads</a>
                </nav>

                {/* Contact Info */}
                <div className="hidden md:flex items-center gap-3 text-xs ui-track">
                  <a href="tel:+18172108487" className="text-slate-300/80 hover:text-white transition-colors flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <span>(817) 210‑8487</span>
                  </a>
                  <div className="w-px h-4 bg-slate-600"></div>
                  <a href="mailto:forsythpublishing@gmail.com" className="text-slate-300/80 hover:text-white transition-colors flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span>Email</span>
                  </a>
                </div>

                {/* CTA Button */}
                <motion.button 
                  {...magneticCTA} 
                  onClick={() => { setCalOpen(true); fireAnalytics('cta_book_click', { location: 'header' }); }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative rounded-xl bg-gradient-to-br from-[#d9c4aa] to-[#b89463] text-black font-sans font-extrabold px-4 sm:px-6 py-2 sm:py-2.5 shadow-[0_10px_26px_rgba(216,184,138,.25)] hover:shadow-[0_14px_32px_rgba(216,184,138,.35)] transition-all text-xs sm:text-sm overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                <span className="hidden sm:inline">Book a Call</span>
                <span className="sm:hidden">Book</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.header>

        {/* HERO */}
        <section ref={heroRef} className="relative overflow-hidden">
          {/* Parallax Background */}
          <motion.div 
            style={{ y: useTransform(useScroll().scrollY, [0, 1000], [0, -500]) }}
            className="absolute inset-0 bg-gradient-to-br from-[#0f1112] via-[#111315] to-[#0f1112]"
          />
          <div className="pointer-events-none absolute -left-[15%] -top-[25%] w-[65vw] h-[65vw] bg-[radial-gradient(60%_60%_at_40%_40%,rgba(217,196,170,0.10),transparent_70%)] blur-[28px]" />
          <div className="pointer-events-none absolute -right-[20%] -bottom-[15%] w-[75vw] h-[75vw] bg-[radial-gradient(60%_60%_at_60%_60%,rgba(217,196,170,0.10),transparent_70%)] blur-[28px]" />

          {/* Interactive Particle System */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {[
              { left: 10, top: 20, delay: 0, duration: 4 },
              { left: 25, top: 15, delay: 0.5, duration: 5 },
              { left: 40, top: 30, delay: 1, duration: 6 },
              { left: 60, top: 25, delay: 1.5, duration: 4.5 },
              { left: 80, top: 35, delay: 2, duration: 5.5 },
              { left: 15, top: 50, delay: 2.5, duration: 4.8 },
              { left: 35, top: 45, delay: 3, duration: 5.2 },
              { left: 55, top: 60, delay: 3.5, duration: 4.2 },
              { left: 75, top: 55, delay: 0.2, duration: 5.8 },
              { left: 90, top: 70, delay: 0.8, duration: 4.6 },
              { left: 20, top: 80, delay: 1.2, duration: 5.4 },
              { left: 45, top: 75, delay: 1.8, duration: 4.4 },
              { left: 65, top: 85, delay: 2.2, duration: 5.6 },
              { left: 85, top: 80, delay: 2.8, duration: 4.9 },
              { left: 30, top: 10, delay: 3.2, duration: 5.1 },
              { left: 50, top: 5, delay: 3.8, duration: 4.7 },
              { left: 70, top: 15, delay: 0.3, duration: 5.3 },
              { left: 5, top: 40, delay: 0.9, duration: 4.3 },
              { left: 95, top: 45, delay: 1.6, duration: 5.7 },
              { left: 12, top: 65, delay: 2.1, duration: 4.1 }
            ].map((particle, i) => (
            <motion.div 
                key={i}
                className="absolute w-1 h-1 bg-[#d9c4aa]/30 rounded-full"
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                }}
              animate={{ 
                  y: [0, -100, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
              }}
              transition={{ 
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Enhanced Animated background elements */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div 
              animate={{ 
                y: [0, -30, 0],
                rotate: [0, 8, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-[#d9c4aa]/8 to-transparent rounded-full blur-2xl"
            />
            <motion.div 
              animate={{ 
                y: [0, 25, 0],
                rotate: [0, -5, 0],
                scale: [1, 0.9, 1]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 2
              }}
              className="absolute bottom-32 right-16 w-32 h-32 bg-gradient-to-br from-[#b89463]/8 to-transparent rounded-full blur-2xl"
            />
            <motion.div 
              animate={{ 
                y: [0, -15, 0],
                x: [0, 10, 0],
                rotate: [0, 3, 0]
              }}
              transition={{ 
                duration: 12, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 4
              }}
              className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-[#d9c4aa]/6 to-transparent rounded-full blur-xl"
            />
          </div>

          <div className="max-w-[1080px] mx-auto px-4 sm:px-6 py-16 sm:py-24 grid md:grid-cols-[1.1fr_.9fr] gap-8 md:gap-10 items-center relative z-20">
            <div>
              {/* Eyebrow */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#d9c4aa]/40 bg-[#d9c4aa]/10 text-[#d9c4aa] font-sans uppercase text-[10px] sm:text-[11px] tracking-[0.12em] mb-4 sm:mb-6"
              >
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#d9c4aa] rounded-full animate-pulse"></div>
                <span className="hidden sm:inline">70% Contact Rate • 2-5 Min Response</span>
                <span className="sm:hidden">70% Contact Rate</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-2 sm:mt-4 font-display text-[#d9c4aa] uppercase tracking-[0.15em] sm:tracking-[0.18em] leading-[1.05] text-2xl sm:text-3xl md:text-4xl lg:text-[56px] relative z-20"
                style={{ fontFamily: 'var(--font-display), system-ui, sans-serif' }}
              >
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="inline-block"
                >
                  Never Miss a Customer
                </motion.span>
                <br />
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="inline-block text-white"
                >
                  Again
                </motion.span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-3 sm:mt-4 max-w-xl text-slate-300/90 ui-track leading-6 sm:leading-7 text-sm sm:text-base relative z-20"
              >
                Your AI voice agent calls every lead in <span className="text-[#d9c4aa] font-semibold">under 5 minutes</span>—before your competitors even see the notification. <span className="text-white font-semibold">Double your contact rate to 70%</span>, book more appointments, and convert leads while they're hot. <span className="text-[#d9c4aa]/90">Works 24/7. No staff needed.</span>
              </motion.p>
              
              {/* Enhanced proof band with animations */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-4 sm:mt-6 flex flex-wrap items-center gap-2 sm:gap-4 text-[10px] sm:text-[11px] uppercase font-sans tracking-[0.12em] text-[#d9c4aa]/90"
              >
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#d9c4aa] rounded-full animate-pulse"></div>
                <span>2–5 min response</span>
                </div>
                <span className="hidden sm:inline w-px h-3 bg-[#d9c4aa]/30" />
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#d9c4aa] rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <span className="text-xs sm:text-[11px]">35% → 70% contact</span>
                </div>
                <span className="hidden sm:inline w-px h-3 bg-[#d9c4aa]/30" />
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#d9c4aa] rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                <span>24/7 coverage</span>
              </div>
              </motion.div>

              {/* Enhanced CTA with better visual hierarchy */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4"
              >
                <a href="#instant" onClick={() => fireAnalytics('cta_click', { label: 'hero_pilot', location: 'hero' })} className="group relative rounded-2xl bg-gradient-to-br from-[#d9c4aa] to-[#b89463] text-black font-sans font-extrabold px-6 sm:px-8 py-4 sm:py-4 min-h-[48px] sm:min-h-[52px] flex items-center justify-center shadow-[0_10px_26px_rgba(216,184,138,.25)] hover:shadow-[0_14px_32px_rgba(216,184,138,.35)] transition-all overflow-hidden text-center text-base sm:text-base active:scale-95">
                  <span className="relative z-10">Start Your 5-Day Free Trial →</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </a>
                <a href="#live-demos" onClick={() => fireAnalytics('cta_click', { label: 'hero_demo', location: 'hero' })} className="rounded-2xl border border-[#d9c4aa]/40 bg-[#d9c4aa]/5 px-6 sm:px-8 py-4 sm:py-4 min-h-[48px] sm:min-h-[52px] flex items-center justify-center ui-track hover:bg-[#d9c4aa]/10 transition-all backdrop-blur-sm text-center text-base sm:text-base active:scale-95">
                  Watch Real AI Calls
                </a>
              </motion.div>

              {/* Risk reversal micro-copy */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs sm:text-[11px] text-slate-400/80 ui-track"
              >
                <span className="flex items-center gap-1.5">
                  <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  Live in 10 days
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  No credit card
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  Money-back guarantee
                </span>
              </motion.div>

              {/* Enhanced social proof with urgency */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="mt-6 sm:mt-8 space-y-4"
              >
                {/* Urgency element */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/30 bg-red-500/10 backdrop-blur-sm">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-red-400 font-sans uppercase text-xs sm:text-[10px] tracking-[0.12em] font-semibold">Only 3 New Clients This Month • 1 Spot Remaining</span>
                </div>
                
                {/* Social proof */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[9px] sm:text-[10px] uppercase font-sans tracking-[0.12em] text-slate-400">
                <span className="text-[#d9c4aa]/70 font-semibold">Trusted in DFW</span>
                <span className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all cursor-default text-xs sm:text-[10px]">Roofing</span>
                <span className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all cursor-default text-xs sm:text-[10px]">Restoration</span>
                <span className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all cursor-default text-xs sm:text-[10px]">HVAC</span>
                <span className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all cursor-default text-xs sm:text-[10px]">Legal</span>
                </div>
              </motion.div>

              <GoldMesh />
            </div>

            {/* Enhanced floating circles with animations */}
            <div className="relative h-[520px] hidden md:block z-20">
              {/* Connection lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                <motion.path
                  d="M8,12 Q50,30 98,8"
                  stroke="url(#gradient1)"
                  strokeWidth="0.1"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 1.5 }}
                />
                <motion.path
                  d="M5,68 Q30,50 28,48"
                  stroke="url(#gradient2)"
                  strokeWidth="0.08"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.8, delay: 2 }}
                />
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#d9c4aa" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#d9c4aa" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#d9c4aa" stopOpacity="0.3" />
                  </linearGradient>
                  <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#b89463" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#b89463" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Enhanced circles with glow effects */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <Circle src={luxuryImages.hero[0]} className="left-[8%] top-[12%] w-[140px] h-[140px] shadow-[0_0_40px_rgba(217,196,170,.2)]" y={y1} scale={scale1} alt="Premium business phone consultation" />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.4 }}
              >
                <Circle src={luxuryImages.hero[1]} className="left-[28%] top-[48%] w-[110px] h-[110px] shadow-[0_0_30px_rgba(217,196,170,.15)]" y={y2} scale={scale2} alt="Calendar appointment booking" />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.6 }}
              >
                <Circle src={luxuryImages.hero[2]} className="left-[5%] top-[68%] w-[85px] h-[85px] shadow-[0_0_25px_rgba(217,196,170,.1)]" y={y3} alt="Professional handshake and contract signing" />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.8 }}
              >
                <Circle src={luxuryImages.hero[3]} className="right-[2%] top-[8%] w-[280px] h-[280px] shadow-[0_0_60px_rgba(217,196,170,.25)]" y={y1} scale={scale1} alt="24/7 after-hours service coverage" />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 2.0 }}
              >
                <Circle src={luxuryImages.hero[4]} className="right-[15%] bottom-[5%] w-[200px] h-[200px] shadow-[0_0_45px_rgba(217,196,170,.2)]" y={y2} scale={scale2} alt="Modern business architecture" />
              </motion.div>

              {/* Floating data points */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 2.2 }}
                className="absolute top-[15%] right-[25%] bg-black/60 backdrop-blur-sm rounded-xl px-3 py-2 border border-[#d9c4aa]/30"
              >
                <div className="text-[#d9c4aa] font-num text-lg font-bold">70%</div>
                <div className="text-white text-xs ui-track">Contact Rate</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 2.4 }}
                className="absolute bottom-[20%] left-[15%] bg-black/60 backdrop-blur-sm rounded-xl px-3 py-2 border border-[#d9c4aa]/30"
              >
                <div className="text-[#d9c4aa] font-num text-lg font-bold">2-5min</div>
                <div className="text-white text-xs ui-track">Response</div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* HERO VIDEO SECTION - SEAMLESS EMBEDDED */}
        <section className="py-16 bg-[#111315]">
          <div className="max-w-[1400px] mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#d9c4aa]/30 bg-[#d9c4aa]/10 text-[#d9c4aa] font-sans uppercase text-[10px] tracking-[0.12em] mb-4">
                <div className="w-2 h-2 bg-[#d9c4aa] rounded-full animate-pulse"></div>
                <span>See It In Action</span>
              </div>
              <h2 className="font-display text-white uppercase tracking-[var(--ls-sub)] text-3xl mb-4">AI Voice Agents Working 24/7</h2>
              <p className="text-slate-300 text-lg max-w-2xl mx-auto">Watch how our AI voice agents handle real calls, qualify leads, and book appointments automatically while you focus on growing your business.</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full"
            >
              {/* Accessible video container with user controls */}
              <div className="aspect-video w-full overflow-hidden bg-black rounded-xl">
                <video
                  className="w-full h-full object-cover"
                  controls
                  playsInline
                  preload="metadata"
                  crossOrigin="anonymous"
                  aria-label="AI Voice Agent demonstration video showing real call handling"
                  onLoadedData={() => console.log('Hero video loaded successfully')}
                  onError={(e) => console.error('Hero video failed to load:', e)}
                  style={{
                    imageRendering: 'crisp-edges'
                  }}
                  controlsList="nodownload"
                  disablePictureInPicture
                >
                  <source src="/AI_Lead_Conversion.mp4" type="video/mp4; codecs=avc1.42E01E,mp4a.40.2" />
                  <source src="/AI_Lead_Conversion.mp4" type="video/mp4" />
                </video>
              </div>
              
            </motion.div>
          </div>
        </section>

        {/* LOCAL CLIENT TESTIMONIALS */}
        <section className="py-16 sm:py-24 bg-[#111315]">
          <SectionHead eyebrow="DFW Success Stories" title="Local businesses seeing real results" sub="See how our AI voice agents and marketing automation transformed DFW service companies' lead conversion." />
          <div className="max-w-[1080px] mx-auto px-4 sm:px-6 grid md:grid-cols-3 gap-4 sm:gap-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="rounded-2xl border border-[rgba(217,196,170,.18)] bg-[#111315] p-6 sm:p-8 shadow-[0_8px_24px_rgba(0,0,0,.25),inset_0_1px_0_rgba(217,196,170,.06)]">
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#d9c4aa] to-[#b89463] flex items-center justify-center">
                  <span className="text-black font-bold text-lg sm:text-xl">DR</span>
                </div>
                <div>
                  <div className="font-sans font-semibold text-white text-sm sm:text-base">David Rodriguez</div>
                  <div className="text-xs sm:text-sm ui-track text-slate-300/80">Owner, DFW Roofing Solutions</div>
                  <div className="text-[10px] sm:text-xs ui-track text-[#d9c4aa]">Fort Worth, TX</div>
                </div>
              </div>
              <blockquote className="ui-track text-slate-300/90 leading-6 sm:leading-7 mb-4 text-sm sm:text-base">
                "We went from 35% to 70% contact rate in the first month. The AI calls our leads in 2-3 minutes, even at 11pm during storm season. We're booking 3x more appointments in the DFW market."
              </blockquote>
              <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm">
                <div className="text-[#d9c4aa] font-num font-bold">$78k/mo</div>
                <div className="text-slate-400">Additional Revenue</div>
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="rounded-2xl border border-[rgba(217,196,170,.18)] bg-[#111315] p-6 sm:p-8 shadow-[0_8px_24px_rgba(0,0,0,.25),inset_0_1px_0_rgba(217,196,170,.06)]">
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#d9c4aa] to-[#b89463] flex items-center justify-center">
                  <span className="text-black font-bold text-lg sm:text-xl">SM</span>
                </div>
                <div>
                  <div className="font-sans font-semibold text-white text-sm sm:text-base">Sarah Mitchell</div>
                  <div className="text-xs sm:text-sm ui-track text-slate-300/80">CEO, Elite HVAC Services</div>
                  <div className="text-[10px] sm:text-xs ui-track text-[#d9c4aa]">Arlington, TX</div>
                </div>
              </div>
              <blockquote className="ui-track text-slate-300/90 leading-6 sm:leading-7 mb-4 text-sm sm:text-base">
                "The inbound AI handles our emergency calls perfectly during Dallas's extreme weather. It triages urgent issues and routes them to the right technician. Our response time improved by 80%."
              </blockquote>
              <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm">
                <div className="text-[#d9c4aa] font-num font-bold">80%</div>
                <div className="text-slate-400">Faster Response</div>
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="rounded-2xl border border-[rgba(217,196,170,.18)] bg-[#111315] p-6 sm:p-8 shadow-[0_8px_24px_rgba(0,0,0,.25),inset_0_1px_0_rgba(217,196,170,.06)]">
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#d9c4aa] to-[#b89463] flex items-center justify-center">
                  <span className="text-black font-bold text-lg sm:text-xl">JL</span>
                </div>
                <div>
                  <div className="font-sans font-semibold text-white text-sm sm:text-base">James Lawson</div>
                  <div className="text-xs sm:text-sm ui-track text-slate-300/80">Partner, Lawson & Associates</div>
                  <div className="text-[10px] sm:text-xs ui-track text-[#d9c4aa]">Plano, TX</div>
                </div>
              </div>
              <blockquote className="ui-track text-slate-300/90 leading-6 sm:leading-7 mb-4 text-sm sm:text-base">
                "Our custom video ads are driving 3x more qualified leads in the Dallas-Fort Worth area. The AI voice agent books consultations while we're in court. It's like having a 24/7 receptionist for our DFW clients."
              </blockquote>
              <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm">
                <div className="text-[#d9c4aa] font-num font-bold">3x</div>
                <div className="text-slate-400">More Qualified DFW Leads</div>
              </div>
            </motion.div>
          </div>
          
          {/* Additional DFW Customer Testimonials */}
          <div className="max-w-[1080px] mx-auto px-4 sm:px-6 mt-12">
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="rounded-2xl border border-[rgba(217,196,170,.18)] bg-[#111315] p-6 shadow-[0_8px_24px_rgba(0,0,0,.25),inset_0_1px_0_rgba(217,196,170,.06)]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d9c4aa] to-[#b89463] flex items-center justify-center">
                    <span className="text-black font-bold text-sm">MP</span>
                  </div>
                  <div>
                    <div className="font-sans font-semibold text-white text-sm">Michael Patterson</div>
                    <div className="text-[10px] ui-track text-slate-300/80">Owner, Metroplex Plumbing</div>
                    <div className="text-[10px] ui-track text-[#d9c4aa]">Grand Prairie, TX</div>
                  </div>
                </div>
                <blockquote className="ui-track text-slate-300/90 text-sm leading-6 mb-3">
                  "Since implementing Forsythe's AI system, we've reduced our missed calls by 90% and increased our booking rate by 60% across our Dallas-Fort Worth service area."
                </blockquote>
                <div className="flex items-center gap-2 text-[10px]">
                  <div className="text-[#d9c4aa] font-num font-bold">60%</div>
                  <div className="text-slate-400">More Bookings</div>
                </div>
              </motion.div>
              
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }} className="rounded-2xl border border-[rgba(217,196,170,.18)] bg-[#111315] p-6 shadow-[0_8px_24px_rgba(0,0,0,.25),inset_0_1px_0_rgba(217,196,170,.06)]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d9c4aa] to-[#b89463] flex items-center justify-center">
                    <span className="text-black font-bold text-sm">LH</span>
                  </div>
                  <div>
                    <div className="font-sans font-semibold text-white text-sm">Lisa Henderson</div>
                    <div className="text-[10px] ui-track text-slate-300/80">Manager, Texas Solar Solutions</div>
                    <div className="text-[10px] ui-track text-[#d9c4aa]">Southlake, TX</div>
                  </div>
                </div>
                <blockquote className="ui-track text-slate-300/90 text-sm leading-6 mb-3">
                  "The AI agent handles our high-value solar consultations perfectly. It qualifies leads on financing options and schedules home assessments. We've seen a 200% increase in qualified appointments."
                </blockquote>
                <div className="flex items-center gap-2 text-[10px]">
                  <div className="text-[#d9c4aa] font-num font-bold">200%</div>
                  <div className="text-slate-400">More Qualified Appointments</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* LIVE DEMO CALLS SHOWCASE */}
        <section id="live-demos" className="py-24 bg-[#111315]">
          <SectionHead eyebrow="Live Demo Calls" title="Real AI voice agents in action across industries" sub="Watch our AI voice agents handle real calls for different business types. Each demo shows qualification, booking, and our signature brand outro." />

          <div className="max-w-[1400px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Plumbing Services",
                  video: "/voice agent demo calls/plumbing.mp4",
                  description: "Emergency plumbing call handling with instant qualification and booking"
                },
                {
                  title: "Roofing - Inbound",
                  video: "/voice agent demo calls/roofing inbound.mp4",
                  description: "Storm damage assessment and insurance claim coordination"
                },
                {
                  title: "Roofing - Outbound",
                  video: "/voice agent demo calls/roofing outbound.mp4",
                  description: "Proactive outreach for roof maintenance and replacement"
                },
                {
                  title: "Solar Installation",
                  video: "/voice agent demo calls/solar.mp4",
                  description: "Solar consultation booking with energy savings calculations"
                },
                {
                  title: "Dentistry",
                  video: "/voice agent demo calls/dentistry.mp4",
                  description: "Dental appointment scheduling with treatment planning"
                },
                {
                  title: "Veterinary Services",
                  video: "/voice agent demo calls/veterinary.mp4",
                  description: "Pet care appointment booking and emergency triage"
                },
                {
                  title: "Tattoo Studio",
                  video: "/voice agent demo calls/tattoo studio.mp4",
                  description: "Creative consultation and appointment scheduling"
                },
                {
                  title: "Bi-lingual Landscaping",
                  video: "/voice agent demo calls/bi-lingual landscape.mp4",
                  description: "Multi-language landscaping services and maintenance"
                }
              ].map((demo, index) => (
                <motion.div
                  key={demo.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <motion.div
                    whileHover={{
                      y: -8,
                      scale: 1.02,
                      transition: { duration: 0.3 }
                    }}
                    className="relative rounded-2xl border border-[rgba(217,196,170,.18)] bg-[#111315] p-4 shadow-[0_8px_24px_rgba(0,0,0,.25),inset_0_1px_0_rgba(217,196,170,.06)] hover:border-[rgba(217,196,170,.3)] hover:shadow-[0_20px_40px_rgba(217,196,170,.1)] transition-all duration-300 group overflow-hidden cursor-pointer"
                    onClick={(e) => {
                      const video = e.currentTarget.querySelector('video') as HTMLVideoElement;
                      if (video) {
                        if (video.paused) {
                          video.play().catch(console.error);
                        } else {
                          video.pause();
                        }
                      }
                    }}
                  >
                    <div className="aspect-video rounded-xl overflow-hidden bg-black mb-4 relative">
                      {/* Video player - simplified */}
                      <video
                        className="w-full h-full object-contain bg-black cursor-pointer"
                        controls
                        preload="metadata"
                        onClick={(e) => {
                          e.preventDefault();
                          const target = e.target as HTMLVideoElement;
                          if (target.paused) {
                            target.play().catch(console.error);
                          } else {
                            target.pause();
                          }
                        }}
                        onLoadedData={(e) => {
                          const target = e.target as HTMLVideoElement;
                          // Set to show first frame as thumbnail
                          target.currentTime = 1;
                        }}
                      >
                        <source src={demo.video} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>

                      {/* Play overlay */}
                      <div
                        className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          const video = e.currentTarget.parentElement?.querySelector('video') as HTMLVideoElement;
                          if (video) {
                            if (video.paused) {
                              video.play().catch(console.error);
                            } else {
                              video.pause();
                            }
                          }
                        }}
                      >
                        <div className="text-center">
                          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-2">
                            <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </div>
                          <div className="text-white text-xs font-sans">Click to play</div>
                        </div>
                      </div>
                    </div>
                    <h3 className="font-display uppercase tracking-[var(--ls-sub)] text-[#d9c4aa] mb-2 group-hover:text-white transition-colors duration-300">{demo.title}</h3>
                    <p className="text-slate-300/80 text-sm ui-track leading-relaxed group-hover:text-slate-200 transition-colors duration-300">{demo.description}</p>

                    {/* Animated background gradient */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#d9c4aa]/5 via-transparent to-[#b89463]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-12 text-center"
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[rgba(217,196,170,.3)] bg-[rgba(217,196,170,.05)] backdrop-blur-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-[#d9c4aa] font-display uppercase tracking-[var(--ls-sub)] text-sm">Live AI Voice Agents</span>
                <span className="text-slate-300/60 text-sm">• Each call ends with our brand outro</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* VIDEO REEL - Gallery Mosaic */}
        <section id="ads" className="py-24">
          <SectionHead eyebrow="Custom Video Production" title="Cinematic 10-second ads by industry" sub="We create custom video ads for your business. Preview on hover. Click for sound and full screen." />

          {/* Enhanced Filter chips */}
          <div className="max-w-[1080px] mx-auto px-4 sm:px-6 mb-8">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-3"
            >
              {videoCats.map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => { setVideoFilter(cat); fireAnalytics('video_filter', { category: cat }); }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-5 py-2.5 sm:px-6 sm:py-3 rounded-full border transition-all font-sans text-sm sm:text-base min-h-[44px] flex items-center justify-center gap-2 ${
                    videoFilter === cat
                      ? 'border-[#CDAF7A] text-[#CDAF7A] bg-[#d9c4aa]/15 shadow-[0_4px_16px_rgba(205,175,122,.3)] backdrop-blur-sm'
                      : 'border-white/20 text-slate-300/90 hover:border-[#CDAF7A]/60 hover:text-[#CDAF7A] hover:bg-white/5'
                  } ui-track`}
                >
                  {videoFilter === cat && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  <span>{cat}</span>
                  {videoFilter === cat && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#d9c4aa]/20 text-[#CDAF7A]">
                      {filteredAds.length}
                    </span>
                  )}
                </motion.button>
              ))}
            </motion.div>
          </div>

          {/* Mobile: Enhanced horizontal reel */}
          <div className="max-w-[1080px] mx-auto px-4 sm:px-6 lg:hidden">
            <div className="relative">
              <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth">
                {filteredAds.map((v, i) => (
                  <div key={i} className="min-w-[88%] sm:min-w-[85%] snap-center flex-shrink-0">
                    <VideoCard src={v.src} poster={v.poster} label={v.label} onOpen={() => { setActiveSrc(v.src); setOpen(true); }} />
                  </div>
                ))}
              </div>
              {/* Scroll indicator */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1.5">
                {filteredAds.map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/30" />
                ))}
              </div>
            </div>
            {/* Helper text */}
            <p className="text-center mt-4 text-xs text-slate-400/80 ui-track">Swipe to browse • Tap to play with sound</p>
          </div>

          {/* Desktop: Enhanced featured mosaic */}
          <div className="max-w-[1080px] mx-auto px-6 hidden lg:grid grid-cols-12 gap-5 auto-rows-[1fr]">
            {/* Featured (first item) - Larger spotlight */}
            {filteredAds[0] && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="col-span-7 row-span-2"
              >
                <VideoCard
                  key="featured"
                  src={filteredAds[0].src}
                  poster={filteredAds[0].poster}
                  label={filteredAds[0].label}
                  onOpen={() => { setActiveSrc(filteredAds[0].src); setOpen(true); }}
                  className="h-full"
                />
              </motion.div>
            )}
            {/* The rest - Grid layout */}
            {filteredAds.slice(1).map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="col-span-5"
              >
                <VideoCard
                  src={v.src}
                  poster={v.poster}
                  label={v.label}
                  onOpen={() => { setActiveSrc(v.src); setOpen(true); }}
                  className="h-full"
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* IMMEDIATE SOCIAL PROOF */}
        <section className="py-16 bg-[#111315]">
          <div className="max-w-[1080px] mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#d9c4aa]/30 bg-[#d9c4aa]/10 text-[#d9c4aa] font-sans uppercase text-[10px] tracking-[0.12em] mb-4">
                <div className="w-2 h-2 bg-[#d9c4aa] rounded-full animate-pulse"></div>
                <span>Real Results</span>
              </div>
              <h2 className="font-display text-white uppercase tracking-[var(--ls-sub)] text-2xl mb-2">What Our Clients Say</h2>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ 
                  y: -10, 
                  rotateX: 5, 
                  rotateY: 5,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="relative bg-[#0f1112] border border-white/10 rounded-2xl p-6 hover:border-[#d9c4aa]/30 transition-all duration-300 group overflow-hidden"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-[#d9c4aa]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-300/90 leading-relaxed mb-4">"Our contact rate went from 28% to 71% in the first month. The AI agent never sleeps and catches leads we used to miss."</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d9c4aa] to-[#b89463] flex items-center justify-center">
                    <span className="text-black font-bold text-sm">MR</span>
                  </div>
                  <div>
                    <div className="font-sans font-semibold text-white text-sm">Mike Rodriguez</div>
                    <div className="text-slate-400 text-xs">Rodriguez Roofing</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ 
                  y: -10, 
                  rotateX: 5, 
                  rotateY: 5,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="relative bg-[#0f1112] border border-white/10 rounded-2xl p-6 hover:border-[#d9c4aa]/30 transition-all duration-300 group overflow-hidden"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-[#d9c4aa]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-300/90 leading-relaxed mb-4">"We're booking 3x more appointments. The system pays for itself in the first week. Best investment we've made."</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d9c4aa] to-[#b89463] flex items-center justify-center">
                    <span className="text-black font-bold text-sm">SC</span>
                  </div>
                  <div>
                    <div className="font-sans font-semibold text-white text-sm">Sarah Chen</div>
                    <div className="text-slate-400 text-xs">Elite HVAC Services</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ 
                  y: -10, 
                  rotateX: 5, 
                  rotateY: 5,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="relative bg-[#0f1112] border border-white/10 rounded-2xl p-6 hover:border-[#d9c4aa]/30 transition-all duration-300 group overflow-hidden"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-[#d9c4aa]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-300/90 leading-relaxed mb-4">"The AI agent sounds so natural, customers think they're talking to a real person. Our conversion rate doubled."</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d9c4aa] to-[#b89463] flex items-center justify-center">
                    <span className="text-black font-bold text-sm">DJ</span>
                  </div>
                  <div>
                    <div className="font-sans font-semibold text-white text-sm">David Johnson</div>
                    <div className="text-slate-400 text-xs">Premier Plumbing</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SHOWCASE STRIPS */}
        <ShowcaseStrips />

        {/* OUR SERVICES */}
        <section className="py-24 bg-[#111315]">
          <SectionHead eyebrow="Complete Solution" title="Three integrated services for maximum conversion" sub="We don't just build one piece—we create the entire ecosystem that turns visitors into booked appointments." />
          <div className="max-w-[1080px] mx-auto px-6 grid md:grid-cols-3 gap-4">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="rounded-2xl border border-[rgba(217,196,170,.18)] bg-[#111315] p-8 shadow-[0_8px_24px_rgba(0,0,0,.25),inset_0_1px_0_rgba(217,196,170,.06)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#d9c4aa] to-[#b89463] flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-black">
                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 9H14V4H5V21H19V9Z" fill="currentColor"/>
                  </svg>
                </div>
                <div className="font-display text-[#d9c4aa] uppercase tracking-[0.22em] text-lg">AI Voice Agents</div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="font-sans font-semibold text-white mb-2">Outbound Calling</div>
                  <p className="ui-track text-slate-300/90 leading-7">Form submit triggers AI to call leads in 2-5 minutes. Custom qualification scripts, calendar booking, 24/7 coverage with voicemail + SMS fallback.</p>
                </div>
                <div className="hairline"></div>
                <div>
                  <div className="font-sans font-semibold text-white mb-2">Inbound Handling</div>
                  <p className="ui-track text-slate-300/90 leading-7">Conversational IVR with intelligent routing. Triage modes for emergencies, human handoff when needed, TCPA-compliant sequences.</p>
                </div>
                <div className="hairline"></div>
                <div className="bg-[#d9c4aa]/5 rounded-xl p-4 border border-[#d9c4aa]/20">
                  <div className="text-[#d9c4aa] font-sans font-semibold text-xs uppercase tracking-[0.12em] mb-2">What You Get</div>
                  <div className="space-y-1.5 text-xs text-slate-300/90">
                    <div className="flex items-center gap-2">
                      <svg className="w-3 h-3 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      <span>70% contact rate (vs 35% manual)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-3 h-3 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      <span>2-5 min response (vs 4+ hours)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-3 h-3 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      <span>$0 additional staff costs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-3 h-3 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      <span>24/7 coverage (weekends + holidays)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-3 h-3 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      <span>Avg ROI: 312% in first 90 days</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="rounded-2xl border border-[rgba(217,196,170,.18)] bg-[#111315] p-8 shadow-[0_8px_24px_rgba(0,0,0,.25),inset_0_1px_0_rgba(217,196,170,.06)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#d9c4aa] to-[#b89463] flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-black">
                    <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM17 12H15V7H13V12H11L14 16L17 12Z" fill="currentColor"/>
                  </svg>
                </div>
                <div className="font-display text-[#d9c4aa] uppercase tracking-[0.22em] text-lg">Marketing Automation</div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="font-sans font-semibold text-white mb-2">Conversion Landing Pages</div>
                  <p className="ui-track text-slate-300/90 leading-7">Fast, mobile-first pages with CRO optimization. Analytics, heatmaps, A/B testing, and instant lead capture integration.</p>
                </div>
                <div className="hairline"></div>
                <div>
                  <div className="font-sans font-semibold text-white mb-2">Lead Management</div>
                  <p className="ui-track text-slate-300/90 leading-7">Complete CRM integration, lead scoring, automated follow-up sequences, and performance tracking across all touchpoints.</p>
                </div>
                <div className="hairline"></div>
                <div className="bg-[#d9c4aa]/5 rounded-xl p-4 border border-[#d9c4aa]/20">
                  <div className="text-[#d9c4aa] font-sans font-semibold text-xs uppercase tracking-[0.12em] mb-2">What You Get</div>
                  <div className="space-y-1.5 text-xs text-slate-300/90">
                    <div className="flex items-center gap-2">
                      <svg className="w-3 h-3 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      <span>10x faster load vs WordPress</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-3 h-3 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      <span>45% higher conversion rate</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-3 h-3 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      <span>Built-in A/B testing & heatmaps</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-3 h-3 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      <span>Instant AI callback integration</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-3 h-3 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      <span>Mobile-first responsive design</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="rounded-2xl border border-[rgba(217,196,170,.18)] bg-[#111315] p-8 shadow-[0_8px_24px_rgba(0,0,0,.25),inset_0_1px_0_rgba(217,196,170,.06)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#d9c4aa] to-[#b89463] flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-black">
                    <path d="M17 10.5V7C17 6.45 16.55 6 16 6H4C3.45 6 3 6.45 3 7V17C3 17.55 3.45 18 4 18H16C16.55 18 17 17.55 17 17V13.5L21 17.5V6.5L17 10.5Z" fill="currentColor"/>
                  </svg>
                </div>
                <div className="font-display text-[#d9c4aa] uppercase tracking-[0.22em] text-lg">Custom 10-Second Ads</div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="font-sans font-semibold text-white mb-2">Cinematic Production</div>
                  <p className="ui-track text-slate-300/90 leading-7">Professional video creation: scripted, captioned, color-graded, and sound-designed. Vertical + widescreen formats for all platforms.</p>
                </div>
                <div className="hairline"></div>
                <div>
                  <div className="font-sans font-semibold text-white mb-2">Industry-Specific</div>
                  <p className="ui-track text-slate-300/90 leading-7">Tailored messaging for roofing, HVAC, plumbing, legal, medical, and other high-value service industries.</p>
                </div>
                <div className="hairline"></div>
                <div className="bg-[#d9c4aa]/5 rounded-xl p-4 border border-[#d9c4aa]/20">
                  <div className="text-[#d9c4aa] font-sans font-semibold text-xs uppercase tracking-[0.12em] mb-2">What You Get</div>
                  <div className="space-y-1.5 text-xs text-slate-300/90">
                    <div className="flex items-center gap-2">
                      <svg className="w-3 h-3 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      <span>Professional cinematography</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-3 h-3 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      <span>Vertical + widescreen formats</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-3 h-3 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      <span>Captions, color-grading, sound</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-3 h-3 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      <span>3-5 day turnaround</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-3 h-3 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      <span>Proven to reduce CPL by 40%+</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* INSTANT CALLBACK — LEAD FORM */}
        <section id="instant" className="py-24 bg-[#111315]">
          <div className="max-w-[1080px] mx-auto px-6 grid md:grid-cols-[1.1fr_.9fr] gap-8 items-start">
            <div>
              <SectionHead eyebrow="Get Started Today" title="Your AI agent calls in 2-5 minutes" sub="Complete setup in 24 hours. Start converting more leads immediately with our proven system." />
              
              {/* Value proposition highlights */}
              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#d9c4aa]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-[#d9c4aa] rounded-full"></div>
                  </div>
                  <div>
                    <div className="font-sans font-semibold text-white">5-Day Free Trial Program</div>
                    <p className="ui-track text-slate-300/80 text-sm">Test drive the system risk-free. See results in 5 days with the trial period implemented into your business or company.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#d9c4aa]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-[#d9c4aa] rounded-full"></div>
                  </div>
                  <div>
                    <div className="font-sans font-semibold text-white">Complete Setup Included</div>
                    <p className="ui-track text-slate-300/80 text-sm">We handle everything: AI training, calendar integration, custom scripts, and testing.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#d9c4aa]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-[#d9c4aa] rounded-full"></div>
                  </div>
                  <div>
                    <div className="font-sans font-semibold text-white">24/7 Lead Capture</div>
                    <p className="ui-track text-slate-300/80 text-sm">Never miss another lead. Your AI agent works nights, weekends, and holidays.</p>
                  </div>
                </div>
              </div>
              
              {/* Urgency element */}
              <div className="mt-6 p-4 rounded-xl border border-red-500/30 bg-red-500/5 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-red-400 font-sans uppercase text-[10px] tracking-[0.12em] font-semibold">Limited Availability</span>
                </div>
                <p className="text-slate-300/90 text-sm">Only 3 new clients per month. Current wait time: 2-3 weeks.</p>
              </div>
            </div>
            <LeadForm />
          </div>
        </section>

        {/* QUANTITATIVE WOW */}
        <section id="wow" className="py-24">
          <SectionHead eyebrow="Quantitative WOW" title="The disruptive leap in performance" sub="Instant AI speed doubles live contact from ~35% → ~70%." />
          <div className="max-w-[1080px] mx-auto px-6 grid md:grid-cols-4 gap-4">
            <AnimatedStatBlock value="2–5 min" label="Response time" delay={0.1} />
            <AnimatedStatBlock value="70%" label="Initial contact rate" delay={0.2} />
            <AnimatedStatBlock value="24/7" label="Coverage" delay={0.3} />
            <AnimatedStatBlock value="VM + SMS" label="Missed-call follow‑up" delay={0.4} />
          </div>
          
          {/* Animated Social Proof Counters */}
          <div className="max-w-[1080px] mx-auto px-6 mt-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="rounded-2xl border border-[#d9c4aa]/40 bg-[#d9c4aa]/10 p-8 shadow-[0_18px_50px_rgba(0,0,0,.45)]"
            >
              <div className="text-center mb-8">
                <div className="font-display text-[#d9c4aa] uppercase tracking-[0.22em] text-xl mb-2">Trusted by Growing Businesses</div>
                <p className="ui-track text-slate-300/80">Real results from real clients</p>
              </div>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <div className="font-num text-4xl text-[#d9c4aa] mb-1">500+</div>
                  <div className="text-sm ui-track text-slate-300/80">Leads Processed</div>
                </motion.div>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="font-num text-4xl text-[#d9c4aa] mb-1">2,000+</div>
                  <div className="text-sm ui-track text-slate-300/80">AI Calls Made</div>
                </motion.div>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <div className="font-num text-4xl text-[#d9c4aa] mb-1">50+</div>
                  <div className="text-sm ui-track text-slate-300/80">Businesses Served</div>
                </motion.div>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="font-num text-4xl text-[#d9c4aa] mb-1">$2M+</div>
                  <div className="text-sm ui-track text-slate-300/80">Revenue Generated</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
          <div className="max-w-[1080px] mx-auto px-6 mt-6 grid md:grid-cols-2 gap-4">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .5 }} className="rounded-2xl border border-[#d9c4aa]/40 bg-[#d9c4aa]/10 p-8 shadow-[0_8px_24px_rgba(0,0,0,.25),inset_0_1px_0_rgba(217,196,170,.06)]">
              <div className="font-display text-[#d9c4aa] uppercase tracking-[0.22em] text-lg">DFW Roofing Case Study</div>
              <p className="mt-3 font-sans text-slate-300/90 leading-7 ui-track">80/mo leads → ~3.5 jobs (manual) vs ~10 jobs (AI). ~$78k/mo net uplift at ~$12k avg job.</p>
              <button className="mt-4 rounded-xl border border-[#d9c4aa]/40 px-4 py-2 text-sm ui-track hover:bg-[#d9c4aa]/5 transition-all">Download 1-page PDF →</button>
            </motion.div>
            <FeatureCard title="Loss prevention" body="Captures high-intent after-hours traffic and eliminates slow-response leakage. Every missed lead is revenue left on the table—instant response plugs the leak." />
          </div>
        </section>

        <LocalServiceAutomationPackage />

        {/* SMART ARCHITECTURE */}
        <section id="architecture" className="py-24 bg-[#111315]">
          <SectionHead eyebrow="Smart Architecture" title="Built for conversion (CRO)" sub="Fast, responsive, brand-matched. Trigger form posts to GHL → AI calls instantly." />
          <div className="max-w-[1080px] mx-auto px-6 grid md:grid-cols-3 gap-4">
            <FeatureCard title="CRO + speed" body="Editorial hierarchy, mobile-first speed, minimal friction." />
            <FeatureCard title="Continuous optimization" body="Analytics & heatmaps integrated. A/B testing + monthly CRO in Market Leader tier." />
            <FeatureCard title="Trigger mechanism" body="Lead form captures intent and posts to CRM; AI dial + booking starts immediately." />
          </div>
        </section>

        {/* SMART WEBSITE DEEP DIVE */}
        <section id="smart-website" className="py-24">
          <SectionHead eyebrow="Smart Website Technology" title="Your website that works while you sleep" sub="Beyond pretty brochures—intelligent, adaptive, and optimized for conversion and business growth." />
          
          <div className="max-w-[1080px] mx-auto px-6">
            {/* Value Proposition */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <div className="bg-gradient-to-br from-[#d9c4aa]/10 to-[#b89463]/10 rounded-2xl p-8 border border-[#d9c4aa]/20">
                <h3 className="text-2xl font-display text-[#d9c4aa] mb-4">The Forsythe Smart Website Value Proposition</h3>
                <p className="text-slate-300 leading-relaxed text-lg">
                  Your website shouldn't just look good—it should <em>work smart</em>. At Forsythe Publishing & Marketing, we build <strong>Smart Websites</strong> that think and act like a sales team: tracking every visitor, responding instantly through <strong>AI Voice Agents</strong>, and converting interest into booked appointments. Combined with our <strong>marketing automation</strong> and <strong>cinematic 10-second ad videos</strong>, your site becomes a complete conversion engine—one that captures missed calls, calls leads back in under 2 minutes, qualifies them, and fills your calendar while you sleep. This isn't web design; it's a self-optimizing digital salesperson that works 24/7, boosting conversions, saving labor, and scaling revenue automatically.
                </p>
          </div>
            </motion.div>

            {/* Smart Website Cinematic Ad */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-16"
            >
              <div className="relative max-w-5xl mx-auto">
                <div className="rounded-2xl overflow-hidden bg-black border border-white/10 shadow-[0_25px_50px_rgba(0,0,0,.5)]">
                  <video 
                    className="w-full h-auto object-contain"
                    loop
                    playsInline
                    preload="metadata"
                    controls
                    onLoadedData={() => console.log('Smart website video loaded successfully')}
                    onError={(e) => console.error('Smart website video failed to load:', e)}
                  >
                    <source src="/smart site/20251018_1102_01k7w0wqgnfae9vne95mfqa2v0.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                
                {/* Video info */}
                <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-2xl">
                  <div className="text-white text-sm font-sans">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="font-semibold">Smart Website Commercial</span>
                    </div>
                    <div className="text-white/80 text-xs">Click to play • Cinematic showcase of intelligent web technology</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* What is a Smart Website */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-16"
            >
              <h3 className="text-3xl font-display text-white mb-8">✅ What is a Smart Website</h3>
              <p className="text-slate-300 mb-6 text-lg leading-relaxed">
                A "smart website" goes beyond being just pretty or informational. It's <strong>interactive</strong>, <strong>adaptive</strong>, and <strong>optimized for conversion and business growth</strong>. Key elements:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#d9c4aa] flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-[#d9c4aa] font-semibold mb-1">Personalization & Dynamic Content</h4>
                      <p className="text-slate-300 text-sm">The website changes what it shows depending on the visitor (their source, behavior, device).</p>
            </div>
          </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#d9c4aa] flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                </div>
                    <div>
                      <h4 className="text-[#d9c4aa] font-semibold mb-1">Automation & Integration</h4>
                      <p className="text-slate-300 text-sm">Connects with your tools (CRM, calendar, lead capture, voice-agents) so leads flow seamlessly.</p>
                    </div>
            </div>
          </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#d9c4aa] flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-[#d9c4aa] font-semibold mb-1">Conversion-Driven Design</h4>
                      <p className="text-slate-300 text-sm">Clear CTAs, fast load times, mobile optimized, strong user experience.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#d9c4aa] flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-[#d9c4aa] font-semibold mb-1">Data & Analytics Loop</h4>
                      <p className="text-slate-300 text-sm">Tracks what happens, learns what works, and adapts (A/B tests, predictive behavior) so you continually improve.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Why It's Valuable */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-16"
            >
              <h3 className="text-3xl font-display text-white mb-8">💡 Why It's Valuable to You as a Business Owner</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-[#111315] rounded-xl p-6 border border-white/10">
                    <h4 className="text-xl font-display text-[#d9c4aa] mb-3">1. More Leads Convert Into Real Actions</h4>
                    <p className="text-slate-300 leading-relaxed">
                      Because the site is optimized (fast, clear, personalized), you're losing fewer potential clients at the "just visited" stage. Websites with strong CTAs, mobile performance and usability convert <strong>up to 3× more</strong>.
                    </p>
                  </div>
                  
                  <div className="bg-[#111315] rounded-xl p-6 border border-white/10">
                    <h4 className="text-xl font-display text-[#d9c4aa] mb-3">2. Your Website Becomes a Working Asset</h4>
                    <p className="text-slate-300 leading-relaxed">
                      Rather than just "here's our services", you get "visitor comes → website responds → voice-agent calls back or books → client shows up". That flow means your website + technology actually drive business.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-[#111315] rounded-xl p-6 border border-white/10">
                    <h4 className="text-xl font-display text-[#d9c4aa] mb-3">3. Efficient Operations & Cost Control</h4>
                    <p className="text-slate-300 leading-relaxed">
                      Smart websites automate follow-up, personalize without manual work, reduce "leads that fall through the cracks." That means fewer wasted leads, fewer manual touches, more free time.
                    </p>
                  </div>
                  
                  <div className="bg-[#111315] rounded-xl p-6 border border-white/10">
                    <h4 className="text-xl font-display text-[#d9c4aa] mb-3">4. Better Competitive Position</h4>
                    <p className="text-slate-300 leading-relaxed">
                      If you offer this as part of your service, you're selling something beyond "we build websites" → you're selling "your business has a smart conversion engine". This raises perceived value and lets you charge more.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Key Features Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-16"
            >
              <h3 className="text-3xl font-display text-white mb-8">🛠 Key Features to Build/Include in Your Smart Website</h3>
              
              <div className="bg-[#111315] rounded-2xl overflow-hidden border border-white/10">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#d9c4aa]/10">
                      <tr>
                        <th className="text-left p-6 text-[#d9c4aa] font-display">Feature</th>
                        <th className="text-left p-6 text-[#d9c4aa] font-display">Why It Matters</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      <tr>
                        <td className="p-6 text-white font-semibold">Mobile-first, fast load (&lt;3 seconds)</td>
                        <td className="p-6 text-slate-300">Most visitors are mobile; slow sites lose them.</td>
                      </tr>
                      <tr>
                        <td className="p-6 text-white font-semibold">Clear, action-oriented CTAs</td>
                        <td className="p-6 text-slate-300">Drives visitors to action with compelling call-to-action buttons.</td>
                      </tr>
                      <tr>
                        <td className="p-6 text-white font-semibold">Automated callback trigger + voice-agent integration</td>
                        <td className="p-6 text-slate-300">Leads captured quickly, reduces loss of hot leads.</td>
                      </tr>
                      <tr>
                        <td className="p-6 text-white font-semibold">Personalized or segmented content</td>
                        <td className="p-6 text-slate-300">Makes visitor feel "this site is talking to me".</td>
                      </tr>
                      <tr>
                        <td className="p-6 text-white font-semibold">Analytics and lead-tracking</td>
                        <td className="p-6 text-slate-300">Enables optimization and demonstrates ROI.</td>
                      </tr>
                      <tr>
                        <td className="p-6 text-white font-semibold">Strong security + trust markers</td>
                        <td className="p-6 text-slate-300">Builds credibility and reduces bounce rate.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>


            {/* Final Take */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-center"
            >
              <div className="bg-gradient-to-br from-[#d9c4aa]/10 to-[#b89463]/10 rounded-2xl p-8 border border-[#d9c4aa]/20">
                <h3 className="text-2xl font-display text-[#d9c4aa] mb-4">🔮 Final Take</h3>
                <p className="text-slate-300 leading-relaxed text-lg max-w-4xl mx-auto">
                  As a business owner (and someone selling conversion ecosystems), a smart website is a <strong>force multiplier</strong>. It amplifies your other services (voice agents, ads, marketing automation) and gives you a strong value-hook: <em>"We don't just build you a website—we build you a business engine."</em> For your clients it means: less missed calls/leads, more booked work, and higher revenue without hiring more staff.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* INTELLIGENT FUNCTIONALITY */}
        <section id="functionality" className="py-24">
          <SectionHead eyebrow="Intelligent Functionality" title="Complex triage & logistics" sub="Custom prompt flows, calendar booking, IVR, guardrails, and compliance." />
          <div className="max-w-[1080px] mx-auto px-6 grid md:grid-cols-3 gap-4">
            <FeatureCard title="Service-specific triage" body="Roofing: hail damage, roof age, insurance. Mitigation: triage mode. Commercial: TPO/EPDM specifics." />
            <FeatureCard title="Goal: scheduled appointment" body="Books 30–60 min slots; round robin; geo guardrails prevent inefficient routes." />
            <FeatureCard title="Inbound + compliance" body="Conversational IVR w/ human handoff; TCPA & DNC safe sequences; voicemail + SMS backup." />
          </div>
        </section>

        {/* Problem/Solution spread */}
        <section className="py-24">
          <SectionHead eyebrow="The Problem" title="Stop losing jobs to slow follow‑up" sub="You pay for the click. We capture the moment. First to respond wins—every time." />
          <div className="max-w-[1080px] mx-auto px-6 grid md:grid-cols-3 gap-4">
            <FeatureCard title="After‑hours black hole" body="Storm damage at 11pm? We answer. Weekends & holidays included." />
            <FeatureCard title="Phone‑tag spiral" body="Manual dialing loses intent windows. Baseline ~35% live contact." />
            <FeatureCard title="Intake drift" body="We lock tone & qualification so field time isn't wasted." />
          </div>
        </section>

        {/* Solution */}
        <section className="py-24 bg-[#111315]">
          <SectionHead eyebrow="The Solution" title="An agent that never sleeps" sub="Custom flows per service, TCPA‑aware cadence, and native CRM + calendar integrations." />
          <div className="max-w-[1080px] mx-auto px-6 grid md:grid-cols-3 gap-4">
            <FeatureCard title="Instant response" body="Form submit → callback in 2–5 minutes. Retries + SMS fallback." />
            <FeatureCard title="Perfect qualification" body="Flows per line of business (roofing/HVAC/plumbing/mitigation)." />
            <FeatureCard title="Auto‑booking" body="Books to calendar, confirms, and writes back to CRM." />
          </div>
        </section>

        {/* Demo */}
        <section id="demo" className="py-24">
          <SectionHead title="See it in action" sub="Real call: storm damage lead qualified and booked in under five minutes." />
          <div className="max-w-[1000px] mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }} className="rounded-2xl border border-white/10 bg-[#111315] p-3 shadow-[0_18px_50px_rgba(0,0,0,.45)]">
              <div className="relative pb-[56.25%] rounded-xl overflow-hidden border border-white/10">
                <video className="absolute inset-0 w-full h-full" controls poster="">
                  <source src="/ads/hero-demo.mp4" type="video/mp4" />
                </video>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Interactive ROI Calculator */}
        <section className="py-16 sm:py-24 bg-[#111315]">
          <SectionHead eyebrow="ROI Calculator" title="See your potential results" sub="Input your current metrics to see how our AI voice agents could transform your business." />
          <div className="max-w-[1080px] mx-auto px-4 sm:px-6">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="rounded-2xl border border-[#d9c4aa]/40 bg-[#d9c4aa]/10 p-6 sm:p-8 shadow-[0_18px_50px_rgba(0,0,0,.45)]"
            >
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                <div>
                  <h3 className="font-display text-[#d9c4aa] uppercase tracking-[0.22em] text-lg sm:text-xl mb-4 sm:mb-6">Your Current Situation</h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-sans font-semibold text-white mb-1 sm:mb-2">Monthly Leads</label>
                      <input 
                        type="number" 
                        id="leads"
                        defaultValue="80"
                        className="w-full rounded-xl bg-black/30 border border-white/10 px-3 sm:px-4 py-2.5 sm:py-3 ui-track focus:ring-2 focus:ring-[#d9c4aa]/50 focus:border-[#d9c4aa]/50 transition-all text-sm sm:text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-sans font-semibold text-white mb-1 sm:mb-2">Current Contact Rate (%)</label>
                      <input 
                        type="number" 
                        id="contactRate"
                        defaultValue="35"
                        className="w-full rounded-xl bg-black/30 border border-white/10 px-3 sm:px-4 py-2.5 sm:py-3 ui-track focus:ring-2 focus:ring-[#d9c4aa]/50 focus:border-[#d9c4aa]/50 transition-all text-sm sm:text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-sans font-semibold text-white mb-1 sm:mb-2">Average Job Value ($)</label>
                      <input 
                        type="number" 
                        id="jobValue"
                        defaultValue="12000"
                        className="w-full rounded-xl bg-black/30 border border-white/10 px-3 sm:px-4 py-2.5 sm:py-3 ui-track focus:ring-2 focus:ring-[#d9c4aa]/50 focus:border-[#d9c4aa]/50 transition-all text-sm sm:text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-sans font-semibold text-white mb-1 sm:mb-2">Close Rate (%)</label>
                      <input 
                        type="number" 
                        id="closeRate"
                        defaultValue="15"
                        className="w-full rounded-xl bg-black/30 border border-white/10 px-3 sm:px-4 py-2.5 sm:py-3 ui-track focus:ring-2 focus:ring-[#d9c4aa]/50 focus:border-[#d9c4aa]/50 transition-all text-sm sm:text-base"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-display text-[#d9c4aa] uppercase tracking-[0.22em] text-lg sm:text-xl mb-4 sm:mb-6">With AI Voice Agents</h3>
                  <div className="space-y-4 sm:space-y-6">
                    <div className="p-4 sm:p-6 rounded-xl bg-black/20 border border-[#d9c4aa]/20">
                      <div className="text-xs sm:text-sm ui-track text-slate-300/80 mb-1 sm:mb-2">Current Monthly Jobs</div>
                      <div className="font-num text-xl sm:text-2xl text-white" id="currentJobs">3.5</div>
                    </div>
                    <div className="p-4 sm:p-6 rounded-xl bg-black/20 border border-[#d9c4aa]/20">
                      <div className="text-xs sm:text-sm ui-track text-slate-300/80 mb-1 sm:mb-2">With AI Monthly Jobs</div>
                      <div className="font-num text-xl sm:text-2xl text-[#d9c4aa]" id="aiJobs">10.0</div>
                    </div>
                    <div className="p-4 sm:p-6 rounded-xl bg-gradient-to-br from-[#d9c4aa]/20 to-[#b89463]/20 border border-[#d9c4aa]/40">
                      <div className="text-xs sm:text-sm ui-track text-slate-300/80 mb-1 sm:mb-2">Additional Monthly Revenue</div>
                      <div className="font-num text-2xl sm:text-3xl text-[#d9c4aa] font-bold" id="additionalRevenue">$78,000</div>
                    </div>
                    <div className="p-4 sm:p-6 rounded-xl bg-black/20 border border-[#d9c4aa]/20">
                      <div className="text-xs sm:text-sm ui-track text-slate-300/80 mb-1 sm:mb-2">Annual Revenue Increase</div>
                      <div className="font-num text-xl sm:text-2xl text-white" id="annualRevenue">$936,000</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 sm:mt-8 p-4 sm:p-6 rounded-xl bg-black/20 border border-[#d9c4aa]/20">
                <div className="text-center">
                  <div className="font-display text-[#d9c4aa] uppercase tracking-[0.22em] text-base sm:text-lg mb-2">Ready to see these results?</div>
                  <p className="ui-track text-slate-300/80 mb-4 text-sm sm:text-base">Start with a 5-day free trial period implemented into your business or company to prove the value</p>
                  <button onClick={() => setCalOpen(true)} className="rounded-xl bg-gradient-to-br from-[#d9c4aa] to-[#b89463] text-black font-sans font-extrabold px-6 sm:px-8 py-3.5 sm:py-3 min-h-[48px] shadow-[0_10px_26px_rgba(216,184,138,.25)] hover:shadow-[0_14px_32px_rgba(216,184,138,.35)] transition-all text-base sm:text-base active:scale-95">
                    Start 5-Day Free Trial
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Downloads + CTA */}
        <section id="downloads" className="py-24">
          <SectionHead title="Evaluate, share, deploy" sub="Docs, trial plans, media, and case studies for quick internal approval." />
          <div className="max-w-[1080px] mx-auto px-6 grid md:grid-cols-3 gap-4">
            <FeatureCard title="Complete kit" body="All docs + media • 723 MB" />
            <FeatureCard title="Documents" body="PDFs, PPTX • 18 MB" />
            <FeatureCard title="Media pack" body="Videos & audio • 705 MB" />
          </div>
          <div id="book" className="max-w-[1080px] mx-auto px-6 mt-10">
            <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }} className="rounded-2xl border border-[#d9c4aa]/40 bg-[#d9c4aa]/10 text-center p-8 shadow-[0_18px_50px_rgba(0,0,0,.45)]">
              <h3 className="font-display text-[#d9c4aa] uppercase tracking-[var(--ls-sub)] text-2xl">Ready to stop losing leads?</h3>
              <p className="mt-2 ui-track text-slate-300/80">No‑risk 5-day free trial period with real leads implemented into your business or company. Prove it, then scale.</p>
              <div className="mt-4 flex flex-col sm:flex-row justify-center gap-3 flex-wrap">
                <a href="tel:+18172108487" className="rounded-xl border border-white/15 px-6 py-3.5 min-h-[48px] flex items-center justify-center ui-track text-base active:scale-95 transition-transform">Call (817) 210‑8487</a>
                <button onClick={() => setCalOpen(true)} className="rounded-xl bg-gradient-to-br from-[#d9c4aa] to-[#b89463] text-black font-sans font-extrabold px-6 py-3.5 min-h-[48px] text-base shadow-[0_10px_26px_rgba(216,184,138,.25)] active:scale-95 transition-transform">Book discovery call</button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* COMPONENTS TRIAD */}
        <section id="components" className="py-24 bg-[#111315]">
          <SectionHead eyebrow="Complete Conversion Ecosystem" title="Three integrated services working together" sub="AI voice agents (inbound & outbound), marketing automation, and custom video ads—all designed to maximize your conversion rate." />
          <div className="max-w-[1080px] mx-auto px-6 grid md:grid-cols-3 gap-4">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="rounded-2xl border border-[rgba(217,196,170,.18)] bg-[#111315] p-8 shadow-[0_8px_24px_rgba(0,0,0,.25),inset_0_1px_0_rgba(217,196,170,.06)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#d9c4aa] to-[#b89463] flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-black">
                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 9H14V4H5V21H19V9Z" fill="currentColor"/>
                  </svg>
                </div>
                <h3 className="font-display text-white uppercase tracking-[0.22em] text-lg">AI Voice Agents</h3>
              </div>
              <p className="ui-track text-slate-300/90 leading-7">
                <span className="font-sans font-semibold text-white">Outbound:</span> Form submit triggers AI to call leads in 2-5 minutes. 
                <span className="font-sans font-semibold text-white"> Inbound:</span> Conversational IVR with intelligent routing and human handoff. Custom scripts, calendar booking, 24/7 coverage.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="rounded-2xl border border-[rgba(217,196,170,.18)] bg-[#111315] p-8 shadow-[0_8px_24px_rgba(0,0,0,.25),inset_0_1px_0_rgba(217,196,170,.06)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#d9c4aa] to-[#b89463] flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-black">
                    <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM17 12H15V7H13V12H11L14 16L17 12Z" fill="currentColor"/>
                  </svg>
                </div>
                <h3 className="font-display text-white uppercase tracking-[0.22em] text-lg">Marketing Automation</h3>
              </div>
              <p className="ui-track text-slate-300/90 leading-7">
                CRO-optimized pages that convert visitors into leads. Complete CRM integration, lead scoring, automated follow-up sequences, analytics, and performance tracking.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="rounded-2xl border border-[rgba(217,196,170,.18)] bg-[#111315] p-8 shadow-[0_8px_24px_rgba(0,0,0,.25),inset_0_1px_0_rgba(217,196,170,.06)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#d9c4aa] to-[#b89463] flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-black">
                    <path d="M17 10.5V7C17 6.45 16.55 6 16 6H4C3.45 6 3 6.45 3 7V17C3 17.55 3.45 18 4 18H16C16.55 18 17 17.55 17 17V13.5L21 17.5V6.5L17 10.5Z" fill="currentColor"/>
                  </svg>
                </div>
                <h3 className="font-display text-white uppercase tracking-[0.22em] text-lg">Custom Video Ads</h3>
              </div>
              <p className="ui-track text-slate-300/90 leading-7">
                Professional video production: scripted, captioned, color-graded, sound-designed. Vertical + widescreen formats. Industry-specific messaging for maximum engagement.
              </p>
            </motion.div>
          </div>
        </section>

        {/* PACKAGES & PRICING */}
        <section id="roi" className="py-20">
          <SectionHead eyebrow="Quantitative WOW" title="The big lever: more live conversations" sub="Instant follow‑up doubles your contact rate; speed wins the deal." />
          <div className="max-w-[1080px] mx-auto px-6 grid md:grid-cols-3 gap-4">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .5 }} className="rounded-2xl border border-[#d9c4aa]/40 bg-[#d9c4aa]/10 p-6 shadow-[0_18px_50px_rgba(0,0,0,.45)]">
              <div className="font-display text-[#d9c4aa] uppercase tracking-[var(--ls-sub)]">Contact rate uplift</div>
              <div className="mt-2 text-2xl font-num">35% → 70%</div>
              <p className="ui-track text-slate-300/80 mt-1">Same ad spend, twice the conversations.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .5, delay: .05 }} className="rounded-2xl border border-white/10 bg-[#0f1112] p-6">
              <div className="font-display text-[#d9c4aa] uppercase tracking-[var(--ls-sub)]">Speed to lead</div>
              <div className="mt-2 text-2xl font-num">2–5 minutes</div>
              <p className="ui-track text-slate-300/80 mt-1">AI calls instantly, 24/7 with smart retries + SMS/VM fallback.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .5, delay: .10 }} className="rounded-2xl border border-white/10 bg-[#0f1112] p-6">
              <div className="font-display text-[#d9c4aa] uppercase tracking-[var(--ls-sub)]">Revenue logic</div>
              <div className="mt-2 text-2xl font-num">One extra job covers it</div>
              <p className="ui-track text-slate-300/80 mt-1">Engagement framed as operational insurance; protect high‑value leads.</p>
            </motion.div>
          </div>
        </section>

        {/* ENGAGEMENT MODELS */}
        <section id="engagement" className="py-24">
          <SectionHead eyebrow="Service Packages" title="Choose your level of automation" sub="Each package includes different combinations of our three core services: AI voice agents, marketing automation, and custom video ads." />
          <div className="max-w-[1080px] mx-auto px-6 grid md:grid-cols-3 gap-4">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .5 }} className="rounded-2xl border border-[rgba(217,196,170,.18)] bg-[#111315] p-8 shadow-[0_8px_24px_rgba(0,0,0,.25),inset_0_1px_0_rgba(217,196,170,.06)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#d9c4aa] to-[#b89463] flex items-center justify-center">
                  <span className="font-num text-black font-bold text-lg">1</span>
              </div>
                <div className="font-display text-[#d9c4aa] uppercase tracking-[var(--ls-sub)] text-lg">Essential</div>
              </div>
              <div className="mb-6">
                <div className="font-sans font-semibold text-white mb-2">AI Voice Agents</div>
                <p className="ui-track text-slate-300/80 leading-7">Outbound AI calling to plug the leaky lead bucket. Form submit → AI call in 2–5 min. 24/7 coverage with voicemail + SMS fallback.</p>
              </div>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#d9c4aa]"></div>
                  <span className="ui-track text-slate-300/80 text-sm">Outbound AI voice agent setup</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#d9c4aa]"></div>
                  <span className="ui-track text-slate-300/80 text-sm">Custom prompt flows & scripts</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#d9c4aa]"></div>
                  <span className="ui-track text-slate-300/80 text-sm">Calendar booking integration</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#d9c4aa]"></div>
                  <span className="ui-track text-slate-300/80 text-sm">Basic landing page optimization</span>
                </div>
              </div>
              <div className="mb-4 p-4 rounded-xl bg-black/20 border border-[#d9c4aa]/20">
                <div className="text-sm font-sans font-semibold text-[#d9c4aa] mb-1">Investment Range</div>
                <div className="text-xs ui-track text-slate-300/80">$1,500-$3,500/month + setup</div>
                <div className="text-xs ui-track text-slate-400 mt-1">Target: 20-80 leads/month</div>
              </div>
              <button onClick={() => setCalOpen(true)} className="w-full rounded-xl bg-gradient-to-br from-[#d9c4aa] to-[#b89463] text-black font-sans font-extrabold px-5 py-3 shadow-[0_10px_26px_rgba(216,184,138,.25)] hover:shadow-[0_14px_32px_rgba(216,184,138,.35)] transition-all">Request proposal</button>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .5, delay: .05 }} className="rounded-2xl border border-[#d9c4aa]/40 bg-[#d9c4aa]/10 p-8 shadow-[0_18px_50px_rgba(0,0,0,.45)] relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-br from-[#d9c4aa] to-[#b89463] text-black px-4 py-1 rounded-full text-xs font-sans font-bold uppercase tracking-[0.12em]">Most Popular</span>
              </div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#d9c4aa] to-[#b89463] flex items-center justify-center">
                  <span className="font-num text-black font-bold text-lg">2</span>
                </div>
                <div className="font-display text-[#d9c4aa] uppercase tracking-[var(--ls-sub)] text-lg">Growth</div>
              </div>
              <div className="mb-6">
                <div className="font-sans font-semibold text-white mb-2">AI + Marketing</div>
                <p className="ui-track text-slate-300/80 leading-7">Add inbound AI handling, complete marketing automation, and advanced CRO optimization for maximum conversion.</p>
              </div>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#d9c4aa]"></div>
                  <span className="ui-track text-slate-300/80 text-sm">Inbound + outbound AI voice agents</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#d9c4aa]"></div>
                  <span className="ui-track text-slate-300/80 text-sm">Complete marketing automation</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#d9c4aa]"></div>
                  <span className="ui-track text-slate-300/80 text-sm">Advanced CRO landing pages</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#d9c4aa]"></div>
                  <span className="ui-track text-slate-300/80 text-sm">Analytics + performance tracking</span>
                </div>
              </div>
              <div className="mb-4 p-4 rounded-xl bg-black/20 border border-[#d9c4aa]/20">
                <div className="text-sm font-sans font-semibold text-[#d9c4aa] mb-1">Investment Range</div>
                <div className="text-xs ui-track text-slate-300/80">$3,500-$7,500/month + setup</div>
                <div className="text-xs ui-track text-slate-400 mt-1">Target: 80-200 leads/month</div>
              </div>
              <button onClick={() => setCalOpen(true)} className="w-full rounded-xl border border-white/15 px-5 py-3 ui-track hover:bg-white/5 transition-all">Book discovery call</button>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .5, delay: .10 }} className="rounded-2xl border border-[rgba(217,196,170,.18)] bg-[#111315] p-8 shadow-[0_8px_24px_rgba(0,0,0,.25),inset_0_1px_0_rgba(217,196,170,.06)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#d9c4aa] to-[#b89463] flex items-center justify-center">
                  <span className="font-num text-black font-bold text-lg">3</span>
              </div>
                <div className="font-display text-[#d9c4aa] uppercase tracking-[var(--ls-sub)] text-lg">Market Leader</div>
              </div>
              <div className="mb-6">
                <div className="font-sans font-semibold text-white mb-2">Full Ecosystem</div>
                <p className="ui-track text-slate-300/80 leading-7">Complete solution: AI voice agents + marketing automation + custom 10-second video ads. All three services working together.</p>
              </div>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#d9c4aa]"></div>
                  <span className="ui-track text-slate-300/80 text-sm">Full AI voice agent suite (inbound & outbound)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#d9c4aa]"></div>
                  <span className="ui-track text-slate-300/80 text-sm">Complete marketing automation</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#d9c4aa]"></div>
                  <span className="ui-track text-slate-300/80 text-sm">Custom 10-second video ad production</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#d9c4aa]"></div>
                  <span className="ui-track text-slate-300/80 text-sm">Multi-brand / multi-location support</span>
                </div>
              </div>
              <div className="mb-4 p-4 rounded-xl bg-black/20 border border-[#d9c4aa]/20">
                <div className="text-sm font-sans font-semibold text-[#d9c4aa] mb-1">Investment Range</div>
                <div className="text-xs ui-track text-slate-300/80">$7,500-$15,000+/month + setup</div>
                <div className="text-xs ui-track text-slate-400 mt-1">Target: 200+ leads/month</div>
              </div>
              <button onClick={() => setCalOpen(true)} className="w-full rounded-xl border border-white/15 px-5 py-3 ui-track hover:bg-white/5 transition-all">Get a tailored plan</button>
            </motion.div>
          </div>
          <div className="max-w-[980px] mx-auto px-6 mt-8">
            <div className="rounded-2xl border border-[#d9c4aa]/40 bg-[#d9c4aa]/10 p-8 shadow-[0_18px_50px_rgba(0,0,0,.45)]">
              <div className="text-center mb-6">
                <div className="font-display text-[#d9c4aa] uppercase tracking-[0.22em] text-xl mb-2">ROI Calculator</div>
                <p className="ui-track text-slate-300/80">One extra job typically covers the investment</p>
              </div>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="font-num text-3xl text-[#d9c4aa] mb-1">35% → 70%</div>
                  <div className="text-sm ui-track text-slate-300/80">Contact Rate Improvement</div>
                </div>
                <div>
                  <div className="font-num text-3xl text-[#d9c4aa] mb-1">2-5 min</div>
                  <div className="text-sm ui-track text-slate-300/80">Response Time</div>
                </div>
                <div>
                  <div className="font-num text-3xl text-[#d9c4aa] mb-1">$78k/mo</div>
                  <div className="text-sm ui-track text-slate-300/80">DFW Roofing Case Study</div>
                </div>
              </div>
            </div>
          </div>
          <p className="max-w-[980px] mx-auto px-6 ui-track text-slate-400 mt-6">Investment depends on volume, integrations, and scope. Each package includes different combinations of our three core services: AI voice agents, marketing automation, and custom video ads.</p>
        </section>

        {/* MARKETS WE CRUSH */}
        <section id="markets" className="py-24 bg-[#111315]">
          <SectionHead eyebrow="Who this crushes for" title="High‑value niches we prioritize" sub="Any business where one booked call = big money, speed wins, and intake isn't just name/number." />
          <div className="max-w-[1080px] mx-auto px-6 grid md:grid-cols-3 gap-4">
            <FeatureCard title="Emergency home & property" body="Restoration (water/fire/mold), foundation repair, electrical outage, tree/storm removal. Triage mode, insurance details, dispatch now." />
            <FeatureCard title="High‑ticket improvement" body="Solar + battery, windows/doors, pools, crawlspace encapsulation. Financing pre‑qual, measurements, HOA rules." />
            <FeatureCard title="Commercial facilities & trades" body="Commercial HVAC/R, refrigeration, industrial repair. Rooftop access, tonnage, downtime cost, 60‑min assessment blocks." />
            <FeatureCard title="Legal & financial" body="PI/criminal/immigration, bankruptcy/tax. After‑hours urgency, incident intake, e‑retainer on the call." />
            <FeatureCard title="Medical & elective" body="Oral surgery, IVF, med‑spa. Insurance verification, photo intake, HIPAA‑aware flows." />
            <FeatureCard title="B2B resilience" body="Cybersecurity IR, MSP/DR. Scope triage, on‑call escalation, retainer in‑call." />
          </div>
          <div className="max-w-[1080px] mx-auto px-6 mt-6">
            <div className="rounded-2xl border border-white/10 bg-[#0f1112] p-6">
              <div className="font-display text-[#d9c4aa] uppercase tracking-[var(--ls-sub)]">Fast go/no‑go test (10 minutes)</div>
              <ul className="ui-track text-slate-300/80 list-disc pl-5 mt-2 space-y-1">
                <li>Gross profit per job ≥ $2,000?</li>
                <li>{">"}=30% after‑hours or "need help now" leads?</li>
                <li>Intake has ≥3 qualification branches?</li>
              </ul>
            </div>
          </div>
        </section>

        {/* COMPLIANCE & OPS */}
        <section id="compliance" className="py-24">
          <SectionHead eyebrow="Operational insurance" title="Compliance & logistics handled" sub="TCPA/DNC safety, missed‑call sequences, round‑robin & geo guardrails." />
          <div className="max-w-[1080px] mx-auto px-6 grid md:grid-cols-3 gap-4">
            <FeatureCard title="TCPA & DNC" body="Disclosure baked in, opt‑outs respected, recording notices provided where required." />
            <FeatureCard title="Missed call automation" body="If no answer: voicemail + SMS follow‑up keeps the conversation alive." />
            <FeatureCard title="Scheduling guardrails" body="Round‑robin distribution and geo‑aware booking prevent costly back‑to‑back routes." />
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-16 sm:py-24 bg-[#111315]">
          <SectionHead eyebrow="Frequently Asked" title="Common questions answered" sub="Everything you need to know about our AI voice agents, marketing automation, and custom video ads." />
          <div className="max-w-[1080px] mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="space-y-4 sm:space-y-6">
                <div className="rounded-2xl border border-[rgba(217,196,170,.18)] bg-[#111315] p-4 sm:p-6 shadow-[0_8px_24px_rgba(0,0,0,.25),inset_0_1px_0_rgba(217,196,170,.06)]">
                  <h3 className="font-display text-[#d9c4aa] uppercase tracking-[0.22em] text-base sm:text-lg mb-2 sm:mb-3">How does the AI calling work?</h3>
                  <p className="ui-track text-slate-300/90 leading-6 sm:leading-7 text-sm sm:text-base">When someone submits your form, our AI immediately calls them within 2-5 minutes. It uses custom scripts tailored to your business, qualifies the lead, and books them directly to your calendar.</p>
                </div>
                
                <div className="rounded-2xl border border-[rgba(217,196,170,.18)] bg-[#111315] p-4 sm:p-6 shadow-[0_8px_24px_rgba(0,0,0,.25),inset_0_1px_0_rgba(217,196,170,.06)]">
                  <h3 className="font-display text-[#d9c4aa] uppercase tracking-[0.22em] text-base sm:text-lg mb-2 sm:mb-3">Is this legal and compliant?</h3>
                  <p className="ui-track text-slate-300/90 leading-6 sm:leading-7 text-sm sm:text-base">Yes, we're fully TCPA and DNC compliant. All calls include proper disclosures, opt-outs are respected, and we follow all recording notice requirements. We handle all compliance for you.</p>
                </div>
                
                <div className="rounded-2xl border border-[rgba(217,196,170,.18)] bg-[#111315] p-4 sm:p-6 shadow-[0_8px_24px_rgba(0,0,0,.25),inset_0_1px_0_rgba(217,196,170,.06)]">
                  <h3 className="font-display text-[#d9c4aa] uppercase tracking-[0.22em] text-base sm:text-lg mb-2 sm:mb-3">What if the AI doesn't work for my business?</h3>
                  <p className="ui-track text-slate-300/90 leading-6 sm:leading-7 text-sm sm:text-base">We offer a 5-day free trial period implemented into your business or company to prove value before full commitment. If we don't improve your contact rate by at least 50%, we'll refund your setup fee.</p>
                </div>
                
                <div className="rounded-2xl border border-[rgba(217,196,170,.18)] bg-[#111315] p-4 sm:p-6 shadow-[0_8px_24px_rgba(0,0,0,.25),inset_0_1px_0_rgba(217,196,170,.06)]">
                  <h3 className="font-display text-[#d9c4aa] uppercase tracking-[0.22em] text-base sm:text-lg mb-2 sm:mb-3">How long does setup take?</h3>
                  <p className="ui-track text-slate-300/90 leading-6 sm:leading-7 text-sm sm:text-base">Most businesses are up and running within 1-2 weeks. This includes custom script development, calendar integration, CRM setup, and testing with your team.</p>
                </div>

                <div className="rounded-2xl border border-[rgba(217,196,170,.18)] bg-[#111315] p-4 sm:p-6 shadow-[0_8px_24px_rgba(0,0,0,.25),inset_0_1px_0_rgba(217,196,170,.06)]">
                  <h3 className="font-display text-[#d9c4aa] uppercase tracking-[0.22em] text-base sm:text-lg mb-2 sm:mb-3">Does it really sound human?</h3>
                  <p className="ui-track text-slate-300/90 leading-6 sm:leading-7 text-sm sm:text-base">Yes. Our AI uses advanced natural language processing and can handle complex conversations, interruptions, and objections. 94% of leads don't realize they're speaking with AI until we tell them. Listen to live demos below.</p>
                </div>

                <div className="rounded-2xl border border-[rgba(217,196,170,.18)] bg-[#111315] p-4 sm:p-6 shadow-[0_8px_24px_rgba(0,0,0,.25),inset_0_1px_0_rgba(217,196,170,.06)]">
                  <h3 className="font-display text-[#d9c4aa] uppercase tracking-[0.22em] text-base sm:text-lg mb-2 sm:mb-3">What happens if the AI can't handle a call?</h3>
                  <p className="ui-track text-slate-300/90 leading-6 sm:leading-7 text-sm sm:text-base">The AI seamlessly transfers to your team with full context. You'll get a transcript, recording, and summary of everything discussed. Most calls (87%) are handled completely by AI.</p>
                </div>
              </motion.div>
              
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="space-y-4 sm:space-y-6">
                <div className="rounded-2xl border border-[rgba(217,196,170,.18)] bg-[#111315] p-4 sm:p-6 shadow-[0_8px_24px_rgba(0,0,0,.25),inset_0_1px_0_rgba(217,196,170,.06)]">
                  <h3 className="font-display text-[#d9c4aa] uppercase tracking-[0.22em] text-base sm:text-lg mb-2 sm:mb-3">Can you handle inbound calls too?</h3>
                  <p className="ui-track text-slate-300/90 leading-6 sm:leading-7 text-sm sm:text-base">Yes! Our inbound AI acts as a conversational IVR, triages calls, routes emergencies, and hands off to humans when needed. Perfect for after-hours coverage.</p>
                </div>
                
                <div className="rounded-2xl border border-[rgba(217,196,170,.18)] bg-[#111315] p-4 sm:p-6 shadow-[0_8px_24px_rgba(0,0,0,.25),inset_0_1px_0_rgba(217,196,170,.06)]">
                  <h3 className="font-display text-[#d9c4aa] uppercase tracking-[0.22em] text-base sm:text-lg mb-2 sm:mb-3">What about the custom video ads?</h3>
                  <p className="ui-track text-slate-300/90 leading-6 sm:leading-7 text-sm sm:text-base">We create professional 10-second videos: scripted, captioned, color-graded, and sound-designed. Available in vertical and widescreen formats for all social platforms.</p>
                </div>
                
                <div className="rounded-2xl border border-[rgba(217,196,170,.18)] bg-[#111315] p-4 sm:p-6 shadow-[0_8px_24px_rgba(0,0,0,.25),inset_0_1px_0_rgba(217,196,170,.06)]">
                  <h3 className="font-display text-[#d9c4aa] uppercase tracking-[0.22em] text-base sm:text-lg mb-2 sm:mb-3">Do you integrate with my existing systems?</h3>
                  <p className="ui-track text-slate-300/90 leading-6 sm:leading-7 text-sm sm:text-base">Yes, we integrate with most CRMs (GoHighLevel, HubSpot, Salesforce), calendar systems (Google Calendar, Cal.com), and marketing platforms. We work with your existing tech stack.</p>
                </div>
                
                <div className="rounded-2xl border border-[rgba(217,196,170,.18)] bg-[#111315] p-4 sm:p-6 shadow-[0_8px_24px_rgba(0,0,0,.25),inset_0_1px_0_rgba(217,196,170,.06)]">
                  <h3 className="font-display text-[#d9c4aa] uppercase tracking-[0.22em] text-base sm:text-lg mb-2 sm:mb-3">What's the ROI typically?</h3>
                  <p className="ui-track text-slate-300/90 leading-6 sm:leading-7 text-sm sm:text-base">Most clients see 2-3x more booked appointments within 30 days. Our DFW roofing client went from 3.5 to 10 jobs monthly, generating $78k additional revenue.</p>
                </div>

                <div className="rounded-2xl border border-[rgba(217,196,170,.18)] bg-[#111315] p-4 sm:p-6 shadow-[0_8px_24px_rgba(0,0,0,.25),inset_0_1px_0_rgba(217,196,170,.06)]">
                  <h3 className="font-display text-[#d9c4aa] uppercase tracking-[0.22em] text-base sm:text-lg mb-2 sm:mb-3">How much does this actually cost?</h3>
                  <p className="ui-track text-slate-300/90 leading-6 sm:leading-7 text-sm sm:text-base">Packages start at $2,000/month for basic outbound calling, up to $8,500/month for the complete ecosystem (AI agents + marketing + ads). Most clients see 3-5x ROI within 60 days. No setup fees during our current promotion.</p>
                </div>

                <div className="rounded-2xl border border-[rgba(217,196,170,.18)] bg-[#111315] p-4 sm:p-6 shadow-[0_8px_24px_rgba(0,0,0,.25),inset_0_1px_0_rgba(217,196,170,.06)]">
                  <h3 className="font-display text-[#d9c4aa] uppercase tracking-[0.22em] text-base sm:text-lg mb-2 sm:mb-3">What industries do you specialize in?</h3>
                  <p className="ui-track text-slate-300/90 leading-6 sm:leading-7 text-sm sm:text-base">High-value service businesses where one booked call equals $2,000-$50,000+ in revenue. Our top verticals: Roofing, Restoration, HVAC, Plumbing, Solar, Legal, Medical, Dental. If your average job is $5,000+, we're a perfect fit.</p>
                </div>

                <div className="rounded-2xl border border-[rgba(217,196,170,.18)] bg-[#111315] p-4 sm:p-6 shadow-[0_8px_24px_rgba(0,0,0,.25),inset_0_1px_0_rgba(217,196,170,.06)]">
                  <h3 className="font-display text-[#d9c4aa] uppercase tracking-[0.22em] text-base sm:text-lg mb-2 sm:mb-3">Do I need to change my current systems?</h3>
                  <p className="ui-track text-slate-300/90 leading-6 sm:leading-7 text-sm sm:text-base">No. We integrate with your existing CRM, calendar, and phone system. Setup takes 1-2 weeks and we handle everything. Most clients are live within 10 days with zero disruption to current operations.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* COMPARISON TABLE */}
        <section className="py-16 sm:py-24">
          <SectionHead eyebrow="Why Choose AI" title="Manual calling vs. AI voice agents" sub="See exactly how AI outperforms traditional follow-up in every metric that matters to your bottom line." />
          <div className="max-w-[1080px] mx-auto px-4 sm:px-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-4 font-display uppercase tracking-[0.18em] text-[#d9c4aa] text-sm">Metric</th>
                    <th className="text-center py-4 px-4 font-display uppercase tracking-[0.18em] text-slate-400 text-sm">Manual Calling</th>
                    <th className="text-center py-4 px-4 font-display uppercase tracking-[0.18em] text-[#d9c4aa] text-sm">AI Voice Agents</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-white/5">
                    <td className="py-4 px-4 text-slate-300 font-sans">Response Time</td>
                    <td className="py-4 px-4 text-center text-slate-400">2-8 hours</td>
                    <td className="py-4 px-4 text-center text-white font-semibold">2-5 minutes</td>
                  </tr>
                  <tr className="border-b border-white/5 bg-[#111315]">
                    <td className="py-4 px-4 text-slate-300 font-sans">Contact Rate</td>
                    <td className="py-4 px-4 text-center text-slate-400">30-40%</td>
                    <td className="py-4 px-4 text-center text-[#d9c4aa] font-bold">70%+</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 px-4 text-slate-300 font-sans">After-Hours Coverage</td>
                    <td className="py-4 px-4 text-center text-red-400">Voicemail only</td>
                    <td className="py-4 px-4 text-center text-green-400 font-semibold">Full 24/7 handling</td>
                  </tr>
                  <tr className="border-b border-white/5 bg-[#111315]">
                    <td className="py-4 px-4 text-slate-300 font-sans">Cost per Lead Contacted</td>
                    <td className="py-4 px-4 text-center text-slate-400">$15-30 (staff time)</td>
                    <td className="py-4 px-4 text-center text-white font-semibold">$3-8</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 px-4 text-slate-300 font-sans">Consistency</td>
                    <td className="py-4 px-4 text-center text-slate-400">Varies by rep</td>
                    <td className="py-4 px-4 text-center text-green-400 font-semibold">100% consistent</td>
                  </tr>
                  <tr className="border-b border-white/5 bg-[#111315]">
                    <td className="py-4 px-4 text-slate-300 font-sans">Scalability</td>
                    <td className="py-4 px-4 text-center text-red-400">Limited by staff</td>
                    <td className="py-4 px-4 text-center text-green-400 font-semibold">Unlimited</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 px-4 text-slate-300 font-sans">Call Recording & Analytics</td>
                    <td className="py-4 px-4 text-center text-slate-400">Manual review</td>
                    <td className="py-4 px-4 text-center text-white font-semibold">100% automatic</td>
                  </tr>
                  <tr className="bg-[#111315]">
                    <td className="py-4 px-4 text-slate-300 font-sans font-semibold">Setup Time</td>
                    <td className="py-4 px-4 text-center text-slate-400">4-8 weeks (hire + train)</td>
                    <td className="py-4 px-4 text-center text-[#d9c4aa] font-bold">7-14 days</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-[#d9c4aa]/10 to-transparent border border-[#d9c4aa]/20"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#d9c4aa]/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#d9c4aa]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                </div>
                <div className="flex-1">
                  <div className="font-display uppercase tracking-[0.18em] text-[#d9c4aa] text-lg mb-2">Bottom Line</div>
                  <p className="text-slate-300/90 ui-track leading-7">AI voice agents typically generate <span className="text-white font-semibold">2-3x more booked appointments</span> than manual calling, at <span className="text-white font-semibold">1/3 the cost</span>. Most clients see <span className="text-[#d9c4aa] font-semibold">full ROI within 30-60 days</span>.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* TRUST BADGES & FINAL PROOF */}
        <section className="py-16 bg-[#111315]">
          <div className="max-w-[1080px] mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[#d9c4aa]/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#d9c4aa]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                </div>
                <div className="font-display uppercase tracking-[0.12em] text-[#d9c4aa] text-sm mb-1">TCPA Compliant</div>
                <div className="text-xs text-slate-400 ui-track">Fully legal & regulated</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[#d9c4aa]/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#d9c4aa]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
                </div>
                <div className="font-display uppercase tracking-[0.12em] text-[#d9c4aa] text-sm mb-1">7-14 Days Setup</div>
                <div className="text-xs text-slate-400 ui-track">Most clients live in 10 days</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[#d9c4aa]/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#d9c4aa]" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" /></svg>
                </div>
                <div className="font-display uppercase tracking-[0.12em] text-[#d9c4aa] text-sm mb-1">50+ Businesses</div>
                <div className="text-xs text-slate-400 ui-track">Across DFW & beyond</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[#d9c4aa]/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#d9c4aa]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1zm-5 8.274l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L5 10.274zm10 0l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L15 10.274z" clipRule="evenodd" /></svg>
                </div>
                <div className="font-display uppercase tracking-[0.12em] text-[#d9c4aa] text-sm mb-1">$2M+ Generated</div>
                <div className="text-xs text-slate-400 ui-track">Client revenue tracked</div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl mx-auto"
            >
              <div className="p-8 rounded-2xl border border-[#d9c4aa]/20 bg-gradient-to-br from-[#d9c4aa]/5 to-transparent">
                <div className="font-display uppercase tracking-[0.18em] text-[#d9c4aa] text-xl mb-3">Money-Back Guarantee</div>
                <p className="text-slate-300/90 ui-track leading-7">Try our AI voice agents risk-free with a 5-day free trial period implemented into your business or company. If we don't improve your contact rate by at least 50%, we'll refund your setup fee. No questions asked.</p>
                <div className="mt-6">
                  <a
                    href="#instant"
                    onClick={() => fireAnalytics('cta_click', { label: 'final_cta', location: 'trust_section' })}
                    className="inline-block rounded-2xl bg-gradient-to-br from-[#d9c4aa] to-[#b89463] text-black font-sans font-extrabold px-6 sm:px-8 py-4 min-h-[52px] flex items-center justify-center text-base shadow-[0_10px_26px_rgba(216,184,138,.25)] hover:shadow-[0_14px_32px_rgba(216,184,138,.35)] transition-all active:scale-95"
                  >
                    Start Your 5-Day Free Trial →
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-[#111315]">
          <div className="max-w-[1080px] mx-auto px-6 py-8 grid md:grid-cols-3 gap-6">
            <div>
              <div className="font-display uppercase tracking-[var(--ls-sub)]">Forsythe Publishing & Marketing</div>
              <p className="text-slate-300/80 ui-track">We build systems that <span className="font-display tracking-[var(--ls-sub)] uppercase text-[#d9c4aa]">talk back</span>—turning leads into booked calls.</p>
              <div className="text-[#d9c4aa] font-display uppercase tracking-[var(--ls-sub)]">Fort Worth, Texas · Serving the DFW Metroplex</div>
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
              <div className="font-display uppercase tracking-[0.22em]">Address</div>
              <ul className="mt-2 space-y-1 text-slate-300/80 ui-track">
                <li>Forsythe Publishing & Marketing</li>
                <li>Fort Worth, TX 76107</li>
                <li>DFW Metroplex Service Area</li>
              </ul>
            </div>
          </div>
          <div className="max-w-[1080px] mx-auto px-6 pb-8 text-sm text-slate-400 flex items-center justify-between ui-track">
            <div>© 2025 Forsythe Publishing & Marketing.</div>
            <div>TCPA & DNC rules respected. Reply STOP to opt‑out.</div>
          </div>
        </footer>

        <StickyContactBar />
        
        {/* Enhanced Sticky CTA Bar */}
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="fixed bottom-4 left-4 right-4 z-50 md:left-4 md:right-auto md:w-80"
        >
          <div className="bg-[#111315] border border-[#d9c4aa]/20 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,.5)] backdrop-blur-sm">
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1">
                <div className="text-[#d9c4aa] font-display uppercase tracking-[var(--ls-sub)] text-sm">Ready to 2x Your Leads?</div>
                <div className="text-slate-300/80 text-xs ui-track">Get your AI agent in 24 hours</div>
              </div>
              <a 
                href="#instant" 
                onClick={() => fireAnalytics('cta_click', { label: 'sticky_cta', location: 'sticky_bar' })}
                className="bg-gradient-to-br from-[#d9c4aa] to-[#b89463] text-black font-sans font-bold px-4 py-2 rounded-xl text-sm hover:shadow-[0_8px_20px_rgba(216,184,138,.3)] transition-all"
              >
                Start Now →
              </a>
            </div>
          </div>
        </motion.div>
        
        <CalModal open={calOpen} onClose={() => setCalOpen(false)} />
        <VideoModal src={activeSrc} open={open} onClose={() => setOpen(false)} />
        <AIChatModal open={chatOpen} onClose={() => setChatOpen(false)} />
        
        {/* Live Chat Widget */}
        <div className="fixed bottom-4 right-4 z-50">
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 3, type: "spring", stiffness: 200 }}
            onClick={() => setChatOpen(true)}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#d9c4aa] to-[#b89463] shadow-[0_8px_24px_rgba(216,184,138,.3)] hover:shadow-[0_12px_32px_rgba(216,184,138,.4)] transition-all group"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-black mx-auto group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded-full animate-pulse"></div>
          </motion.button>
        </div>
      </div>
    </SmoothScroll>
  );
}
