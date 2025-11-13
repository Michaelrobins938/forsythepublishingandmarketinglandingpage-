import type { Metadata } from 'next';
import Script from 'next/script';

export default function Head() {
  return (
    <>
      <title>Forsythe Publishing - AI Voice Agent | 70% Contact Rate | Fort Worth</title>
      <meta name="description" content="Your website should call people back. AI voice agent calls leads in 2-5 minutes, qualifies on script, books to calendar. 35% → 70% contact rate. DFW home services." />
      
      {/* Schema Markup for Local Business */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Forsythe Publishing & Marketing",
            "image": "https://forsythepublishingandmarketing.agency/images/logo.jpg",
            "@id": "https://forsythepublishingandmarketing.agency/#organization",
            "url": "https://forsythepublishingandmarketing.agency",
            "telephone": "+1-817-210-8487",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "",
              "addressLocality": "Fort Worth",
              "addressRegion": "TX",
              "postalCode": "",
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 32.7767,
              "longitude": -96.7970
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "09:00",
              "closes": "17:00"
            },
            "areaServed": [
              {
                "@type": "City",
                "name": "Fort Worth"
              },
              {
                "@type": "City",
                "name": "Dallas"
              },
              {
                "@type": "City",
                "name": "Arlington"
              },
              {
                "@type": "City",
                "name": "Plano"
              },
              {
                "@type": "City",
                "name": "Carrollton"
              },
              {
                "@type": "City",
                "name": "Irving"
              }
            ],
            "availableChannel": [
              {
                "@type": "ServiceChannel",
                "serviceUrl": "https://forsythepublishingandmarketing.agency",
                "provider": {
                  "@type": "Organization",
                  "name": "Forsythe Publishing & Marketing"
                }
              }
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+1-817-210-8487",
              "contactType": "sales",
              "areaServed": "DFW",
              "availableLanguage": ["English"]
            },
            "description": "AI voice agent services for home service businesses. Increases contact rates from 35% to 70% with 2-5 minute callbacks.",
            "priceRange": "$$$",
            "makesOffer": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "AI Voice Agent Service",
                  "description": "AI-powered voice agent that calls leads within 2-5 minutes, qualifies leads, and books appointments to your calendar."
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Lead Conversion Optimization",
                  "description": "Marketing automation services to improve lead conversion rates using AI technology."
                }
              }
            ]
          })
        }}
      />
      
      {/* Google tag (gtag.js) - Added for analytics tracking */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-XGGGHMKFW3"
      />
      <Script id="google-analytics" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XGGGHMKFW3');
        `}
      </Script>
      
      {/* Google Ads Conversion Tracking - AW-17702614932 */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=AW-17702614932"
      />
      <Script id="google-ads-conversion" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-17702614932');
        `}
      </Script>
    </>
  );
}