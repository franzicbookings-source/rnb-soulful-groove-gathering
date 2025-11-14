"use client";

import NavigationHeader from '@/components/NavigationHeader';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, Facebook, Instagram, Send } from 'lucide-react';
import { useState } from 'react';

export default function ContactsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--midnight-blue)] via-[var(--deep-brown)] to-black">
      <NavigationHeader />

      {/* Hero Section */}
      <section className="relative pt-28 sm:pt-32 pb-8 sm:pb-12 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-3 sm:mb-4 glow-gold">
            GET IN TOUCH
          </h1>
          <p className="text-[#CCCCCC] text-base sm:text-lg">
            We'd love to hear from you
          </p>
        </div>
      </section>

      {/* Contact Cards - Mobile Optimized */}
      <section className="pb-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Email Card */}
            <a 
              href="mailto:info@rnbsoulfulgroovegathering.co.za"
              className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-2xl p-4 sm:p-6 hover:border-white/40 transition-all"
            >
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <Mail className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm sm:text-base mb-1">Email</h3>
                  <p className="text-[#CCCCCC] text-xs sm:text-sm break-words">info@rnbsoulfulgroovegathering.co.za</p>
                </div>
              </div>
            </a>

            {/* Phone Card */}
            <a 
              href="tel:+27679391020"
              className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-2xl p-4 sm:p-6 hover:border-white/40 transition-all"
            >
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <Phone className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm sm:text-base mb-1">Phone</h3>
                  <p className="text-[#CCCCCC] text-xs sm:text-sm">067 939 1020</p>
                </div>
              </div>
            </a>

            {/* Location Card */}
            <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-2xl p-4 sm:p-6">
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <MapPin className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm sm:text-base mb-1">Location</h3>
                  <p className="text-[#CCCCCC] text-xs sm:text-sm">Newcastle, KZN</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="pb-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
              Send a Message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Full Name *"
                  className="w-full px-4 py-3 bg-black/40 border border-white/30 rounded-lg text-white placeholder:text-[#CCCCCC]/50 focus:border-white focus:outline-none transition-colors"
                />
              </div>

              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Email Address *"
                  className="w-full px-4 py-3 bg-black/40 border border-white/30 rounded-lg text-white placeholder:text-[#CCCCCC]/50 focus:border-white focus:outline-none transition-colors"
                />
              </div>

              <div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 bg-black/40 border border-white/30 rounded-lg text-white placeholder:text-[#CCCCCC]/50 focus:border-white focus:outline-none transition-colors"
                />
              </div>

              <div>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-white/30 rounded-lg text-white focus:border-white focus:outline-none transition-colors"
                >
                  <option value="">Select a subject *</option>
                  <option value="general">General Inquiry</option>
                  <option value="tickets">Ticket Information</option>
                  <option value="volunteer">Volunteer Opportunity</option>
                  <option value="partnership">Partnership/Sponsorship</option>
                  <option value="media">Media/Press</option>
                </select>
              </div>

              <div>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Your Message *"
                  className="w-full px-4 py-3 bg-black/40 border border-white/30 rounded-lg text-white placeholder:text-[#CCCCCC]/50 focus:border-white focus:outline-none transition-colors resize-none"
                />
              </div>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-400 text-center text-sm">
                  ✓ Message sent successfully!
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full inline-flex items-center justify-center gap-2 px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="pb-12 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">Follow Us</h3>
          <div className="flex gap-4 justify-center">
            <a
              href="https://www.facebook.com/share/17WpAhqCSv/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center border border-white/30 hover:bg-white/20 hover:border-white transition-all duration-300"
            >
              <Facebook size={24} className="text-white" />
            </a>
            <a
              href="https://www.instagram.com/boxerngwenya?igsh=czJ0anQ2bGt5ZWZi"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center border border-white/30 hover:bg-white/20 hover:border-white transition-all duration-300"
            >
              <Instagram size={24} className="text-white" />
            </a>
            <a
              href="https://www.tiktok.com/@rnbsoulfulgroove"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center border border-white/30 hover:bg-white/20 hover:border-white transition-all duration-300"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="text-white"
              >
                <path
                  d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}