"use client"

import NavigationHeader from '@/components/NavigationHeader';
import Footer from '@/components/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { MapPin, Hotel, Shield, Ticket } from 'lucide-react';

const faqSections = [
  {
    icon: MapPin,
    title: 'Venue & Directions',
    questions: [
      {
        q: 'Where is the event taking place?',
        a: 'The RnB & Soulful Groove Gathering will be held at the Promise Land Arena, located in the heart of the city. Full address and directions will be sent with your ticket confirmation.',
      },
      {
        q: 'How do I get to the venue?',
        a: 'The venue is accessible by public transport, with bus and taxi services running regularly. Parking is available on-site for those driving. We recommend using ride-sharing services for convenience.',
      },
      {
        q: 'Is parking available?',
        a: 'Yes, we have ample parking space available. Parking passes can be purchased separately or included with VIP packages.',
      },
    ],
  },
  {
    icon: Hotel,
    title: 'Accommodation Options',
    questions: [
      {
        q: 'Are there hotels nearby?',
        a: 'Yes, several hotels are within walking distance of the venue. We have partnered with select hotels to offer special rates for attendees. Check our accommodation page for details.',
      },
      {
        q: 'Do you offer accommodation packages?',
        a: 'Yes, VIP packages include accommodation options. Regular ticket holders can book discounted rates at partner hotels using the promo code sent with ticket confirmation.',
      },
    ],
  },
  {
    icon: Shield,
    title: 'Health & Safety',
    questions: [
      {
        q: 'What health and safety measures are in place?',
        a: 'We prioritize attendee safety with trained security personnel, medical staff on-site, and comprehensive emergency protocols. The venue meets all health and safety regulations.',
      },
      {
        q: 'What items are prohibited?',
        a: 'Prohibited items include weapons, illegal substances, professional recording equipment, and outside food and beverages. Full list available on your ticket.',
      },
      {
        q: 'Is the venue accessible for people with disabilities?',
        a: 'Absolutely! The venue is fully accessible with wheelchair ramps, accessible restrooms, and designated viewing areas. Please contact us in advance for special assistance.',
      },
    ],
  },
  {
    icon: Ticket,
    title: 'Event Policies',
    questions: [
      {
        q: 'What is the age limit?',
        a: 'The event is open to all ages. However, children under 12 must be accompanied by an adult. ID verification is required at entry.',
      },
      {
        q: 'Can I get a refund on my ticket?',
        a: 'Tickets are non-refundable but transferable. If you cannot attend, you can transfer your ticket to another person through our ticketing platform.',
      },
      {
        q: 'What time does the event start and end?',
        a: 'Doors open at 2:00 PM, and the event runs from 3:00 PM until 11:00 PM. We recommend arriving early to avoid queues and enjoy the full experience.',
      },
      {
        q: 'What should I bring?',
        a: 'Bring your ticket (digital or printed), valid ID, and comfortable clothing. We recommend bringing a light jacket as the venue can get cool in the evening.',
      },
      {
        q: 'Are food and drinks available?',
        a: 'Yes! We have a variety of food vendors and bars serving refreshments throughout the event. Both cash and card payments are accepted.',
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--midnight-blue)] via-[var(--deep-brown)] to-black">
      <NavigationHeader />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--gold)_0%,transparent_70%)]" />
        </div>

        <div className="container mx-auto relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold text-center text-[var(--gold)] mb-6 glow-gold">
            FAQ & Info
          </h1>
          <p className="text-center text-[var(--cream)]/80 text-lg md:text-xl max-w-2xl mx-auto">
            Everything you need to know about the RnB & Soulful Groove Gathering 2025
          </p>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-12">
            {faqSections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="bg-black/40 backdrop-blur-sm rounded-lg p-8 border-2 border-[var(--gold)]/30">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[var(--gold)]/20 rounded-full flex items-center justify-center">
                    <section.icon className="text-[var(--gold)]" size={24} />
                  </div>
                  <h2 className="text-3xl font-bold text-[var(--gold)]">{section.title}</h2>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  {section.questions.map((item, index) => (
                    <AccordionItem key={index} value={`item-${sectionIndex}-${index}`} className="border-[var(--gold)]/20">
                      <AccordionTrigger className="text-[var(--cream)] hover:text-[var(--gold)] text-left">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-[var(--cream)]/80">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-16 bg-black/60 backdrop-blur-sm rounded-lg p-8 border-2 border-[var(--gold)]/30 text-center">
            <h3 className="text-2xl font-bold text-[var(--gold)] mb-4">Still have questions?</h3>
            <p className="text-[var(--cream)]/80 mb-6">
              Our team is here to help! Reach out to us and we'll get back to you as soon as possible.
            </p>
            <a
              href="mailto:info@rnbsoulfulgroove.com"
              className="inline-block px-8 py-3 bg-[var(--gold)] text-black font-semibold rounded-full hover:bg-[var(--gold)]/80 transition-all duration-300 hover:scale-105"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}