# Homepage Redesign - Inworld-Inspired Neobrutalist Design

## Overview
Redesign the Stereos homepage inspired by inworld.io, maintaining neobrutalist styling (thick borders, hard shadows, grid background) while focusing on the @stereos/sdk product for Gaussian splat to glTF conversion.

## Fonts
- **Headings:** Playfair Display (serif)
- **Body:** Roboto (sans-serif)

## Layout Structure

### Left Sidebar Navigation
- Logo + "Stereos" at top
- Links: Home, SDK, Docs, Pricing, Blog, GitHub
- "Get Started" CTA button at bottom
- Neobrutalist style: white background, 4px black right border, hard shadow
- Collapses to hamburger on mobile

### Main Content Area
- Grid background pattern (existing)
- Full-height scrollable content

## Sections

### 1. Hero Section
**Install Command (top):**
```bash
npm install @stereos/sdk
```
Copy-paste code block with neobrutalist styling.

**Headline (Playfair Display):**
"Convert Gaussian Splats to glTF with Perfect Fidelity"

**Subheadline (Roboto):**
"The simplest SDK for 3DGS conversion. Browser-native WASM performance, stunning visual quality, three lines of code."

**CTAs:**
- Primary: "Get Started" (yellow bg, black border, hard shadow)
- Secondary: "View on npm" (outline, black border)

**Bento Grid Visual:**
- Large card: "Best-in-Class Quality" (sage green gradient)
- Small card: "Browser Native" (WASM highlight)
- Small card: "Developer First" (code snippet)

**Code Preview:**
```typescript
import { Stereos } from '@stereos/sdk'

const result = await Stereos.convert(splatFile)
// → Returns glTF ready for Three.js, Babylon, etc.
```

### 2. Features Section
**Title:** "Everything You Need for 3DGS Conversion"

**6 Feature Cards (3-column grid):**
1. Lossless Quality - Preserves every detail
2. Three Lines of Code - Simplest API
3. Browser Native WASM - No server uploads
4. Universal Output - glTF/GLB for all engines
5. TypeScript First - Full type definitions
6. MIT Licensed - Free and open source

### 3. Demo Placeholder Section
**Title:** "Try the Converter"

**Placeholder Card:**
- "Interactive demo coming soon"
- Styled mockup of file drop zone + 3D preview
- "Notify me" or "Star on GitHub" CTA

### 4. Stats Bar
Horizontal bar: "100% Fidelity" | "3 Lines of Code" | "0 Server Uploads" | "MIT License"

### 5. Bottom CTA Section
- Headline: "Ready to Convert?"
- Subheadline: "Get started with Stereos SDK in seconds."
- Code block: `npm install @stereos/sdk`
- Primary CTA: "Read the Docs"
- Secondary CTA: "View on GitHub"

### 6. Footer
- Updated links: npm, GitHub, Docs
- Copyright: Stereos

## Implementation Tasks
1. Add Playfair Display and Roboto fonts to layout.tsx
2. Update tailwind.config.ts with new font families
3. Create sidebar navigation component
4. Rewrite app/page.tsx with new sections
5. Update globals.css with any new utility classes
6. Update footer with new links
