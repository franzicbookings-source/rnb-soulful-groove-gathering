import type { Metadata } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import { JsonLd } from "./jsonld";

export const metadata: Metadata = {
  title: {
    default: "RnB & Soulful Groove Gathering 2025 | Angels of the Promise Land",
    template: "%s | RnB & Soulful Groove Gathering 2025"
  },
  description: "Join us on December 14, 2025 for the ultimate RnB & Soulful music experience. Featuring Mlindo The Vocalist, top DJs from Metro FM and VOC FM. Angels of the Promise Land - A magical celebration of soul, rhythm, and unity.",
  keywords: ["RnB Festival", "Soulful Music", "Groove Gathering 2025", "Mlindo The Vocalist", "South Africa Music Festival", "December 2025 Events", "Metro FM", "VOC FM", "Angels of the Promise Land", "Live Music Event"],
  authors: [{ name: "Ntombii Communications (Pty) Ltd" }],
  creator: "Ntombii Communications (Pty) Ltd",
  publisher: "RnB & Soulful Groove Gathering",
  metadataBase: new URL('https://rnbsoulfulgroovegathering.co.za'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    url: 'https://rnbsoulfulgroovegathering.co.za',
    siteName: 'RnB & Soulful Groove Gathering',
    title: 'RnB & Soulful Groove Gathering 2025 | Angels of the Promise Land',
    description: 'Join us on December 14, 2025 for the ultimate RnB & Soulful music experience. Featuring Mlindo The Vocalist and top DJs.',
    images: [
      {
        url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762545045759.png',
        width: 1200,
        height: 630,
        alt: 'RnB & Soulful Groove Gathering 2025',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RnB & Soulful Groove Gathering 2025',
    description: 'Angels of the Promise Land - December 14, 2025. Featuring Mlindo The Vocalist and top DJs.',
    images: ['https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762545045759.png'],
  },
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
  verification: {
    // Add your verification codes when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <JsonLd />
      </head>
      <body className="antialiased">
        <ErrorReporter />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        {children}
        <VisualEditsMessenger />
      </body>
    </html>
  );
}