import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
