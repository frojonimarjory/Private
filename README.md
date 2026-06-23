# Portfolio — Marjory Frojoni

Bilingual (EN/PT) professional portfolio for journalist Marjory Victória Frojoni, featuring a dark editorial design with a Bento Grid layout.

## Stack

- **Next.js 15** (App Router + Server Components)
- **Sanity v3** — CMS for managing works, texts, and media
- **Supabase** — contact form + view analytics
- **Tailwind CSS v4** + **shadcn/ui** — components and styling
- **Framer Motion** — animations
- **next-intl** — internationalization (English/Portuguese)
- **TypeScript**

## Prerequisites

- Node.js 20+
- npm 10+
- [Sanity](https://sanity.io) account (for the CMS)
- [Supabase](https://supabase.com) account (for contact + analytics) — optional

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` and fill in the values:

```bash
cp .env.example .env.local
```

```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production

# Supabase (optional)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Run in development mode

```bash
npm run dev
```

The site will be available at [http://localhost:3000](http://localhost:3000).

### 4. Access Sanity Studio

The content management panel is at [http://localhost:3000/studio](http://localhost:3000/studio).

## Project Structure

```
src/
├── app/
│   ├── [locale]/           # Pages by locale (en, pt)
│   │   ├── page.tsx        # Home (hero + bento grid)
│   │   ├── work/           # Work listing and detail
│   │   ├── about/          # About me
│   │   └── contact/        # Contact form
│   ├── api/                # API routes (contact, views)
│   └── studio/             # Embeddable Sanity Studio
├── components/             # React components
├── i18n/                   # Internationalization config
├── lib/
│   ├── sanity/             # Sanity client and queries
│   └── supabase/           # Supabase client
├── messages/               # Translations (en.json, pt.json)
└── sanity/                 # Sanity schemas
```

## Internationalization

- **English** (`/en/...`) — default language
- **Portuguese** (`/pt/...`) — secondary language
- Language toggle in the header (EN/PT)
- Dynamic content (works) is bilingual via Sanity
- UI labels translated in `src/messages/`

## Work Categories

| Category | Description |
|-----------|-----------|
| Documentary | Documentaries and audiovisual productions |
| Article | News reports and written journalism |
| Consulting | Press advisory and media consulting |
| Podcast | Podcast episodes (Hemodiálogos) |

## Supabase (optional)

To enable the contact form and view analytics:

### Required Tables

```sql
-- Contact messages
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  read BOOLEAN DEFAULT false
);

-- Work page views
CREATE TABLE work_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  work_slug TEXT NOT NULL,
  viewed_at TIMESTAMPTZ DEFAULT now(),
  locale TEXT DEFAULT 'en',
  referrer TEXT
);
```

## Deploy

The project is configured for deployment on **Vercel**:

```bash
npx vercel
```

## Design

- **Theme:** Dark editorial
- **Colors:** Background `#0a0a0a`, accent gold `#c9a84c`
- **Typography:** Playfair Display (headlines) + Source Sans 3 (body)
- **Layout:** Responsive Bento Grid (1 → 3 → 4 columns)

## License

Private project — all rights reserved.
