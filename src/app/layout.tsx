import type { Metadata, Viewport } from "next";
import "./globals.scss";
import { Open_Sans } from "next/font/google"

const open_sans = Open_Sans({
  weight: ["400", "600", "700"],
  subsets: ["latin", 'latin-ext'],
  display: "swap",
})


export const metadata: Metadata = {
  title: 'Подбор насосов',
  description: 'Интернет-магазин Baski',
  // icons: [{ rel: 'icon', url: Favicon.src }],
  alternates: {
    canonical: '',
    languages: {
      ru: ''
    },
  },
  robots: {
    // index: false,
    index: true,
    follow: true,
    // nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  keywords: [],
  openGraph: {
    title: '',
    description: '',
    siteName: '',
    images: [{
      url: '',
      width: 1200,
      height: 630,
      type: 'image/jpg'
    }],
    type: "website",
    locale: 'ru_RU',
    url: '',
  }
}

export const viewport: Viewport = {
  userScalable: true,
  width: 'device-width',
  initialScale: 1,
  // maximumScale: 1,
  viewportFit: 'cover',
  // minimumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru-Ru">
      <body className={open_sans.className}>
        {children}
      </body>
    </html>
  );
}
