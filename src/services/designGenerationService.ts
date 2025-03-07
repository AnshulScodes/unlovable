import { ThemeVariables } from '@/hooks/useThemeCustomizer';
import { generateUniqueComponentWithAI, ComponentGenerationRequest } from './openAIService';
import { toast } from 'sonner';

// Mock unique design style templates that will inform our generator
const designStyles = {
  neobrutalist: {
    colors: {
      primary: { hue: 0, saturation: 100, lightness: 50 }, // Bright red
      secondary: { hue: 45, saturation: 100, lightness: 50 }, // Bright yellow
      border: { hue: 0, saturation: 0, lightness: 0 }, // Black
    },
    borderRadius: 0,
    borderWidth: 4,
    fontFamily: "'Inter', sans-serif",
    fontWeight: 800,
    shadowSize: 0,
  },
  glassmorphic: {
    colors: {
      primary: { hue: 210, saturation: 100, lightness: 60 }, // Blue
      secondary: { hue: 180, saturation: 50, lightness: 80 }, // Light teal
      border: { hue: 210, saturation: 30, lightness: 80 }, // Light blue
    },
    borderRadius: 1.5,
    borderWidth: 1,
    fontFamily: "'Inter', sans-serif",
    fontWeight: 400,
    shadowSize: 4,
    blurEffect: true,
    transparency: true,
  },
  neumorphic: {
    colors: {
      primary: { hue: 210, saturation: 10, lightness: 95 }, // Very light blue-gray
      secondary: { hue: 210, saturation: 20, lightness: 85 }, // Light blue-gray
      border: { hue: 210, saturation: 5, lightness: 90 }, // Subtle border
    },
    borderRadius: 1,
    borderWidth: 0,
    fontFamily: "'Roboto', sans-serif",
    fontWeight: 500,
    shadowSize: 3,
    insetShadow: true,
  },
  y2k: {
    colors: {
      primary: { hue: 280, saturation: 75, lightness: 65 }, // Bright purple
      secondary: { hue: 200, saturation: 100, lightness: 70 }, // Bright blue
      border: { hue: 320, saturation: 80, lightness: 70 }, // Bright pink
    },
    borderRadius: 1.25,
    borderWidth: 2,
    fontFamily: "'Comic Sans MS', cursive",
    fontWeight: 400,
    shadowSize: 2,
    gradients: true,
    metallicEffect: true,
  },
  vaporwave: {
    colors: {
      primary: { hue: 280, saturation: 70, lightness: 60 }, // Purple
      secondary: { hue: 180, saturation: 100, lightness: 75 }, // Cyan
      border: { hue: 315, saturation: 90, lightness: 70 }, // Pink
    },
    borderRadius: 0.5,
    borderWidth: 1,
    fontFamily: "'VT323', monospace",
    fontWeight: 400,
    shadowSize: 2,
    gradients: true,
    scanlines: true,
    gridBackground: true,
  },
  cyberpunk: {
    colors: {
      primary: { hue: 180, saturation: 100, lightness: 50 }, // Cyan
      secondary: { hue: 300, saturation: 100, lightness: 50 }, // Magenta
      border: { hue: 60, saturation: 100, lightness: 50 }, // Yellow
    },
    borderRadius: 0,
    borderWidth: 2,
    fontFamily: "'Orbitron', sans-serif",
    fontWeight: 500,
    shadowSize: 3,
    neonGlow: true,
    glitchEffect: true,
  },
  claymorphism: {
    colors: {
      primary: { hue: 350, saturation: 80, lightness: 80 }, // Light pink
      secondary: { hue: 190, saturation: 70, lightness: 80 }, // Light blue
      border: { hue: 0, saturation: 0, lightness: 90 }, // Light gray
    },
    borderRadius: 2,
    borderWidth: 0,
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 600,
    shadowSize: 5,
    softShadow: true,
    puffyEffect: true,
  },
  memphis: {
    colors: {
      primary: { hue: 340, saturation: 80, lightness: 60 }, // Hot pink
      secondary: { hue: 160, saturation: 80, lightness: 70 }, // Mint
      border: { hue: 60, saturation: 80, lightness: 60 }, // Yellow
    },
    borderRadius: 0.25,
    borderWidth: 3,
    fontFamily: "'Rubik', sans-serif",
    fontWeight: 500,
    shadowSize: 4,
    geometricPatterns: true,
    boldColors: true,
  },
  synthwave: {
    colors: {
      primary: { hue: 300, saturation: 100, lightness: 50 }, // Magenta
      secondary: { hue: 240, saturation: 100, lightness: 50 }, // Blue
      border: { hue: 180, saturation: 100, lightness: 50 }, // Cyan
    },
    borderRadius: 0.5,
    borderWidth: 2,
    fontFamily: "'OutRun', sans-serif",
    fontWeight: 700,
    shadowSize: 4,
    neonGlow: true,
    gridLines: true,
    sunsetGradient: true,
  },
  web1: {
    colors: {
      primary: { hue: 240, saturation: 100, lightness: 50 }, // Blue
      secondary: { hue: 0, saturation: 100, lightness: 50 }, // Red
      border: { hue: 0, saturation: 0, lightness: 0 }, // Black
    },
    borderRadius: 0,
    borderWidth: 1,
    fontFamily: "'Times New Roman', serif",
    fontWeight: 400,
    shadowSize: 0,
    pixelGraphics: true,
    animatedGif: true,
    marqueeText: true,
  }
};

