# Storeplate - Modern Headless Shopify Storefront

A production-ready Astro + Shopify + Tailwind CSS + TypeScript headless e-commerce template. Built for performance, SEO, and developer experience.

## Features

- **Shopify Storefront API** - Full GraphQL integration for products, collections, cart, and checkout
- **Modern Stack** - Astro 5, React 19, TypeScript, Tailwind CSS 4
- **SEO Optimized** - JSON-LD structured data, Open Graph, Twitter Cards, semantic HTML
- **Performance First** - Static site generation, optimized images, lazy loading
- **Cart & Checkout** - Full cart functionality with Shopify's secure checkout
- **User Authentication** - Sign up, login with Shopify Customer API
- **Search & Filters** - Product search, category filters, price range, sorting
- **Dark Mode** - Automatic theme switching based on user preference
- **Responsive** - Mobile-first design, works on all devices

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Astro | 5.16+ | Static site framework |
| React | 19+ | Interactive components |
| TypeScript | 5.9+ | Type safety |
| Tailwind CSS | 4.1+ | Styling |
| Shopify Storefront API | Latest | E-commerce backend |

## Quick Start

### Prerequisites

- Node.js 20+
- npm 10+
- Shopify Partner account

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd shopify-storeplate
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
├── layouts/          # Page layouts and components
│   ├── Base.astro    # Main layout with SEO
│   ├── Layout.astro  # Clean SEO-optimized layout
│   ├── components/   # Astro components
│   ├── functional-components/  # React components
│   └── partials/     # Header, Footer, etc.
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
| `npm run format` | Format code with Prettier |
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
    "title": "Your Store Name",
    "base_url": "https://your-domain.com"
  },
  "shopify": {
    "currencySymbol": "$",
    "currencyCode": "USD",
    "collections": {
      "hero_slider": "hidden-homepage-carousel",
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

1. **hidden-homepage-carousel** - Products for hero slider
2. **featured-products** - Featured products section

### Product Images

Use consistent alt text for color variants - the alt text matches the color option value.

## Security

This template includes:

- Content Security Policy headers
- XSS protection
- Secure cookie handling
- Environment variable protection (PUBLIC_ prefix for client-safe only)

## License

MIT License - See [LICENSE](LICENSE) for details.

---

Built with Astro, React, and Shopify Storefront API.
