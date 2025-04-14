import { streamText } from "ai";
import { openai } from "@/lib/openai";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    // Parse the URL-encoded string to get style and prompt
    const params = new URLSearchParams(prompt);
    const style = params.get("style");
    const outfitPrompt = params.get("prompt");

    if (!style || !outfitPrompt) {
      return new Response(
        JSON.stringify({ error: "Style and prompt are required" }),
        { status: 400 }
      );
    }

    const result = streamText({
      model: openai("gpt-4o-mini"),
      prompt: `Generate a detailed outfit description based on the following style and prompt. Format your response in markdown with proper headings, lists, and emphasis:

Style: ${style}
Prompt: ${outfitPrompt}

Please provide a detailed description of the outfit in the following markdown format:

# Outfit Description

## Main Clothing Items
- List each item with bullet points
- Use **bold** for important details
- Use *italic* for subtle features

## Colors and Patterns
- List colors and patterns
- Use **bold** for main colors
- Use *italic* for patterns

## Accessories
- List accessories with bullet points
- Use **bold** for main items
- Use *italic* for details

## Occasion Suitability
- Describe suitable occasions
- Use bullet points for different scenarios

## Style Notes
- List style notes with bullet points
- Use **bold** for key points
- Use *italic* for subtle observations`,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error in generate route:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate outfit" }),
      { status: 500 }
    );
  }
}
