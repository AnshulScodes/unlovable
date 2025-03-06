
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Library, Check } from "lucide-react";

interface PresetSelectorProps {
  presets: string[];
  selectedPreset: string | null;
  onSelectPreset: (preset: string) => void;
}

const PresetSelector: React.FC<PresetSelectorProps> = ({ presets, selectedPreset, onSelectPreset }) => {
  // Preset descriptions - these would normally come from your data source
  const presetDescriptions: Record<string, { description: string, primaryColor: string }> = {
    default: { 
      description: "The classic shadcn/ui theme with a clean, balanced design suitable for most applications.", 
      primaryColor: "hsl(221.2, 83%, 53.9%)" 
    },
    minimal: { 
      description: "A subtle, understated theme with reduced visual elements for a distraction-free experience.", 
      primaryColor: "hsl(220, 30%, 50%)" 
    },
    colorful: { 
      description: "A vibrant, bold theme with playful colors and rounded corners for a friendly feel.", 
      primaryColor: "hsl(280, 80%, 55%)" 
    },
    corporate: { 
      description: "A professional, business-oriented theme with clean lines and a serious tone.", 
      primaryColor: "hsl(210, 70%, 40%)" 
    },
    playful: { 
      description: "An energetic design with playful shapes and colors, ideal for creative applications.", 
      primaryColor: "hsl(340, 90%, 65%)" 
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Library className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-medium">Theme Presets</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        Start with a preset theme as your foundation, then customize it to make it your own. Each preset offers a unique style that you can build upon.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {presets.map((preset) => {
          const presetInfo = presetDescriptions[preset] || { 
            description: "A custom theme preset.", 
            primaryColor: "hsl(221.2, 83%, 53.9%)" 
          };
          
          return (
            <Card 
              key={preset} 
              className={`overflow-hidden transition-all ${selectedPreset === preset ? 'ring-2 ring-primary' : 'hover:shadow-md'}`}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base capitalize">{preset}</CardTitle>
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
                      borderRadius: preset === "colorful" ? "0.75rem" : preset === "minimal" ? "0.25rem" : "0.5rem"
                    }}
                  >
                    <div className="w-16 h-6 rounded-md" style={{ backgroundColor: presetInfo.primaryColor }}></div>
                    <div className="w-16 h-6 rounded-md bg-secondary"></div>
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
        })}
      </div>
    </div>
  );
};

export default PresetSelector;
