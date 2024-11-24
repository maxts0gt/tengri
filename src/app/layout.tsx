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
