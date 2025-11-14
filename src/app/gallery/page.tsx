"use client";

import NavigationHeader from '@/components/NavigationHeader';
import Footer from '@/components/Footer';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import Image from 'next/image';
import { X, Calendar, Download } from 'lucide-react';

const galleryJune2024 = [
  { id: 18, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762554565368.png', alt: 'June 2024 - Group photo at the event' },
  { id: 19, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762554595833.png', alt: 'June 2024 - Guest enjoying the festival moment' },
  { id: 1, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762502444776.png', alt: 'June 2024 - Crowd enjoying the festival' },
  { id: 2, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762502472319.png', alt: 'June 2024 - Festival atmosphere' },
  { id: 14, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762554458997.png', alt: 'June 2024 - Attendees relaxing at the gathering' },
  { id: 15, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762554478564.png', alt: 'June 2024 - Guests enjoying the lounge area' },
  { id: 16, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762554495695.png', alt: 'June 2024 - Festival crowd under the tent' },
  { id: 17, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762554546859.png', alt: 'June 2024 - Friends at the outdoor gathering' },
  { id: 24, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/WhatsApp-Image-2025-11-09-at-15.34.49_1514ceee-1762704065686.jpg?width=8000&height=8000&resize=contain', alt: 'June 2024 - DJ performing with Vodacom branding' },
  { id: 25, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/WhatsApp-Image-2025-11-09-at-15.34.49_3e561beb-1762704073983.jpg?width=8000&height=8000&resize=contain', alt: 'June 2024 - Event entrance with EPHE NO BONE arch' },
  { id: 26, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/WhatsApp-Image-2025-11-09-at-15.34.49_a772e21f-1762704090567.jpg?width=8000&height=8000&resize=contain', alt: 'June 2024 - Guests seated at the event' },
  { id: 27, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/WhatsApp-Image-2025-11-09-at-15.34.50_402c0920-1762704105519.jpg?width=8000&height=8000&resize=contain', alt: 'June 2024 - Attendees relaxing with refreshments' },
  { id: 28, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/WhatsApp-Image-2025-11-09-at-15.34.50_8995101c-1762704142815.jpg?width=8000&height=8000&resize=contain', alt: 'June 2024 - Guest at luxury photo wall' },
  { id: 29, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/WhatsApp-Image-2025-11-09-at-15.34.51_0d9aae63-1762704161784.jpg?width=8000&height=8000&resize=contain', alt: 'June 2024 - Food vendor at the event' },
  { id: 30, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/WhatsApp-Image-2025-11-09-at-15.34.51_ed4a397c-1762704185323.jpg?width=8000&height=8000&resize=contain', alt: 'June 2024 - Festival venue with sponsor tents' },
  { id: 31, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/WhatsApp-Image-2025-11-09-at-15.34.52_b5c58ebb-1762704206912.jpg?width=8000&height=8000&resize=contain', alt: 'June 2024 - Aerial view of event parking area' },
];

const galleryDec2024 = [
  { id: 20, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762554677871.png', alt: 'December 2024 - Excited crowd capturing memories' },
  { id: 21, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762554691509.png', alt: 'December 2024 - Festival attendees in the crowd' },
  { id: 22, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762554711925.png', alt: 'December 2024 - Performance moment from the stage' },
  { id: 23, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762554737894.png', alt: 'December 2024 - Artist performing on stage' },
  { id: 32, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/939ddbec-1299-4352-9d9f-1c8dba13a8aa-1763083521085.jpeg?width=8000&height=8000&resize=contain', alt: 'December 2024 - Outdoor venue with festival crowd' },
  { id: 33, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/e4bdc666-bd52-4dc4-875b-eaee85bff358-1763083521394.jpeg?width=8000&height=8000&resize=contain', alt: 'December 2024 - Night event with stage lighting' },
  { id: 34, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/45ac3af6-1d0b-451b-9e77-fda2395d40e6-1763083521209.jpeg?width=8000&height=8000&resize=contain', alt: 'December 2024 - Guests in white theme attire' },
  { id: 35, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/fc539d6c-8528-4321-b8e6-17c532e4cad7-1763083520913.jpeg?width=8000&height=8000&resize=contain', alt: 'December 2024 - Live performance on stage' },
  { id: 36, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/4ce02b8f-ebef-4c6f-b0f1-713e2f822ce7-1763083521344.jpeg?width=8000&height=8000&resize=contain', alt: 'December 2024 - Festival attendees enjoying the event' },
  { id: 37, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/b154868c-8735-4b4c-a115-a6199f9c42bd-1763083521087.jpeg?width=8000&height=8000&resize=contain', alt: 'December 2024 - Guests relaxing under branded umbrellas' },
  { id: 38, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/8b205cf4-238c-4fc0-81e8-66456fc39e16-1763083520753.jpeg?width=8000&height=8000&resize=contain', alt: 'December 2024 - Attendees in white outfits at outdoor venue' },
  { id: 39, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/cba37b2b-1f5c-48c7-9cd8-548e40e066d9-1763083518828.jpeg?width=8000&height=8000&resize=contain', alt: 'December 2024 - Guests enjoying refreshments in VIP lounge' },
  { id: 40, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/7ed8c775-3bc2-4e97-881b-19a8a031c84d-1763083521137.jpeg?width=8000&height=8000&resize=contain', alt: 'December 2024 - Friends relaxing at the event' },
  { id: 41, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/4457bac7-c0ca-4df5-b654-2eee920648e3-1763083521318.jpeg?width=8000&height=8000&resize=contain', alt: 'December 2024 - Crowd enjoying the festival atmosphere' },
  { id: 92, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_0736-1763112153818.jpeg?width=8000&height=8000&resize=contain', alt: 'December 2024 - Excited crowd celebrating with hands raised' },
  { id: 93, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_0731-1763112121113.jpeg?width=8000&height=8000&resize=contain', alt: 'December 2024 - Group photo with friends at VIP lounge' },
  { id: 94, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_0734-1763112154024.jpeg?width=8000&height=8000&resize=contain', alt: 'December 2024 - Three women relaxing on yellow lounge furniture' },
  { id: 95, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_0733-1763112152056.jpeg?width=8000&height=8000&resize=contain', alt: 'December 2024 - Friends enjoying refreshments at outdoor venue' },
  { id: 96, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_0732-1763112153349.jpeg?width=8000&height=8000&resize=contain', alt: 'December 2024 - Couple at event with Savanna branding' },
  { id: 97, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_0731-1763112144907.jpeg?width=8000&height=8000&resize=contain', alt: 'December 2024 - Guest celebrating with beverage in hand' },
  { id: 98, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_0730-1763112153719.jpeg?width=8000&height=8000&resize=contain', alt: 'December 2024 - Three friends in white with pink branding backdrop' },
  { id: 99, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_0729-1763112125930.jpeg?width=8000&height=8000&resize=contain', alt: 'December 2024 - Friends having fun together at the event' },
  { id: 100, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_0728-1763112134726.jpeg?width=8000&height=8000&resize=contain', alt: 'December 2024 - Large crowd at outdoor venue with branded umbrellas' },
  { id: 101, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_0727-1763112147588.jpeg?width=8000&height=8000&resize=contain', alt: 'December 2024 - Female artist performing live on stage' },
];

const galleryJune2025 = [
  { id: 42, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/9f0f12b7-7a96-4105-93bb-ec350e7926c3-1763083710087.jpeg?width=8000&height=8000&resize=contain', alt: 'June 2025 - Guests on the red carpet with white floral arrangements' },
  { id: 43, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/c951d170-a59c-46cf-8ee0-f33ee9117132-1763083709522.jpeg?width=8000&height=8000&resize=contain', alt: 'June 2025 - Live performance with engaged crowd' },
  { id: 44, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/b19a7155-ada8-4d7e-87dc-0472aa66b93b-1763083710212.jpeg?width=8000&height=8000&resize=contain', alt: 'June 2025 - Group photo at outdoor event' },
  { id: 45, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/6a6197c8-5aef-4023-b91a-79fa2903ecc8-1763083709830.jpeg?width=8000&height=8000&resize=contain', alt: 'June 2025 - Couple enjoying refreshments at the event' },
  { id: 46, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/23f4489b-2d81-4325-b50b-4cb69bfd5d88-1763083709189.jpeg?width=8000&height=8000&resize=contain', alt: 'June 2025 - Guest in leather jacket enjoying the festival' },
  { id: 47, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/47fdf427-3afa-4859-a79e-178fd72574b6-1763083711127.jpeg?width=8000&height=8000&resize=contain', alt: 'June 2025 - RnB & Soulful Groove Gathering entrance with butterfly arch' },
  { id: 48, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/4c0de4f2-a586-4516-8b44-4773c88b8c14-1763083710652.jpeg?width=8000&height=8000&resize=contain', alt: 'June 2025 - Friends relaxing in lounge area' },
  { id: 49, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/ad405b4e-6b2b-4518-8a74-1abb07242db3-1763083711224.jpeg?width=8000&height=8000&resize=contain', alt: 'June 2025 - Spectacular fireworks display at night' },
  { id: 50, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/a7e9e4fd-9bca-438c-bc43-3abb9c34622f-1763083710741.jpeg?width=8000&height=8000&resize=contain', alt: 'June 2025 - Excited festival crowd celebrating' },
  { id: 51, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/1e66d146-5330-4907-b5d1-0c45dcc47bf5-1763083710193.jpeg?width=8000&height=8000&resize=contain', alt: 'June 2025 - Stylish attendees at outdoor venue' },
  { id: 52, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_0699-1763111181104.jpeg?width=8000&height=8000&resize=contain', alt: 'June 2025 - Friends celebrating together at the event' },
  { id: 53, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_0698-1763111181524.jpeg?width=8000&height=8000&resize=contain', alt: 'June 2025 - Guest enjoying the moment at the gathering' },
  { id: 54, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_0697-1763111184922.jpeg?width=8000&height=8000&resize=contain', alt: 'June 2025 - Attendee relaxing in the VIP lounge area' },
  { id: 55, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_0696-1763111186785.jpeg?width=8000&height=8000&resize=contain', alt: 'June 2025 - Joyful moment captured at the festival' },
  { id: 56, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_0695-1763111187258.jpeg?width=8000&height=8000&resize=contain', alt: 'June 2025 - Host addressing the crowd' },
  { id: 57, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_0694-1763111186568.jpeg?width=8000&height=8000&resize=contain', alt: 'June 2025 - Live saxophone performance' },
  { id: 58, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_0693-1763111187352.jpeg?width=8000&height=8000&resize=contain', alt: 'June 2025 - Bassist performing on stage' },
  { id: 59, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_0692-1763111187297.jpeg?width=8000&height=8000&resize=contain', alt: 'June 2025 - DJ mixing live at the event' },
  { id: 60, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_0691-1763111186849.jpeg?width=8000&height=8000&resize=contain', alt: 'June 2025 - Artist performing at the gathering' },
  { id: 61, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_0690-1763111187297.jpeg?width=8000&height=8000&resize=contain', alt: 'June 2025 - Stylish guest at the event entrance' },
  { id: 62, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_0688-1763111256514.jpeg?width=8000&height=8000&resize=contain', alt: 'June 2025 - Friends posing under USPHE NO BOXER arch' },
  { id: 63, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_0687-1763111258449.jpeg?width=8000&height=8000&resize=contain', alt: 'June 2025 - Stylish guest walking the red carpet' },
  { id: 64, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_0686-1763111265111.jpeg?width=8000&height=8000&resize=contain', alt: 'June 2025 - Group of friends on red carpet with white florals' },
  { id: 65, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_0685-1763111264752.jpeg?width=8000&height=8000&resize=contain', alt: 'June 2025 - Night event moment with friends' },
  { id: 66, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_0684-1763111265549.jpeg?width=8000&height=8000&resize=contain', alt: 'June 2025 - Excited crowd celebrating with green lights' },
  { id: 67, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_0683-1763111265847.jpeg?width=8000&height=8000&resize=contain', alt: 'June 2025 - Guest in black jacket on red carpet' },
  { id: 68, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_0682-1763111265546.jpeg?width=8000&height=8000&resize=contain', alt: 'June 2025 - Friends enjoying the outdoor festival' },
  { id: 69, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_0681-1763111266627.jpeg?width=8000&height=8000&resize=contain', alt: 'June 2025 - Festival attendee at outdoor venue' },
  { id: 70, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_0680-1763111265942.jpeg?width=8000&height=8000&resize=contain', alt: 'June 2025 - Nighttime festival moment under metal structure' },
  { id: 71, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_0679-1763111266076.jpeg?width=8000&height=8000&resize=contain', alt: 'June 2025 - Friends at outdoor daytime gathering' },
  { id: 72, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_0678-1763111371213.jpeg?width=8000&height=8000&resize=contain', alt: 'June 2025 - Stylish guests at daytime outdoor event' },
  { id: 73, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_0677-1763111374136.jpeg?width=8000&height=8000&resize=contain', alt: 'June 2025 - Guest with braids enjoying blue sky event' },
  { id: 74, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_0676-1763111376433.jpeg?width=8000&height=8000&resize=contain', alt: 'June 2025 - Group of friends celebrating at outdoor venue' },
  { id: 75, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_0675-1763111374288.jpeg?width=8000&height=8000&resize=contain', alt: 'June 2025 - Friends posing at nighttime event with stage backdrop' },
  { id: 76, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_0674-1763111376340.jpeg?width=8000&height=8000&resize=contain', alt: 'June 2025 - Guests on red carpet with white floral decorations' },
  { id: 77, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_0673-1763111376762.jpeg?width=8000&height=8000&resize=contain', alt: 'June 2025 - Confident guest with red bag at event venue' },
  { id: 78, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_0672-1763111376407.jpeg?width=8000&height=8000&resize=contain', alt: 'June 2025 - Three friends smiling at outdoor gathering' },
  { id: 79, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_0671-1763111376709.jpeg?width=8000&height=8000&resize=contain', alt: 'June 2025 - Guests in leather outfits at event' },
  { id: 80, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_0670-1763111376845.jpeg?width=8000&height=8000&resize=contain', alt: 'June 2025 - Two guests under USPHE NO BOXER stage arch' },
  { id: 81, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_0669-1763111376895.jpeg?width=8000&height=8000&resize=contain', alt: 'June 2025 - Fashionable guests at green carpet event entrance' },
  { id: 82, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_0650-1763111702584.jpeg?width=8000&height=8000&resize=contain', alt: 'June 2025 - Fashion show on red carpet with white florals' },
  { id: 83, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_0651-1763111708705.jpeg?width=8000&height=8000&resize=contain', alt: 'June 2025 - Two guests walking red carpet at outdoor venue' },
  { id: 84, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_0653-1763111694873.jpeg?width=8000&height=8000&resize=contain', alt: 'June 2025 - Elegant guest on red carpet with leather jacket' },
  { id: 85, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_0652-1763111707578.jpeg?width=8000&height=8000&resize=contain', alt: 'June 2025 - Group walking red carpet at outdoor venue' },
  { id: 86, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_0655-1763111695925.jpeg?width=8000&height=8000&resize=contain', alt: 'June 2025 - Two women posing at outdoor venue' },
  { id: 87, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_0656-1763111695962.jpeg?width=8000&height=8000&resize=contain', alt: 'June 2025 - Guest in black jacket on red carpet' },
  { id: 88, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_0654-1763111703708.jpeg?width=8000&height=8000&resize=contain', alt: 'June 2025 - Two fashionable guests on red carpet' },
  { id: 89, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_0657-1763111708812.jpeg?width=8000&height=8000&resize=contain', alt: 'June 2025 - Three stylish guests on red carpet' },
  { id: 90, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_0658-1763111692571.jpeg?width=8000&height=8000&resize=contain', alt: 'June 2025 - Guest in fur-trimmed jacket on red carpet' },
  { id: 91, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_0659-1763111709525.jpeg?width=8000&height=8000&resize=contain', alt: 'June 2025 - Guest in black puffer jacket on red carpet' },
];

const galleryCommunity = [
  { id: 7, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762554077897.png', alt: 'Giving Back - Volunteer helping students with shoes' },
  { id: 8, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762554098717.png', alt: 'Giving Back - Students receiving new school shoes' },
  { id: 9, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762554118555.png', alt: 'Giving Back - Helping student with new footwear' },
  { id: 10, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762554134648.png', alt: 'Giving Back - Students lined up for shoe donations' },
  { id: 11, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762554157861.png', alt: 'Giving Back - Volunteers distributing supplies to school children' },
  { id: 12, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762554183918.png', alt: 'Giving Back - Community members receiving food parcels' },
  { id: 13, url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1762554217936.png', alt: 'Giving Back - Students receiving school supplies and shoes' },
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleDownload = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `rnb-gathering-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback: open in new tab
      window.open(imageUrl, '_blank');
    }
  };

  const GalleryGrid = ({ images }: { images: typeof galleryJune2024 }) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        {images.map((image) => (
          <div
            key={image.id}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl sm:rounded-3xl cursor-pointer group"
            onClick={() => setSelectedImage(image.url)}
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>
    );
  };

  const ComingSoonMessage = ({ year }: { year: string }) => {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-[var(--gold)] blur-3xl opacity-20 animate-glow" />
          <Calendar size={80} className="text-[var(--gold)] relative z-10" />
        </div>
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--gold)] mb-4 glow-gold">
          Coming Soon
        </h3>
        <p className="text-lg sm:text-xl text-[var(--cream)]/70 max-w-md">
          Photos from our {year} events will be available shortly. Check back after the event to relive the magic!
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--midnight-blue)] via-[var(--deep-brown)] to-black">
      <NavigationHeader />

      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-24 md:pt-28 pb-6 sm:pb-8 md:pb-12 px-4">
        <div className="container mx-auto text-center max-w-6xl">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-[var(--gold)] mb-2 sm:mb-3 glow-gold leading-tight">
            Event Gallery
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-[var(--cream)]/80 max-w-2xl mx-auto px-4">
            Relive the unforgettable moments from our events
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-6 sm:py-8 md:py-12 px-3 sm:px-4 pb-12 sm:pb-16 md:pb-24">
        <div className="container mx-auto max-w-7xl">
          <Tabs defaultValue="june2024" className="w-full">
            <div className="mb-6 sm:mb-8 md:mb-10 flex justify-center px-2">
              <TabsList className="bg-black/30 backdrop-blur-md border border-[var(--gold)]/30 rounded-full inline-flex flex-wrap justify-center p-1 gap-1 max-w-full">
                <TabsTrigger 
                  value="june2024" 
                  className="data-[state=active]:bg-[var(--gold)] data-[state=active]:text-black data-[state=inactive]:bg-transparent data-[state=inactive]:text-[var(--cream)]/80 data-[state=inactive]:hover:text-[var(--gold)] px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm md:text-base font-semibold transition-all rounded-full whitespace-nowrap touch-manipulation"
                >
                  June 2024
                </TabsTrigger>
                <TabsTrigger 
                  value="dec2024" 
                  className="data-[state=active]:bg-[var(--gold)] data-[state=active]:text-black data-[state=inactive]:bg-transparent data-[state=inactive]:text-[var(--cream)]/80 data-[state=inactive]:hover:text-[var(--gold)] px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm md:text-base font-semibold transition-all rounded-full whitespace-nowrap touch-manipulation"
                >
                  Dec 2024
                </TabsTrigger>
                <TabsTrigger 
                  value="june2025" 
                  className="data-[state=active]:bg-[var(--gold)] data-[state=active]:text-black data-[state=inactive]:bg-transparent data-[state=inactive]:text-[var(--cream)]/80 data-[state=inactive]:hover:text-[var(--gold)] px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm md:text-base font-semibold transition-all rounded-full whitespace-nowrap touch-manipulation"
                >
                  June 2025
                </TabsTrigger>
                <TabsTrigger 
                  value="dec2025" 
                  className="data-[state=active]:bg-[var(--gold)] data-[state=active]:text-black data-[state=inactive]:bg-transparent data-[state=inactive]:text-[var(--cream)]/80 data-[state=inactive]:hover:text-[var(--gold)] px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm md:text-base font-semibold transition-all rounded-full whitespace-nowrap touch-manipulation"
                >
                  Dec 2025
                </TabsTrigger>
                <TabsTrigger 
                  value="community" 
                  className="data-[state=active]:bg-[var(--gold)] data-[state=active]:text-black data-[state=inactive]:bg-transparent data-[state=inactive]:text-[var(--cream)]/80 data-[state=inactive]:hover:text-[var(--gold)] px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm md:text-base font-semibold transition-all rounded-full whitespace-nowrap touch-manipulation"
                >
                  Giving Back
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="june2024">
              <GalleryGrid images={galleryJune2024} />
            </TabsContent>
            <TabsContent value="dec2024">
              <GalleryGrid images={galleryDec2024} />
            </TabsContent>
            <TabsContent value="june2025">
              <GalleryGrid images={galleryJune2025} />
            </TabsContent>
            <TabsContent value="dec2025">
              <ComingSoonMessage year="December 2025" />
            </TabsContent>
            <TabsContent value="community">
              <GalleryGrid images={galleryCommunity} />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-[96vw] sm:max-w-[90vw] md:max-w-4xl bg-black/95 border-[var(--gold)] p-0 rounded-2xl sm:rounded-3xl overflow-hidden">
          <div className="absolute right-2 top-2 sm:right-4 sm:top-4 z-50 flex gap-2">
            <button
              onClick={() => selectedImage && handleDownload(selectedImage)}
              className="rounded-full bg-[var(--gold)] p-2 sm:p-2.5 text-black hover:bg-[var(--gold)]/90 transition-colors touch-manipulation shadow-lg"
              aria-label="Download image"
            >
              <Download size={20} className="sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={() => setSelectedImage(null)}
              className="rounded-full bg-black/50 p-2 sm:p-2.5 text-white hover:bg-black/70 transition-colors touch-manipulation"
              aria-label="Close"
            >
              <X size={20} className="sm:w-6 sm:h-6" />
            </button>
          </div>
          {selectedImage && (
            <div className="relative w-full aspect-[4/3]">
              <Image
                src={selectedImage}
                alt="Gallery image"
                fill
                className="object-contain"
                priority
              />
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}