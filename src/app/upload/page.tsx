"use client";

import { Button } from "@/components/ui/button";
import { Upload, Loader2 } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import { useChat } from "@ai-sdk/react";
import { Markdown } from "@/components/markdown";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function UploadPage() {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const { messages, append, isLoading } = useChat({
    api: "/api/chat/",
    initialMessages: [],
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    const newPreviews = acceptedFiles.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    maxFiles: 1,
  });

  const handleAnalyze = async () => {
    if (!files.length) return;

    const file = files[0];
    const base64Image = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result);
      reader.readAsDataURL(file);
    });

    await append({
      role: "user",
      content:
        "Analyze this image and describe the style, colors, and fashion elements in detail.",
      experimental_attachments: [
        {
          url: base64Image as string,
          name: file.name,
          contentType: file.type,
        },
      ],
    });
  };

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl">
            Upload Your Clothing
          </h1>
          <p className="text-xl text-muted-foreground">
            Upload a photo of your clothing item to get style recommendations
            and matching products.
          </p>
        </div>
      </div>
      <div className="mt-8 space-y-8">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25"
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-4 text-lg font-medium">
            {isDragActive
              ? "Drop the file here"
              : "Drag and drop your image here"}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            or click to select a file
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Supported formats: JPEG, PNG, WebP
          </p>
        </div>

        {previews.length > 0 && (
          <div className="space-y-6">
            <div className="grid gap-4">
              {previews.map((preview, index) => (
                <div
                  key={index}
                  className="relative aspect-square w-full overflow-hidden rounded-lg"
                >
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <Button
                type="button"
                size="lg"
                onClick={() => handleAnalyze()}
                disabled={!files.length || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze Style"
                )}
              </Button>
            </div>
          </div>
        )}

        {messages.length > 0 && (
          <Card className="mt-8">
            <CardContent className="pt-6">
              <div className="prose max-w-none dark:prose-invert space-y-4">
                {messages.map((m) => (
                  <div key={m.id} className="space-y-4">
                    {m.role === "assistant" && m.content && (
                      <Markdown content={m.content} />
                    )}
                    {m.experimental_attachments?.map(
                      (attachment, index) =>
                        attachment.contentType?.startsWith("image/") && (
                          <Image
                            key={`${m.id}-${index}`}
                            src={attachment.url}
                            width={500}
                            height={500}
                            alt={attachment.name ?? `attachment-${index}`}
                            className="rounded-lg"
                          />
                        )
                    )}
                  </div>
                ))}
              </div>
              {messages.some((m) => m.role === "assistant" && m.content) && (
                <div className="mt-6 flex justify-end">
                  <Button onClick={() => router.push("/generate")} size="lg">
                    Generate Similar Style
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
