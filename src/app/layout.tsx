import type { Metadata } from 'next';
import { Newsreader } from 'next/font/google';
import './globals.css';
import 'leaflet/dist/leaflet.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Providers } from './providers';

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
});

export const metadata: Metadata = {
  title: 'The Indian Agency - Real Estate',
  description:
    'The Indian Agency is a full service, luxury real estate brokerage and lifestyle company representing clients in India (Hyderabad) in a broad spectrum of classes, including residential, commercial, leasing, new development, Farmlands, and open plots. The Indian Agency extends far beyond what a conventional brokerage firm offers. It envisions itself as both a lifestyle company committed to informing and connecting global communities and as a creative agency offering design, marketing and sales solutions for buyers, sellers, developers and investors across India',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&display=swap" rel="stylesheet" />
      </head>
      <body className={`${newsreader.variable} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
