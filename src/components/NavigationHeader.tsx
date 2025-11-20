"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X, Ticket } from 'lucide-react';

export default function NavigationHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/lineup', label: 'Line-Up' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/news', label: 'News' },
    { href: '/competition', label: 'Competitions' },
    { href: '/tickets', label: 'Tickets' },
    { href: '/volunteer', label: 'Volunteer' },
    { href: '/contacts', label: 'Contacts' },
    { href: '/about', label: 'About' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'md:bg-[var(--midnight-blue)]/95 md:backdrop-blur-lg md:shadow-2xl md:border-b md:border-[var(--gold)]/30' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-3 xs:px-4 sm:px-6 py-3 xs:py-4 flex items-center justify-between">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[var(--cream)] hover:text-[var(--gold)] transition-colors duration-300 font-medium text-sm lg:text-base whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://computicket.com/event/rnb-soulful-groove-gathering-summer-edition-/f6574621-5e8d-4a8a-aba9-8fa8bb6651aM"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2 text-xs lg:text-sm px-4 lg:px-6 py-2 lg:py-2.5 animate-glow whitespace-nowrap"
          >
            <Ticket size={16} className="lg:w-[18px] lg:h-[18px]" />
            BUY NOW
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2 ml-auto touch-manipulation"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} className="xs:w-7 xs:h-7" /> : <Menu size={24} className="xs:w-7 xs:h-7" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[var(--midnight-blue)]/98 backdrop-blur-lg border-t border-[var(--gold)]/30 max-h-[calc(100vh-60px)] overflow-y-auto">
          <ul className="flex flex-col py-2 xs:py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block px-4 xs:px-6 py-2.5 xs:py-3 text-[var(--cream)] hover:text-[var(--gold)] hover:bg-[var(--gold)]/10 transition-all duration-300 font-medium text-sm xs:text-base touch-manipulation"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="px-4 xs:px-6 py-2.5 xs:py-3">
              <a
                href="https://computicket.com/event/rnb-soulful-groove-gathering-summer-edition-/f6574621-5e8d-4a8a-aba9-8fa8bb6651aM"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center gap-2 w-full text-sm xs:text-base px-4 xs:px-6 py-2.5 xs:py-3 touch-manipulation"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Ticket size={18} className="xs:w-5 xs:h-5" />
                BUY NOW
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}