// Color scheme generators
const colorSchemes = {
  monochromatic: (baseHue: number) => {
    return {
      primary: { hue: baseHue, saturation: 80, lightness: 50 },
      secondary: { hue: baseHue, saturation: 60, lightness: 80 },
      accent: { hue: baseHue, saturation: 90, lightness: 40 },
    };
  },
  analogous: (baseHue: number) => {
    return {
      primary: { hue: baseHue, saturation: 80, lightness: 50 },
      secondary: { hue: (baseHue + 30) % 360, saturation: 70, lightness: 60 },
      accent: { hue: (baseHue + 60) % 360, saturation: 60, lightness: 70 },
    };
  },
  complementary: (baseHue: number) => {
    return {
      primary: { hue: baseHue, saturation: 80, lightness: 50 },
      secondary: { hue: (baseHue + 180) % 360, saturation: 70, lightness: 60 },
      accent: { hue: (baseHue + 30) % 360, saturation: 60, lightness: 70 },
    };
  },
  triadic: (baseHue: number) => {
    return {
      primary: { hue: baseHue, saturation: 80, lightness: 50 },
      secondary: { hue: (baseHue + 120) % 360, saturation: 70, lightness: 60 },
      accent: { hue: (baseHue + 240) % 360, saturation: 60, lightness: 70 },
    };
  },
  vibrant: (baseHue: number) => {
    return {
      primary: { hue: baseHue, saturation: 100, lightness: 50 },
      secondary: { hue: (baseHue + 180) % 360, saturation: 100, lightness: 60 },
      accent: { hue: (baseHue + 90) % 360, saturation: 100, lightness: 70 },
    };
  },
  pastel: (baseHue: number) => {
    return {
      primary: { hue: baseHue, saturation: 60, lightness: 80 },
      secondary: { hue: (baseHue + 60) % 360, saturation: 50, lightness: 85 },
      accent: { hue: (baseHue + 180) % 360, saturation: 40, lightness: 90 },
    };
  },
  earthy: (baseHue: number) => {
    // Earth tones typically use lower saturation and specific hue ranges
    return {
      primary: { hue: 30, saturation: 50, lightness: 50 }, // Brown
      secondary: { hue: 60, saturation: 30, lightness: 60 }, // Tan
      accent: { hue: 120, saturation: 30, lightness: 40 }, // Dark green
    };
  },
  neon: (baseHue: number) => {
    return {
      primary: { hue: baseHue, saturation: 100, lightness: 60 },
      secondary: { hue: (baseHue + 180) % 360, saturation: 100, lightness: 70 },
      accent: { hue: (baseHue + 270) % 360, saturation: 100, lightness: 50 },
    };
  },
};

// Default theme variables to use as fallback
const defaultThemeVariables: ThemeVariables = {
  colors: [
    { name: 'Background', variable: '--background', value: 'hsl(210, 40%, 98%)', hue: 210, saturation: 40, lightness: 98 },
    { name: 'Foreground', variable: '--foreground', value: 'hsl(222.2, 84%, 4.9%)', hue: 222.2, saturation: 84, lightness: 4.9 },
    { name: 'Primary', variable: '--primary', value: 'hsl(221.2, 83%, 53.9%)', hue: 221.2, saturation: 83, lightness: 53.9 },
    { name: 'Primary Foreground', variable: '--primary-foreground', value: 'hsl(210, 40%, 98%)', hue: 210, saturation: 40, lightness: 98 },
    { name: 'Secondary', variable: '--secondary', value: 'hsl(210, 40%, 96.1%)', hue: 210, saturation: 40, lightness: 96.1 }
  ],
  borderRadius: 0.5,
  fontFamily: "'Inter', sans-serif",
  fontSize: 16,
  fontWeight: 400,
  lineHeight: 1.5,
  shadowSize: 2
};

