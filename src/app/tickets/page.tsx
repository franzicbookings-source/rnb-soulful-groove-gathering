"use client";

import NavigationHeader from '@/components/NavigationHeader';
import Footer from '@/components/Footer';
import { Ticket, Calendar, MapPin, Clock } from 'lucide-react';

export default function TicketsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--midnight-blue)] via-[var(--deep-brown)] to-black">
      <NavigationHeader />
      
      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-[var(--gold)]/10 border-2 border-[var(--gold)] mb-4 sm:mb-6">
            <Ticket className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[var(--gold)]" />
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--gold)] mb-3 sm:mb-4 glow-gold leading-tight">
            Get Your Tickets
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-[var(--cream)]/90 mb-6 sm:mb-8 px-2">
            RNB & Soulful Groove Gathering - Summer Edition
          </p>

          {/* Quick Event Info */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-[var(--cream)]/80 mb-8 sm:mb-12">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--gold)] flex-shrink-0" />
              <span className="text-xs sm:text-sm md:text-base">December 14, 2025</span>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-[var(--gold)]/50" />
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--gold)] flex-shrink-0" />
              <span className="text-xs sm:text-sm md:text-base">Gates Open 12PM</span>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-[var(--gold)]/50" />
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--gold)] flex-shrink-0" />
              <span className="text-xs sm:text-sm md:text-base">Majuba College Stadium</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tickets CTA Section */}
      <section className="pb-16 sm:pb-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="bg-black/40 backdrop-blur-sm border-2 border-[var(--gold)]/30 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--gold)] mb-3 sm:mb-4 leading-tight">
              Tickets Selling Fast!
            </h2>
            
            <p className="text-sm sm:text-base md:text-lg text-[var(--cream)]/80 mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
              Secure your spot at the most anticipated RnB & Soulful event of the summer. 
              Don't miss this unforgettable experience!
            </p>

            <a
              href="https://computicket.com/event/rnb-soulful-groove-gathering-summer-edition-/f6574621-5e8d-4a8a-aba9-8fa8bb6651aM"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 py-3.5 sm:px-10 sm:py-5 bg-[var(--gold)] text-black font-bold text-base sm:text-lg rounded-full hover:bg-[var(--gold)]/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-[var(--gold)]/50 animate-glow w-full sm:w-auto"
            >
              <Ticket className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
              <span>Buy Tickets Now</span>
            </a>

            <p className="text-xs sm:text-sm text-[var(--cream)]/60 mt-4 sm:mt-6 px-2">
              You will be redirected to Computicket to complete your purchase
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}