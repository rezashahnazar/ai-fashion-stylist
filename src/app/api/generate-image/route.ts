import { NextResponse } from "next/server";
import { experimental_generateImage as generateImage } from "ai";
import { openai } from "@/lib/openai";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required and must be a string" },
        { status: 400 }
      );
    }

    const { image } = await generateImage({
      model: openai.image("dall-e-3"),
      prompt: prompt.trim(),
      size: "1024x1024",
      providerOptions: {
        openai: {
          style: "vivid",
          quality: "hd",
        },
      },
    });

    if (!image?.base64) {
      throw new Error("No image data received");
    }

    return NextResponse.json({ imageUrl: image.base64 });
  } catch (error) {
    console.error("Error generating image:", error);
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 }
    );
  }
}
