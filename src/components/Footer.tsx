"use client"

import Link from 'next/link';
import { Facebook, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[var(--midnight-blue)] text-[var(--cream)] border-t-2 border-[var(--gold)]/30 py-6 sm:py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-5">
          {/* Social Media Icons */}
          <div className="flex gap-3 sm:gap-4">
            <a
              href="https://www.instagram.com/boxerngwenya?igsh=czJ0anQ2bGt5ZWZi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-light)] flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
            >
              <Instagram size={18} className="sm:w-5 sm:h-5 text-[var(--midnight-blue)]" />
            </a>
            <a
              href="https://www.facebook.com/share/17WpAhqCSv/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-light)] flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
            >
              <Facebook size={18} className="sm:w-5 sm:h-5 text-[var(--midnight-blue)]" />
            </a>
          </div>

          {/* Tagline */}
          <h3 className="text-base sm:text-xl font-bold text-[var(--gold)] glow-gold text-center">
            AN RNB EVENT LIKE NO OTHER
          </h3>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-xs sm:text-sm">
            <Link href="/#lineup" className="text-[var(--cream)]/90 hover:text-[var(--gold)] transition-colors font-medium">
              Line-Up
            </Link>
            <Link href="https://computicket.com/event/rnb-soulful-groove-gathering-summer-edition-/f6574621-5e8d-4a8a-aba9-8fa8bb6651aM" target="_blank" rel="noopener noreferrer" className="text-[var(--cream)]/90 hover:text-[var(--gold)] transition-colors font-medium">
              Tickets
            </Link>
            <Link href="/gallery" className="text-[var(--cream)]/90 hover:text-[var(--gold)] transition-colors font-medium">
              Gallery
            </Link>
            <Link href="/about" className="text-[var(--cream)]/90 hover:text-[var(--gold)] transition-colors font-medium">
              About
            </Link>
            <Link href="/contacts" className="text-[var(--cream)]/90 hover:text-[var(--gold)] transition-colors font-medium">
              Contact
            </Link>
          </nav>

          {/* Copyright */}
          <p className="text-[10px] sm:text-xs text-[var(--cream)]/70 text-center pt-2 sm:pt-3 border-t border-[var(--gold)]/20 w-full max-w-md">
            © 2025 RnB & Soulful Groove Gathering. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}