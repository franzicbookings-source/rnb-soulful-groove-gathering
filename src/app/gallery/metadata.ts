import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Event Gallery',
  description: 'Explore photos and moments from RnB & Soulful Groove Gathering. Browse galleries from June 2024, December 2024, and upcoming 2025 events.',
  keywords: ['Event Photos', 'Festival Gallery', 'RnB Event Photos', 'Music Festival Gallery', 'Event Memories'],
  openGraph: {
    title: 'Event Gallery | RnB & Soulful Groove Gathering',
    description: 'Explore photos and moments from past and upcoming events',
    images: [
      {
        url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762545045759.png',
        width: 1200,
        height: 630,
        alt: 'RnB & Soulful Groove Gathering Gallery',
      }
    ],
  },
};
