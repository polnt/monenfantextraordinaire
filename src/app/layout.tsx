import type { Metadata } from "next";
import { Nunito, Aleo } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/layout/CookieConsent";
import { CartProvider } from "@/contexts/CartContext";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-nunito",
});

const aleo = Aleo({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-aleo",
});

export const metadata: Metadata = {
  title: "Mon Enfant Extra-Ordinaire",
  description:
    "Ressources, formations et outils pour accompagner les enfants autistes et neurodiverses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <html
      lang="fr"
      className={`${nunito.variable} ${aleo.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col">
        <CurrencyProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <CookieConsent />
          </CartProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
