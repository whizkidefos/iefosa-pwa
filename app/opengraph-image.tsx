import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Efosa - AI Software Engineer';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to right, #000, #111)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          padding: '40px',
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: 'bold',
            marginBottom: 20,
            background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Efosa
        </div>
        <div
          style={{
            fontSize: 40,
            color: '#94a3b8',
          }}
        >
          AI Software Engineer
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}