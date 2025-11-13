"use client";

import NavigationHeader from '@/components/NavigationHeader';
import Footer from '@/components/Footer';
import FloatingElements from '@/components/FloatingElements';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const artists = [
  { 
    id: 4, 
    name: 'MLINDO THE VOCALIST',
    station: 'FEATURED ARTIST', 
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762933523122.png?width=8000&height=8000&resize=contain', 
    bio: 'MLINDO THE VOCALIST is one of South Africa\'s most distinctive and celebrated voices in the RnB and Afro-Soul genre. Known for his emotionally charged performances and heartfelt lyrics, Mlindo has captured the hearts of millions with hit songs that resonate deeply with audiences across the nation. His unique vocal style blends traditional soul with contemporary African rhythms, creating a sound that is both timeless and fresh. With multiple awards and chart-topping hits, Mlindo brings an authentic, raw energy that transforms every performance into an unforgettable experience.',
    genre: 'Afro-Soul & Contemporary RnB',
    experience: '7+ years',
    speciality: 'Heartfelt Vocals & Emotional Storytelling'
  },
  { 
    id: 1, 
    name: 'MSIZI SHEMBE',
    station: 'METRO FM', 
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762933588944.png?width=8000&height=8000&resize=contain', 
    bio: 'MSIZI SHEMBE is one of the most electrifying talents in the RnB and Soulful music scene. With a unique ability to blend classic soul vibes with contemporary RnB beats, MSIZI creates an unforgettable atmosphere that keeps the crowd moving all night long. Known for seamless transitions and reading the energy of the room, MSIZI has performed at numerous venues and festivals on METRO FM, bringing a signature sound that combines smooth melodies with deep, groovy basslines.',
    genre: 'RnB & Soulful House',
    experience: '10+ years',
    speciality: 'Soulful Vibes & Smooth Transitions'
  },
  { 
    id: 2, 
    name: 'MR OBSESSION',
    station: 'VOC FM', 
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/PHOTO-2025-11-12-13-09-39-1763023337888.jpg?width=8000&height=8000&resize=contain', 
    bio: 'MR OBSESSION is a master of creating infectious rhythms and captivating soundscapes. As a prominent voice on VOC FM, MR OBSESSION has built a reputation for delivering sets that blend deep soul, classic RnB, and modern grooves. With an obsessive attention to detail and a passion for music that resonates with the soul, this artist has become a favorite among fans who appreciate authenticity and musical excellence. Every performance is a journey through sound and emotion.',
    genre: 'Deep Soul & Classic RnB',
    experience: '8+ years',
    speciality: 'Infectious Rhythms & Emotional Storytelling'
  },
  { 
    id: 3, 
    name: 'PAUL MTIRARA',
    station: 'METRO FM', 
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762939472607.png?width=8000&height=8000&resize=contain', 
    bio: 'PAUL MTIRARA brings a fresh and dynamic energy to every performance. As a celebrated DJ on METRO FM, PAUL has earned recognition for crafting sets that seamlessly weave together soulful melodies, powerful vocals, and irresistible beats. With a deep understanding of what moves people, PAUL creates musical experiences that are both uplifting and deeply moving. Known for connecting with audiences on an emotional level, PAUL MTIRARA is a true artist who lives and breathes the essence of RnB and Soul.',
    genre: 'Uplifting Soul & Powerful Vocals',
    experience: '12+ years',
    speciality: 'Emotional Connection & Dynamic Energy'
  }
];

