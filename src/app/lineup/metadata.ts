import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '2025 Line-Up',
  description: 'Meet the incredible artists performing at RnB & Soulful Groove Gathering 2025. Featuring Mlindo The Vocalist, Msizi Shembe, Mr Obsession, and Paul Mtirara.',
  keywords: ['Mlindo The Vocalist', 'Msizi Shembe', 'Mr Obsession', 'Paul Mtirara', 'Metro FM DJs', 'VOC FM', 'RnB Artists', 'Soul Music'],
  openGraph: {
    title: '2025 Line-Up | RnB & Soulful Groove Gathering',
    description: 'Meet the incredible artists performing at RnB & Soulful Groove Gathering 2025',
    images: [
      {
        url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762546648889.png',
        width: 1200,
        height: 630,
        alt: 'RnB & Soulful Groove Gathering 2025 Line-Up',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '2025 Line-Up | RnB & Soulful Groove Gathering',
    description: 'Meet the incredible artists performing at our event',
    images: ['https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762546648889.png'],
  },
};
