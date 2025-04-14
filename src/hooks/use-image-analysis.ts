import { useState } from "react";
import { fileToBase64 } from "@/lib/image-utils";

interface UseImageAnalysisResult {
  analyzeImage: (file: File) => Promise<string>;
  isLoading: boolean;
  error: string | null;
}

export function useImageAnalysis(): UseImageAnalysisResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeImage = async (file: File): Promise<string> => {
    setIsLoading(true);
    setError(null);

    try {
      const base64Image = await fileToBase64(file);

      const response = await fetch("/api/analyze/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: base64Image }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze image");
      }

      const data = await response.json();
      return data.analysis;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    analyzeImage,
    isLoading,
    error,
  };
}
