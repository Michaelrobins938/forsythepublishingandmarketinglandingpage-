# Forsythe Landing Page - Next.js Edition

## 🎯 What This Is

A **conversion-optimized React landing page** with:
- Luxury editorial design (black & gold brand)
- Framer Motion animations + smooth scroll
- Instant AI callback form (GHL + Voice Agent integration)
- Calendar booking modal (cal.com)
- Video ad gallery with lazy loading
- UTM tracking + lead scoring
- Mobile sticky contact bar
- JSON-LD structured data for SEO

**Tech Stack**: Next.js 14+, React, Framer Motion, Lenis smooth scroll

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd web/nextjs-landing
npm install next@latest react react-dom framer-motion @studio-freight/lenis
npm install -D typescript @types/react @types/node
```

### 2. Set Environment Variables

Create `.env.local`:

```env
# Go HighLevel webhook or LeadConnector API
GHL_WEBHOOK_URL=https://services.leadconnector.io/hooks/YOUR_WEBHOOK_ID

# Your AI Voice Agent trigger endpoint
VOICE_AGENT_TRIGGER_URL=https://your-ai-platform.com/api/trigger

# Cal.com public booking URL
CAL_PUBLIC_URL=https://cal.com/forsythepublishing/discovery
```

### 3. Run Development Server

```bash
npm run dev
# Open http://localhost:3000
```

### 4. Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
web/nextjs-landing/
├── app/
│   ├── page.tsx              # Main landing page component
│   ├── layout.tsx            # Root layout with metadata
│   ├── globals.css           # Tailwind + global styles
│   └── api/
│       └── lead/
│           └── route.ts      # Lead capture API route
├── public/
│   └── ads/                  # Video ad files
│       ├── roofing-10s.mp4
│       ├── hvac-10s.mp4
│       └── hero-demo.mp4
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

---

## 🎨 Design System

### Colors
- **Gold Primary**: `#CDAF7A` / `#d9c4aa`
- **Gold Accent**: `#b89463`
- **Background**: `#0b0c0d` / `#111315`
- **Text**: `#F5F5F5` / slate-300

### Typography
- **Display**: Bodoni Moda (luxury serif)
- **Sans**: Manrope (clean, modern)
- **Numbers**: Space Grotesk (tabular figures)

### Letter Spacing
- Luxe: `0.26em`
- Subheads: `0.12em`
- UI: `0.06em`

---

## 🔧 Key Features Explained

### 1. Instant AI Callback Form

**Flow**:
1. User submits form with name, phone, email, company
2. POST to `/api/lead` with full payload + UTM data
3. Server sends to GHL webhook (CRM entry)
4. Server triggers AI Voice Agent endpoint
5. AI calls prospect in 2-5 minutes
6. Success response → user sees confirmation

**Honeypot**: Hidden `website` field catches bots

**Metadata Captured**:
- UTM parameters (source, medium, campaign, term, content)
- GCLID / FBCLID (ad tracking)
- Referrer
- Session ID
- Form variant (A/B test)
- Timestamp

### 2. Calendar Booking Modal

**Integration**: Cal.com iframe embed

**Replace** in component (line ~288):
```javascript
const calUrl = process.env.CAL_PUBLIC_URL || "https://cal.com/your-org/discovery";
```

**Alternative integrations**:
- Calendly: `https://calendly.com/forsythepublishing`
- Acuity Scheduling
- HubSpot Meetings
- Google Calendar Appointment Scheduling

### 3. Video Ad Gallery

**Lazy loading**: Videos only load when in viewport

**Hover behavior**: Auto-play on hover, pause on leave

**Modal**: Full-screen playback with controls

**Files needed** in `/public/ads/`:
- `roofing-10s.mp4`
- `hvac-10s.mp4`
- `plumbing-10s.mp4`
- `restoration-10s.mp4`
- `solar-10s.mp4`
- `landscaping-10s.mp4`
- `hero-demo.mp4` (main explainer)

