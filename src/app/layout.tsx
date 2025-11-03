import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/components/globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  fallback: ['Arial', 'sans-serif'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  fallback: ['Courier New', 'monospace'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Mozi Jegyfoglaló',
    default: 'Mozi Jegyfoglaló',
  },
  description: 'Egyszerű mozi jegyfoglaló alkalmazás Next.js-el',
  keywords: ['mozi', 'jegyfoglalás'],
  creator: 'Hrustinszki Ádám',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='hu'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
