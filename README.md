# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/ca986489-deb1-4305-9bba-9139cccaf058

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/ca986489-deb1-4305-9bba-9139cccaf058) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/ca986489-deb1-4305-9bba-9139cccaf058) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)

# Shadcn UI Component Customizer

A web application that transforms standard shadcn/ui components into highly customized, visually appealing UI elements using AI.

## Features

- **Prompt-Based Customization**: Input a description and get a customized component
- **AI-Powered Design Modification**: Changes colors, spacing, typography, layout, and more
- **Real-Time Preview**: See changes instantly as you adjust your prompts
- **Export & Integration**: Download Tailwind CSS styles or shadcn/ui component JSX

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/bun
- OpenAI API key (for AI-powered customization)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/shadcn-ui-customizer.git
   cd shadcn-ui-customizer
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. Create a `.env` file in the root directory with your API keys:
   ```
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   VITE_GOOGLE_FONTS_API_KEY=your_google_fonts_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

## Implementing Real AI Integration

This project is set up to use real AI for component generation. Here's how to implement it:

### 1. Set Up Your API Keys

1. Get an OpenAI API key from [OpenAI Platform](https://platform.openai.com/)
2. Add it to your `.env` file:
   ```
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   ```

### 2. Understanding the AI Implementation

The app uses OpenAI's API to:

1. **Analyze Design Inspirations**: Extract color palettes, typography, and design patterns
2. **Generate Unique Components**: Create custom React components based on user prompts

Key files:
- `src/services/openAIService.ts`: Contains the OpenAI API integration
- `src/services/designGenerationService.ts`: Handles component generation
- `src/services/DesignInspirationService.ts`: Manages design inspiration analysis

### 3. Extending the AI Capabilities

To enhance the AI capabilities:

1. **Add More Component Types**:
   - Update the component templates in `designGenerationService.ts`
   - Add new component options in `AIPromptInput.tsx`

2. **Improve Prompt Engineering**:
   - Refine the system prompts in `openAIService.ts` to get better results
   - Add more context about design principles and accessibility

3. **Implement Design Scoring**:
   - Add a function in `openAIService.ts` to score generated designs
   - Use this to provide feedback to users on design quality

## PRD Implementation Status

Based on the Product Requirements Document (PRD), here's what's implemented:

### Implemented ✅

- Basic UI structure for component customization
- Design style and color scheme selection
- Component preview system
- Export functionality for generated components
- OpenAI integration for component generation

### Partially Implemented 🟡

- Design inspiration generator (mock implementation, needs real API integration)
- Real-time preview (needs optimization)
- Component upload & selection (limited to predefined components)

### Not Yet Implemented ❌

- Team collaboration & sharing
- Automatic aesthetic scoring
- Marketplace for pre-made themes

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
