"use client";

import NavigationHeader from '@/components/NavigationHeader';
import Footer from '@/components/Footer';
import CountdownTimer from '@/components/CountdownTimer';
import Gallery from '@/components/Gallery';
import PartnersScroll from '@/components/PartnersScroll';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Ticket, Calendar, User, Heart } from 'lucide-react';

const artists = [
{
  id: 4,
  name: 'MLINDO THE VOCALIST',
  station: 'FEATURED ARTIST',
  image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762933523122.png',
  bio: 'Award-winning vocalist bringing soulful melodies'
},
{
  id: 1,
  name: 'MSIZI SHEMBE',
  station: 'METRO FM',
  image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762933588944.png',
  bio: 'Featured DJ for Groove Gathering'
},
{
  id: 2,
  name: 'MR OBSESSION',
  station: 'VOC FM',
  image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/PHOTO-2025-11-12-13-09-39-1763023337888.jpg?width=8000&height=8000&resize=contain',
  bio: 'Featured DJ for Groove Gathering'
},
{
  id: 3,
  name: 'PAUL MTIRARA',
  station: 'METRO FM',
  image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762939472607.png?width=8000&height=8000&resize=contain',
  bio: 'Featured DJ for Groove Gathering'
}];

const latestNews = [
  {
    id: 2,
    title: 'Phase 2 Tickets Go On Sale Tomorrow at 5PM!',
    category: 'Tickets',
    date: '2025-11-07',
    author: 'Event Team',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762545045759.png?width=800&height=500&resize=cover',
    excerpt: 'Phase 2 tickets for the RNB & Soulful Groove Gathering – Summer Edition will officially be available tomorrow, 8 November at 5PM. Tickets start at R250.00 and are limited. Make sure you secure yours early before the next price tier activates.',
  },
  {
    id: 1,
    title: 'Breaking: Mlindo The Vocalist Joins Our Line-Up',
    category: 'Announcements',
    date: '2025-11-07',
    author: 'Event Team',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762540197177.png?width=800&height=500&resize=cover',
    excerpt: 'We are thrilled to confirm that Mlindo The Vocalist, one of South Africa\'s most distinctive voices, is officially joining the RnB & Soulful Gathering 2025 line-up...',
  }
];

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldLoadVideo(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!shouldLoadVideo) return;
    const video = videoRef.current;
    if (!video) return;

    const attemptPlay = async () => {
      try {
        video.muted = true;
        video.setAttribute('muted', '');
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
        video.setAttribute('x5-playsinline', '');
        video.setAttribute('x5-video-player-type', 'h5');
        video.setAttribute('x5-video-player-fullscreen', 'false');
        video.defaultMuted = true;
        video.volume = 0;
        video.removeAttribute('controls');
        video.controls = false;
        await video.play();
      } catch (err) {
        console.log('Autoplay attempt failed:', err);
      }
    };

    const playAttempts = async () => {
      await attemptPlay();
      setTimeout(attemptPlay, 100);
      setTimeout(attemptPlay, 300);
      setTimeout(attemptPlay, 500);
    };
    
    playAttempts();

    const handleLoadedMetadata = () => attemptPlay();
    const handleCanPlay = () => attemptPlay();
    const handleFirstInteraction = () => attemptPlay();
    const handlePause = () => {
      if (video.readyState >= 2) {
        video.play().catch(() => {});
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadeddata', attemptPlay);
    video.addEventListener('pause', handlePause);
    
    document.addEventListener('touchstart', handleFirstInteraction, { once: true, passive: true });
    document.addEventListener('touchmove', handleFirstInteraction, { once: true, passive: true });
    document.addEventListener('touchend', handleFirstInteraction, { once: true, passive: true });
    document.addEventListener('click', handleFirstInteraction, { once: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            attemptPlay();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(video);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadeddata', attemptPlay);
      video.removeEventListener('pause', handlePause);
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('touchmove', handleFirstInteraction);
      document.removeEventListener('touchend', handleFirstInteraction);
      document.removeEventListener('click', handleFirstInteraction);
      observer.disconnect();
    };
  }, [shouldLoadVideo]);

  const handleArtistClick = (artistId: number) => {
    router.push(`/lineup?artist=${artistId}`);
  };

  return (
    <div className="min-h-screen bg-black">
      <NavigationHeader />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          {shouldLoadVideo && (
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="none"
              controls={false}
              disablePictureInPicture
              disableRemotePlayback
              poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
              className="absolute inset-0 w-full h-full object-cover [&::-webkit-media-controls]:hidden [&::-webkit-media-controls-panel]:hidden [&::-webkit-media-controls-play-button]:hidden [&::-webkit-media-controls-start-playback-button]:hidden"
              style={{ pointerEvents: 'none', objectFit: 'cover' }}
            >
              <source src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/grok-video-aec568bd-4b1a-413c-9858-e2507f2bab2a-1762533987820.mp4" type="video/mp4" />
            </video>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 py-8 sm:py-12 mx-auto max-w-5xl w-full">
          <div className="mt-6 sm:mt-8 pt-10 sm:pt-0">
            <CountdownTimer />
          </div>

          {/* Buttons */}
          <div className="mt-6 sm:mt-8 flex flex-row gap-4 sm:gap-6 items-center justify-center px-4">
            <a
              href="https://computicket.com/event/rnb-soulful-groove-gathering-summer-edition-/f6574621-5e8d-4a8a-aba9-8fa8bb6651aM"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 sm:gap-3 animate-glow flex-1 sm:flex-none justify-center text-sm sm:text-base font-bold"
            >
              <Ticket size={20} className="sm:w-6 sm:h-6" />
              <span className="hidden xs:inline">GET TICKETS</span>
              <span className="xs:hidden">TICKETS</span>
            </a>
            <a
              href="#lineup"
              className="btn-secondary inline-flex items-center justify-center gap-2 flex-1 sm:flex-none text-sm sm:text-base"
            >
              <span className="hidden xs:inline">View Line-Up</span>
              <span className="xs:hidden">LINE-UP</span>
            </a>
          </div>
        </div>
      </section>

      {/* Line-Up Section */}
      <section id="lineup" className="section-purple py-8 sm:py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-6 sm:mb-8 animate-fade-in-up">
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2 sm:mb-3 glow-gold">
              2025 LINE-UP
            </h2>
            <p className="text-xs sm:text-base md:text-xl text-[#CCCCCC] max-w-2xl mx-auto px-2">
              Experience the magic with these incredible artists
            </p>
          </div>

          {/* Desktop Grid */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {artists.slice(0, 3).map((artist, index) => (
              <Link
                key={artist.id}
                href={`/lineup?artist=${artist.id}`}
                className="group card-elevated relative overflow-hidden rounded-2xl bg-[#1A1A1A]/60 backdrop-blur-sm border border-white/10"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={artist.image}
                    alt={artist.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={85}
                    loading="lazy"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:glow-gold transition-all">
                    {artist.name}
                  </h3>
                  <p className="text-[#CCCCCC] text-sm mb-3">{artist.bio}</p>
                  <p className="text-white/70 text-sm group-hover:text-white transition-colors">
                    View full bio →
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile Horizontal Scroll */}
          <div className="sm:hidden overflow-x-auto scrollbar-hide -mx-4 px-4">
            <div className="flex gap-4 snap-x snap-mandatory">
              {artists.slice(0, 3).map((artist, index) => (
                <button
                  key={artist.id}
                  onClick={() => handleArtistClick(artist.id)}
                  className="group card-elevated relative overflow-hidden rounded-2xl bg-[#1A1A1A]/60 backdrop-blur-sm border border-white/10 flex-shrink-0 w-[280px] snap-center"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={artist.image}
                      alt={artist.name}
                      fill
                      sizes="280px"
                      quality={80}
                      loading="lazy"
                      className="object-cover transition-transform duration-700 group-active:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 pointer-events-none">
                    <h3 className="text-lg font-bold text-white mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
                      {artist.name}
                    </h3>
                    <p className="text-[#CCCCCC] text-sm mb-2">{artist.bio}</p>
                    <p className="text-white/70 text-xs">Tap to view full bio →</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="text-center mt-6 sm:mt-8">
            <Link
              href="/lineup"
              className="btn-primary inline-flex items-center gap-3 text-base sm:text-lg px-10 py-4"
            >
              View Full Line-Up →
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="section-light py-8 sm:py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-5 sm:mb-8">
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2">
              EVENT GALLERY
            </h2>
            <p className="text-xs sm:text-base md:text-lg text-[#CCCCCC] max-w-2xl mx-auto px-2">
              Relive the moments and preview what's coming
            </p>
          </div>
          <Gallery />
          <div className="text-center mt-6 sm:mt-8">
            <Link
              href="/gallery"
              className="btn-primary inline-flex items-center gap-3 text-base sm:text-lg px-10 py-4"
            >
              View Full Gallery →
            </Link>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="section-dark py-6 sm:py-10">
        <div className="container mx-auto px-4 mb-3">
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white mb-2 glow-gold">
            OUR PARTNERS
          </h2>
          <p className="text-center text-[#CCCCCC] text-sm sm:text-lg">
            Supported by these amazing organizations
          </p>
        </div>
        <PartnersScroll />
      </section>

      {/* Call to Action Section */}
      <section className="section-purple py-6 sm:py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center gap-3 sm:gap-5 max-w-4xl mx-auto">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center text-white glow-gold">
              <span className="block">DON'T MISS OUT</span>
              <span className="block">TICKETS SELLING FAST!</span>
            </h2>
            
            <div className="flex flex-row gap-2 sm:gap-6 w-full sm:w-auto">
              <a
                href="https://computicket.com/event/rnb-soulful-groove-gathering-summer-edition-/f6574621-5e8d-4a8a-aba9-8fa8bb6651aM"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center gap-1.5 sm:gap-3 text-xs sm:text-base lg:text-lg px-4 sm:px-10 py-3 sm:py-4 w-full sm:w-auto"
              >
                <Ticket size={16} className="sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="whitespace-nowrap">Buy Tickets</span>
              </a>
              
              <Link
                href="/volunteer"
                className="btn-secondary inline-flex items-center justify-center gap-1.5 sm:gap-3 text-xs sm:text-base lg:text-lg px-4 sm:px-10 py-3 sm:py-4 w-full sm:w-auto"
              >
                <Heart size={16} className="sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="whitespace-nowrap">Volunteer</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* News & Updates Section */}
      <section id="news" className="section-dark py-8 sm:py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2 sm:mb-3 glow-gold">
              NEWS & UPDATES
            </h2>
            <p className="text-base sm:text-xl text-[#CCCCCC] max-w-2xl mx-auto">
              Stay connected with the latest announcements
            </p>
          </div>

          {/* Desktop Grid */}
          <div className="hidden sm:grid sm:grid-cols-2 gap-6 lg:gap-8">
            {latestNews.map((article) => (
              <Link
                key={article.id}
                href="/news"
                className="group card-elevated bg-[#1A1A1A]/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    quality={85}
                    loading="lazy"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-1.5 bg-white text-black text-sm font-bold rounded-full uppercase tracking-wider">
                      {article.category}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:glow-gold transition-all line-clamp-2">
                    {article.title}
                  </h3>
                  
                  <div className="flex items-center gap-4 text-sm text-[#CCCCCC]/70 mb-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={16} />
                      <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User size={16} />
                      <span>{article.author}</span>
                    </div>
                  </div>
                  
                  <p className="text-[#CCCCCC] text-base mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <span className="text-white font-semibold text-base hover:underline inline-flex items-center gap-2">
                    Read More →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile Horizontal Scroll */}
          <div className="sm:hidden overflow-x-auto scrollbar-hide -mx-4 px-4">
            <div className="flex gap-4 snap-x snap-mandatory">
              {latestNews.map((article) => (
                <Link
                  key={article.id}
                  href="/news"
                  className="group card-elevated bg-[#1A1A1A]/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 flex-shrink-0 w-[320px] snap-center"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="320px"
                      quality={80}
                      loading="lazy"
                      className="object-cover transition-transform duration-700 group-active:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white text-black text-xs font-bold rounded-full uppercase tracking-wider">
                        {article.category}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
                  </div>
                  
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    
                    <div className="flex items-center gap-3 text-xs text-[#CCCCCC]/70 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        <span>{article.author}</span>
                      </div>
                    </div>
                    
                    <p className="text-[#CCCCCC] text-sm mb-3 line-clamp-3">
                      {article.excerpt}
                    </p>
                    
                    <span className="text-white font-semibold text-sm inline-flex items-center gap-1">
                      Read More →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="text-center mt-6 sm:mt-8">
            <Link
              href="/news"
              className="btn-primary inline-flex items-center gap-3 text-base sm:text-lg px-10 py-4"
            >
              View All News →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}