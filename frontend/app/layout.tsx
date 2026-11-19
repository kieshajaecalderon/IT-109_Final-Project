
import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { CartProvider } from "@/context/CartContext";

const headingFont = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CanteenHub | Multi-Canteen Order & Student Delivery Hub",
  description: "Order conveniently from campus canteens with CanteenHub.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${headingFont.variable} ${bodyFont.variable} antialiased`}
      >
        <CartProvider>
          <Suspense
            fallback={
              <div className="h-20 w-full bg-[#FBE8CE]" />
            }
          >
            <SiteHeader />
          </Suspense>

          <main>{children}</main>

          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  );
}
