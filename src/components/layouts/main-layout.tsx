"use client";

import { ReactNode } from "react";
import { Header } from "@/components/layouts/header";
import { Footer } from "@/components/layouts/footer";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
