# Dynamic OG Image Generator

This API route generates dynamic Open Graph images for your site using Vercel's `@vercel/og` library.

## Features

- Dynamic title and subtitle
- Grid display of AI service icons (OpenAI, Claude, MCP, Gemini, etc.)
- Your Atelier Logos brand logo
- Customizable color themes
- Node.js runtime for full feature access

## Usage

### Basic Usage

```html
<meta property="og:image" content="https://yourdomain.com/api/og" />
```

### With Custom Title

```html
<meta property="og:image" content="https://yourdomain.com/api/og?title=Custom%20Title" />
```

### All Parameters

```
/api/og?title=Your%20Title&subtitle=Your%20Subtitle&theme=verdant
```

## Query Parameters

| Parameter | Type | Default | Options | Description |
|-----------|------|---------|---------|-------------|
| `title` | string | "Atelier Logos" | Any text | Main heading text |
| `subtitle` | string | "The Future is Vendorless" | Any text | Subtitle text below title |
| `theme` | string | "verdant" | `verdant`, `evergreen`, `dark`, `light` | Color scheme |

## Theme Options

### Verdant (Default)
- Background: `#0B353B` (dark teal)
- Text: `#E4FFCE` (light green)

### Evergreen
- Background: `#E4FFCE` (light green)
- Text: `#0B353B` (dark teal)

### Dark
- Same as Verdant

### Light
- Same as Evergreen

## Example URLs

```bash
# Default
https://yourdomain.com/api/og

# Custom title
https://yourdomain.com/api/og?title=AI%20Integration%20Platform

# Custom title and subtitle
https://yourdomain.com/api/og?title=Build%20with%20AI&subtitle=Powered%20by%20Multiple%20Models

# Light theme
https://yourdomain.com/api/og?theme=light&title=Welcome

# Full customization
https://yourdomain.com/api/og?title=Enterprise%20AI&subtitle=Vendor-Agnostic%20Solutions&theme=verdant
```

## Using in Next.js Metadata

### In a page component:

```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your Page Title',
  openGraph: {
    images: [
      {
        url: '/api/og?title=Your%20Page%20Title&subtitle=Your%20Description',
        width: 1200,
        height: 630,
      },
    ],
  },
};
```

### Dynamic metadata:

```tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: 'Your Page',
    openGraph: {
      images: [
        {
          url: `/api/og?title=${encodeURIComponent('Your Dynamic Title')}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}
```

### In app/layout.tsx for site-wide default:

```tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://yourdomain.com'),
  openGraph: {
    images: ['/api/og'],
  },
};
```

## Icons Displayed

The OG image includes these service icons:
- OpenAI
- Claude (Anthropic)
- MCP (Model Context Protocol)
- Gemini (Google)
- Replit
- Cloudflare
- Exa
- Manus
- v0 (Vercel)
- vLLM

## Technical Details

- **Runtime**: Node.js
- **Image Size**: 1200x630 (standard OG image size)
- **Format**: PNG
- **Font**: Inter (fallback to system-ui, sans-serif)
- **Library**: @vercel/og

## Testing

To test the OG image locally:

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit in your browser:
   ```
   http://localhost:3000/api/og
   ```

3. Try different parameters:
   ```
   http://localhost:3000/api/og?title=Test&subtitle=Hello%20World&theme=light
   ```

## Debugging

If the image doesn't display:
- Check that `/public/logo.png` exists
- Verify the icon URLs are accessible
- Check the browser console for errors
- Ensure `@vercel/og` is installed in package.json
