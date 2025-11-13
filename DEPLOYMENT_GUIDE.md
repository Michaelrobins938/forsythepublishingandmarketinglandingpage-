# Forsythe Landing Page - Deployment Guide

## 🚀 Quick Deployment Checklist

### ✅ Pre-Deployment Setup

1. **Environment Variables**
   - Copy `env.template` to `.env.local`
   - Update webhook URLs with your actual endpoints
   - Set `NEXT_PUBLIC_CAL_URL` to your Cal.com booking page

2. **Video Assets** (Optional)
   - Add video files to `public/ads/` directory
   - Create thumbnail images in `public/ads/thumbs/`
   - See `public/ads/placeholder-video.txt` for specifications

3. **Test Build**
   ```bash
   npm run build
   npm start
   ```

### 🌐 Deployment Options

#### Option 1: Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

**Environment Variables in Vercel:**
- `GHL_WEBHOOK_URL`
- `VOICE_AGENT_TRIGGER_URL`
- `MAKE_WEBHOOK_URL`
- `NEXT_PUBLIC_CAL_URL`

#### Option 2: Netlify
```bash
npm run build
# Upload .next folder to Netlify
```

#### Option 3: Self-Hosted
```bash
npm run build
npm start
# Run behind Nginx reverse proxy
```

### 🔧 Production Configuration

1. **Update Contact Information**
   - Phone: `(817) 210-8487`
   - Email: `forsythpublishing@gmail.com`
   - Location: `Fort Worth, TX`

2. **Configure Webhooks**
   - GHL Webhook: Update `GHL_WEBHOOK_URL`
   - Make.com: Update `MAKE_WEBHOOK_URL`
   - AI Voice Agent: Update `VOICE_AGENT_TRIGGER_URL`

3. **Calendar Integration**
   - Set `NEXT_PUBLIC_CAL_URL` to your Cal.com page
   - Alternative: Calendly, HubSpot, or Google Calendar

### 📊 Analytics Setup

1. **Google Analytics 4**
   - Add GA4 tracking ID to environment variables
   - Update `NEXT_PUBLIC_GA_ID`

2. **Google Tag Manager**
   - Add GTM ID to environment variables
   - Update `NEXT_PUBLIC_GTM_ID`

### 🔒 Security & Compliance

- TCPA compliance text is included in the form
- Security headers are configured in `next.config.js`
- Rate limiting should be added to production API routes

### 📈 Performance Optimization

- Images optimized with WebP/AVIF formats
- Fonts loaded with `display: swap`
- CSS and JS optimized for production
- Lazy loading for videos and images

### 🧪 Testing

1. **Lead Form Test**
   ```bash
   node test-lead-api.js
   ```

2. **Manual Testing Checklist**
   - [ ] Form submission works
   - [ ] Calendar modal opens
   - [ ] Video gallery functions
   - [ ] Mobile responsive design
   - [ ] Contact links work
   - [ ] Smooth scrolling works

### 📞 Support

**Forsythe Publishing & Marketing**
- Phone: (817) 210-8487
- Email: forsythpublishing@gmail.com
- Location: Fort Worth, TX

---

## 🎯 Success Metrics

### Primary KPIs
- Form submission rate: 5-10%
- Phone click rate: 2-5%
- Calendar booking rate: 1-3%
- AI callback connect: 70%+

### Secondary KPIs
- Time on page: 2+ minutes
- Scroll depth: 75%+
- Video play rate: 30%+
- Bounce rate: <50%

---

**The landing page is production-ready. Deploy immediately for maximum conversions.** 🚀
