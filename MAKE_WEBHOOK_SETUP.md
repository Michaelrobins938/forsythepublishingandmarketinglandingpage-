# Make.com Webhook Setup for Retell AI

## ✅ What's Already Done

Your lead form (`/app/api/lead/route.ts`) is now configured to send data to Make.com webhook, which will trigger your Retell AI calling sequence.

---

## 🔧 Setup Steps

### 1. Test Your Make.com Webhook First

**Use ReqBin, Postman, or curl to test:**

```bash
curl -X POST https://hook.us2.make.com/YOUR_WEBHOOK_ID \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Lead",
    "email": "test@example.com",
    "phone": "+18175551234",
    "service_interest": "Roofing",
    "city": "Fort Worth",
    "notes": "Test lead from webhook"
  }'
```

✅ **Verify in Make.com** that it received the data correctly.

---

### 2. Add Your Webhook URL to Vercel

Once tested, add your Make.com webhook URL as an environment variable:

1. Go to: https://vercel.com/michaels-projects-19e37f0b/nextjs-landing/settings/environment-variables
2. Add new variable:
   - **Name:** `MAKE_WEBHOOK_URL`
   - **Value:** `https://hook.us2.make.com/YOUR_ACTUAL_WEBHOOK_ID`
   - **Environment:** Production, Preview, Development (select all)
3. Click **Save**

---

### 3. Redeploy Your Site

After adding the environment variable:

```bash
cd web/nextjs-landing
vercel --prod
```

Or simply push to your git repo if you have auto-deploy enabled.

---

## 📋 What Data Gets Sent

When someone fills out your form, this JSON is sent to Make.com:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+18175551234",
  "service_interest": "Roofing", // From "industry" field
  "city": "Fort Worth",
  "notes": "Lead from website. Preferred time: Morning",
  "utm_source": "google",
  "utm_campaign": "roofing-ads",
  "session_id": "sess_abc123",
  "timestamp": "2025-10-10T18:45:00.000Z"
}
```

---

## 🔗 Flow Diagram

```
User fills form on site
    ↓
/api/lead endpoint receives data
    ↓
Sends to Make.com webhook
    ↓
Make.com triggers Retell AI
    ↓
Retell AI calls the lead in 2-5 minutes
```

---

## 🧪 Testing Locally

To test locally before deploying:

1. Create `.env.local` file:
```bash
cp env.template .env.local
```

2. Add your webhook URL:
```
MAKE_WEBHOOK_URL=https://hook.us2.make.com/YOUR_WEBHOOK_ID
```

3. Run dev server:
```bash
npm run dev
```

4. Fill out form at `http://localhost:3000`
5. Check Make.com to see if webhook was triggered

---

## ⚠️ Important Notes

- **Test First:** Always test with Make.com before deploying to production
- **Graceful Failure:** If Make.com webhook fails, the form will still work (it won't break the user experience)
- **Logging:** Check Vercel logs to see webhook success/failure messages
- **Multiple Webhooks:** The system can send to GHL, Make.com, and other endpoints simultaneously

---

## 🎯 Next Steps

1. ✅ Test Make.com webhook manually (with ReqBin/Postman)
2. ✅ Configure Retell AI in Make.com to handle the webhook data
3. ✅ Add `MAKE_WEBHOOK_URL` to Vercel environment variables
4. ✅ Deploy to production
5. ✅ Test with a real form submission
6. ✅ Monitor Vercel logs for confirmation

---

## 📞 Support

Questions? Contact:
- 📞 (817) 210-8487  
- ✉️ forsythpublishing@gmail.com

---

**Your form is ready to trigger Retell AI calls via Make.com!** 🚀

