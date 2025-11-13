# Forsythe Landing Page - Setup Guide

## 🎯 30-Minute Setup

Follow these steps to get your conversion-optimized landing page live.

---

## Step 1: Initialize Next.js Project (5 minutes)

```bash
cd "C:\Users\Micha\Favorites\Downloads\Forsythe Publishing(AI Voice business service)\web\nextjs-landing"

# Install dependencies
npm install

# Copy environment template
copy .env.example .env.local
```

---

## Step 2: Configure Environment Variables (5 minutes)

Edit `.env.local`:

### A. Go HighLevel Webhook

1. Log into your GHL account
2. Go to **Settings** → **Webhooks** → **Create Webhook**
3. Copy the webhook URL
4. Paste into `.env.local`:

```env
GHL_WEBHOOK_URL=https://services.leadconnector.io/hooks/abc123xyz
```

### B. AI Voice Agent Trigger

**Option 1: Direct API** (if you have your own)
```env
VOICE_AGENT_TRIGGER_URL=https://your-ai-platform.com/api/call
```

**Option 2: GHL Workflow Trigger**
```env
VOICE_AGENT_TRIGGER_URL=https://services.leadconnector.io/workflows/YOUR_WORKFLOW_ID/trigger
```

**Option 3: Zapier/Make.com Webhook**
```env
VOICE_AGENT_TRIGGER_URL=https://hooks.zapier.com/hooks/catch/123456/abcdef/
```

### C. Calendar Booking

**Cal.com** (recommended):
1. Sign up at cal.com
2. Create booking link: `https://cal.com/forsythepublishing/discovery`
3. Add to `.env.local`:

```env
CAL_PUBLIC_URL=https://cal.com/forsythepublishing/discovery
```

**Calendly** (alternative):
```env
CAL_PUBLIC_URL=https://calendly.com/forsythepublishing
```

---

## Step 3: Create Required Files (5 minutes)

### A. API Route

Create `app/api/lead/route.ts`:

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
    console.error('Lead error:', e);
    return new Response(e?.message || "lead error", { status: 500 });
  }
}
```

### B. App Layout

Create `app/layout.tsx`:

```typescript
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Forsythe Publishing - AI Lead Conversion',
  description: '2-5 minute callback. 70% contact rate. 24/7 AI voice agent.',
  keywords: 'AI lead conversion, instant callback, DFW contractor marketing',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### C. Global CSS

Create `app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  @apply antialiased;
}
```

### D. Main Page Component

Create `app/page.tsx` and paste the entire React component provided.

---

## Step 4: Add Video Assets (10 minutes)

Place videos in `public/ads/`:

```
public/
└── ads/
    ├── roofing-10s.mp4
    ├── hvac-10s.mp4
    ├── plumbing-10s.mp4
    ├── restoration-10s.mp4
    ├── solar-10s.mp4
    ├── landscaping-10s.mp4
    └── hero-demo.mp4
```

**Quick placeholders** (if you don't have videos yet):

```bash
# Create placeholder videos (temporary)
mkdir -p public/ads
# Use existing videos from your media folder or create placeholders
```

**Copy your existing videos**:

```bash
copy "..\..\media\video\*.mp4" "public\ads\"
```

---

## Step 5: Test Locally (2 minutes)

```bash
npm run dev
```

Open: http://localhost:3000

**Test checklist**:
- [ ] Page loads without errors
- [ ] Smooth scroll works
- [ ] Form submits successfully
- [ ] Calendar modal opens
- [ ] Videos play on hover
- [ ] Mobile sticky bar appears (resize browser)

---

## Step 6: Test Form Submission (3 minutes)

1. Fill out form with TEST data
2. Submit form
3. Check your GHL account for new lead
4. Verify AI agent was triggered

**Debugging**:
- Open browser DevTools → Network tab
- Submit form
- Check `/api/lead` request
- Verify 200 response

If error 500:
- Check `.env.local` variables are correct
- Verify GHL webhook URL is active
- Check console logs for specific error

---

## Step 7: Deploy to Production

### Option A: Vercel (Easiest - 2 minutes)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts, then:
vercel --prod
```

**Add environment variables** in Vercel dashboard:
1. Go to project settings
2. Environment Variables
3. Add `GHL_WEBHOOK_URL`, `VOICE_AGENT_TRIGGER_URL`, `CAL_PUBLIC_URL`
4. Redeploy

### Option B: Netlify (Alternative)

1. Build locally: `npm run build`
2. Upload `.next` folder to Netlify
3. Add environment variables in Netlify dashboard

### Option C: Self-Hosted

```bash
npm run build
npm start
```

Run behind Nginx reverse proxy on port 3000.

---

## Common Issues & Fixes

### Issue: Form not submitting

**Fix**: Check browser console for errors. Verify API route exists at `app/api/lead/route.ts`

### Issue: Videos not playing

**Fix**: Ensure video files are in `public/ads/` and use H.264 codec

### Issue: Calendar modal blank

**Fix**: Check `CAL_PUBLIC_URL` is correct and cal.com link is public

### Issue: GHL not receiving leads

**Fix**: 
1. Test webhook URL with Postman
2. Verify webhook is active in GHL
3. Check payload format matches GHL expectations

### Issue: Smooth scroll not working

**Fix**: Check for JavaScript errors. Lenis requires modern browser.

---

## Next Steps

Once live:

1. **Set up Google Analytics**
   - Add GA4 tracking ID to `.env.local`
   - Verify events are firing

2. **Configure A/B testing**
   - Currently random A/B split on button copy
   - Track conversions by variant

3. **Add heatmaps**
   - Hotjar or Microsoft Clarity
   - Understand user behavior

4. **Monitor performance**
   - Run Lighthouse audits
   - Optimize Core Web Vitals

5. **Test AI callback flow**
   - Submit real leads
   - Verify 2-5 minute callback works
   - Check booking to calendar

---

## Production Checklist

Before going live:

- [ ] Environment variables set
- [ ] API route working
- [ ] GHL receiving leads
- [ ] AI agent triggering
- [ ] Calendar booking functional
- [ ] All videos present
- [ ] Mobile responsive
- [ ] Cross-browser tested
- [ ] Analytics connected
- [ ] TCPA compliance text visible
- [ ] SSL certificate active
- [ ] Custom domain configured

---

## Support

Having issues?

📞 **(817) 210-8487**  
✉️ **forsythpublishing@gmail.com**

---

**Estimated total setup time: 30 minutes**  
**Difficulty: Intermediate (requires basic Next.js knowledge)**

Good luck! 🚀




