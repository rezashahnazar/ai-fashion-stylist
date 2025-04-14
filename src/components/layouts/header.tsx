"use client";

import Link from "next/link";
import { ShoppingCart, Sparkles } from "lucide-react";
import { useCart } from "@/contexts/cart-context";

export function Header() {
  const { items } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="group flex items-center space-x-2 transition-colors hover:text-primary"
          >
            <Sparkles className="h-6 w-6 transition-transform group-hover:scale-110" />
            <span className="hidden font-bold sm:inline-block">
              AI Fashion Stylist
            </span>
          </Link>
          <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
            <Link
              href="/generate"
              className="text-muted-foreground transition-colors hover:text-foreground hover:underline hover:underline-offset-4"
            >
              Generate
            </Link>
            <Link
              href="/cart"
              className="text-muted-foreground transition-colors hover:text-foreground hover:underline hover:underline-offset-4"
            >
              Cart
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/cart"
            className="group relative flex items-center justify-center rounded-full p-2 text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground hover:shadow-md"
          >
            <ShoppingCart className="h-5 w-5 transition-transform group-hover:scale-110" />
            {items.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground transition-transform group-hover:scale-110">
                {items.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
