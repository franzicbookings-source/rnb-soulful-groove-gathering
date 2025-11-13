"use client"

import NavigationHeader from '@/components/NavigationHeader';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { Heart, Music, Users, Sparkles } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';

const values = [
  {
    icon: Heart,
    title: 'Unity & Connection',
    description: 'Bringing people together through the universal language of soulful music and shared experiences.',
  },
  {
    icon: Music,
    title: 'Musical Excellence',
    description: 'Showcasing the finest RnB and soul artists, celebrating the genre\'s rich heritage and evolution.',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Building a vibrant community of music lovers who appreciate authentic, heartfelt performances.',
  },
  {
    icon: Sparkles,
    title: 'Magical Experiences',
    description: 'Creating unforgettable moments through stunning visuals, incredible performances, and atmosphere.',
  },
];

export default function AboutPage() {
  const [selectedFounder, setSelectedFounder] = useState<{ name: string; image: string; description: string } | null>(null);

  const founders = [
    {
      name: 'Sphe',
      image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762553303885.png',
      description: 'Co-founder dedicated to creating magical moments and unforgettable experiences for music lovers.'
    },
    {
      name: 'Boxer Ngwenya',
      image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762553323917.png',
      description: 'Co-founder and visionary behind the soulful experience that brings communities together through music.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--midnight-blue)] via-[var(--deep-brown)] to-black">
      <NavigationHeader />

      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-24 md:pt-32 pb-8 sm:pb-12 md:pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--gold)_0%,transparent_70%)]" />
        </div>

        <div className="container mx-auto relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center text-[var(--gold)] mb-3 sm:mb-4 md:mb-6 glow-gold leading-tight">
            About Us
          </h1>
          <p className="text-center text-[var(--cream)]/80 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto px-2 sm:px-4">
            Discover the story behind the RnB & Soulful Groove Gathering
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-6 sm:py-8 md:py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-10 sm:mb-12 md:mb-20">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--gold)] mb-2 sm:mb-3 md:mb-4 lg:mb-6 glow-gold">
              Our Story
            </h2>
            <div className="space-y-2 sm:space-y-3 md:space-y-4 text-[var(--cream)]/80 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
              <p>
                Born from a passion for authentic rhythm and blues, the RnB & Soulful Groove Gathering began as a dream to create a space where music lovers could come together to celebrate the genre's timeless beauty.
              </p>
              <p>
                What started as an intimate gathering has blossomed into one of the most anticipated RnB events of the year, drawing thousands of fans and featuring world-class artists who embody the soul and spirit of the music.
              </p>
              <p>
                Each year, we honor the rich traditions of RnB while embracing contemporary sounds, creating a unique experience that bridges generations and celebrates the evolution of soulful music.
              </p>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="bg-black/60 backdrop-blur-sm rounded-lg p-4 sm:p-6 md:p-12 border-2 border-[var(--gold)]/30 mb-10 sm:mb-12 md:mb-20">
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--gold)] mb-2 sm:mb-3 md:mb-4">Our Mission</h3>
                <p className="text-[var(--cream)]/80 text-sm sm:text-base md:text-lg leading-relaxed">
                  To create transformative musical experiences that unite communities, celebrate artistic excellence, and honor the healing power of RnB and soul music. We strive to provide a platform where both established and emerging artists can share their gifts with an appreciative audience.
                </p>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--gold)] mb-2 sm:mb-3 md:mb-4">Our Vision</h3>
                <p className="text-[var(--cream)]/80 text-sm sm:text-base md:text-lg leading-relaxed">
                  To be recognized as the premier destination for authentic RnB and soul music experiences, fostering a global community of music enthusiasts who value artistry, connection, and the timeless power of soulful expression.
                </p>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="mb-10 sm:mb-12 md:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[var(--gold)] mb-6 sm:mb-8 md:mb-12 glow-gold">
              Our Values
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4 md:gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-black/40 backdrop-blur-sm rounded-lg p-4 sm:p-5 md:p-6 border-2 border-[var(--gold)]/30 hover:border-[var(--gold)] transition-all duration-300 hover:scale-105 text-center"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[var(--gold)]/20 rounded-full flex items-center justify-center mb-2 sm:mb-3 md:mb-4 mx-auto">
                    <value.icon className="text-[var(--gold)]" size={24} />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-[var(--gold)] mb-1 sm:mb-2 md:mb-3">
                    {value.title}
                  </h3>
                  <p className="text-[var(--cream)]/80 text-xs sm:text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Our Founders */}
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 sm:p-6 md:p-12 border-2 border-[var(--gold)]/30">
            <div className="text-center mb-4 sm:mb-6 md:mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--gold)] mb-2 sm:mb-3 md:mb-4 glow-gold">
                Our Founders
              </h2>
              <p className="text-[var(--cream)]/80 text-sm sm:text-base md:text-lg max-w-3xl mx-auto px-2 sm:px-4 leading-relaxed">
                Meet the visionaries behind the RnB & Soulful Groove Gathering
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {founders.map((founder, index) => (
                <Dialog key={index}>
                  <DialogTrigger asChild>
                    <div className="text-center cursor-pointer group">
                      <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-black/20 mb-2 sm:mb-3 md:mb-4 transition-transform duration-300 group-hover:scale-105">
                        <Image
                          src={founder.image}
                          alt={founder.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                          <span className="text-[var(--gold)] text-sm sm:text-base opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-bold">
                            View Full Image
                          </span>
                        </div>
                      </div>
                      <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[var(--gold)] mb-1 sm:mb-2 md:mb-3">
                        {founder.name}
                      </h3>
                      <p className="text-[var(--cream)]/80 text-xs sm:text-sm md:text-base leading-relaxed">
                        {founder.description}
                      </p>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-[90vw] sm:max-w-[600px] md:max-w-[800px] bg-black/95 border-2 border-[var(--gold)]/50 p-0">
                    <div className="relative w-full aspect-square">
                      <Image
                        src={founder.image}
                        alt={founder.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="p-4 sm:p-6">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--gold)] mb-2 glow-gold">
                        {founder.name}
                      </h3>
                      <p className="text-[var(--cream)]/80 text-sm sm:text-base">
                        {founder.description}
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}