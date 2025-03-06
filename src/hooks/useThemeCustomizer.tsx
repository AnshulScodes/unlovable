
import { useState, useCallback, useEffect } from 'react';
import { toast } from "sonner";

export type ThemeColor = {
  name: string;
  variable: string;
  value: string;
  hue: number;
  saturation: number;
  lightness: number;
};

export type ThemeVariables = {
  colors: ThemeColor[];
  borderRadius: number;
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  lineHeight: number;
  shadowSize: number;
};

export type ThemeSuggestion = {
  id: string;
  title: string;
  description: string;
  preview: string;
  applied: boolean;
};

const defaultThemeVariables: ThemeVariables = {
  colors: [
    { name: 'Background', variable: '--background', value: 'hsl(210, 40%, 98%)', hue: 210, saturation: 40, lightness: 98 },
    { name: 'Foreground', variable: '--foreground', value: 'hsl(222.2, 84%, 4.9%)', hue: 222.2, saturation: 84, lightness: 4.9 },
    { name: 'Primary', variable: '--primary', value: 'hsl(221.2, 83%, 53.9%)', hue: 221.2, saturation: 83, lightness: 53.9 },
    { name: 'Primary Foreground', variable: '--primary-foreground', value: 'hsl(210, 40%, 98%)', hue: 210, saturation: 40, lightness: 98 },
    { name: 'Secondary', variable: '--secondary', value: 'hsl(210, 40%, 96.1%)', hue: 210, saturation: 40, lightness: 96.1 },
    { name: 'Secondary Foreground', variable: '--secondary-foreground', value: 'hsl(222.2, 47.4%, 11.2%)', hue: 222.2, saturation: 47.4, lightness: 11.2 },
    { name: 'Muted', variable: '--muted', value: 'hsl(210, 40%, 96.1%)', hue: 210, saturation: 40, lightness: 96.1 },
    { name: 'Muted Foreground', variable: '--muted-foreground', value: 'hsl(215.4, 16.3%, 46.9%)', hue: 215.4, saturation: 16.3, lightness: 46.9 },
    { name: 'Accent', variable: '--accent', value: 'hsl(210, 40%, 96.1%)', hue: 210, saturation: 40, lightness: 96.1 },
    { name: 'Accent Foreground', variable: '--accent-foreground', value: 'hsl(222.2, 47.4%, 11.2%)', hue: 222.2, saturation: 47.4, lightness: 11.2 },
    { name: 'Border', variable: '--border', value: 'hsl(214.3, 31.8%, 91.4%)', hue: 214.3, saturation: 31.8, lightness: 91.4 },
    { name: 'Card', variable: '--card', value: 'hsl(0, 0%, 100%)', hue: 0, saturation: 0, lightness: 100 },
    { name: 'Card Foreground', variable: '--card-foreground', value: 'hsl(222.2, 84%, 4.9%)', hue: 222.2, saturation: 84, lightness: 4.9 },
    { name: 'Destructive', variable: '--destructive', value: 'hsl(0, 84.2%, 60.2%)', hue: 0, saturation: 84.2, lightness: 60.2 },
    { name: 'Destructive Foreground', variable: '--destructive-foreground', value: 'hsl(210, 40%, 98%)', hue: 210, saturation: 40, lightness: 98 },
    { name: 'Ring', variable: '--ring', value: 'hsl(221.2, 83%, 53.9%)', hue: 221.2, saturation: 83, lightness: 53.9 },
  ],
  borderRadius: 0.75,
  fontFamily: 'Inter, sans-serif',
  fontSize: 1,
  fontWeight: 400,
  lineHeight: 1.5,
  shadowSize: 2,
};

