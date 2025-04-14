import { useState } from "react";

interface Product {
  id: number;
  title_fa: string;
  title_en: string;
  images: {
    main: {
      url: string[];
    };
  };
  default_variant: {
    price: {
      selling_price: number;
      rrp_price: number;
    };
    seller: {
      title: string;
      rating: {
        total_rate: number;
      };
    };
  };
}

interface UseProductSearchResult {
  searchProducts: (query: string) => Promise<Product[]>;
  isLoading: boolean;
  error: string | null;
}

export function useProductSearch(): UseProductSearchResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchProducts = async (query: string): Promise<Product[]> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/search/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error("Failed to search products");
      }

      const data = await response.json();
      return data.data.products;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    searchProducts,
    isLoading,
    error,
  };
}
