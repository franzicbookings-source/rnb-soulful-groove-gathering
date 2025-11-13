# RnB & Soulful Groove Gathering - Design System Documentation

## 🎨 Visual Identity

A cohesive R&B/soulful groove aesthetic featuring elegant typography, rich color gradients, and smooth transitions that reflect the musical vibe of the event.

---

## 📝 Typography

### Heading Font: **Playfair Display**
- **Usage**: All headings (h1-h6), event titles, section headers
- **Weights**: 400, 500, 600, 700, 800, 900
- **Character**: Bold, elegant, sophisticated serif font
- **Source**: Google Fonts
```css
font-family: 'Playfair Display', Georgia, serif;
```

### Body Font: **Inter**
- **Usage**: Body text, paragraphs, descriptions, navigation
- **Weights**: 300, 400, 500, 600, 700
- **Character**: Clean, modern, highly legible sans-serif
- **Source**: Google Fonts
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

---

## 🎨 Color Palette

### Primary Colors
| Color | Hex Code | Usage |
|-------|----------|-------|
| **Gold** | `#D4AF37` | Primary accent, buttons, highlights, headings |
| **Gold Light** | `#F4D03F` | Hover states, active elements |
| **Gold Dark** | `#B8941E` | Borders, subtle accents |

### Background Colors
| Color | Hex Code | Usage |
|-------|----------|-------|
| **Deep Purple** | `#2D1B4E` | Section backgrounds, rich depth |
| **Rich Blue** | `#1A2942` | Gradient transitions |
| **Midnight Blue** | `#0F1419` | Primary dark background, hero |
| **Cream** | `#F8F5F0` | Light text, headings on dark |
| **Warm Grey** | `#E8E4DF` | Light section backgrounds |
| **Charcoal** | `#2C2C2E` | Card backgrounds, overlays |

### Neutral Colors
- **White**: `#FFFFFF` - Partner logos background, accents
- **Black**: `#000000` - Deep shadows, overlays

---

## 🧩 Component Styling

### Buttons

#### Primary Button (`.btn-primary`)
```css
background: var(--gold);
color: var(--midnight-blue);
font-weight: 600;
padding: 0.875rem 2rem;
border-radius: 9999px; /* Fully rounded */
box-shadow: 0 4px 12px rgba(212, 175, 55, 0.4);
```
**Hover**: Lighter gold with enhanced shadow and subtle lift

#### Secondary Button (`.btn-secondary`)
```css
background: transparent;
color: var(--gold);
border: 2px solid var(--gold);
font-weight: 600;
padding: 0.75rem 1.75rem;
border-radius: 9999px;
```
**Hover**: Subtle gold background with border color shift

### Cards (`.card-elevated`)
```css
box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2);
border: 1px solid rgba(212, 175, 55, 0.2);
border-radius: 1rem; /* 16px */
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```
**Hover**: Enhanced shadow with gold glow and -4px lift

### Text Effects

#### Gold Glow (`.glow-gold`)
```css
text-shadow: 
  0 0 30px rgba(212, 175, 55, 0.6),
  0 0 60px rgba(212, 175, 55, 0.4),
  0 2px 4px rgba(0, 0, 0, 0.3);
```

#### Box Glow (`.glow-box`)
```css
box-shadow: 
  0 0 40px rgba(212, 175, 55, 0.4),
  0 0 80px rgba(212, 175, 55, 0.2),
  0 8px 24px rgba(0, 0, 0, 0.3);
```

---

## 📐 Section Backgrounds

### Light Section (`.section-light`)
```css
background: linear-gradient(180deg, var(--cream) 0%, var(--warm-grey) 100%);
color: var(--charcoal);
```
**Usage**: Gallery section, alternating content blocks

### Dark Section (`.section-dark`)
```css
background: linear-gradient(180deg, var(--midnight-blue) 0%, var(--rich-blue) 100%);
color: var(--cream);
```
**Usage**: Partners section, news section

### Purple Section (`.section-purple`)
```css
background: linear-gradient(180deg, var(--deep-purple) 0%, var(--rich-blue) 100%);
color: var(--cream);
```
**Usage**: Line-up section, call-to-action section

---

## 🎬 Animations

### Fade In Up (`.animate-fade-in-up`)
```css
@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
animation: fade-in-up 0.8s ease-out forwards;
```

### Glow Pulse (`.animate-glow`)
```css
@keyframes glow-pulse {
  0%, 100% { 
    opacity: 1; 
    box-shadow: 0 0 20px rgba(212, 175, 55, 0.5); 
  }
  50% { 
    opacity: 0.85; 
    box-shadow: 0 0 40px rgba(212, 175, 55, 0.8); 
  }
}
animation: glow-pulse 2.5s ease-in-out infinite;
```

### Card Hover (`.card-elevated:hover`)
```css
box-shadow: 
  0 8px 32px rgba(0, 0, 0, 0.4),
  0 4px 16px rgba(0, 0, 0, 0.3),
  0 0 40px rgba(212, 175, 55, 0.2);
transform: translateY(-4px);
```

---

