# 🎵 RnB & Soulful Groove Gathering 2025

**Angels of the Promise Land** - Official Website

A luxury event website for the RnB & Soulful Groove Gathering 2025, featuring a fantasy-inspired design with gold accents, smooth animations, and comprehensive event information.

## 🌟 Features

- **Dynamic Homepage** with countdown timer and hero video
- **Artist Line-Up** with detailed bios and carousel navigation
- **Event Gallery** with filterable images (2024/2025)
- **News & Updates** section for announcements
- **Volunteer Sign-Up** form
- **FAQ & Contact** pages
- **Fully Responsive** design for all devices
- **SEO Optimized** with structured data and meta tags

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ or Bun
- Turso database account (for data storage)

### Installation

```bash
# Install dependencies
npm install
# or
bun install

# Set up environment variables
cp .env.example .env
# Edit .env and add your Turso credentials

# Run database migrations
npm run db:push
# or
bun run db:push

# Start development server
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📦 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables:
     - `TURSO_CONNECTION_URL`
     - `TURSO_AUTH_TOKEN`
   - Deploy!

3. **Post-Deployment:**
   - Update `src/app/layout.tsx` with your domain
   - Update `public/robots.txt` with your domain
   - Update `public/sitemap.xml` with your domain
   - Submit sitemap to Google Search Console

See [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md) for detailed instructions.

## 🗄️ Database

This project uses [Turso](https://turso.tech) (SQLite) with Drizzle ORM.

### Available Commands

```bash
# Push schema changes to database
npm run db:push

# Open Drizzle Studio (database GUI)
npm run db:studio

# Generate migrations
npm run db:generate
```

## 📁 Project Structure

```
├── src/
│   ├── app/              # Next.js pages (App Router)
│   ├── components/       # React components
│   ├── db/              # Database schema and config
│   ├── lib/             # Utility functions
│   └── hooks/           # Custom React hooks
├── public/              # Static assets
├── drizzle/             # Database migrations
└── DEPLOYMENT-GUIDE.md  # Detailed deployment instructions
```

## 🎨 Design System

The site uses a fantasy-inspired design with:
- **Colors:** Gold (#D4AF37), Deep Brown, Midnight Blue
- **Fonts:** Poppins (headings), Inter & Manrope (body)
- **Animations:** Smooth transitions, glow effects, parallax scrolling

## 🔧 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4
- **Database:** Turso (SQLite) + Drizzle ORM
- **UI Components:** Radix UI + shadcn/ui
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Deployment:** Vercel

## 📝 Environment Variables

Create a `.env` file with:

```env
TURSO_CONNECTION_URL=your_connection_url
TURSO_AUTH_TOKEN=your_auth_token
```

## 🤝 Contributing

This is a client project. For changes or issues, please contact the development team.

## 📄 License

© 2025 Ntombii Communications (Pty) Ltd. All rights reserved.

---

**Event Date:** December 14, 2025  
**Tagline:** Angels of the Promise Land

For support or inquiries, visit [groovegathering.co.za](https://groovegathering.co.za)