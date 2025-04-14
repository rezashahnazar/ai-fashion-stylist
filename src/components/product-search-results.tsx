"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";

interface Product {
  id: number;
  title_fa: string;
  images: {
    main: {
      url: string[];
    };
  };
  default_variant: {
    price: {
      selling_price: number;
    };
    size: {
      title: string;
    };
  };
}

interface ProductSearchResultsProps {
  query: string;
}

export function ProductSearchResults({ query }: ProductSearchResultsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const searchProducts = async () => {
      try {
        const response = await fetch(
          `/api/search-products/?q=${encodeURIComponent(query)}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data.data.products || []);
      } catch (error) {
        console.error("Error searching products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      searchProducts();
    }
  }, [query]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        No products found for "{query}"
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <a
          key={product.id}
          href={`https://www.digikala.com/product/dkp-${product.id}/`}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="p-0">
              <div className="relative aspect-square">
                <Image
                  src={product.images?.main?.url?.[0] || ""}
                  alt={product.title_fa || ""}
                  fill
                  className="object-cover"
                />
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <h3 className="font-medium">{product.title_fa || ""}</h3>
              <p className="text-sm text-muted-foreground">
                Size: {product.default_variant?.size?.title || ""}
              </p>
              <p className="text-lg font-bold mt-2">
                {(
                  (product.default_variant?.price?.selling_price || 0) / 10
                ).toLocaleString()}{" "}
                تومان
              </p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button
                className="w-full"
                onClick={(e) => {
                  e.preventDefault();
                  addToCart({
                    id: product.id.toString(),
                    name: product.title_fa || "",
                    description: product.title_fa || "",
                    price: product.default_variant?.price?.selling_price || 0,
                    imageUrl: product.images?.main?.url?.[0] || "",
                  });
                }}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        </a>
      ))}
    </div>
  );
}