// Presets: Pre-defined theme configurations
const themePresets = {
  default: { ...defaultThemeVariables },
  minimal: {
    ...defaultThemeVariables,
    borderRadius: 0.25,
    colors: defaultThemeVariables.colors.map(color => {
      if (color.variable === '--primary') {
        return { ...color, hue: 220, saturation: 30, lightness: 50, value: 'hsl(220, 30%, 50%)' };
      }
      return color;
    }),
    shadowSize: 1,
  },
  colorful: {
    ...defaultThemeVariables,
    borderRadius: 1.25,
    colors: defaultThemeVariables.colors.map(color => {
      if (color.variable === '--primary') {
        return { ...color, hue: 280, saturation: 80, lightness: 55, value: 'hsl(280, 80%, 55%)' };
      } else if (color.variable === '--accent') {
        return { ...color, hue: 340, saturation: 75, lightness: 60, value: 'hsl(340, 75%, 60%)' };
      }
      return color;
    }),
    shadowSize: 3,
  },
  corporate: {
    ...defaultThemeVariables,
    fontFamily: 'Roboto, sans-serif',
    borderRadius: 0.5,
    colors: defaultThemeVariables.colors.map(color => {
      if (color.variable === '--primary') {
        return { ...color, hue: 210, saturation: 70, lightness: 40, value: 'hsl(210, 70%, 40%)' };
      }
      return color;
    }),
    fontWeight: 500,
  },
  playful: {
    ...defaultThemeVariables,
    fontFamily: 'Poppins, sans-serif',
    borderRadius: 1.5,
    colors: defaultThemeVariables.colors.map(color => {
      if (color.variable === '--primary') {
        return { ...color, hue: 340, saturation: 90, lightness: 65, value: 'hsl(340, 90%, 65%)' };
      } else if (color.variable === '--secondary') {
        return { ...color, hue: 180, saturation: 70, lightness: 60, value: 'hsl(180, 70%, 60%)' };
      } else if (color.variable === '--accent') {
        return { ...color, hue: 40, saturation: 90, lightness: 65, value: 'hsl(40, 90%, 65%)' };
      }
      return color;
    }),
    shadowSize: 4,
    fontSize: 1.1,
  }
};

