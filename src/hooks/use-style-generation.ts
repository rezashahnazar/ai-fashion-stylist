import { useState } from "react";
import { fileToBase64 } from "@/lib/image-utils";

interface UseStyleGenerationResult {
  generateStyle: (style: string, referenceImage?: File) => Promise<string>;
  isLoading: boolean;
  error: string | null;
}

export function useStyleGeneration(): UseStyleGenerationResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateStyle = async (
    style: string,
    referenceImage?: File
  ): Promise<string> => {
    setIsLoading(true);
    setError(null);

    try {
      const body: { style: string; referenceImage?: string } = { style };

      if (referenceImage) {
        body.referenceImage = await fileToBase64(referenceImage);
      }

      const response = await fetch("/api/generate/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Failed to generate style");
      }

      const data = await response.json();
      return data.description;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generateStyle,
    isLoading,
    error,
  };
}
