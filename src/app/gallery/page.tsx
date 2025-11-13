"use client";

import NavigationHeader from '@/components/NavigationHeader';
import Footer from '@/components/Footer';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import Image from 'next/image';
import { X, Calendar, Download } from 'lucide-react';

const galleryJune2024 = [
  { id: 18, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762554565368.png', alt: 'June 2024 - Group photo at the event' },
  { id: 19, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762554595833.png', alt: 'June 2024 - Guest enjoying the festival moment' },
  { id: 1, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762502444776.png', alt: 'June 2024 - Crowd enjoying the festival' },
  { id: 2, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762502472319.png', alt: 'June 2024 - Festival atmosphere' },
  { id: 14, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762554458997.png', alt: 'June 2024 - Attendees relaxing at the gathering' },
  { id: 15, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762554478564.png', alt: 'June 2024 - Guests enjoying the lounge area' },
  { id: 16, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762554495695.png', alt: 'June 2024 - Festival crowd under the tent' },
  { id: 17, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762554546859.png', alt: 'June 2024 - Friends at the outdoor gathering' },
  { id: 24, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/WhatsApp-Image-2025-11-09-at-15.34.49_1514ceee-1762704065686.jpg?width=8000&height=8000&resize=contain', alt: 'June 2024 - DJ performing with Vodacom branding' },
  { id: 25, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/WhatsApp-Image-2025-11-09-at-15.34.49_3e561beb-1762704073983.jpg?width=8000&height=8000&resize=contain', alt: 'June 2024 - Event entrance with EPHE NO BONE arch' },
  { id: 26, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/WhatsApp-Image-2025-11-09-at-15.34.49_a772e21f-1762704090567.jpg?width=8000&height=8000&resize=contain', alt: 'June 2024 - Guests seated at the event' },
  { id: 27, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/WhatsApp-Image-2025-11-09-at-15.34.50_402c0920-1762704105519.jpg?width=8000&height=8000&resize=contain', alt: 'June 2024 - Attendees relaxing with refreshments' },
  { id: 28, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/WhatsApp-Image-2025-11-09-at-15.34.50_8995101c-1762704142815.jpg?width=8000&height=8000&resize=contain', alt: 'June 2024 - Guest at luxury photo wall' },
  { id: 29, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/WhatsApp-Image-2025-11-09-at-15.34.51_0d9aae63-1762704161784.jpg?width=8000&height=8000&resize=contain', alt: 'June 2024 - Food vendor at the event' },
  { id: 30, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/WhatsApp-Image-2025-11-09-at-15.34.51_ed4a397c-1762704185323.jpg?width=8000&height=8000&resize=contain', alt: 'June 2024 - Festival venue with sponsor tents' },
  { id: 31, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/WhatsApp-Image-2025-11-09-at-15.34.52_b5c58ebb-1762704206912.jpg?width=8000&height=8000&resize=contain', alt: 'June 2024 - Aerial view of event parking area' },
];

const galleryDec2024 = [
  { id: 20, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762554677871.png', alt: 'December 2024 - Excited crowd capturing memories' },
  { id: 21, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762554691509.png', alt: 'December 2024 - Festival attendees in the crowd' },
  { id: 22, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762554711925.png', alt: 'December 2024 - Performance moment from the stage' },
  { id: 23, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762554737894.png', alt: 'December 2024 - Artist performing on stage' },
];

const galleryCommunity = [
  { id: 7, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762554077897.png', alt: 'Giving Back - Volunteer helping students with shoes' },
  { id: 8, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762554098717.png', alt: 'Giving Back - Students receiving new school shoes' },
  { id: 9, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762554118555.png', alt: 'Giving Back - Helping student with new footwear' },
  { id: 10, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762554134648.png', alt: 'Giving Back - Students lined up for shoe donations' },
  { id: 11, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762554157861.png', alt: 'Giving Back - Volunteers distributing supplies to school children' },
  { id: 12, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762554183918.png', alt: 'Giving Back - Community members receiving food parcels' },
  { id: 13, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762554217936.png', alt: 'Giving Back - Students receiving school supplies and shoes' },
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleDownload = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `rnb-gathering-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback: open in new tab
      window.open(imageUrl, '_blank');
    }
  };

  const GalleryGrid = ({ images }: { images: typeof galleryJune2024 }) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        {images.map((image) => (
          <div
            key={image.id}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl sm:rounded-3xl cursor-pointer group"
            onClick={() => setSelectedImage(image.url)}
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>
    );
  };

  const ComingSoonMessage = ({ year }: { year: string }) => {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-[var(--gold)] blur-3xl opacity-20 animate-glow" />
          <Calendar size={80} className="text-[var(--gold)] relative z-10" />
        </div>
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--gold)] mb-4 glow-gold">
          Coming Soon
        </h3>
        <p className="text-lg sm:text-xl text-[var(--cream)]/70 max-w-md">
          Photos from our {year} events will be available shortly. Check back after the event to relive the magic!
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--midnight-blue)] via-[var(--deep-brown)] to-black">
      <NavigationHeader />

      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-24 md:pt-28 pb-6 sm:pb-8 md:pb-12 px-4">
        <div className="container mx-auto text-center max-w-6xl">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-[var(--gold)] mb-2 sm:mb-3 glow-gold leading-tight">
            Event Gallery
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-[var(--cream)]/80 max-w-2xl mx-auto px-4">
            Relive the unforgettable moments from our events
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-6 sm:py-8 md:py-12 px-3 sm:px-4 pb-12 sm:pb-16 md:pb-24">
        <div className="container mx-auto max-w-7xl">
          <Tabs defaultValue="june2024" className="w-full">
            <div className="mb-6 sm:mb-8 md:mb-10 flex justify-center px-2">
              <TabsList className="bg-black/30 backdrop-blur-md border border-[var(--gold)]/30 rounded-full inline-flex flex-wrap justify-center p-1 gap-1 max-w-full">
                <TabsTrigger 
                  value="june2024" 
                  className="data-[state=active]:bg-[var(--gold)] data-[state=active]:text-black data-[state=inactive]:bg-transparent data-[state=inactive]:text-[var(--cream)]/80 data-[state=inactive]:hover:text-[var(--gold)] px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm md:text-base font-semibold transition-all rounded-full whitespace-nowrap touch-manipulation"
                >
                  June 2024
                </TabsTrigger>
                <TabsTrigger 
                  value="dec2024" 
                  className="data-[state=active]:bg-[var(--gold)] data-[state=active]:text-black data-[state=inactive]:bg-transparent data-[state=inactive]:text-[var(--cream)]/80 data-[state=inactive]:hover:text-[var(--gold)] px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm md:text-base font-semibold transition-all rounded-full whitespace-nowrap touch-manipulation"
                >
                  Dec 2024
                </TabsTrigger>
                <TabsTrigger 
                  value="june2025" 
                  className="data-[state=active]:bg-[var(--gold)] data-[state=active]:text-black data-[state=inactive]:bg-transparent data-[state=inactive]:text-[var(--cream)]/80 data-[state=inactive]:hover:text-[var(--gold)] px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm md:text-base font-semibold transition-all rounded-full whitespace-nowrap touch-manipulation"
                >
                  June 2025
                </TabsTrigger>
                <TabsTrigger 
                  value="dec2025" 
                  className="data-[state=active]:bg-[var(--gold)] data-[state=active]:text-black data-[state=inactive]:bg-transparent data-[state=inactive]:text-[var(--cream)]/80 data-[state=inactive]:hover:text-[var(--gold)] px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm md:text-base font-semibold transition-all rounded-full whitespace-nowrap touch-manipulation"
                >
                  Dec 2025
                </TabsTrigger>
                <TabsTrigger 
                  value="community" 
                  className="data-[state=active]:bg-[var(--gold)] data-[state=active]:text-black data-[state=inactive]:bg-transparent data-[state=inactive]:text-[var(--cream)]/80 data-[state=inactive]:hover:text-[var(--gold)] px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm md:text-base font-semibold transition-all rounded-full whitespace-nowrap touch-manipulation"
                >
                  Giving Back
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="june2024">
              <GalleryGrid images={galleryJune2024} />
            </TabsContent>
            <TabsContent value="dec2024">
              <GalleryGrid images={galleryDec2024} />
            </TabsContent>
            <TabsContent value="june2025">
              <ComingSoonMessage year="June 2025" />
            </TabsContent>
            <TabsContent value="dec2025">
              <ComingSoonMessage year="December 2025" />
            </TabsContent>
            <TabsContent value="community">
              <GalleryGrid images={galleryCommunity} />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-[96vw] sm:max-w-[90vw] md:max-w-4xl bg-black/95 border-[var(--gold)] p-0 rounded-2xl sm:rounded-3xl overflow-hidden">
          <div className="absolute right-2 top-2 sm:right-4 sm:top-4 z-50 flex gap-2">
            <button
              onClick={() => selectedImage && handleDownload(selectedImage)}
              className="rounded-full bg-[var(--gold)] p-2 sm:p-2.5 text-black hover:bg-[var(--gold)]/90 transition-colors touch-manipulation shadow-lg"
              aria-label="Download image"
            >
              <Download size={20} className="sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={() => setSelectedImage(null)}
              className="rounded-full bg-black/50 p-2 sm:p-2.5 text-white hover:bg-black/70 transition-colors touch-manipulation"
              aria-label="Close"
            >
              <X size={20} className="sm:w-6 sm:h-6" />
            </button>
          </div>
          {selectedImage && (
            <div className="relative w-full aspect-[4/3]">
              <Image
                src={selectedImage}
                alt="Gallery image"
                fill
                className="object-contain"
                priority
              />
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}