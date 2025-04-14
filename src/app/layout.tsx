import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/cart-context";
import { MainLayout } from "@/components/layouts/main-layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Fashion Stylist",
  description:
    "Your personal AI-powered fashion stylist that helps you find the perfect style and matching products",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <CartProvider>
          <MainLayout>{children}</MainLayout>
        </CartProvider>
      </body>
    </html>
  );
}
