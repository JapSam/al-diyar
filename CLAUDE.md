# Al-Diyar Real Estate — Developer Guide

## Tech Stack
- **Next.js 16** (App Router) with TypeScript
- **Tailwind CSS v4** (inline theme in `globals.css`)
- **Framer Motion** for animations
- **Embla Carousel** for sliders
- **next-themes** pattern (custom ThemeProvider)

## Project Structure
```
app/                  # Pages (App Router)
  layout.tsx          # Root layout (font, metadata, RTL)
  page.tsx            # Home page
  projects/           # Projects listing + [id] detail
  achievements/       # Timeline + awards
  about/              # Company info + team
  contact/            # Contact form + map
components/
  ui/                 # Reusable: Navbar, Footer, ProjectCard, etc.
  sections/           # Page sections: Hero, Stats, Testimonials, CTA
data/                 # Mock data (projects, team, achievements, testimonials)
```

## Key Patterns

### RTL
- `dir="rtl"` and `lang="ar"` set on `<html>` in `layout.tsx`
- Use Tailwind logical properties where possible
- Font: IBM Plex Sans Arabic via `next/font/google`

### Theming
- Custom ThemeProvider at `components/ui/ThemeProvider.tsx`
- CSS variables in `globals.css` switch via `[data-theme="dark"]`
- Colors: navy `#0A1628`, gold `#C9A84C`, white

### Data
- All content lives in `data/*.ts` files as typed arrays
- No backend/CMS — edit TypeScript files directly
- Images are Unsplash URLs (configured in `next.config.ts`)

## Common Tasks

### Add a new project
Edit `data/projects.ts` — add a new object to the `projects` array following the `Project` interface.

### Add a team member
Edit `data/team.ts` — add to the `team` array.

### Change colors
Edit `app/globals.css` — update the `@theme inline` block and CSS variables.

### Change company info
- Name/tagline: search for "الديار" across components
- Contact: update `components/ui/Footer.tsx` and `app/contact/page.tsx`
- WhatsApp number: update `components/ui/WhatsAppButton.tsx`

## Commands
```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```
