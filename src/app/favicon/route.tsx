import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div style={{
          width: '32px',
          height: '32px',
          background: '#0A1628',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}>
          <div style={{
            color: 'white',
            fontSize: '20px',
            fontWeight: 300,
            letterSpacing: '-0.02em',
            transform: 'translateY(-1px) translateX(-0.5px)',
            fontFamily: 'Inter, sans-serif',
          }}>
            t
          </div>
          
          <div style={{
            position: 'absolute',
            top: '6px',
            right: '8px',
            width: '4px',
            height: '4px',
            background: '#E63946',
            borderRadius: '50%',
          }} />
        </div>
      </div>
    ),
    {
      width: 32,
      height: 32,
    }
  )
} 