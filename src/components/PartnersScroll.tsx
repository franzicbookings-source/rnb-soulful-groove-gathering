"use client"

import Image from 'next/image';

export default function PartnersScroll() {
  const partners = [
    // Liquor Brands - Grouped Together
    {
      name: 'Ice Tropez',
      logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762504496495.png'
    },
    {
      name: 'Castle Lite',
      logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762770913249.png?width=8000&height=8000&resize=contain'
    },
    // Other Partners
    {
      name: 'Vodacom',
      logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762771014413.png?width=8000&height=8000&resize=contain'
    },
    {
      name: 'Hollywoodbets',
      logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762771128938.png?width=8000&height=8000&resize=contain'
    },
    {
      name: 'Niyatee Foundation',
      logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762504438064.png'
    },
    {
      name: 'KMRS - Kunene Makopo Risk Solutions',
      logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762771236782.png?width=8000&height=8000&resize=contain'
    },
    {
      name: 'Zakhoni Sika Mthakathi',
      logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762704591677.png'
    },
    {
      name: 'Wolf Tactical Security',
      logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762771468871.png?width=8000&height=8000&resize=contain'
    },
    {
      name: 'Umthanti Tents | Covers | Canvas',
      logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image0-1-1762769910411.jpeg'
    },
    {
      name: 'KwaZulu-Natal Department of Sport and Recreation',
      logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1763110541385.png?width=8000&height=8000&resize=contain'
    },
    {
      name: 'Yenza',
      logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1763110555363.png?width=8000&height=8000&resize=contain'
    },
    {
      name: 'Trace TV',
      logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1763112666772.png?width=8000&height=8000&resize=contain'
    }
  ];

  return (
    <div className="overflow-hidden w-full py-4 sm:py-6 md:py-8">
      <div className="flex animate-scroll" style={{ width: 'max-content' }}>
        {/* Triple for seamless loop - works on all screen sizes */}
        {[...partners, ...partners, ...partners].map((partner, index) => (
          <div
            key={`${partner.name}-${index}`}
            className="flex-shrink-0 inline-flex items-center justify-center mx-2 xs:mx-3 sm:mx-4 md:mx-5 overflow-hidden bg-white rounded-lg sm:rounded-xl shadow-md border border-[var(--gold)]/20 
            w-[100px] h-[100px]
            xs:w-[120px] xs:h-[120px]
            sm:w-[140px] sm:h-[140px]
            md:w-[150px] md:h-[150px]
            lg:w-[160px] lg:h-[160px]
            transition-all duration-300 hover:shadow-lg hover:border-[var(--gold)]/40"
          >
            <div className={`relative w-full h-full ${partner.name === 'Trace TV' ? 'p-2 xs:p-3 sm:p-4 md:p-5' : 'p-1.5 xs:p-2 sm:p-3'}`}>
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                className="object-contain"
                sizes="(max-width: 320px) 100px, (max-width: 375px) 120px, (max-width: 640px) 140px, (max-width: 768px) 150px, 160px"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}