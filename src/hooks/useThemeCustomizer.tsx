
import { useState, useCallback, useEffect } from 'react';

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
  ],
  borderRadius: 0.75,
  fontFamily: 'Inter, sans-serif',
};

export const useThemeCustomizer = () => {
  const [themeVariables, setThemeVariables] = useState<ThemeVariables>(defaultThemeVariables);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [suggestions, setSuggestions] = useState<ThemeSuggestion[]>([]);
  const [themeCode, setThemeCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
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
    
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [themeVariables, isDarkMode]);
  
  const generateFromPrompt = useCallback(async (prompt: string) => {
    setIsGenerating(true);
    
    // Simulate AI processing
    setTimeout(() => {
      // Generate a new theme based on the prompt
      // This is a simplified version; in a real implementation, you'd call an API
      const newColors = [...themeVariables.colors];
      
      if (prompt.toLowerCase().includes('warm')) {
        newColors[2] = { ...newColors[2], hue: 25, saturation: 95, lightness: 55, value: 'hsl(25, 95%, 55%)' }; // Primary
        newColors[4] = { ...newColors[4], hue: 35, saturation: 30, lightness: 96, value: 'hsl(35, 30%, 96%)' }; // Secondary
      } else if (prompt.toLowerCase().includes('cool')) {
        newColors[2] = { ...newColors[2], hue: 200, saturation: 98, lightness: 50, value: 'hsl(200, 98%, 50%)' }; // Primary
        newColors[4] = { ...newColors[4], hue: 210, saturation: 30, lightness: 96, value: 'hsl(210, 30%, 96%)' }; // Secondary
      } else if (prompt.toLowerCase().includes('tech') || prompt.toLowerCase().includes('modern')) {
        newColors[2] = { ...newColors[2], hue: 250, saturation: 95, lightness: 60, value: 'hsl(250, 95%, 60%)' }; // Primary
        newColors[4] = { ...newColors[4], hue: 260, saturation: 20, lightness: 96, value: 'hsl(260, 20%, 96%)' }; // Secondary
      } else if (prompt.toLowerCase().includes('earth') || prompt.toLowerCase().includes('nature')) {
        newColors[2] = { ...newColors[2], hue: 130, saturation: 65, lightness: 45, value: 'hsl(130, 65%, 45%)' }; // Primary
        newColors[4] = { ...newColors[4], hue: 100, saturation: 20, lightness: 96, value: 'hsl(100, 20%, 96%)' }; // Secondary
      }
      
      setThemeVariables(prev => ({
        ...prev,
        colors: newColors,
        borderRadius: prompt.toLowerCase().includes('sharp') ? 0.25 : prompt.toLowerCase().includes('round') ? 1.5 : prev.borderRadius,
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
        break;
      case '3': // Adjust border radius
        updateBorderRadius(1);
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
  }

  .dark {
    /* Add your dark mode values here */
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
    generateFromPrompt,
    suggestions,
    applySuggestion,
    themeCode,
    isGenerating,
  };
};
