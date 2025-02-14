import type { Metadata } from 'next';
import type { Viewport } from 'next';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { GoogleAnalytics } from '@next/third-parties/google';

import localFont from 'next/font/local';

import BottomNav from '@components/common/BottomNav';
import Providers from '@components/providers/TQProvider';

import './globals.css';

const pretendard = localFont({
  src: '/fonts/PretendardVariable.woff2',
  weight: '100 900',
  variable: '--font-pretendard',
  preload: true, // Next.js에서 preload 설정
  display: 'swap',
});

export const metadata: Metadata = {
  title: '모닥모닥',
  description: '사람들이 함께 모여 이야기를 나누고, 추억을 쌓는 공간',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.className} antialiased`}>
        <Providers>
          {children}
          <BottomNav />
          <ReactQueryDevtools />
        </Providers>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
    </html>
  );
}
