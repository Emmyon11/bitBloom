import './globals.css';
import type { Metadata } from 'next';
import {
  Inter,
  Nunito_Sans,
  Pacifico,
  Inconsolata,
  Roboto_Mono,
} from 'next/font/google';
import { Navbar } from './components/navbar';
import { Providers } from '@/lib/redux_provider';
import TradingViewWidgetStrip from './components/trading_view_strip';
import Footer from './components/footer';

const inter = Inter({ subsets: ['latin'] });
const nunito = Nunito_Sans({ subsets: ['latin'], variable: '--font-nunito' });
const inconsolata = Inconsolata({
  subsets: ['latin'],
  variable: '--font-inconsolata',
});
const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto_mono',
});
const pacifito = Pacifico({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pacifito',
});

export const metadata: Metadata = {
  title: 'Bit Bloom',
  description: 'A safe way to invest in cryptocurrency',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${inconsolata.variable} ${pacifito.variable} ${roboto_mono.variable}`}
    >
      <body className={inter.className}>
        <div className="min-h-screen">
          <Providers>
            <Navbar />
            <div className="mt-20">
              <TradingViewWidgetStrip />
            </div>

            {children}

            <Footer />
          </Providers>
        </div>
      </body>
    </html>
  );
}
