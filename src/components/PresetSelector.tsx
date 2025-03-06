
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Library, Check, Layout } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PresetSelectorProps {
  presets: string[];
  selectedPreset: string | null;
  onSelectPreset: (preset: string) => void;
}

const PresetSelector: React.FC<PresetSelectorProps> = ({ presets, selectedPreset, onSelectPreset }) => {
  // Preset descriptions - these would normally come from your data source
  const presetDescriptions: Record<string, { description: string, primaryColor: string, category: 'standard' | 'specialty' | 'experimental' }> = {
    default: { 
      description: "The classic shadcn/ui theme with a clean, balanced design suitable for most applications.", 
      primaryColor: "hsl(221.2, 83%, 53.9%)",
      category: 'standard'
    },
    minimal: { 
      description: "A subtle, understated theme with reduced visual elements for a distraction-free experience.", 
      primaryColor: "hsl(220, 30%, 50%)",
      category: 'standard'
    },
    colorful: { 
      description: "A vibrant, bold theme with playful colors and rounded corners for a friendly feel.", 
      primaryColor: "hsl(280, 80%, 55%)",
      category: 'standard'
    },
    corporate: { 
      description: "A professional, business-oriented theme with clean lines and a serious tone.", 
      primaryColor: "hsl(210, 70%, 40%)",
      category: 'standard'
    },
    playful: { 
      description: "An energetic design with playful shapes and colors, ideal for creative applications.", 
      primaryColor: "hsl(340, 90%, 65%)",
      category: 'standard'
    },
    // Specialty themes with more unique visual identities
    neobrutalist: {
      description: "Bold, high-contrast design with thick borders, raw elements, and an intentionally unrefined look.",
      primaryColor: "hsl(0, 100%, 60%)",
      category: 'specialty'
    },
    glassmorphic: {
      description: "Modern UI with frosted glass effect, subtle transparency, and soft glow accents.",
      primaryColor: "hsl(200, 70%, 60%)",
      category: 'specialty'
    },
    neumorphic: {
      description: "Soft UI with subtle shadows and highlights creating a pressed effect on light backgrounds.",
      primaryColor: "hsl(220, 15%, 55%)",
      category: 'specialty'
    },
    retro: {
      description: "Vintage computing aesthetic with pixelated elements, bright colors, and blocky layout.",
      primaryColor: "hsl(130, 90%, 40%)",
      category: 'specialty'
    },
    cyberpunk: {
      description: "Futuristic high-tech design with neon colors, glitch effects, and dark backgrounds.",
      primaryColor: "hsl(300, 100%, 60%)",
      category: 'specialty'
    },
    // Experimental themes that push boundaries
    "y2k-nostalgia": {
      description: "Early 2000s web aesthetic with bubble elements, chrome effects, and iridescent gradients.",
      primaryColor: "hsl(270, 80%, 70%)",
      category: 'experimental'
    },
    "liquid": {
      description: "Organic flowing design with blob shapes, liquid animations, and smooth color transitions.",
      primaryColor: "hsl(190, 90%, 50%)",
      category: 'experimental'
    },
    "terminal": {
      description: "Command-line interface inspired design with monospace fonts, scan lines, and minimal colors.",
      primaryColor: "hsl(120, 100%, 50%)",
      category: 'experimental'
    }
  };

  const [presetCategory, setPresetCategory] = React.useState<'standard' | 'specialty' | 'experimental'>('standard');

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Library className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-medium">Component Presets</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Choose a preset to use as your starting point, then customize it to create unique components that stand out from standard shadcn/ui designs.
      </p>
      
      <Tabs defaultValue="standard" onValueChange={(value) => setPresetCategory(value as any)}>
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="standard">Standard</TabsTrigger>
          <TabsTrigger value="specialty">Specialty</TabsTrigger>
          <TabsTrigger value="experimental">Experimental</TabsTrigger>
        </TabsList>
        
        <TabsContent value="standard" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {presets.filter(preset => presetDescriptions[preset]?.category === 'standard').map((preset) => renderPresetCard(preset))}
          </div>
        </TabsContent>
        
        <TabsContent value="specialty" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {presets.filter(preset => presetDescriptions[preset]?.category === 'specialty').map((preset) => renderPresetCard(preset))}
          </div>
        </TabsContent>
        
        <TabsContent value="experimental" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {presets.filter(preset => presetDescriptions[preset]?.category === 'experimental').map((preset) => renderPresetCard(preset))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
  
  function renderPresetCard(preset: string) {
    const presetInfo = presetDescriptions[preset] || { 
      description: "A custom theme preset.", 
      primaryColor: "hsl(221.2, 83%, 53.9%)",
      category: 'standard'
    };
    
    return (
      <Card 
        key={preset} 
        className={`overflow-hidden transition-all ${selectedPreset === preset ? 'ring-2 ring-primary' : 'hover:shadow-md'}`}
      >
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base capitalize">{preset.replace(/-/g, ' ')}</CardTitle>
            {selectedPreset === preset && (
              <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                <Check className="h-3 w-3 mr-1" /> Active
              </Badge>
            )}
          </div>
          <CardDescription>{presetInfo.description}</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="px-6 py-3">
            <div className="flex gap-2 mb-3">
              <div className="w-8 h-8 rounded-full" style={{ backgroundColor: presetInfo.primaryColor }}></div>
              <div className="w-8 h-8 rounded-full bg-secondary"></div>
              <div className="w-8 h-8 rounded-full bg-muted"></div>
              <div className="w-8 h-8 rounded-full bg-accent"></div>
            </div>
            <div 
              className="w-full h-12 rounded border border-border flex items-center justify-center gap-2"
              style={{ 
                backgroundColor: preset === "default" ? "white" : "var(--card)",
                borderRadius: getPresetBorderRadius(preset),
                boxShadow: getPresetShadow(preset),
                borderWidth: preset === "neobrutalist" ? "3px" : "1px",
                overflow: "hidden"
              }}
            >
              <Layout className="w-4 h-4 text-muted-foreground" />
              <div 
                className="w-16 h-6 rounded-md" 
                style={{ 
                  backgroundColor: presetInfo.primaryColor,
                  borderRadius: getPresetElementBorderRadius(preset)
                }}
              ></div>
              <div 
                className="w-16 h-6 rounded-md bg-secondary"
                style={{ 
                  borderRadius: getPresetElementBorderRadius(preset)
                }}
              ></div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-2">
          <Button
            variant={selectedPreset === preset ? "secondary" : "default"}
            size="sm"
            className="w-full"
            onClick={() => onSelectPreset(preset)}
          >
            {selectedPreset === preset ? "Active" : "Apply Preset"}
          </Button>
        </CardFooter>
      </Card>
    );
  }
  
  function getPresetBorderRadius(preset: string): string {
    switch (preset) {
      case "neobrutalist": return "0";
      case "neumorphic": return "16px";
      case "colorful": return "0.75rem";
      case "minimal": return "0.25rem";
      case "playful": return "1rem";
      case "y2k-nostalgia": return "25px";
      case "cyberpunk": return "2px";
      case "terminal": return "0";
      case "liquid": return "30% 70% 70% 30% / 30% 30% 70% 70%";
      default: return "0.5rem";
    }
  }
  
  function getPresetElementBorderRadius(preset: string): string {
    switch (preset) {
      case "neobrutalist": return "0";
      case "neumorphic": return "8px";
      case "colorful": return "0.5rem";
      case "minimal": return "0.125rem";
      case "playful": return "0.75rem";
      case "y2k-nostalgia": return "18px";
      case "cyberpunk": return "0";
      case "terminal": return "0";
      case "liquid": return "60% 40% 30% 70% / 60% 30% 70% 40%";
      default: return "0.25rem";
    }
  }
  
  function getPresetShadow(preset: string): string {
    switch (preset) {
      case "neobrutalist": return "5px 5px 0px 0px black";
      case "neumorphic": return "5px 5px 10px rgba(0,0,0,0.1), -5px -5px 10px rgba(255,255,255,0.8)";
      case "glassmorphic": return "0 4px 30px rgba(0, 0, 0, 0.1)";
      case "cyberpunk": return "0 0 5px 2px rgba(0, 255, 255, 0.7)";
      case "y2k-nostalgia": return "0 0 15px rgba(255, 255, 255, 0.5)";
      case "terminal": return "0 0 10px rgba(0, 255, 0, 0.5)";
      default: return "none";
    }
  }
};

export default PresetSelector;
