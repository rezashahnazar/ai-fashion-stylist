"use client";

import Link from "next/link";
import { Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built with ❤️ by{" "}
            <Link
              href="https://github.com/rezashahnazar"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4 transition-colors hover:text-primary"
            >
              Reza Shahnazar
            </Link>
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/rezashahnazar/dk-new-stylist"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-2 rounded-full p-2 text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground hover:shadow-md"
          >
            <Github className="h-5 w-5 transition-transform group-hover:scale-110" />
            <span className="hidden text-sm font-medium md:inline-block">
              View on GitHub
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
