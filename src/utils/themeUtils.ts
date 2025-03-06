/**
 * Utility functions for theme generation and manipulation
 */

export type ThemeStyle = 'modern' | 'playful' | 'elegant' | 'minimal' | 'tech';

export const generateThemeFromKeywords = (keywords: string[]): Record<string, string> => {
  const themeColors: Record<string, string> = {};
  
  // Detect theme style from keywords
  let style: ThemeStyle = 'modern';
  
  if (keywords.some(k => ['playful', 'fun', 'vibrant', 'colorful', 'lively'].includes(k))) {
    style = 'playful';
  } else if (keywords.some(k => ['elegant', 'luxury', 'premium', 'sophisticated'].includes(k))) {
    style = 'elegant';
  } else if (keywords.some(k => ['minimal', 'clean', 'simple', 'light'].includes(k))) {
    style = 'minimal';
  } else if (keywords.some(k => ['tech', 'modern', 'digital', 'futuristic'].includes(k))) {
    style = 'tech';
  }
  
  // Base colors for each style
  switch (style) {
    case 'playful':
      themeColors['--primary'] = '340 82% 52%'; // Vibrant pink
      themeColors['--secondary'] = '160 84% 39%'; // Green
      themeColors['--accent'] = '43 96% 58%'; // Yellow
      themeColors['--radius'] = '1rem';
      break;
    case 'elegant':
      themeColors['--primary'] = '225 73% 57%'; // Royal blue
      themeColors['--secondary'] = '320 20% 90%'; // Soft pink
      themeColors['--accent'] = '32 100% 50%'; // Gold
      themeColors['--radius'] = '0.5rem';
      break;
    case 'minimal':
      themeColors['--primary'] = '220 14% 36%'; // Muted blue-gray
      themeColors['--secondary'] = '220 14% 96%'; // Light gray
      themeColors['--accent'] = '220 14% 75%'; // Mid gray
      themeColors['--radius'] = '0.25rem';
      break;
    case 'tech':
      themeColors['--primary'] = '236 73% 59%'; // Electric blue
      themeColors['--secondary'] = '240 10% 3.9%'; // Almost black
      themeColors['--accent'] = '142 71% 45%'; // Bright green
      themeColors['--radius'] = '0.375rem';
      break;
    default: // modern
      themeColors['--primary'] = '221.2 83% 53.9%'; // Blue
      themeColors['--secondary'] = '210 40% 96.1%'; // Light gray-blue
      themeColors['--accent'] = '262.1 83.3% 57.8%'; // Purple
      themeColors['--radius'] = '0.75rem';
      break;
  }
  
  return themeColors;
};

export const contrastCheck = (backgroundColor: string, textColor: string): boolean => {
  // This is a simplified version - a real implementation would parse the HSL values and calculate actual contrast
  return true;
};

export const generateThemeCode = (variables: Record<string, string>): string => {
  return `@layer base {
  :root {
${Object.entries(variables).map(([key, value]) => `    ${key}: ${value};`).join('\n')}
  }
}`;
};

export const harmonizeColors = (primaryColor: string): Record<string, string> => {
  // In a real implementation, this would generate harmonious color schemes
  // based on color theory (complementary, analogous, etc.)
  return {
    primary: primaryColor,
    // Other colors would be calculated based on the primary
  };
};
