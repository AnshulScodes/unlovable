
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Paintbrush, Moon, Sun, Sliders, Code, Sparkles, EyeIcon } from "lucide-react";
import ColorPicker from './ColorPicker';
import AIPromptInput from './AIPromptInput';
import { useThemeCustomizer } from '@/hooks/useThemeCustomizer';
import ThemeCodeDisplay from './ThemeCodeDisplay';
import DesignSuggestions from './DesignSuggestions';

const ThemeCustomizer: React.FC = () => {
  const {
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
    isGenerating
  } = useThemeCustomizer();
  
  const [activeTab, setActiveTab] = useState("manual");
  
  const fontOptions = [
    { value: 'Inter, sans-serif', label: 'Inter (Sans-serif)' },
    { value: 'Roboto, sans-serif', label: 'Roboto (Sans-serif)' },
    { value: 'Poppins, sans-serif', label: 'Poppins (Sans-serif)' },
    { value: 'Playfair Display, serif', label: 'Playfair Display (Serif)' },
    { value: 'JetBrains Mono, monospace', label: 'JetBrains Mono (Monospace)' },
  ];

  return (
    <Card className="glass-card w-full max-h-screen overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Theme Customizer
          </CardTitle>
          <CardDescription>
            Customize your shadcn/ui theme and see changes in real-time
          </CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <Sun className="h-4 w-4" />
          <Switch 
            checked={isDarkMode} 
            onCheckedChange={toggleDarkMode} 
            aria-label="Toggle dark mode"
          />
          <Moon className="h-4 w-4" />
        </div>
      </CardHeader>
      
      <Separator />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="px-6 pt-2">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="manual" className="flex items-center gap-2">
              <Sliders className="h-4 w-4" /> Manual
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" /> AI Prompt
            </TabsTrigger>
            <TabsTrigger value="code" className="flex items-center gap-2">
              <Code className="h-4 w-4" /> Get Code
            </TabsTrigger>
          </TabsList>
        </div>
          
        <CardContent className="p-0">
          <div className="max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-hide p-6 pt-2">
            <TabsContent value="manual" className="space-y-4 animate-fade-in">
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <PaintBrush className="h-4 w-4" /> Colors
                </h3>
                <div className="space-y-1">
                  {themeVariables.colors.map((color, index) => (
                    <ColorPicker
                      key={color.variable}
                      color={color}
                      onUpdateColor={(property, value) => updateColor(index, property, value)}
                    />
                  ))}
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Border Radius</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="border-radius">Radius (rem)</Label>
                    <span className="text-sm text-muted-foreground">
                      {themeVariables.borderRadius}rem
                    </span>
                  </div>
                  <Slider
                    id="border-radius"
                    min={0}
                    max={2}
                    step={0.05}
                    value={[themeVariables.borderRadius]}
                    onValueChange={(value) => updateBorderRadius(value[0])}
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Typography</h3>
                <div className="space-y-3">
                  <Label htmlFor="font-family">Font Family</Label>
                  <Select 
                    value={themeVariables.fontFamily} 
                    onValueChange={updateFontFamily}
                  >
                    <SelectTrigger id="font-family">
                      <SelectValue placeholder="Select font family" />
                    </SelectTrigger>
                    <SelectContent>
                      {fontOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <DesignSuggestions 
                suggestions={suggestions} 
                onApplySuggestion={applySuggestion} 
              />
            </TabsContent>
            
            <TabsContent value="ai" className="animate-fade-in">
              <AIPromptInput onGenerateTheme={generateFromPrompt} isGenerating={isGenerating} />
            </TabsContent>
            
            <TabsContent value="code" className="animate-fade-in">
              <ThemeCodeDisplay code={themeCode} />
            </TabsContent>
          </div>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default ThemeCustomizer;
