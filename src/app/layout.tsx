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
            <div className="fixed top-0 left-0 right-0 z-[1001] bg-amber-400 text-amber-900 text-center text-sm font-semibold h-9 flex items-center justify-center px-4">
              Site en cours de construction — version test
            </div>
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