### 4. Smooth Scroll (Lenis)

**Easing**: Custom cubic bezier for luxury feel

**Reduced motion**: Respects user preference

**Anchor navigation**: Smooth scroll to sections

### 5. Mobile Sticky Bar

**Breakpoint**: Only shows on mobile (`md:hidden`)

**Actions**: Call, Text, Book buttons

**Position**: Fixed bottom with backdrop blur

### 6. A/B Testing Ready

**Variant assignment**: Random A/B on page load

**Button copy variants**:
- A: "Request Callback Now"
- B: "Start in 2–5 Minutes"

**Tracking**: Sent to dataLayer + server

---

## 🔌 API Integration

### Lead Capture Endpoint

**File**: `app/api/lead/route.ts`

```typescript
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const ts = new Date().toISOString();

    // 1) Send to Go HighLevel
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
        meta: { 
          source: payload.source, 
          utm: payload.utm, 
          tags: payload.tags, 
          session_id: payload.session_id 
        },
      }),
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e: any) {
    console.error('Lead submission error:', e);
    return new Response(e?.message || "lead error", { status: 500 });
  }
}
```

### GHL Webhook Payload

```json
{
  "name": "John Smith",
  "phone": "8175551234",
  "email": "john@example.com",
  "company": "ABC Roofing",
  "industry": "Roofing",
  "preferred_time": "Tomorrow 2-4 PM",
  "message": "Need roof inspection",
  "session_id": "sess_abc123",
  "utm_source": "google",
  "utm_medium": "cpc",
  "utm_campaign": "dfw-roofing",
  "gclid": "abc123xyz",
  "source": "forsythe-landing",
  "variant": "A",
  "tags": ["AI_Web_Lead", "Instant_Callback"],
  "received_at": "2025-10-09T23:45:00.000Z"
}
```

---

## 📊 Analytics Integration

### Google Analytics 4

Add to `app/layout.tsx`:

```typescript
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_ID}');
  `}
</Script>
```

### Event Tracking

Already implemented:
- `lead_submit` - Form submission with variant
- Video plays (add manually if needed)
- Download clicks (add manually if needed)

### Heatmaps (Hotjar/Microsoft Clarity)

Add script to `app/layout.tsx` or use `next/script`

---

## 🎯 Conversion Optimization

### Current Features

1. **Above-the-fold CTA**: "Start now" visible immediately
2. **Social proof**: Stats (70% contact rate, 2-5 min response)
3. **Urgency**: "Instant callback" messaging
4. **Trust signals**: JSON-LD, phone/email visible, TCPA compliance
5. **Multiple CTAs**: Form, phone, text, calendar booking
6. **Mobile-first**: Sticky bar for thumb-zone access
7. **Reduced friction**: Auto-dial instead of phone tag

### A/B Test Ideas

**Test 1: Hero CTA**
- A: "Start now"
- B: "Get instant callback"

**Test 2: Form Button**
- A: "Request Callback Now"
- B: "Start in 2–5 Minutes"

**Test 3: Social Proof**
- A: Stats (70%, 2-5 min)
- B: Testimonial quote

---

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production
vercel --prod
```

**Advantages**:
- Zero config
- Edge network
- Auto SSL
- Preview deployments

### Option 2: Netlify

```bash
npm run build
# Upload .next folder to Netlify
```

### Option 3: Self-Hosted (VPS)

```bash
npm run build
npm start
# Run behind Nginx reverse proxy
```

### Option 4: AWS Amplify / DigitalOcean App Platform

Follow platform-specific Next.js deployment guides.

---

## 🔒 Security & Compliance

### TCPA Compliance

**Implemented**:
- Clear consent language in form
- "Reply STOP to opt-out" messaging
- No auto-dial without explicit opt-in

**Required**:
- Store consent timestamp in CRM
- Honor opt-out requests immediately
- Don't call before 8 AM or after 9 PM local time

### GDPR (if applicable)

Add to form:
- Privacy policy link
- Data processing disclosure
- Cookie consent banner

