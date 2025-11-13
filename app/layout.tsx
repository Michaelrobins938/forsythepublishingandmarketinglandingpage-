import type { Metadata } from 'next';
import { Bodoni_Moda, Manrope, Space_Grotesk } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

// Optimized font loading with next/font
const bodoniModa = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-num',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Forsythe Publishing - AI Voice Agent | 70% Contact Rate | Fort Worth',
  description: 'Your website should call people back. AI voice agent calls leads in 2-5 minutes, qualifies on script, books to calendar. 35% → 70% contact rate. DFW home services.',
  keywords: 'AI voice agent, lead conversion, instant callback, DFW contractor, Fort Worth marketing, AI receptionist, 70 percent contact rate',
  authors: [{ name: 'Forsythe Publishing & Marketing' }],
  creator: 'Forsythe Publishing & Marketing',
  publisher: 'Forsythe Publishing & Marketing',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Forsythe Publishing - AI Voice Agent | 70% Contact Rate',
    description: 'Your lead hits submit → our AI calls in 2-5 minutes → books your calendar. See the 70% contact rate difference.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Forsythe Publishing & Marketing',
    url: 'https://forsythepublishing.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Voice Agent | 70% Contact Rate',
    description: 'Your website should call people back. 2-5 min AI callback, 24/7 coverage.',
    creator: '@forsythepub',
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${bodoniModa.variable} ${manrope.variable} ${spaceGrotesk.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