## 📱 Mobile Responsive

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Typography Scaling
- **Hero Title (H1)**: 3xl → 4xl → 5xl → 6xl
- **Section Titles (H2)**: 4xl → 5xl → 6xl → 7xl
- **Body Text**: base → lg → xl

### Spacing Adjustments
- **Section Padding**: py-16 (mobile) → py-24 (desktop)
- **Container Padding**: px-4 (mobile) → px-6 (tablet) → px-8 (desktop)
- **Gap Spacing**: gap-4 (mobile) → gap-6 (tablet) → gap-8 (desktop)

---

## 🖼️ Image Optimization

### All Images Use:
- **Next.js Image Component** with lazy loading
- **Quality**: 80-85% for optimal performance
- **Sizes Attribute**: Responsive sizing based on viewport
```jsx
<Image
  src={imageUrl}
  alt="Description"
  fill
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  quality={85}
  loading="lazy"
  className="object-cover"
/>
```

### Partner Logos
- **Uniform Size**: 150px × 150px (mobile), 180px × 180px (desktop)
- **Background**: White with subtle shadow
- **Border**: 1px solid gold/20% opacity
- **Padding**: p-4 (mobile), p-6 (desktop)

---

## ♿ Accessibility Features

### Navigation
- **Sticky Header**: Fixed at top with backdrop blur
- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **ARIA Labels**: All buttons and links have proper labels
- **Focus States**: Clear focus indicators with outline-color: ring

### Contrast
- **Text on Dark**: Cream (#F8F5F0) on Midnight Blue (#0F1419) - WCAG AAA
- **Text on Light**: Charcoal (#2C2C2E) on Cream (#F8F5F0) - WCAG AAA
- **Gold Text**: Only used on dark backgrounds for maximum contrast

### Alt Tags
- All images include descriptive alt text
- Decorative images use empty alt=""

---

## 📄 Sample Page Structure

### Homepage Layout

```
1. Hero Section (Full-screen with video background)
   - Background: Black with video overlay
   - Event Date: "14 DECEMBER 2025"
   - Venue: "Majuba Stadium, Newcastle"
   - Countdown Timer (4 cards: Days, Hours, Minutes, Seconds)
   - CTA Buttons: "GET TICKETS" (primary) | "View Line-Up" (secondary)

2. Line-Up Section (.section-purple)
   - Background: Deep purple gradient
   - Title: "2025 Line-Up"
   - Artist Cards: Grid (desktop) | Horizontal scroll (mobile)
   - Each card: Image + Name + Bio + Link
   - CTA: "View Full Line-Up" button

3. Gallery Section (.section-light)
   - Background: Cream to warm grey gradient
   - Title: "Event Gallery"
   - Tabs: "2025 Preview" | "2024 Highlights"
   - Carousel with navigation arrows
   - Lightbox on image click
   - CTA: "View Full Gallery" button

4. Partners Section (.section-dark)
   - Background: Midnight blue to rich blue gradient
   - Title: "Our Partners"
   - Auto-scrolling logo strip
   - Uniform sizing on white cards

5. Call-to-Action Section (.section-purple)
   - Background: Deep purple gradient
   - Large heading with ticket icon
   - Two buttons: "Buy Tickets Now" | "Volunteer With Us"

6. News Section (.section-dark)
   - Background: Midnight blue to rich blue gradient
   - Title: "News & Updates"
   - News Cards: Grid layout (2 columns on tablet+)
   - Each card: Image + Category badge + Title + Excerpt
   - CTA: "View All News" button

7. Footer (.bg-midnight-blue)
   - Social media icons (Instagram, Facebook)
   - Tagline: "Angels of the Promise Land"
   - Navigation links
   - Copyright
```

---

## 🎯 Key Design Principles

1. **Dynamic Flow**: Alternating light/dark/purple sections create visual rhythm
2. **Consistent Cards**: All content cards use `.card-elevated` with uniform styling
3. **Gold Accent**: Single accent color (gold) used consistently for CTAs and highlights
4. **Smooth Transitions**: 300ms cubic-bezier easing on all interactions
5. **Typography Hierarchy**: Clear distinction between Playfair Display headings and Inter body text
6. **Mobile-First**: Responsive design with touch-friendly targets (min 44px)
7. **Performance**: Lazy-loaded images, optimized animations, smooth 60fps scrolling

---

## 📦 Files Updated

### Core Files
- `src/app/globals.css` - Global styles, typography, color system
- `src/app/page.tsx` - Homepage with all redesigned sections

### Components
- `src/components/NavigationHeader.tsx` - Sticky nav with backdrop blur
- `src/components/CountdownTimer.tsx` - Elegant countdown cards
- `src/components/Gallery.tsx` - Tabbed carousel with lightbox
- `src/components/PartnersScroll.tsx` - Uniform logo display with white cards
- `src/components/Footer.tsx` - Social links and navigation

---

## 🚀 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 10+)

---

## 📝 Notes

- All CSS custom properties use `var(--property-name)` for consistency
- Animations respect `prefers-reduced-motion` settings
- Images optimized for modern formats (WebP with fallback)
- Fonts loaded with `display=swap` for better performance
