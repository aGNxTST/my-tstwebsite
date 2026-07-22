# TST — The Street Talks — Coming Soon

A luxury coming soon experience for **TST | The Street Talks**, built with Next.js 15, React, Tailwind CSS and Framer Motion.

Matte black base, gold/emerald/burgundy ambient glow, cinematic loader, cursor-reactive 3D emblem, live countdown, scroll-driven scenes, and hidden gold easter egg.

## Getting started

Requires Node.js 18.18+ (Node 20 LTS recommended).

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Features

- Cinematic intro loader with rotating messages and bass audio hit
- Ambient background with drifting glows and floating dust particles
- Cursor-following light effect (desktop only)
- 3D tilt emblem with breathing animation
- Live countdown to launch date (August 10, 2026)
- Scroll-driven scene transitions
- Touch and keyboard navigation
- Hidden easter egg (type TST or click emblem 3x)
- Full mobile responsiveness
- Reduced-motion accessibility support

## Customization

Edit `lib/constants.ts` to change:
- LAUNCH_DATE
- WHATSAPP_COMMUNITY_URL
- WHATSAPP_CHANNEL_URL  
- CONTACT_EMAIL
- ROTATING_MESSAGES
- SEQUENCE_SCENES

## Deploying to Vercel

1. Push to GitHub
2. Go to vercel.com/new and import repo
3. Click Deploy

That's it! Vercel auto-detects Next.js.
