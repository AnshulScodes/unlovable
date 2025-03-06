import { useState, useCallback, useEffect } from 'react';
import { toast } from "sonner";
import { generateUniqueComponent, fetchDesignInspirations } from '@/services/designGenerationService';

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

export type GeneratedComponent = {
  name: string;
  description: string;
  code: string;
  styleCode: string;
  preview: React.ReactNode;
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

// Enhanced unique presets with different design aesthetics
const themePresets = {
  default: { ...defaultThemeVariables },
  
  neobrutalist: {
    ...defaultThemeVariables,
    borderRadius: 0,
    colors: defaultThemeVariables.colors.map(color => {
      if (color.variable === '--primary') {
        return { ...color, hue: 0, saturation: 100, lightness: 50, value: 'hsl(0, 100%, 50%)' }; // Bright red
      } else if (color.variable === '--secondary') {
        return { ...color, hue: 0, saturation: 0, lightness: 95, value: 'hsl(0, 0%, 95%)' }; // Light gray
      } else if (color.variable === '--border') {
        return { ...color, hue: 0, saturation: 0, lightness: 0, value: 'hsl(0, 0%, 0%)' }; // Black
      }
      return color;
    }),
    fontWeight: 800,
    shadowSize: 0,
  },
  
  glassmorphic: {
    ...defaultThemeVariables,
    borderRadius: 1.5,
    colors: defaultThemeVariables.colors.map(color => {
      if (color.variable === '--background') {
        return { ...color, hue: 210, saturation: 30, lightness: 95, value: 'hsl(210, 30%, 95%)' };
      } else if (color.variable === '--primary') {
        return { ...color, hue: 200, saturation: 80, lightness: 65, value: 'hsl(200, 80%, 65%)' };
      } else if (color.variable === '--secondary') {
        return { ...color, hue: 180, saturation: 50, lightness: 80, value: 'hsl(180, 50%, 80%)' };
      } else if (color.variable === '--border') {
        return { ...color, hue: 210, saturation: 30, lightness: 80, value: 'hsl(210, 30%, 80%)' };
      }
      return color;
    }),
    shadowSize: 4,
  },
  
  neumorphic: {
    ...defaultThemeVariables,
    borderRadius: 1,
    colors: defaultThemeVariables.colors.map(color => {
      if (color.variable === '--background') {
        return { ...color, hue: 210, saturation: 10, lightness: 95, value: 'hsl(210, 10%, 95%)' };
      } else if (color.variable === '--primary') {
        return { ...color, hue: 210, saturation: 60, lightness: 60, value: 'hsl(210, 60%, 60%)' };
      } else if (color.variable === '--secondary') {
        return { ...color, hue: 210, saturation: 20, lightness: 85, value: 'hsl(210, 20%, 85%)' };
      } else if (color.variable === '--border') {
        return { ...color, hue: 210, saturation: 15, lightness: 90, value: 'hsl(210, 15%, 90%)' };
      }
      return color;
    }),
    shadowSize: 3,
  },
  
  y2k: {
    ...defaultThemeVariables,
    borderRadius: 1.25,
    colors: defaultThemeVariables.colors.map(color => {
      if (color.variable === '--background') {
        return { ...color, hue: 280, saturation: 20, lightness: 95, value: 'hsl(280, 20%, 95%)' };
      } else if (color.variable === '--primary') {
        return { ...color, hue: 280, saturation: 75, lightness: 65, value: 'hsl(280, 75%, 65%)' };
      } else if (color.variable === '--secondary') {
        return { ...color, hue: 200, saturation: 100, lightness: 70, value: 'hsl(200, 100%, 70%)' };
      } else if (color.variable === '--accent') {
        return { ...color, hue: 50, saturation: 100, lightness: 70, value: 'hsl(50, 100%, 70%)' };
      } else if (color.variable === '--border') {
        return { ...color, hue: 320, saturation: 80, lightness: 70, value: 'hsl(320, 80%, 70%)' };
      }
      return color;
    }),
    fontFamily: "'Comic Sans MS', cursive",
    shadowSize: 2,
  },
  
  vaporwave: {
    ...defaultThemeVariables,
    borderRadius: 0.5,
    colors: defaultThemeVariables.colors.map(color => {
      if (color.variable === '--background') {
        return { ...color, hue: 260, saturation: 30, lightness: 90, value: 'hsl(260, 30%, 90%)' };
      } else if (color.variable === '--primary') {
        return { ...color, hue: 280, saturation: 70, lightness: 60, value: 'hsl(280, 70%, 60%)' };
      } else if (color.variable === '--secondary') {
        return { ...color, hue: 180, saturation: 100, lightness: 75, value: 'hsl(180, 100%, 75%)' };
      } else if (color.variable === '--accent') {
        return { ...color, hue: 315, saturation: 90, lightness: 70, value: 'hsl(315, 90%, 70%)' };
      }
      return color;
    }),
    fontFamily: "'VT323', monospace",
    shadowSize: 2,
  },
  
  cyberpunk: {
    ...defaultThemeVariables,
    borderRadius: 0,
    colors: defaultThemeVariables.colors.map(color => {
      if (color.variable === '--background') {
        return { ...color, hue: 240, saturation: 20, lightness: 10, value: 'hsl(240, 20%, 10%)' };
      } else if (color.variable === '--foreground') {
        return { ...color, hue: 180, saturation: 100, lightness: 80, value: 'hsl(180, 100%, 80%)' };
      } else if (color.variable === '--primary') {
        return { ...color, hue: 180, saturation: 100, lightness: 50, value: 'hsl(180, 100%, 50%)' };
      } else if (color.variable === '--secondary') {
        return { ...color, hue: 300, saturation: 100, lightness: 50, value: 'hsl(300, 100%, 50%)' };
      } else if (color.variable === '--accent') {
        return { ...color, hue: 60, saturation: 100, lightness: 50, value: 'hsl(60, 100%, 50%)' };
      }
      return color;
    }),
    fontFamily: "'Orbitron', sans-serif",
    fontWeight: 500,
    shadowSize: 3,
  },
  
  claymorphism: {
    ...defaultThemeVariables,
    borderRadius: 2,
    colors: defaultThemeVariables.colors.map(color => {
      if (color.variable === '--background') {
        return { ...color, hue: 0, saturation: 0, lightness: 95, value: 'hsl(0, 0%, 95%)' };
      } else if (color.variable === '--primary') {
        return { ...color, hue: 350, saturation: 80, lightness: 80, value: 'hsl(350, 80%, 80%)' };
      } else if (color.variable === '--secondary') {
        return { ...color, hue: 190, saturation: 70, lightness: 80, value: 'hsl(190, 70%, 80%)' };
      } else if (color.variable === '--border') {
        return { ...color, hue: 0, saturation: 0, lightness: 90, value: 'hsl(0, 0%, 90%)' };
      }
      return color;
    }),
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 600,
    shadowSize: 5,
  },
};

export const useThemeCustomizer = () => {
  const [themeVariables, setThemeVariables] = useState<ThemeVariables>(defaultThemeVariables);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [suggestions, setSuggestions] = useState<ThemeSuggestion[]>([]);
  const [themeCode, setThemeCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [generatedComponent, setGeneratedComponent] = useState<GeneratedComponent | null>(null);
  
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
  
  const generateFromPrompt = useCallback(async (prompt: string, inspirations: string[] = [], options: any = {}) => {
    setIsGenerating(true);
    toast.info("Analyzing prompt and gathering design inspirations...");
    
    try {
      let allInspirations = [...inspirations];
      if (inspirations.length === 0) {
        const keywords = prompt.split(' ')
          .filter(word => word.length > 4)
          .slice(0, 3);
        
        if (keywords.length > 0) {
          const fetchedInspirations = await fetchDesignInspirations(keywords);
          allInspirations = [...allInspirations, ...fetchedInspirations];
        }
      }
      
      const generationOptions = {
        uniquenessLevel: options.uniquenessLevel || 5,
        componentType: options.componentType || 'card',
        designStyle: options.designStyle || '',
        colorScheme: options.colorScheme || '',
        ...options
      };
      
      const result = await generateUniqueComponent(prompt, allInspirations, generationOptions);
      
      setThemeVariables(result.themeVariables);
      
      setGeneratedComponent({
        name: 'Generated Component',
        description: prompt,
        code: result.componentCode,
        styleCode: result.styleCode,
        preview: <div className="component-preview">Component Preview</div>,
      });
      
      generateThemeCode();
      
      setSelectedPreset(null);
      
      toast.success("Unique component created successfully!");
    } catch (error) {
      console.error("Error generating component:", error);
      toast.error("Failed to generate component. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  }, []);
  
  const applySuggestion = useCallback((id: string) => {
    setSuggestions(prev => prev.map(s => 
      s.id === id ? { ...s, applied: true } : s
    ));
    
    switch (id) {
      case '1': // Increase contrast
        updateColor(2, 'lightness', 50);
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
  
  useEffect(() => {
    applyThemeToDOM();
    generateThemeCode();
  }, [themeVariables, isDarkMode, applyThemeToDOM, generateThemeCode]);
  
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
    generatedComponent,
  };
};
