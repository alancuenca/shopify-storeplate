# Beardless Cub - Headless Shopify Storefront

A production-ready headless Shopify storefront built with Astro 5, React 19, Tailwind CSS v4, and TypeScript. Server-rendered for fresh product data on every request with optimized assets and SEO baked in.

## Features

- **Shopify Storefront API** - Products, collections, cart, checkout
- **Astro 5 SSR** - Fresh data on refresh, hybrid pages via `prerender`
- **React Islands** - Client-only UI where needed
- **SEO** - JSON-LD, Open Graph, Twitter Cards
- **Performance** - Asset optimization, lazy loading, caching headers
- **Cart & Auth** - Shopify cart + customer login/signup
- **Search & Filters** - Vendor, price, tags, sorting
- **Dark Mode** - Theme-aware UI

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Astro | 5.16+ | SSR + Islands |
| React | 19+ | Interactive components |
| TypeScript | 5.9+ | Type safety |
| Tailwind CSS | 4.1+ | Styling |
| Shopify Storefront API | Latest | E-commerce backend |
| Netlify | - | Hosting + SSR adapter |

## Quick Start

### Prerequisites

- Node.js 20+
- npm 10+
- Shopify Partner account

### 1. Install

```bash
npm install
```

### 2. Configure Shopify

1. Create a Shopify Partner account at [partners.shopify.com](https://partners.shopify.com)
2. Create a development store
3. Go to **Settings > Apps and sales channels > Develop apps**
4. Create an app and configure Storefront API access
5. Copy your credentials

### 3. Environment Setup

Create a `.env.local` file with your Shopify credentials:

```env
PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token
```

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:4321](http://localhost:4321)

## Project Structure

```
src/
├── config/           # Site configuration (config.json, theme.json)
├── layouts/          # Layouts and UI components
│   ├── Base.astro    # Main layout + SEO
│   ├── Layout.astro  # Alternate layout
│   ├── components/   # Astro components
│   ├── functional-components/  # React components
│   └── partials/     # Header/Footer/etc.
├── lib/
│   └── shopify/      # Shopify API integration
│       ├── queries/  # GraphQL queries
│       ├── mutations/# GraphQL mutations
│       └── types.ts  # TypeScript types
├── pages/            # Route pages
├── styles/           # Tailwind CSS styles
└── types/            # TypeScript definitions
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run check` | Run Astro type checking |

## Deployment

### Netlify (Recommended)

1. Connect your repository to Netlify
2. Add the environment variables in Netlify:
   - `PUBLIC_SHOPIFY_STORE_DOMAIN`
   - `PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN`
3. Deploy automatically on push

Build settings are pre-configured in `netlify.toml`.

## Configuration

### Site Settings (`src/config/config.json`)

```json
{
  "site": {
    "title": "Beardless Cub",
    "base_url": "https://your-domain.com"
  },
  "shopify": {
    "currencySymbol": "$",
    "currencyCode": "USD",
    "collections": {
      "hero_slider": "frontpage",
      "featured_products": "featured-products"
    }
  }
}
```

### Theme Settings (`src/config/theme.json`)

Customize colors, fonts, and spacing.

## Shopify Setup

### Required Collections

Create these collections in your Shopify admin:

1. **frontpage** - Products for hero slider
2. **featured-products** - Featured products section

### Product Images

Use consistent alt text for color variants - the alt text matches the color option value.

## Rendering Model

- SSR by default (`output: 'server'`)
- Static pages use `export const prerender = true`
- Product/collection data is fetched on request for freshness

## UI/Styling Standards

- Tailwind v4 with minimal inline styles
- Prefer reusable utility classes and `@apply` where it improves readability
- Keep consistent spacing and sizing across cards, grids, and media
- Use Astro `<Image>` for local assets to improve LCP/CLS

## Security

This template includes:

- Content Security Policy headers
- XSS protection
- Secure cookie handling
- Environment variable protection (`PUBLIC_` prefix for client-safe only)

## License

MIT License - See [LICENSE](LICENSE) for details.

---

Built with Astro, React, and Shopify Storefront API.
