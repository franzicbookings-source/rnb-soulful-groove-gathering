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
},
{
  id: 5,
  name: 'DJ ASH',
  station: 'FEATURED DJ',
  image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_0737-1763113434256.jpeg?width=8000&height=8000&resize=contain',
  bio: 'Dynamic DJ bringing high-energy soulful beats'
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

// Custom hook for counting animation
const useCountUp = (end: number, start: number = 0, duration: number = 2000, shouldStart: boolean = false) => {
  const [count, setCount] = useState(start);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated || !shouldStart) return;
    
    const startTime = Date.now();
    const range = end - start;
    
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(start + range * easeOutQuart);
      
      setCount(currentCount);
      
      if (progress === 1) {
        clearInterval(timer);
        setHasAnimated(true);
      }
    }, 16); // ~60fps
    
    return () => clearInterval(timer);
  }, [end, start, duration, hasAnimated, shouldStart]);

  return count;
};

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [posterLoaded, setPosterLoaded] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [viewportHeight, setViewportHeight] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Counting animations for stats - only start when shouldAnimate is true
  const artistsCount = useCountUp(15, 0, 2000, shouldAnimate);
  const hoursCount = useCountUp(8, 1, 2000, shouldAnimate);
  const volunteersCount = useCountUp(50, 5, 2000, shouldAnimate);

  // Set viewport height for mobile browsers (Samsung Internet, Chrome mobile, etc.)
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight;
      setViewportHeight(vh);
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);
    
    return () => {
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Only start loading video AFTER poster is fully loaded
  useEffect(() => {
    if (posterLoaded) {
      const timer = setTimeout(() => {
        setShouldLoadVideo(true);
      }, 500); // Give poster a moment to render
      return () => clearTimeout(timer);
    }
  }, [posterLoaded]);

  // IntersectionObserver for counting animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !shouldAnimate) {
            setShouldAnimate(true);
          }
        });
      },
      { threshold: 0.3 } // Trigger when 30% of the section is visible
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, [shouldAnimate]);

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
        setVideoPlaying(true);
      } catch (err) {
        // Autoplay blocked - user interaction required
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
    const handlePlaying = () => setVideoPlaying(true);
    const handlePause = () => {
      if (video.readyState >= 2) {
        video.play().catch(() => {});
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadeddata', attemptPlay);
    video.addEventListener('playing', handlePlaying);
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
      video.removeEventListener('playing', handlePlaying);
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
      <section 
        className="relative flex items-center justify-center overflow-hidden" 
        style={{ 
          height: viewportHeight ? `${viewportHeight}px` : '100vh',
          minHeight: viewportHeight ? `${viewportHeight}px` : '100vh',
          maxHeight: viewportHeight ? `${viewportHeight}px` : '100vh',
          background: 'linear-gradient(135deg, #2D1B3D 0%, #1A1A3E 50%, #0F0F2E 100%)'
        }}
      >
        {/* Background Video/Image */}
        <div className="absolute inset-0">
          {/* Poster/Fallback image - always visible until video plays */}
          <div 
            className="absolute inset-0 w-full h-full transition-opacity duration-1000"
            style={{ 
              opacity: (posterLoaded && videoPlaying) ? 0 : 1,
              pointerEvents: 'none'
            }}
          >
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762545045759.png"
              alt="Hero background"
              fill
              priority
              quality={90}
              className="object-cover"
              sizes="100vw"
              onLoad={() => setPosterLoaded(true)}
            />
          </div>

          {/* Video - fades in when playing */}
          {shouldLoadVideo && (
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              controls={false}
              disablePictureInPicture
              disableRemotePlayback
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
              style={{ 
                pointerEvents: 'none', 
                objectFit: 'cover',
                opacity: videoPlaying ? 1 : 0
              }}
            >
              <source src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/grok-video-356d17ca-0648-46f4-ab06-050c2eea57a1-8-1763151604813.mp4" type="video/mp4" />
            </video>
          )}
        </div>
        
        {/* Gradient Overlay - Separate layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70 pointer-events-none" />

        {/* Hero Content - Show immediately */}
        <div className="relative z-10 text-center px-4 sm:px-6 py-8 sm:py-12 mx-auto max-w-5xl w-full flex flex-col justify-center items-center h-full">
          <div className="mt-6 sm:mt-8">
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
            <p className="text-xs sm:text-base md:text-xl text-[#CCCCCC] max-w-2xl mx-auto px-2 font-bold">
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
            <p className="text-xs sm:text-base md:text-lg text-[#CCCCCC] max-w-2xl mx-auto px-2 font-bold">
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
          <p className="text-center text-[#CCCCCC] text-sm sm:text-lg font-bold">
            Supported by these amazing organizations
          </p>
        </div>
        <PartnersScroll />
      </section>

      {/* Call to Action Section */}
      <section className="section-purple py-8 sm:py-12 px-4 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-[var(--gold)] blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-[var(--gold)] blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto max-w-5xl relative z-10">
          {/* Main CTA Card */}
          <div className="bg-gradient-to-br from-black/60 via-[#2D1B3D]/40 to-black/60 backdrop-blur-md border-2 border-[var(--gold)]/30 rounded-3xl p-6 sm:p-8 shadow-2xl">
            
            {/* Top Badge */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-[var(--gold)]/10 border border-[var(--gold)]/40 rounded-full">
                <div className="w-2 h-2 rounded-full bg-[var(--gold)] animate-pulse"></div>
                <span className="text-[var(--gold)] text-sm font-bold uppercase tracking-wider">Limited Availability</span>
              </div>
            </div>

            {/* Event Highlights Grid - Mobile Responsive */}
            <div ref={statsRef} className="grid grid-cols-3 gap-3 sm:gap-4 mb-8 max-w-3xl mx-auto">
              <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-3 sm:p-5 text-center">
                <div className="text-xl sm:text-3xl font-bold text-[var(--gold)] mb-1 sm:mb-2">{artistsCount}+</div>
                <div className="text-[10px] sm:text-sm text-[var(--cream)]/70 uppercase tracking-wide leading-tight">Top Artists</div>
              </div>
              <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-3 sm:p-5 text-center">
                <div className="text-xl sm:text-3xl font-bold text-[var(--gold)] mb-1 sm:mb-2">{hoursCount}</div>
                <div className="text-[10px] sm:text-sm text-[var(--cream)]/70 uppercase tracking-wide leading-tight">Hours of Music</div>
              </div>
              <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-3 sm:p-5 text-center">
                <div className="text-xl sm:text-3xl font-bold text-[var(--gold)] mb-1 sm:mb-2">{volunteersCount}+</div>
                <div className="text-[10px] sm:text-sm text-[var(--cream)]/70 uppercase tracking-wide leading-tight">Volunteers</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-row items-center justify-center gap-3 sm:gap-4">
              <a
                href="https://computicket.com/event/rnb-soulful-groove-gathering-summer-edition-/f6574621-5e8d-4a8a-aba9-8fa8bb6651aM"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-[var(--gold)] to-[var(--gold-dark)] text-black font-bold text-sm sm:text-base rounded-full overflow-hidden transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-[var(--gold)]/50 flex-1"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--gold-light)] to-[var(--gold)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Ticket className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 flex-shrink-0" />
                <span className="relative z-10 whitespace-nowrap text-xs sm:text-base">Get Tickets</span>
              </a>
              
              <Link
                href="/volunteer"
                className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-10 py-3 sm:py-4 bg-transparent border-2 border-[var(--gold)] text-[var(--gold)] font-semibold text-sm sm:text-base rounded-full hover:bg-[var(--gold)]/10 transition-all duration-300 hover:scale-105 flex-1"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="whitespace-nowrap text-xs sm:text-base">Volunteer</span>
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
            <p className="text-base sm:text-xl text-[#CCCCCC] max-w-2xl mx-auto font-bold">
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