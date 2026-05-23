# الديار للتطوير العقاري — Al-Diyar Real Estate

Portfolio website for Al-Diyar Real Estate Development.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How to Update Content (Non-Technical Guide)

All content is in simple text files inside the `data/` folder. Open any file with a text editor and change the Arabic text.

### Add a New Project

Open `data/projects.ts` and copy one of the existing project blocks. Change these fields:

| Field | What to change |
|-------|---------------|
| `id` | A unique URL-friendly name (English, lowercase, dashes) |
| `name` | Project name in Arabic |
| `category` | One of: `"سكني"` / `"تجاري"` / `"فلل"` / `"مجمعات"` |
| `location` | City and neighborhood |
| `status` | `"مكتمل"` (completed) or `"تحت الإنشاء"` (under construction) |
| `year` | Delivery year |
| `area` | Total area (e.g., `"50,000 م²"`) |
| `description` | Arabic description paragraph |
| `images` | Array of image URLs (use Unsplash or your own hosted images) |
| `coordinates` | Google Maps lat/lng for the map embed |
| `featured` | Set to `true` to show on the home page (max 3 recommended) |

### Add a Team Member

Open `data/team.ts` and add an entry with `name`, `title`, `image`, and `bio`.

### Change Company Info

- **Company name/tagline**: Search for "الديار" in the code
- **Phone/email/address**: Edit `components/ui/Footer.tsx` and `app/contact/page.tsx`
- **WhatsApp number**: Edit `components/ui/WhatsAppButton.tsx` (change the number in the URL)
- **Social media links**: Edit `components/ui/Footer.tsx`

### Change Colors

Open `app/globals.css` and update these values:
- `--color-navy: #0A1628` (dark blue)
- `--color-gold: #C9A84C` (gold accent)

### Replace Images

Replace the Unsplash URLs in `data/projects.ts` and other files with your own image URLs. Images should be at least 1200px wide for best quality.

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Click Deploy — no configuration needed

## Tech Stack

- Next.js 16 (React framework)
- Tailwind CSS v4 (styling)
- Framer Motion (animations)
- TypeScript
