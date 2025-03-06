
import React, { useState } from 'react';
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeColor } from '@/hooks/useThemeCustomizer';

interface ColorPickerProps {
  color: ThemeColor;
  onUpdateColor: (property: keyof ThemeColor, value: number) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onUpdateColor }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSliderChange = (property: keyof ThemeColor, value: number[]) => {
    onUpdateColor(property, value[0]);
  };

  return (
    <div className="mb-4">
      <div 
        className="flex items-center justify-between mb-2 cursor-pointer" 
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Label className="text-sm font-medium flex items-center gap-2">
          <div 
            className="w-5 h-5 rounded shadow-sm border border-border"
            style={{ background: color.value }}
          />
          {color.name}
        </Label>
        <div className="text-xs text-muted-foreground">
          {color.value}
        </div>
      </div>

      <div className={`${isExpanded ? 'animate-fade-in' : 'hidden'} mt-2`}>
        <Card className="glass-card p-2">
          <CardContent className="p-2 space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <Label htmlFor={`${color.variable}-hue`} className="text-xs">
                  Hue
                </Label>
                <span className="text-xs text-muted-foreground">{color.hue}</span>
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ColorPicker;
