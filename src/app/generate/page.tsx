"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/contexts/cart-context";
import { styleOptions, StyleOption } from "@/data/style-options";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ProductSearchResults } from "@/components/product-search-results";
import { useCompletion } from "@ai-sdk/react";
import { Loader2, Wand2, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Markdown } from "@/components/markdown";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GeneratedImage {
  styleId: string;
  imageUrl?: string;
  isLoading: boolean;
  error?: string;
}

export default function GeneratePage() {
  const { addToCart } = useCart();
  const [selectedStyle, setSelectedStyle] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    completion,
    complete,
    isLoading: isGenerating,
  } = useCompletion({
    api: "/api/generate",
    onFinish: () => {
      setStep(2);
      if (selectedStyle) {
        generateImageForStyle(selectedStyle);
      }
    },
    onError: (error: Error) => {
      setError(error.message);
    },
  });

  useEffect(() => {
    // Initialize generated images state
    setGeneratedImages(
      styleOptions.map((style: StyleOption) => ({
        styleId: style.id,
        isLoading: false,
      }))
    );
  }, []);

  const generateStyle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStyle) return;

    setLoading(true);
    setError(undefined);

    try {
      const style = styleOptions.find(
        (s: StyleOption) => s.id === selectedStyle
      );
      if (!style) return;

      await complete(
        `style=${encodeURIComponent(selectedStyle)}&prompt=${encodeURIComponent(
          style.prompt
        )}`
      );
    } catch (error) {
      console.error("Error generating style:", error);
      setError("Failed to generate style. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const generateImageForStyle = async (styleId: string) => {
    const style = styleOptions.find((s: StyleOption) => s.id === styleId);
    if (!style) return;

    setGeneratedImages((prev) =>
      prev.map((img) =>
        img.styleId === styleId
          ? { ...img, isLoading: true, error: undefined }
          : img
      )
    );

    try {
      const response = await fetch("/api/generate-image/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: style.prompt.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate image");
      }

      const data = await response.json();

      if (!data.imageUrl) {
        throw new Error("No image URL received");
      }

      const base64Image = `data:image/png;base64,${data.imageUrl}`;

      setGeneratedImages((prev) =>
        prev.map((img) =>
          img.styleId === styleId
            ? { ...img, imageUrl: base64Image, isLoading: false }
            : img
        )
      );
    } catch (error) {
      console.error("Error generating image:", error);
      setGeneratedImages((prev) =>
        prev.map((img) =>
          img.styleId === styleId
            ? {
                ...img,
                error:
                  error instanceof Error
                    ? error.message
                    : "Failed to generate image",
                isLoading: false,
              }
            : img
        )
      );
    }
  };

  const handleAddToCart = (styleId: string) => {
    const style = styleOptions.find((s: StyleOption) => s.id === styleId);
    if (!style) return;

    addToCart({
      id: styleId,
      name: style.name,
      description: style.description,
      price: style.price,
      imageUrl:
        generatedImages.find((img) => img.styleId === styleId)?.imageUrl || "",
    });

    setStep(3);
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        {/* Header Section */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            AI Fashion Stylist
          </h1>
          <p className="text-lg text-muted-foreground">
            Create your perfect outfit with AI-powered style recommendations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Style Selection Section */}
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Style Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Style</Label>
                <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a style" />
                  </SelectTrigger>
                  <SelectContent>
                    {styleOptions.map((style: StyleOption) => (
                      <SelectItem key={style.id} value={style.id}>
                        {style.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Color</Label>
                <Select value={color} onValueChange={setColor}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="black">Black</SelectItem>
                    <SelectItem value="white">White</SelectItem>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="red">Red</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={generateStyle}
                disabled={!selectedStyle || loading || isGenerating}
                className="w-full"
                size="lg"
              >
                {loading || isGenerating ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-5 w-5" />
                )}
                {loading || isGenerating ? "Generating..." : "Generate Outfit"}
              </Button>
            </CardContent>
          </Card>

          {/* Generated Content Section */}
          <div className="lg:col-span-8 space-y-6">
            {step >= 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Generated Outfit</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="prose max-w-none dark:prose-invert">
                    <Markdown content={completion} />
                  </div>

                  <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                    {generatedImages.find(
                      (img) => img.styleId === selectedStyle
                    )?.imageUrl ? (
                      <Image
                        src={
                          generatedImages.find(
                            (img) => img.styleId === selectedStyle
                          )?.imageUrl || ""
                        }
                        alt="Generated outfit"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin" />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      onClick={() =>
                        setSearchQuery(`${selectedStyle} ${color} outfit`)
                      }
                      className="flex-1"
                      size="lg"
                    >
                      Find Similar Products
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => handleAddToCart(selectedStyle)}
                      variant="outline"
                      className="flex-1"
                      size="lg"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Product Results Section */}
            {searchQuery && (
              <Card>
                <CardHeader>
                  <CardTitle>Similar Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <ProductSearchResults query={searchQuery} />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
