"use client";

import Link from 'next/link';
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

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/lineup', label: 'Line-Up' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/news', label: 'News' },
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
      <nav className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo/Brand Space (left side) */}
        <div className="flex-shrink-0">
          {/* Empty space for logo - can add logo here later */}
        </div>

        {/* Desktop Navigation (right side) */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 ml-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[var(--cream)] hover:text-[var(--gold)] transition-colors duration-300 font-medium text-base"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://computicket.com/event/rnb-soulful-groove-gathering-summer-edition-/f6574621-5e8d-4a8a-aba9-8fa8bb6651aM"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2 text-sm px-6 py-2.5 animate-glow"
          >
            <Ticket size={18} />
            BUY NOW
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2 ml-auto"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[var(--midnight-blue)]/98 backdrop-blur-lg border-t border-[var(--gold)]/30">
          <ul className="flex flex-col py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block px-6 py-3 text-[var(--cream)] hover:text-[var(--gold)] hover:bg-[var(--gold)]/10 transition-all duration-300 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="px-6 py-3">
              <a
                href="https://computicket.com/event/rnb-soulful-groove-gathering-summer-edition-/f6574621-5e8d-4a8a-aba9-8fa8bb6651aM"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center gap-2 w-full text-base px-6 py-3"
              >
                <Ticket size={20} />
                BUY NOW
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}