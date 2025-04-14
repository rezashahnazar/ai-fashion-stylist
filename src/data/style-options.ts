export interface StyleOption {
  id: string;
  name: string;
  description: string;
  prompt: string;
  price: number;
}

export const styleOptions: StyleOption[] = [
  {
    id: "casual",
    name: "Casual",
    description: "Everyday comfortable and relaxed style",
    prompt:
      "A casual outfit with jeans, t-shirt, and sneakers in a modern urban setting, fashion photography style",
    price: 99.99,
  },
  {
    id: "formal",
    name: "Formal",
    description: "Professional and sophisticated looks",
    prompt:
      "A sophisticated formal business outfit with a tailored suit, dress shoes in a corporate environment, fashion photography style",
    price: 199.99,
  },
  {
    id: "streetwear",
    name: "Streetwear",
    description: "Urban and trendy fashion",
    prompt:
      "A trendy streetwear outfit with hoodie, cargo pants, and sneakers in an urban street setting, fashion photography style",
    price: 149.99,
  },
  {
    id: "bohemian",
    name: "Bohemian",
    description: "Free-spirited and artistic style",
    prompt:
      "A bohemian style outfit with flowing dress, layered accessories in a natural outdoor setting, fashion photography style",
    price: 129.99,
  },
  {
    id: "minimalist",
    name: "Minimalist",
    description: "Clean and simple aesthetic",
    prompt:
      "A minimalist outfit with clean lines, monochromatic colors in a simple modern setting, fashion photography style",
    price: 89.99,
  },
  {
    id: "sporty",
    name: "Sporty",
    description: "Active and athletic fashion",
    prompt:
      "An athletic outfit with performance wear and running shoes in a fitness environment, fashion photography style",
    price: 119.99,
  },
];
