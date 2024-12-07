import { Space_Grotesk } from 'next/font/google';
import Navbar from '@/components/common/Navbar';
import ProgressIndicator from '@/components/home/ProgressIndicator';
import PageTransition from '@/components/transitions/PageTransition';
import './globals.css';

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space'
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body className="font-sans antialiased">
        <ProgressIndicator />
        <Navbar />
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}

export const metadata = {
  title: 'Tengri | Digital Solutions That Move Millions',
  description: 'We build technology that moves millions. From grassroots movements to global media platforms, creating digital solutions that drive real change.',
  metadataBase: new URL('https://tengri-consulting.com'),
  icons: {
    icon: [
      { url: '/favicon', sizes: '32x32', type: 'image/png' },
      { url: '/favicon', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Tengri | Digital Solutions That Move Millions',
    description: 'From grassroots movements to global media platforms, we create digital solutions that drive real change.',
    url: 'https://tengri-consulting.com',
    siteName: 'Tengri',
    type: 'website',
    images: [
      {
        url: '/og-image.png', // You'll need to create this
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tengri | Digital Solutions That Move Millions',
    description: 'Building technology that moves millions.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://tengri-consulting.com',
  }
}
