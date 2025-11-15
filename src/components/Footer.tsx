"use client"

import Link from 'next/link';
import { Facebook, Instagram } from 'lucide-react';
import { SiTiktok } from 'react-icons/si';

export default function Footer() {
  return (
    <footer className="bg-[var(--midnight-blue)] text-[var(--cream)] border-t-2 border-[var(--gold)]/30 py-5 xs:py-6 sm:py-8">
      <div className="container mx-auto px-3 xs:px-4 max-w-6xl">
        <div className="flex flex-col items-center justify-center space-y-3 xs:space-y-4 sm:space-y-5">
          {/* Social Media Icons */}
          <div className="flex gap-2.5 xs:gap-3 sm:gap-4">
            <a
              href="https://www.instagram.com/boxerngwenya?igsh=czJ0anQ2bGt5ZWZi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-light)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-105 shadow-lg touch-manipulation"
            >
              <Instagram size={16} className="xs:w-[18px] xs:h-[18px] sm:w-5 sm:h-5 text-[var(--midnight-blue)]" />
            </a>
            <a
              href="https://www.tiktok.com/@rnb.soulful.groov?_r=1&_t=ZS-91NeUKEeNKpUser"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-light)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-105 shadow-lg touch-manipulation"
            >
              <SiTiktok size={16} className="xs:w-[18px] xs:h-[18px] sm:w-5 sm:h-5 text-[var(--midnight-blue)]" />
            </a>
            <a
              href="https://www.facebook.com/share/17WpAhqCSv/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-light)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-105 shadow-lg touch-manipulation"
            >
              <Facebook size={16} className="xs:w-[18px] xs:h-[18px] sm:w-5 sm:h-5 text-[var(--midnight-blue)]" />
            </a>
          </div>

          {/* Tagline */}
          <h3 className="text-sm xs:text-base sm:text-xl font-bold text-[var(--gold)] glow-gold text-center px-2">
            AN RNB EVENT LIKE NO OTHER
          </h3>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-2 xs:gap-3 sm:gap-5 text-[10px] xs:text-xs sm:text-sm px-2">
            <Link href="/#lineup" className="text-[var(--cream)]/90 hover:text-[var(--gold)] transition-colors font-medium touch-manipulation whitespace-nowrap">
              Line-Up
            </Link>
            <Link href="https://computicket.com/event/rnb-soulful-groove-gathering-summer-edition-/f6574621-5e8d-4a8a-aba9-8fa8bb6651aM" target="_blank" rel="noopener noreferrer" className="text-[var(--cream)]/90 hover:text-[var(--gold)] transition-colors font-medium touch-manipulation whitespace-nowrap">
              Tickets
            </Link>
            <Link href="/gallery" className="text-[var(--cream)]/90 hover:text-[var(--gold)] transition-colors font-medium touch-manipulation whitespace-nowrap">
              Gallery
            </Link>
            <Link href="/about" className="text-[var(--cream)]/90 hover:text-[var(--gold)] transition-colors font-medium touch-manipulation whitespace-nowrap">
              About
            </Link>
            <Link href="/contacts" className="text-[var(--cream)]/90 hover:text-[var(--gold)] transition-colors font-medium touch-manipulation whitespace-nowrap">
              Contact
            </Link>
          </nav>

          {/* Copyright */}
          <p className="text-[9px] xs:text-[10px] sm:text-xs text-[var(--cream)]/70 text-center pt-2 sm:pt-3 border-t border-[var(--gold)]/20 w-full max-w-md px-2">
            © 2025 RnB & Soulful Groove Gathering. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}