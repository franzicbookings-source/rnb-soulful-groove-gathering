"use client"

import { useState, useCallback, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

const gallery2024 = [
  { id: 1, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762502444776.png', alt: '2024 Event - Crowd enjoying the festival' },
  { id: 2, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762502472319.png', alt: '2024 Event - Festival atmosphere' },
];

const gallery2025 = [
  { id: 4, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762503283376.png', alt: '2025 Preview - Guest photo' },
  { id: 5, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762503299438.png', alt: '2025 Preview - Event highlight' },
  { id: 6, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762503385239.png', alt: '2025 Preview - Crowd moment' },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const GalleryCarousel = ({ images }: { images: typeof gallery2024 }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ 
      loop: true, 
      align: 'start',
      slidesToScroll: 1,
      skipSnaps: false,
      duration: 25
    });
    
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const scrollPrev = useCallback(() => {
      if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);
    
    const scrollNext = useCallback(() => {
      if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const scrollTo = useCallback((index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    }, [emblaApi]);

    const onSelect = useCallback(() => {
      if (!emblaApi) return;
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
      setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
      if (!emblaApi) return;
      
      onSelect();
      emblaApi.on('select', onSelect);
      emblaApi.on('reInit', onSelect);

      return () => {
        emblaApi.off('select', onSelect);
        emblaApi.off('reInit', onSelect);
      };
    }, [emblaApi, onSelect]);

    return (
      <div className="relative px-2 xs:px-4 sm:px-8 md:px-12">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-3 xs:gap-4 sm:gap-6 touch-pan-y touch-manipulation">
            {images.map((image, index) => (
              <div
                key={image.id}
                className="flex-[0_0_100%] xs:flex-[0_0_calc(100%-12px)] sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)] min-w-0"
              >
                <div
                  className="relative aspect-[4/3] overflow-hidden rounded-xl sm:rounded-2xl cursor-pointer group card-elevated border border-[var(--gold)]/20 bg-[var(--charcoal)]/20 touch-manipulation"
                  onClick={() => setSelectedImage(image.url)}
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 320px) 100vw, (max-width: 375px) 100vw, (max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={85}
                    priority={index < 2}
                    className="object-cover transition-transform duration-500 group-hover:scale-105 group-active:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--deep-purple)]/60 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons - Hidden on mobile */}
        <button
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[var(--gold)] text-[var(--midnight-blue)] items-center justify-center shadow-xl hover:bg-[var(--gold-light)] transition-all disabled:opacity-30 disabled:cursor-not-allowed z-10 font-bold"
          aria-label="Previous"
        >
          <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
        </button>
        <button
          onClick={scrollNext}
          disabled={!canScrollNext}
          className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[var(--gold)] text-[var(--midnight-blue)] items-center justify-center shadow-xl hover:bg-[var(--gold-light)] transition-all disabled:opacity-30 disabled:cursor-not-allowed z-10 font-bold"
          aria-label="Next"
        >
          <ChevronRight size={20} className="sm:w-6 sm:h-6" />
        </button>

        {/* Pagination Dots for Mobile */}
        <div className="flex sm:hidden justify-center gap-1.5 xs:gap-2 mt-4 xs:mt-6">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-1.5 h-1.5 xs:w-2 xs:h-2 rounded-full transition-all touch-manipulation ${
                selectedIndex === index 
                  ? 'bg-[var(--gold)] w-4 xs:w-6' 
                  : 'bg-[var(--gold)]/30'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <Tabs defaultValue="2025" className="w-full">
        <TabsList className="mb-6 xs:mb-8 sm:mb-10 bg-white/90 backdrop-blur-md border-2 border-[var(--gold)]/30 rounded-full flex justify-center p-1 xs:p-1.5 gap-1 xs:gap-2 w-fit mx-auto shadow-lg">
          <TabsTrigger 
            value="2025" 
            className="data-[state=active]:bg-[var(--gold)] data-[state=active]:text-[var(--midnight-blue)] data-[state=inactive]:bg-transparent data-[state=inactive]:text-[var(--charcoal)] data-[state=inactive]:hover:text-[var(--gold)] px-4 xs:px-6 sm:px-8 py-2 xs:py-2.5 sm:py-3 text-xs xs:text-sm sm:text-base font-bold transition-all rounded-full touch-manipulation"
          >
            2025 Preview
          </TabsTrigger>
          <TabsTrigger 
            value="2024" 
            className="data-[state=active]:bg-[var(--gold)] data-[state=active]:text-[var(--midnight-blue)] data-[state=inactive]:bg-transparent data-[state=inactive]:text-[var(--charcoal)] data-[state=inactive]:hover:text-[var(--gold)] px-4 xs:px-6 sm:px-8 py-2 xs:py-2.5 sm:py-3 text-xs xs:text-sm sm:text-base font-bold transition-all rounded-full touch-manipulation"
          >
            2024 Highlights
          </TabsTrigger>
        </TabsList>
        <TabsContent value="2025" className="mt-0">
          <GalleryCarousel images={gallery2025} />
        </TabsContent>
        <TabsContent value="2024" className="mt-0">
          <GalleryCarousel images={gallery2024} />
        </TabsContent>
      </Tabs>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] xs:max-w-[90vw] xs:max-h-[90vh] sm:max-w-4xl bg-[var(--midnight-blue)]/98 border-2 border-[var(--gold)] p-0 rounded-xl sm:rounded-2xl">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute right-2 top-2 xs:right-3 xs:top-3 sm:right-4 sm:top-4 z-50 rounded-full bg-[var(--gold)] p-2 xs:p-2.5 text-[var(--midnight-blue)] hover:bg-[var(--gold-light)] active:bg-[var(--gold-light)] transition-colors shadow-lg touch-manipulation"
          >
            <X size={20} className="xs:w-6 xs:h-6" />
          </button>
          {selectedImage && (
            <div className="relative w-full aspect-[4/3]">
              <Image
                src={selectedImage}
                alt="Gallery image"
                fill
                sizes="95vw"
                quality={90}
                className="object-contain rounded-xl sm:rounded-2xl"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}