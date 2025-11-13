"use client"

import { useState } from 'react';
import NavigationHeader from '@/components/NavigationHeader';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, Users, Music, Star, Award, TrendingUp, Briefcase } from 'lucide-react';

const roles = [
  {
    icon: Users,
    title: 'Guest Services',
    description: 'Welcome attendees, manage check-ins, and ensure everyone has an amazing experience',
  },
  {
    icon: Music,
    title: 'Stage Support',
    description: 'Assist with stage setup, artist coordination, and technical support',
  },
  {
    icon: Star,
    title: 'Event Operations',
    description: 'Help with venue setup, logistics, and keeping everything running smoothly',
  },
  {
    icon: Heart,
    title: 'Community Engagement',
    description: 'Connect with attendees, manage social media coverage, and spread the soulful vibes',
  },
];

export default function VolunteerPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    areaOfInterest: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', areaOfInterest: '', message: '' });
      setSubmitted(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--midnight-blue)] via-[var(--deep-brown)] to-black">
      <NavigationHeader />

      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--gold)_0%,transparent_70%)]" />
        </div>

        <div className="container mx-auto relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-center text-[var(--gold)] mb-4 sm:mb-6 glow-gold px-2">
            Volunteer With Us
          </h1>
          <p className="text-center text-[var(--cream)]/80 text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-4">
            Be part of the magic! Join our volunteer team and help create an unforgettable experience for thousands of RnB lovers
          </p>
        </div>
      </section>

      {/* Benefits Section - Certificate Highlight */}
      <section className="py-8 sm:py-12 md:py-16 px-4">
        <div className="container mx-auto">
          <div className="bg-gradient-to-br from-[var(--gold)]/20 via-black/60 to-[var(--bronze)]/20 backdrop-blur-sm rounded-xl p-6 sm:p-8 md:p-12 border-2 border-[var(--gold)] glow-box">
            <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-[var(--gold)]/30 rounded-full flex items-center justify-center glow-gold">
                  <Award className="text-[var(--gold)]" size={48} />
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--gold)] mb-3 sm:mb-4 glow-gold px-2">
                  Earn Your Official Certificate
                </h2>
                <p className="text-[var(--cream)] text-base sm:text-lg md:text-xl mb-4 leading-relaxed px-2">
                  Every volunteer who completes the event receives an <span className="text-[var(--gold)] font-semibold">official certificate of participation</span> — perfect for boosting your CV, LinkedIn profile, or portfolio.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6">
                  <div className="flex items-start gap-3 bg-black/40 p-3 sm:p-4 rounded-lg border border-[var(--gold)]/30">
                    <TrendingUp className="text-[var(--gold)] flex-shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="text-[var(--gold)] font-semibold mb-1 text-sm sm:text-base">Career Growth</h4>
                      <p className="text-[var(--cream)]/80 text-xs sm:text-sm">Stand out with real-world event experience</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-black/40 p-3 sm:p-4 rounded-lg border border-[var(--gold)]/30">
                    <Briefcase className="text-[var(--gold)] flex-shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="text-[var(--gold)] font-semibold mb-1 text-sm sm:text-base">Professional Network</h4>
                      <p className="text-[var(--cream)]/80 text-xs sm:text-sm">Connect with industry professionals</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-black/40 p-3 sm:p-4 rounded-lg border border-[var(--gold)]/30 sm:col-span-2 md:col-span-1">
                    <Heart className="text-[var(--gold)] flex-shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="text-[var(--gold)] font-semibold mb-1 text-sm sm:text-base">Unforgettable Experience</h4>
                      <p className="text-[var(--cream)]/80 text-xs sm:text-sm">Be part of something truly special</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="py-8 sm:py-12 md:py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[var(--gold)] mb-8 sm:mb-12 glow-gold px-2">
            Volunteer Roles
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
            {roles.map((role, index) => (
              <div
                key={index}
                className="bg-black/40 backdrop-blur-sm rounded-lg p-5 sm:p-6 border-2 border-[var(--gold)]/30 hover:border-[var(--gold)] transition-all duration-300 hover:scale-105"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[var(--gold)]/20 rounded-full flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                  <role.icon className="text-[var(--gold)]" size={28} />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[var(--gold)] mb-2 sm:mb-3 text-center">
                  {role.title}
                </h3>
                <p className="text-[var(--cream)]/80 text-sm text-center leading-relaxed">
                  {role.description}
                </p>
              </div>
            ))}
          </div>

          {/* Requirements */}
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 sm:p-8 border-2 border-[var(--gold)]/30 mb-12 sm:mb-16">
            <h3 className="text-xl sm:text-2xl font-bold text-[var(--gold)] mb-4 sm:mb-6 px-2">Requirements</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-[var(--cream)]/80 text-sm sm:text-base">
              <li className="flex items-start gap-2">
                <span className="text-[var(--gold)] mt-1 flex-shrink-0">✓</span>
                <span>Must be 18 years or older</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--gold)] mt-1 flex-shrink-0">✓</span>
                <span>Available for the full event day (Dec 14, 2025)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--gold)] mt-1 flex-shrink-0">✓</span>
                <span>Enthusiastic and passionate about RnB music</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--gold)] mt-1 flex-shrink-0">✓</span>
                <span>Good communication and teamwork skills</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--gold)] mt-1 flex-shrink-0">✓</span>
                <span>Reliable and punctual</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--gold)] mt-1 flex-shrink-0">✓</span>
                <span>Willing to attend pre-event orientation</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Sign Up Form */}
      <section className="py-8 sm:py-12 md:py-16 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-black/60 backdrop-blur-sm rounded-lg p-6 sm:p-8 border-2 border-[var(--gold)]/30">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--gold)] mb-6 text-center glow-gold">
              Volunteer Application
            </h2>
            
            {submitted ? (
              <div className="text-center py-8 sm:py-12">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[var(--gold)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="text-[var(--gold)]" size={32} />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[var(--gold)] mb-2">Thank You!</h3>
                <p className="text-[var(--cream)]/80 text-sm sm:text-base px-4">
                  We've received your application. Our team will be in touch soon!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                <div>
                  <Label htmlFor="name" className="text-[var(--cream)] text-sm sm:text-base">Full Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-white/10 border-[var(--gold)]/30 text-white placeholder:text-white/50 h-10 sm:h-11 text-sm sm:text-base mt-1.5"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-[var(--cream)] text-sm sm:text-base">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-white/10 border-[var(--gold)]/30 text-white placeholder:text-white/50 h-10 sm:h-11 text-sm sm:text-base mt-1.5"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-[var(--cream)] text-sm sm:text-base">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-white/10 border-[var(--gold)]/30 text-white placeholder:text-white/50 h-10 sm:h-11 text-sm sm:text-base mt-1.5"
                    placeholder="+27 123 456 7890"
                  />
                </div>

                <div>
                  <Label htmlFor="areaOfInterest" className="text-[var(--cream)] text-sm sm:text-base">Area of Interest *</Label>
                  <Select value={formData.areaOfInterest} onValueChange={(value) => setFormData({ ...formData, areaOfInterest: value })}>
                    <SelectTrigger className="bg-white/10 border-[var(--gold)]/30 text-white h-10 sm:h-11 text-sm sm:text-base mt-1.5">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="guest-services">Guest Services</SelectItem>
                      <SelectItem value="stage-support">Stage Support</SelectItem>
                      <SelectItem value="event-operations">Event Operations</SelectItem>
                      <SelectItem value="community-engagement">Community Engagement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message" className="text-[var(--cream)] text-sm sm:text-base">Tell us about yourself</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-white/10 border-[var(--gold)]/30 text-white placeholder:text-white/50 min-h-[100px] sm:min-h-[120px] text-sm sm:text-base mt-1.5"
                    placeholder="Share your experience, skills, or why you want to volunteer..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[var(--gold)] text-black hover:bg-[var(--gold)]/80 font-semibold text-base sm:text-lg py-5 sm:py-6"
                >
                  Submit Application
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}