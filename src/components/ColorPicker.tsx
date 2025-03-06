
import React, { useState } from 'react';
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThemeColor } from '@/hooks/useThemeCustomizer';
import { ChevronDown, ChevronUp, RefreshCw, Copy } from 'lucide-react';
import { toast } from "sonner";

interface ColorPickerProps {
  color: ThemeColor;
  onUpdateColor: (property: keyof ThemeColor, value: number) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onUpdateColor }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleSliderChange = (property: keyof ThemeColor, value: number[]) => {
    onUpdateColor(property, value[0]);
  };
  
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  
  const copyColorValue = () => {
    navigator.clipboard.writeText(color.value);
    toast.success(`Color code copied: ${color.value}`);
  };
  
  const resetColor = () => {
    // This would typically reset to the default value
    // For now, we'll just show a toast notification
    toast.info(`Reset functionality would restore default value for ${color.name}`);
  };

  // Calculate a readable contrast color
  const calculateContrastColor = (h: number, s: number, l: number) => {
    return l > 65 ? '#000000' : '#ffffff';
  };
  
  const contrastColor = calculateContrastColor(color.hue, color.saturation, color.lightness);

  return (
    <div className="mb-4">
      <div 
        className="flex items-center justify-between mb-2 cursor-pointer rounded-md hover:bg-muted/50 p-2 transition-colors" 
        onClick={toggleExpanded}
      >
        <Label className="text-sm font-medium flex items-center gap-2">
          <div 
            className="w-6 h-6 rounded shadow-sm border border-border flex items-center justify-center text-[8px]"
            style={{ 
              background: color.value,
              color: contrastColor
            }}
          >
            {color.name.substring(0, 2)}
          </div>
          {color.name}
        </Label>
        <div className="flex items-center gap-2">
          <div className="text-xs text-muted-foreground">
            {color.value}
          </div>
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
      </div>

      <div className={`${isExpanded ? 'animate-fade-in' : 'hidden'} mt-2`}>
        <Card className="glass-card p-2">
          <CardContent className="p-2 space-y-3">
            <div className="flex justify-center mb-3">
              <div 
                className="w-24 h-24 rounded-lg border border-border flex items-center justify-center"
                style={{ 
                  background: color.value,
                  color: contrastColor
                }}
              >
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 rounded-full bg-white/20 hover:bg-white/40"
                    onClick={(e) => {
                      e.stopPropagation();
                      copyColorValue();
                    }}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 rounded-full bg-white/20 hover:bg-white/40"
                    onClick={(e) => {
                      e.stopPropagation();
                      resetColor();
                    }}
                  >
                    <RefreshCw className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
                  
            <div>
              <div className="flex justify-between mb-1">
                <Label htmlFor={`${color.variable}-hue`} className="text-xs">
                  Hue
                </Label>
                <span className="text-xs text-muted-foreground">{color.hue}°</span>
              </div>
              <Slider
                id={`${color.variable}-hue`}
                min={0}
                max={360}
                step={1}
                value={[color.hue]}
                onValueChange={(value) => handleSliderChange('hue', value)}
                className="my-1"
              />
              <div className="h-2 w-full rounded-full bg-gradient-to-r from-[hsl(0,100%,50%)] via-[hsl(60,100%,50%)] via-[hsl(120,100%,50%)] via-[hsl(180,100%,50%)] via-[hsl(240,100%,50%)] via-[hsl(300,100%,50%)] to-[hsl(360,100%,50%)]" />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <Label htmlFor={`${color.variable}-saturation`} className="text-xs">
                  Saturation
                </Label>
                <span className="text-xs text-muted-foreground">{color.saturation}%</span>
              </div>
              <Slider
                id={`${color.variable}-saturation`}
                min={0}
                max={100}
                step={1}
                value={[color.saturation]}
                onValueChange={(value) => handleSliderChange('saturation', value)}
                className="my-1"
              />
              <div 
                className="h-2 w-full rounded-full" 
                style={{
                  background: `linear-gradient(to right, hsl(${color.hue}, 0%, ${color.lightness}%), hsl(${color.hue}, 100%, ${color.lightness}%))`
                }}
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <Label htmlFor={`${color.variable}-lightness`} className="text-xs">
                  Lightness
                </Label>
                <span className="text-xs text-muted-foreground">{color.lightness}%</span>
              </div>
              <Slider
                id={`${color.variable}-lightness`}
                min={0}
                max={100}
                step={1}
                value={[color.lightness]}
                onValueChange={(value) => handleSliderChange('lightness', value)}
                className="my-1"
              />
              <div 
                className="h-2 w-full rounded-full" 
                style={{
                  background: `linear-gradient(to right, hsl(${color.hue}, ${color.saturation}%, 0%), hsl(${color.hue}, ${color.saturation}%, 50%), hsl(${color.hue}, ${color.saturation}%, 100%))`
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ColorPicker;
