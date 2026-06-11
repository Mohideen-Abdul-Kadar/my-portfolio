# Premium Developer Portfolio

An award-worthy interactive portfolio built with **Astro**, **TypeScript**, **TailwindCSS**, **GSAP** and **Lenis**.

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Astro 4 |
| Styling | TailwindCSS 3 |
| Animation | GSAP 3 + ScrollTrigger |
| Smooth Scroll | Lenis |
| Language | TypeScript |
| Deployment | Vercel |

## Features

- 🎯 Custom glowing cursor with smooth interpolation
- 🖱️ Mouse parallax on Hero (3 depth layers)
- 🧲 Magnetic buttons with elastic return
- 📜 GSAP ScrollTrigger on every section
- 🔤 Text reveal (name, section headings, contact CTA)
- 📊 Animated skill progress bars
- ⏱️ Experience timeline with growing line
- 🔄 Horizontal project showcase with drag support
- ♾️ Infinite marquee tech stack (dual rows)
- 🌊 Lenis smooth scrolling synced to GSAP ticker
- 🌓 Dark cinematic theme
- ♿ Respects `prefers-reduced-motion`
- 📱 Fully responsive

## Quick Start

```bash
npm install
npm run dev        # localhost:4321
npm run build      # production build
npm run preview    # preview build
```

## Customization

All content lives in `src/data/`:

| File | Content |
|------|---------|
| `profile.ts` | Name, bio, email, socials, resume link |
| `projects.ts` | Projects with descriptions and links |
| `skills.ts` | Skills grouped by category with levels |
| `experience.ts` | Work history |
| `achievements.ts` | Awards and milestones |
| `techstack.ts` | Marquee tech items |

No component editing required — just update the data files.

## Adding Three.js (Future)

The architecture is ready for WebGL enhancements. Add Three.js selectively:
- Hero particle field
- Skills 3D globe
- Keep it progressive — the core experience works without WebGL

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```