export const useThemeCustomizer = () => {
  const [themeVariables, setThemeVariables] = useState<ThemeVariables>(defaultThemeVariables);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [suggestions, setSuggestions] = useState<ThemeSuggestion[]>([]);
  const [themeCode, setThemeCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  
  const updateColor = useCallback((index: number, property: keyof ThemeColor, value: number | string) => {
    setThemeVariables(prev => {
      const newColors = [...prev.colors];
      newColors[index] = { 
        ...newColors[index], 
        [property]: value,
        value: property === 'hue' || property === 'saturation' || property === 'lightness' 
          ? `hsl(${property === 'hue' ? value : newColors[index].hue}, ${property === 'saturation' ? value : newColors[index].saturation}%, ${property === 'lightness' ? value : newColors[index].lightness}%)`
          : newColors[index].value
      };
      return { ...prev, colors: newColors };
    });
  }, []);
  
  const updateBorderRadius = useCallback((value: number) => {
    setThemeVariables(prev => ({ ...prev, borderRadius: value }));
  }, []);
  
  const updateFontFamily = useCallback((value: string) => {
    setThemeVariables(prev => ({ ...prev, fontFamily: value }));
  }, []);

  const updateFontSize = useCallback((value: number) => {
    setThemeVariables(prev => ({ ...prev, fontSize: value }));
  }, []);

  const updateFontWeight = useCallback((value: number) => {
    setThemeVariables(prev => ({ ...prev, fontWeight: value }));
  }, []);

  const updateLineHeight = useCallback((value: number) => {
    setThemeVariables(prev => ({ ...prev, lineHeight: value }));
  }, []);

  const updateShadowSize = useCallback((value: number) => {
    setThemeVariables(prev => ({ ...prev, shadowSize: value }));
  }, []);

  const applyPreset = useCallback((presetName: string) => {
    if (presetName in themePresets) {
      setThemeVariables(themePresets[presetName as keyof typeof themePresets]);
      setSelectedPreset(presetName);
      toast.success(`Applied ${presetName} preset`);
    }
  }, []);
  
  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);
  
  const applyThemeToDOM = useCallback(() => {
    const root = document.documentElement;
    
    themeVariables.colors.forEach(color => {
      const [h, s, l] = color.value.match(/\d+(\.\d+)?/g) || [];
      if (h && s && l) {
        root.style.setProperty(color.variable, `${h} ${s}% ${l}%`);
      }
    });
    
    root.style.setProperty('--radius', `${themeVariables.borderRadius}rem`);
    root.style.setProperty('--font-size', `${themeVariables.fontSize}rem`);
    root.style.setProperty('--line-height', `${themeVariables.lineHeight}`);
    
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [themeVariables, isDarkMode]);
  
  const generateFromPrompt = useCallback(async (prompt: string) => {
    setIsGenerating(true);
    toast.info("Analyzing your prompt...");
    
    // Simulate AI processing
    setTimeout(() => {
      // Generate a new theme based on the prompt
      // This is a simplified version; in a real implementation, you'd call an API
      const newColors = [...themeVariables.colors];
      let newFontFamily = themeVariables.fontFamily;
      let newBorderRadius = themeVariables.borderRadius;
      let newShadowSize = themeVariables.shadowSize;
      
      if (prompt.toLowerCase().includes('warm')) {
        newColors[2] = { ...newColors[2], hue: 25, saturation: 95, lightness: 55, value: 'hsl(25, 95%, 55%)' }; // Primary
        newColors[4] = { ...newColors[4], hue: 35, saturation: 30, lightness: 96, value: 'hsl(35, 30%, 96%)' }; // Secondary
      } else if (prompt.toLowerCase().includes('cool')) {
        newColors[2] = { ...newColors[2], hue: 200, saturation: 98, lightness: 50, value: 'hsl(200, 98%, 50%)' }; // Primary
        newColors[4] = { ...newColors[4], hue: 210, saturation: 30, lightness: 96, value: 'hsl(210, 30%, 96%)' }; // Secondary
      } else if (prompt.toLowerCase().includes('tech') || prompt.toLowerCase().includes('modern')) {
        newColors[2] = { ...newColors[2], hue: 250, saturation: 95, lightness: 60, value: 'hsl(250, 95%, 60%)' }; // Primary
        newColors[4] = { ...newColors[4], hue: 260, saturation: 20, lightness: 96, value: 'hsl(260, 20%, 96%)' }; // Secondary
        newFontFamily = 'JetBrains Mono, monospace';
        newBorderRadius = 0.5;
      } else if (prompt.toLowerCase().includes('earth') || prompt.toLowerCase().includes('nature')) {
        newColors[2] = { ...newColors[2], hue: 130, saturation: 65, lightness: 45, value: 'hsl(130, 65%, 45%)' }; // Primary
        newColors[4] = { ...newColors[4], hue: 100, saturation: 20, lightness: 96, value: 'hsl(100, 20%, 96%)' }; // Secondary
      } else if (prompt.toLowerCase().includes('luxury') || prompt.toLowerCase().includes('elegant')) {
        newColors[2] = { ...newColors[2], hue: 45, saturation: 80, lightness: 50, value: 'hsl(45, 80%, 50%)' }; // Gold primary
        newColors[4] = { ...newColors[4], hue: 0, saturation: 0, lightness: 96, value: 'hsl(0, 0%, 96%)' }; // Soft white secondary
        newFontFamily = 'Playfair Display, serif';
        newShadowSize = 3;
      } else if (prompt.toLowerCase().includes('minimal') || prompt.toLowerCase().includes('clean')) {
        newColors[2] = { ...newColors[2], hue: 220, saturation: 30, lightness: 50, value: 'hsl(220, 30%, 50%)' }; // Subtle primary
        newColors[4] = { ...newColors[4], hue: 0, saturation: 0, lightness: 98, value: 'hsl(0, 0%, 98%)' }; // Clean white secondary
        newBorderRadius = 0.25;
        newShadowSize = 1;
      } else if (prompt.toLowerCase().includes('playful') || prompt.toLowerCase().includes('fun')) {
        newColors[2] = { ...newColors[2], hue: 340, saturation: 90, lightness: 65, value: 'hsl(340, 90%, 65%)' }; // Pink primary
        newColors[4] = { ...newColors[4], hue: 180, saturation: 70, lightness: 90, value: 'hsl(180, 70%, 90%)' }; // Teal secondary
        newFontFamily = 'Poppins, sans-serif';
        newBorderRadius = 1.5;
        newShadowSize = 4;
      }
      
      setThemeVariables(prev => ({
        ...prev,
        colors: newColors,
        borderRadius: prompt.toLowerCase().includes('sharp') ? 0.25 : prompt.toLowerCase().includes('round') ? 1.5 : newBorderRadius,
        fontFamily: newFontFamily,
        shadowSize: newShadowSize
      }));
      
      // Generate some design suggestions
      setSuggestions([
        {
          id: '1',
          title: 'Increase contrast',
          description: 'The primary color could have better contrast with the background for improved accessibility.',
          preview: 'Adjust lightness of primary color',
          applied: false
        },
        {
          id: '2',
          title: 'Complementary accent',
          description: 'Consider using a complementary color for your accent to create visual interest.',
          preview: 'Add complementary accent color',
          applied: false
        },
        {
          id: '3',
          title: 'Adjust border radius',
          description: 'The current theme might look better with slightly more rounded corners.',
          preview: 'Increase border radius to 1rem',
          applied: false
        }
      ]);
      
      generateThemeCode();
      setIsGenerating(false);
      setSelectedPreset(null); // Reset preset selection
      toast.success("Theme generated successfully!");
    }, 1500);
  }, [themeVariables]);
  
  const applySuggestion = useCallback((id: string) => {
    setSuggestions(prev => prev.map(s => 
      s.id === id ? { ...s, applied: true } : s
    ));
    
    // Apply the suggestion changes to the theme
    switch (id) {
      case '1': // Increase contrast
        updateColor(2, 'lightness', 50); // Adjust primary color
        toast.success("Applied contrast improvement");
        break;
      case '2': // Complementary accent
        const primaryHue = themeVariables.colors[2].hue;
        const complementaryHue = (primaryHue + 180) % 360;
        setThemeVariables(prev => {
          const newColors = [...prev.colors];
          const accentIndex = newColors.findIndex(c => c.variable === '--accent');
          if (accentIndex >= 0) {
            newColors[accentIndex] = {
              ...newColors[accentIndex],
              hue: complementaryHue,
              saturation: 80,
              lightness: 75,
              value: `hsl(${complementaryHue}, 80%, 75%)`
            };
          }
          return { ...prev, colors: newColors };
        });
        toast.success("Applied complementary accent");
        break;
      case '3': // Adjust border radius
        updateBorderRadius(1);
        toast.success("Applied border radius adjustment");
        break;
    }
  }, [themeVariables, updateColor, updateBorderRadius]);
  
  const generateThemeCode = useCallback(() => {
    const code = `/**
 * Your Custom shadcn/ui Theme
 * Generated with ThemeStudio
 */

@layer base {
  :root {
${themeVariables.colors.map(color => `    ${color.variable}: ${color.hue} ${color.saturation}% ${color.lightness}%;`).join('\n')}
    --radius: ${themeVariables.borderRadius}rem;
    --font-size-factor: ${themeVariables.fontSize};
    --font-weight: ${themeVariables.fontWeight};
    --line-height: ${themeVariables.lineHeight};
    --shadow-size: ${themeVariables.shadowSize};
  }

  .dark {
    /* Dark mode values - adjust as needed */
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* ... other dark mode values ... */
  }
}

/* Update your tailwind.config.js */
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['${themeVariables.fontFamily}'],
      },
      fontSize: {
        xs: 'calc(0.75rem * var(--font-size-factor))',
        sm: 'calc(0.875rem * var(--font-size-factor))',
        base: 'calc(1rem * var(--font-size-factor))',
        lg: 'calc(1.125rem * var(--font-size-factor))',
        xl: 'calc(1.25rem * var(--font-size-factor))',
        '2xl': 'calc(1.5rem * var(--font-size-factor))',
        // Add more as needed
      },
      boxShadow: {
        'custom-sm': '0 1px calc(2px * var(--shadow-size)) 0 rgba(0, 0, 0, 0.05)',
        'custom-md': '0 4px calc(6px * var(--shadow-size)) -1px rgba(0, 0, 0, 0.1), 0 2px calc(4px * var(--shadow-size)) -1px rgba(0, 0, 0, 0.06)',
        'custom-lg': '0 10px calc(15px * var(--shadow-size)) -3px rgba(0, 0, 0, 0.1), 0 4px calc(6px * var(--shadow-size)) -2px rgba(0, 0, 0, 0.05)',
      },
      lineHeight: {
        tight: 'calc(1.25 * var(--line-height))',
        snug: 'calc(1.375 * var(--line-height))',
        normal: 'calc(1.5 * var(--line-height))',
        relaxed: 'calc(1.625 * var(--line-height))',
        loose: 'calc(2 * var(--line-height))',
      },
    },
  },
}`;
    
    setThemeCode(code);
  }, [themeVariables]);
  
  // Apply theme whenever it changes
  useEffect(() => {
    applyThemeToDOM();
    generateThemeCode();
  }, [themeVariables, isDarkMode, applyThemeToDOM, generateThemeCode]);
  
  // Initialize with default theme
  useEffect(() => {
    applyThemeToDOM();
    generateThemeCode();
  }, []);
  
  return {
    themeVariables,
    isDarkMode,
    toggleDarkMode,
    updateColor,
    updateBorderRadius,
    updateFontFamily,
    updateFontSize,
    updateFontWeight,
    updateLineHeight,
    updateShadowSize,
    generateFromPrompt,
    suggestions,
    applySuggestion,
    themeCode,
    isGenerating,
    applyPreset,
    selectedPreset,
    presets: Object.keys(themePresets),
  };
};
