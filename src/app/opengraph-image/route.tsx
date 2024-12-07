import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0A1628',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
        }}
      >
        {/* Logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '40px',
        }}>
          <div style={{
            fontSize: '48px',
            letterSpacing: '-0.02em',
            color: 'white',
            display: 'flex',
          }}>
            <span style={{ fontWeight: 300 }}>ten</span>
            <span style={{ fontWeight: 700 }}>gri</span>
            <span style={{ color: '#E63946' }}>.</span>
          </div>
        </div>

        {/* Tagline */}
        <div style={{
          fontSize: '64px',
          fontWeight: 700,
          color: 'white',
          lineHeight: 1.1,
          marginBottom: '20px',
        }}>
          Digital Solutions
          <br />
          That Move Millions
        </div>

        {/* Subtitle */}
        <div style={{
          fontSize: '24px',
          color: 'rgba(255,255,255,0.7)',
          marginBottom: '40px',
        }}>
          Technology • Strategy • Impact
        </div>

        {/* Visual elements */}
        <div style={{
          position: 'absolute',
          right: '80px',
          bottom: '80px',
          display: 'flex',
          gap: '12px',
        }}>
          {['NYC', 'LDN', 'SG', 'TYO'].map((city) => (
            <div key={city} style={{
              padding: '8px 16px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '4px',
              color: 'rgba(255,255,255,0.6)',
              fontSize: '14px',
            }}>
              {city}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
} 