function LineupContent() {
  const searchParams = useSearchParams();
  const artistId = searchParams.get('artist');
  const artistRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (artistId) {
      const id = parseInt(artistId);
      const index = artists.findIndex(a => a.id === id);
      if (index !== -1) {
        setCurrentIndex(index);
        if (!isMobile) {
          const element = artistRefs.current[id];
          if (element) {
            setTimeout(() => {
              element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
          }
        }
      }
    }
  }, [artistId, isMobile]);

  const nextArtist = () => {
    setCurrentIndex((prev) => (prev + 1) % artists.length);
  };

  const prevArtist = () => {
    setCurrentIndex((prev) => (prev - 1 + artists.length) % artists.length);
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-center text-[var(--gold)] mb-6 glow-gold">
            2025 Line-Up
          </h1>
          <p className="text-center text-[var(--cream)]/90 text-xl mb-4">
            Angels of the Promise Land
          </p>
          <p className="text-center text-[var(--cream)]/70 text-lg">
            Meet the incredible artists bringing soulful vibes to Groove Gathering
          </p>
        </div>
      </section>

      {/* Artist Details Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Desktop View - Stacked Layout */}
          <div className="hidden md:block space-y-16">
            {artists.map((artist) => (
              <div
                key={artist.id}
                ref={(el) => { artistRefs.current[artist.id] = el; }}
                className="bg-black/40 backdrop-blur-sm border-2 border-[var(--gold)]/30 rounded-lg overflow-hidden hover:border-[var(--gold)] transition-all duration-300"
              >
                <div className="grid md:grid-cols-2 gap-8 p-8">
                  {/* Artist Image */}
                  <div className="relative aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={artist.image}
                      alt={artist.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>

                  {/* Artist Info */}
                  <div className="flex flex-col justify-center space-y-6">
                    <div>
                      <h2 className="text-4xl md:text-5xl font-bold text-[var(--gold)] glow-gold mb-2">
                        {artist.name}
                      </h2>
                      <p className="text-[var(--cream)]/90 text-lg font-semibold">{artist.station}</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-[var(--gold)]/80 font-semibold mb-2">Biography</h3>
                        <p className="text-[var(--cream)]/90 leading-relaxed">
                          {artist.bio}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                        <div className="bg-[var(--gold)]/10 p-4 rounded-lg border border-[var(--gold)]/30">
                          <h4 className="text-[var(--gold)] font-semibold mb-1">Genre</h4>
                          <p className="text-[var(--cream)]/80">{artist.genre}</p>
                        </div>

                        <div className="bg-[var(--gold)]/10 p-4 rounded-lg border border-[var(--gold)]/30">
                          <h4 className="text-[var(--gold)] font-semibold mb-1">Experience</h4>
                          <p className="text-[var(--cream)]/80">{artist.experience}</p>
                        </div>

                        <div className="bg-[var(--gold)]/10 p-4 rounded-lg border border-[var(--gold)]/30 sm:col-span-2">
                          <h4 className="text-[var(--gold)] font-semibold mb-1">Speciality</h4>
                          <p className="text-[var(--cream)]/80">{artist.speciality}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile View - Carousel */}
          <div className="md:hidden">
            <div className="relative">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -300 }}
                  transition={{ duration: 0.3 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);

                    if (swipe < -swipeConfidenceThreshold) {
                      nextArtist();
                    } else if (swipe > swipeConfidenceThreshold) {
                      prevArtist();
                    }
                  }}
                  className="bg-black/40 backdrop-blur-sm border-2 border-[var(--gold)]/30 rounded-lg overflow-hidden"
                >
                  <div className="p-6 space-y-6">
                    {/* Artist Image */}
                    <div className="relative aspect-square rounded-lg overflow-hidden">
                      <Image
                        src={artists[currentIndex].image}
                        alt={artists[currentIndex].name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>

                    {/* Artist Info */}
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-3xl font-bold text-[var(--gold)] glow-gold mb-2">
                          {artists[currentIndex].name}
                        </h2>
                        <p className="text-[var(--cream)]/90 text-lg font-semibold">
                          {artists[currentIndex].station}
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h3 className="text-[var(--gold)]/80 font-semibold mb-2">Biography</h3>
                          <p className="text-[var(--cream)]/90 leading-relaxed text-sm">
                            {artists[currentIndex].bio}
                          </p>
                        </div>

                        <div className="space-y-3">
                          <div className="bg-[var(--gold)]/10 p-4 rounded-lg border border-[var(--gold)]/30">
                            <h4 className="text-[var(--gold)] font-semibold mb-1">Genre</h4>
                            <p className="text-[var(--cream)]/80 text-sm">{artists[currentIndex].genre}</p>
                          </div>

                          <div className="bg-[var(--gold)]/10 p-4 rounded-lg border border-[var(--gold)]/30">
                            <h4 className="text-[var(--gold)] font-semibold mb-1">Experience</h4>
                            <p className="text-[var(--cream)]/80 text-sm">{artists[currentIndex].experience}</p>
                          </div>

                          <div className="bg-[var(--gold)]/10 p-4 rounded-lg border border-[var(--gold)]/30">
                            <h4 className="text-[var(--gold)] font-semibold mb-1">Speciality</h4>
                            <p className="text-[var(--cream)]/80 text-sm">{artists[currentIndex].speciality}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              <button
                onClick={prevArtist}
                className="absolute left-2 top-1/3 -translate-y-1/2 bg-[var(--gold)]/20 hover:bg-[var(--gold)]/40 backdrop-blur-sm p-2 rounded-full transition-all z-10"
                aria-label="Previous artist"
              >
                <ChevronLeft className="w-5 h-5 text-[var(--gold)]" />
              </button>
              <button
                onClick={nextArtist}
                className="absolute right-2 top-1/3 -translate-y-1/2 bg-[var(--gold)]/20 hover:bg-[var(--gold)]/40 backdrop-blur-sm p-2 rounded-full transition-all z-10"
                aria-label="Next artist"
              >
                <ChevronRight className="w-5 h-5 text-[var(--gold)]" />
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {artists.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'w-8 bg-[var(--gold)]'
                      : 'w-2 bg-[var(--gold)]/30'
                  }`}
                  aria-label={`Go to artist ${index + 1}`}
                />
              ))}
            </div>

            {/* Swipe Hint */}
            <p className="text-center text-[var(--cream)]/50 text-sm mt-4">
              Swipe or use arrows to browse artists
            </p>
          </div>
        </div>
      </section>

      {/* More Artists Coming Soon */}
      <section className="py-16 px-4 bg-gradient-to-b from-transparent to-black/50">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-[var(--gold)] mb-4 glow-gold">
            More Artists Coming Soon
          </h3>
          <p className="text-[var(--cream)]/80 text-lg">
            Stay tuned for more exciting announcements about our 2025 lineup!
          </p>
        </div>
      </section>
    </>
  );
}

export default function LineupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--midnight-blue)] via-[var(--deep-brown)] to-black">
      <NavigationHeader />

      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-[var(--gold)] text-xl">Loading lineup...</div>
        </div>
      }>
        <LineupContent />
      </Suspense>

      <Footer />
    </div>
  );
}