import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tickets',
  description: 'Get your tickets for RnB & Soulful Groove Gathering 2025 on December 14. Limited tickets available starting from R250.00. Secure your spot at the ultimate soulful music experience.',
  keywords: ['Buy Tickets', 'Event Tickets', 'Festival Tickets', 'RnB Concert Tickets', 'December 2025 Event', 'South Africa Tickets'],
  openGraph: {
    title: 'Tickets | RnB & Soulful Groove Gathering 2025',
    description: 'Get your tickets now! Limited availability starting from R250.00',
    images: [
      {
        url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762545045759.png',
        width: 1200,
        height: 630,
        alt: 'Buy Tickets - RnB & Soulful Groove Gathering 2025',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Get Your Tickets | RnB & Soulful Groove Gathering 2025',
    description: 'Limited tickets available! Angels of the Promise Land - December 14, 2025',
    images: ['https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762545045759.png'],
  },
};
