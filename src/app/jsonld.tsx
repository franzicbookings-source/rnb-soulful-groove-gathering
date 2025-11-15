export function JsonLd() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'MusicEvent',
    name: 'RnB & Soulful Groove Gathering 2025',
    alternateName: 'Angels of the Promise Land',
    description: 'Angels of the Promise Land - A magical celebration of RnB and Soulful music featuring Mlindo The Vocalist and top DJs from Metro FM and VOC FM.',
    image: [
      'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762545045759.png',
      'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762933523122.png'
    ],
    startDate: '2025-12-14T14:00:00+02:00',
    endDate: '2025-12-14T23:00:00+02:00',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: 'Majuba Stadium College',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Majuba Stadium College',
        addressLocality: 'Newcastle',
        addressRegion: 'KwaZulu-Natal',
        addressCountry: 'ZA',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: 'Ntombii Communications (Pty) Ltd',
      url: 'https://rnbsoulfulgroovegathering.co.za',
    },
    performer: [
      {
        '@type': 'MusicGroup',
        name: 'Mlindo The Vocalist',
      },
      {
        '@type': 'Person',
        name: 'Msizi Shembe',
        jobTitle: 'DJ - Metro FM',
      },
      {
        '@type': 'Person',
        name: 'Mr Obsession',
        jobTitle: 'DJ - VOC FM',
      },
      {
        '@type': 'Person',
        name: 'Paul Mtirara',
        jobTitle: 'DJ - Metro FM',
      },
      {
        '@type': 'Person',
        name: 'DJ Ash',
        jobTitle: 'Featured DJ',
      },
    ],
    offers: {
      '@type': 'Offer',
      url: 'https://computicket.com/event/rnb-soulful-groove-gathering-summer-edition-/f6574621-5e8d-4a8a-aba9-8fa8bb6651aM',
      price: '250.00',
      priceCurrency: 'ZAR',
      availability: 'https://schema.org/InStock',
      validFrom: '2025-11-08T17:00:00+02:00',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}