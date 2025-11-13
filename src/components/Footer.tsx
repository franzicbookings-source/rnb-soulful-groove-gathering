"use client"

import Link from 'next/link';
import { Facebook, Instagram } from 'lucide-react';

// TikTok Icon Component
const TikTokIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-[var(--midnight-blue)] text-[var(--cream)] border-t-2 border-[var(--gold)]/30 py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col items-center justify-center space-y-8">
          {/* Social Media Icons */}
          <div className="flex gap-6">
            <a
              href="https://www.instagram.com/boxerngwenya?igsh=czJ0anQ2bGt5ZWZi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-14 h-14 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-light)] flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
            >
              <Instagram size={24} className="text-[var(--midnight-blue)]" />
            </a>
            <a
              href="https://www.facebook.com/share/17WpAhqCSv/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-14 h-14 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-light)] flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
            >
              <Facebook size={24} className="text-[var(--midnight-blue)]" />
            </a>
            <a
              href="https://lite.tiktok.com/t/ZSH3MrbvkwT7Y-SuE9Z/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="w-14 h-14 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-light)] flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
            >
              <TikTokIcon size={24} className="text-[var(--midnight-blue)]" />
            </a>
          </div>

          {/* Tagline */}
          <h3 className="text-xl sm:text-4xl font-bold text-[var(--gold)] glow-gold text-center">
            An RnB Event Like No Other
          </h3>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-base">
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
          <p className="text-sm text-[var(--cream)]/70 text-center pt-4 border-t border-[var(--gold)]/20 max-w-xl">
            © 2025 RnB & Soulful Groove Gathering. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}