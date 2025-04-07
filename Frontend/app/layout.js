import { Geist, Geist_Mono, Inter } from "next/font/google";
import { ToastContainer } from 'react-toastify';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: "LDistrib",
  description: "Vente de camions spécifiques",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased bg-white`}
      >
        {children}

      </body>
    </html>
  );
}
