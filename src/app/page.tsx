import { Button } from "@/components/ui/button";
import { Upload, Wand2, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-1">
      <section className="relative space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <div className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/20">
            AI-Powered Fashion Assistant
          </div>
          <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Your Personal{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60">
              AI Fashion Stylist
            </span>
          </h1>
          <p className="max-w-[42rem] text-lg leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Upload your clothing or let AI generate a complete outfit for you.
            Find matching products from Digikala and create your perfect style.
          </p>
          <div className="space-x-4">
            <Link href="/upload">
              <Button
                size="lg"
                className="group h-12 px-6 transition-all hover:scale-105 hover:shadow-lg"
              >
                <Upload className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                Upload Your Clothes
              </Button>
            </Link>
            <Link href="/generate">
              <Button
                variant="outline"
                size="lg"
                className="group h-12 px-6 transition-all hover:scale-105 hover:shadow-lg"
              >
                <Wand2 className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                Generate Style
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <section className="container space-y-6 py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-3xl md:text-6xl">
            How It Works
          </h2>
          <p className="max-w-[85%] text-lg leading-normal text-muted-foreground sm:text-xl sm:leading-7">
            Our AI-powered platform helps you discover your perfect style in
            three simple steps
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-6 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <div className="group relative overflow-hidden rounded-xl border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:scale-[1.02]">
            <div className="flex h-full flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <Upload className="h-5 w-5 text-primary transition-transform group-hover:scale-110" />
                </div>
                <h3 className="text-xl font-bold transition-colors group-hover:text-primary">
                  Upload or Generate
                </h3>
                <p className="text-muted-foreground">
                  Upload your existing clothing or let AI generate a complete
                  outfit for you
                </p>
              </div>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-xl border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:scale-[1.02]">
            <div className="flex h-full flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <Sparkles className="h-5 w-5 text-primary transition-transform group-hover:scale-110" />
                </div>
                <h3 className="text-xl font-bold transition-colors group-hover:text-primary">
                  Customize & Refine
                </h3>
                <p className="text-muted-foreground">
                  Make adjustments to the generated style and fine-tune it to
                  your preferences
                </p>
              </div>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-xl border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:scale-[1.02]">
            <div className="flex h-full flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <Wand2 className="h-5 w-5 text-primary transition-transform group-hover:scale-110" />
                </div>
                <h3 className="text-xl font-bold transition-colors group-hover:text-primary">
                  Shop Matching Products
                </h3>
                <p className="text-muted-foreground">
                  Find and purchase similar products from Digikala to complete
                  your look
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