### Rate Limiting

Add to API route:

```typescript
import { Ratelimit } from "@upstash/ratelimit";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "1 m"), // 5 per minute
});

const { success } = await ratelimit.limit(identifier);
if (!success) return new Response("Rate limited", { status: 429 });
```

---

## 🎬 Video Assets Needed

Place in `/public/ads/`:

| File | Duration | Purpose |
|------|----------|---------|
| `roofing-10s.mp4` | 10s | Roofing ad |
| `hvac-10s.mp4` | 10s | HVAC ad |
| `plumbing-10s.mp4` | 10s | Plumbing ad |
| `restoration-10s.mp4` | 10s | Water restoration |
| `solar-10s.mp4` | 10s | Solar installation |
| `landscaping-10s.mp4` | 10s | Landscaping |
| `hero-demo.mp4` | 2-3 min | Full demo video |

**Specs**:
- Codec: H.264
- Resolution: 1920x1080
- Bitrate: ~5000 kbps
- Format: MP4
- Audio: AAC, 192 kbps

---

## 🧪 Testing Checklist

### Pre-Launch

- [ ] Form submission works (test with real phone)
- [ ] GHL webhook receives data
- [ ] AI agent triggers correctly
- [ ] Calendar modal opens
- [ ] All videos play
- [ ] Mobile sticky bar appears
- [ ] Smooth scroll functions
- [ ] Analytics tracking fires
- [ ] TCPA compliance text visible
- [ ] Phone/email links work

### Cross-Browser

- [ ] Chrome
- [ ] Safari
- [ ] Firefox
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Performance

- [ ] Lighthouse score > 90
- [ ] Core Web Vitals pass
- [ ] Images optimized
- [ ] Videos lazy load
- [ ] No layout shift

---

## 📈 Success Metrics

### Primary KPIs

| Metric | Target | What It Measures |
|--------|--------|------------------|
| Form submission rate | 5-10% | Interest level |
| Phone click rate | 2-5% | Urgency |
| Calendar booking rate | 1-3% | High intent |
| AI callback connect | 70%+ | Voice agent effectiveness |

### Secondary KPIs

- Time on page: 2+ minutes
- Scroll depth: 75%+
- Video play rate: 30%+
- Bounce rate: <50%

---

## 🛠️ Customization

### Change Brand Colors

Edit component (lines 21-25):

```typescript
:root{
  --gold-primary: #CDAF7A;
  --gold-accent: #b89463;
  --bg-dark: #0b0c0d;
}
```

### Update Contact Info

Search/replace:
- Phone: `+18172108487`
- Email: `forsythpublishing@gmail.com`
- Location: `Fort Worth, TX`

### Modify Form Fields

Add to `LeadForm` component:

```tsx
<input name="budget" placeholder="Project budget" ... />
<select name="timeline">
  <option>ASAP</option>
  <option>1-2 weeks</option>
  <option>1-3 months</option>
</select>
```

### Change Video Ad List

Edit `videoAds` array (line 109):

```typescript
const videoAds = [
  { src: "/ads/your-video.mp4", label: "Your Service" },
  // ... more
];
```

---

## 🔄 Integration with Existing System

### Link to Static Microsite

Add to landing page:

```tsx
<a href="/microsite/index.html">
  View Full Collateral Library →
</a>
```

### Embed in WordPress/Webflow

```html
<iframe 
  src="https://forsythe-landing.vercel.app" 
  width="100%" 
  height="100%" 
  frameborder="0"
  style="min-height: 100vh">
</iframe>
```

### Use as Subdomain

- Landing: `www.forsythepublishing.com`
- Microsite: `materials.forsythepublishing.com`

---

## 📞 Support

Questions about deployment or customization?

**Forsythe Publishing & Marketing**  
📞 (817) 210-8487  
✉️ forsythpublishing@gmail.com

---

**This landing page is production-ready. Deploy immediately for maximum conversions.** 🚀




