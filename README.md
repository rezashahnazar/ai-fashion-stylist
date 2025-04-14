# AI Fashion Stylist

An AI-powered fashion assistant that helps you analyze clothing styles and generate outfit recommendations.

## Features

- **Image Analysis**: Upload images of clothing items to get detailed style analysis
- **Style Generation**: Generate complete outfits based on your preferences
- **Product Recommendations**: Find matching products from Digikala
- **Multi-modal AI**: Powered by GPT-4o for image understanding and style analysis

## Tech Stack

- **Frontend**: Next.js 15 with App Router
- **UI**: Tailwind CSS, Radix UI components
- **AI**: Vercel AI SDK with GPT-4o
- **Image Handling**: React Dropzone
- **Styling**: Tailwind CSS with custom theme

## Getting Started

### Prerequisites

- Node.js 18+
- OpenAI API key
- Digikala API access (for product recommendations)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/rezashahnazar/dk-new-stylist.git
cd dk-new-stylist
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
OPENAI_API_KEY=your_openai_api_key
OPENAI_BASE_URL=your_openai_base_url
```

4. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── api/               # API routes
│   ├── upload/            # Image upload page
│   └── generate/          # Style generation page
├── components/            # Reusable components
│   ├── ui/               # UI components
│   └── markdown/         # Markdown rendering
├── contexts/             # React contexts
├── data/                 # Static data
└── lib/                  # Utility functions
```

## Usage

1. **Upload Page**

   - Drag and drop or select an image of your clothing item
   - Click "Analyze Style" to get AI-powered style analysis
   - View detailed style recommendations and color analysis

2. **Generate Page**
   - Select your preferred style and color
   - Click "Generate Outfit" to create a complete outfit
   - Find matching products from Digikala

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Vercel AI SDK](https://sdk.vercel.ai/)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
