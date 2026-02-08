import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export const runtime = 'nodejs';

const icons = [
  "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/light/openai.png",
  "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/light/claude-color.png",
  "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/light/mcp.png",
  "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/light/gemini-color.png",
  "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/light/replit-color.png",
  "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/light/cloudflare-color.png",
  "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/light/exa-color.png",
  "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/light/manus.png",
  "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/light/v0.png",
  "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/light/vllm-color.png",
];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Get customizable parameters from query string
    const title = searchParams.get('title') || 'Topic Hubs';
    const subtitle = searchParams.get('subtitle') || 'Comprehensive guides for regulated industries';

    // Fetch logo
    const logoUrl = new URL('/logo.png', req.url.replace('/api/og/topics', '')).toString();

    // Load fonts from local fonts directory
    const bebasFontPath = join(process.cwd(), 'public', 'fonts', 'BebasNeue-Regular.ttf');
    const bebasFontData = readFileSync(bebasFontPath);

    const spectralFontPath = join(process.cwd(), 'public', 'fonts', 'Spectral-Regular.ttf');
    const spectralFontData = readFileSync(spectralFontPath);

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            background: 'hsl(160, 50%, 97%)',
            fontFamily: '"Bebas Neue", sans-serif',
          }}
        >
          {/* Left Side - Text and Logo */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '50%',
              height: '100%',
              padding: '60px 50px',
              borderRight: '8px solid #000000',
              background: 'hsl(160, 50%, 97%)',
            }}
          >
            {/* Logo */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={logoUrl}
                width="180"
                height="180"
                style={{
                  objectFit: 'contain',
                  imageRendering: 'crisp-edges',
                }}
              />
            </div>

            {/* Title and Subtitle */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                gap: '16px',
              }}
            >
              <h1
                style={{
                  fontSize: '58px',
                  fontWeight: 900,
                  margin: 0,
                  textAlign: 'center',
                  lineHeight: 0.95,
                  letterSpacing: '-0.02em',
                  color: '#000000',
                  maxWidth: '95%',
                  textTransform: 'uppercase',
                }}
              >
                {title}
              </h1>
              {subtitle && (
                <p
                  style={{
                    fontSize: '20px',
                    fontWeight: 600,
                    margin: 0,
                    textAlign: 'center',
                    lineHeight: 1.3,
                    color: '#374151',
                    letterSpacing: '0em',
                    maxWidth: '95%',
                    fontFamily: '"Spectral", serif',
                  }}
                >
                  {subtitle}
                </p>
              )}
            </div>

            {/* Bottom spacer for balance */}
            <div style={{ height: '20px' }} />
          </div>

          {/* Right Side - Icons Grid */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '18px',
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
              width: '50%',
              height: '100%',
              padding: '80px 60px',
              background: 'hsl(160, 50%, 97%)',
              position: 'relative',
              backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.08) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          >
            {icons.map((icon, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  width: '92px',
                  height: '92px',
                  borderRadius: '12px',
                  backgroundColor: '#FFFFFF',
                  padding: '16px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '6px 6px 0px 0px rgba(0, 0, 0, 1)',
                  border: '4px solid #000000',
                }}
              >
                <img
                  src={icon}
                  width="60"
                  height="60"
                  style={{
                    objectFit: 'contain',
                    imageRendering: 'crisp-edges',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Bebas Neue',
            data: bebasFontData,
            style: 'normal',
            weight: 400,
          },
          {
            name: 'Spectral',
            data: spectralFontData,
            style: 'normal',
            weight: 400,
          },
        ],
      }
    );
  } catch (e: any) {
    console.error('Topics OG Image Error:', e);
    return new Response(`Failed to generate the image: ${e.message}`, {
      status: 500,
    });
  }
}