// Function to generate a unique component based on the prompt and options
export const generateUniqueComponent = async (
  prompt: string, 
  inspirations: string[] = [], 
  options: {
    uniquenessLevel: number;
    componentType: string;
    designStyle?: string;
    colorScheme?: string;
  }
): Promise<{
  themeVariables: ThemeVariables;
  componentCode: string;
  styleCode: string;
}> => {
  console.log('Generating component with:', { prompt, inspirations, options });
  
  try {
    // Validate inputs to prevent errors
    if (!prompt || prompt.trim() === '') {
      throw new Error('Prompt cannot be empty');
    }
    
    if (!options.componentType || options.componentType.trim() === '') {
      options.componentType = 'card'; // Default to card if not specified
    }
    
    // Use the real AI service if API key is configured
    const hasApiKey = import.meta.env.VITE_OPENAI_API_KEY && 
                      import.meta.env.VITE_OPENAI_API_KEY.trim() !== '' &&
                      import.meta.env.VITE_OPENAI_API_KEY !== 'your_openai_api_key_here';
                      
    if (hasApiKey) {
      toast.info("Starting AI-powered component generation...");
      
      // Prepare the request for the AI service
      const request: ComponentGenerationRequest = {
        prompt,
        componentType: options.componentType || 'card',
        designStyle: options.designStyle,
        colorScheme: options.colorScheme,
        uniquenessLevel: options.uniquenessLevel || 5,
        inspirations
      };
      
      try {
        // Call the AI service
        const aiResult = await generateUniqueComponentWithAI(request);
        
        // Convert AI result to theme variables
        const themeVariables = convertAIResultToThemeVariables(aiResult.designAnalysis.colorPalette);
        
        return {
          themeVariables,
          componentCode: aiResult.componentCode,
          styleCode: aiResult.styleCode
        };
      } catch (aiError) {
        console.error('Error calling AI service:', aiError);
        toast.error(`AI service error: ${aiError instanceof Error ? aiError.message : 'Unknown error'}`);
        throw aiError; // Re-throw to be caught by the outer try/catch
      }
    } else {
      // Fall back to the mock implementation if no API key is configured
      toast.warning("Using mock implementation (no OpenAI API key configured)");
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Return mock result with default theme variables
      return {
        themeVariables: defaultThemeVariables,
        componentCode: "// Mock component code\n// This is a placeholder. Add your OpenAI API key to generate real components.",
        styleCode: "/* Mock style code */\n/* This is a placeholder. Add your OpenAI API key to generate real styles. */"
      };
    }
  } catch (error) {
    console.error('Error in generateUniqueComponent:', error);
    toast.error(`Failed to generate component: ${error instanceof Error ? error.message : 'Unknown error'}`);
    
    // Return a fallback result with default theme variables
    return {
      themeVariables: defaultThemeVariables,
      componentCode: "// Error generating component. Please try again.",
      styleCode: "/* No styles generated due to an error */"
    };
  }
};

// Helper function to convert AI color palette to theme variables
const convertAIResultToThemeVariables = (colorPalette: string[]): ThemeVariables => {
  try {
    // Ensure we have at least some colors to work with
    if (!colorPalette || colorPalette.length === 0) {
      return defaultThemeVariables;
    }
    
    // Convert hex colors to HSL for theme variables
    const colors = colorPalette.map((hex, index) => {
      try {
        const rgb = hexToRgb(hex);
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
        
        // Map colors to theme variables
        const colorMappings = [
          { name: 'Primary', variable: '--primary' },
          { name: 'Secondary', variable: '--secondary' },
          { name: 'Background', variable: '--background' },
          { name: 'Foreground', variable: '--foreground' },
          { name: 'Accent', variable: '--accent' }
        ];
        
        const mapping = colorMappings[index % colorMappings.length];
        
        return {
          name: mapping.name,
          variable: mapping.variable,
          value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
          hue: hsl.h,
          saturation: hsl.s,
          lightness: hsl.l
        };
      } catch (colorError) {
        console.error('Error processing color:', hex, colorError);
        // Return a default color if there's an error
        return defaultThemeVariables.colors[index % defaultThemeVariables.colors.length];
      }
    });
    
    // Return theme variables
    return {
      colors,
      borderRadius: 0.5,
      fontFamily: "'Inter', sans-serif",
      fontSize: 16,
      fontWeight: 400,
      lineHeight: 1.5,
      shadowSize: 2
    };
  } catch (error) {
    console.error('Error converting AI result to theme variables:', error);
    return defaultThemeVariables;
  }
};

// Helper function to convert hex to RGB
const hexToRgb = (hex: string) => {
  try {
    // Remove # if present
    hex = hex.replace(/^#/, '');
    
    // Handle shorthand hex (e.g., #FFF)
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    
    // Parse hex
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    
    return { r, g, b };
  } catch (error) {
    console.error('Error parsing hex color:', hex, error);
    return { r: 59, g: 130, b: 246 }; // Default to a blue color
  }
};

// Helper function to convert RGB to HSL
const rgbToHsl = (r: number, g: number, b: number) => {
  try {
    r /= 255;
    g /= 255;
    b /= 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;
    
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      
      h *= 60;
    }
    
    return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
  } catch (error) {
    console.error('Error converting RGB to HSL:', { r, g, b }, error);
    return { h: 210, s: 100, l: 50 }; // Default to a blue color
  }
};

// Function to fetch design inspirations from external sources
export const fetchDesignInspirations = async (searchTerms: string[]): Promise<string[]> => {
  // This would connect to external design APIs in a real implementation
  // For now, we'll return mock results
  console.log('Fetching design inspirations for:', searchTerms);
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Return mock inspiration URLs
  return [
    'https://example.com/design1',
    'https://example.com/design2',
    'https://example.com/design3',
  ];
};
