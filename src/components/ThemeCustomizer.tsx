
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Paintbrush, Moon, Sun, Sliders, Code, Sparkles, EyeIcon, Library, Type, Palette, Box, Layers } from "lucide-react";
import ColorPicker from './ColorPicker';
import AIPromptInput from './AIPromptInput';
import { useThemeCustomizer } from '@/hooks/useThemeCustomizer';
import ThemeCodeDisplay from './ThemeCodeDisplay';
import DesignSuggestions from './DesignSuggestions';
import PresetSelector from './PresetSelector';
import EnhancedDesignInspirationsDisplay from './EnhancedDesignInspirationsDisplay';

interface ThemeCustomizerProps {
  onGenerateTheme?: (prompt: string, inspirations?: string[], options?: any) => void;
  isGenerating?: boolean;
}

const ThemeCustomizer: React.FC<ThemeCustomizerProps> = ({ 
  onGenerateTheme,
  isGenerating = false
}) => {
  const {
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
    isGenerating: isThemeGenerating,
    applyPreset,
    selectedPreset,
    presets
  } = useThemeCustomizer();
  
  const [activeTab, setActiveTab] = useState("manual");
  const [activeSection, setActiveSection] = useState<string>("colors");
  
  const fontOptions = [
    { value: 'Inter, sans-serif', label: 'Inter (Sans-serif)' },
    { value: 'Roboto, sans-serif', label: 'Roboto (Sans-serif)' },
    { value: 'Poppins, sans-serif', label: 'Poppins (Sans-serif)' },
    { value: 'Playfair Display, serif', label: 'Playfair Display (Serif)' },
    { value: 'JetBrains Mono, monospace', label: 'JetBrains Mono (Monospace)' },
  ];

  const handleGenerateTheme = (prompt: string, inspirations?: string[], options?: any) => {
    if (onGenerateTheme) {
      onGenerateTheme(prompt, inspirations, options);
    } else {
      generateFromPrompt(prompt, inspirations, options);
    }
  };

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
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="presets" className="flex items-center gap-2">
              <Library className="h-4 w-4" /> Presets
            </TabsTrigger>
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
            <TabsContent value="presets" className="animate-fade-in">
              <PresetSelector 
                presets={presets} 
                selectedPreset={selectedPreset} 
                onSelectPreset={applyPreset} 
              />
            </TabsContent>
            
            <TabsContent value="manual" className="animate-fade-in">
              <div className="flex flex-col space-y-6">
                {/* Section tabs */}
                <div className="flex overflow-x-auto pb-2 scrollbar-hide">
                  <div className="flex space-x-2">
                    <Button 
                      variant={activeSection === "colors" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setActiveSection("colors")}
                      className="flex items-center gap-1.5"
                    >
                      <Palette className="h-3.5 w-3.5" /> Colors
                    </Button>
                    <Button 
                      variant={activeSection === "typography" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setActiveSection("typography")}
                      className="flex items-center gap-1.5"
                    >
                      <Type className="h-3.5 w-3.5" /> Typography
                    </Button>
                    <Button 
                      variant={activeSection === "spacing" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setActiveSection("spacing")}
                      className="flex items-center gap-1.5"
                    >
                      <Layers className="h-3.5 w-3.5" /> Layout
                    </Button>
                    <Button 
                      variant={activeSection === "effects" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setActiveSection("effects")}
                      className="flex items-center gap-1.5"
                    >
                      <Box className="h-3.5 w-3.5" /> Effects
                    </Button>
                  </div>
                </div>
                
                {/* Colors section */}
                {activeSection === "colors" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                      <Paintbrush className="h-4 w-4" /> Theme Colors
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
                )}
                
                {/* Typography section */}
                {activeSection === "typography" && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium mb-4">Typography</h3>
                    
                    <div className="space-y-4">
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
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="font-size">Font Size Scale</Label>
                          <span className="text-sm text-muted-foreground">
                            {themeVariables.fontSize.toFixed(1)}x
                          </span>
                        </div>
                        <Slider
                          id="font-size"
                          min={0.8}
                          max={1.5}
                          step={0.05}
                          value={[themeVariables.fontSize]}
                          onValueChange={(value) => updateFontSize(value[0])}
                        />
                        <div className="pt-2 space-y-1">
                          <div className="font-semibold" style={{fontSize: `calc(1.25rem * ${themeVariables.fontSize})`}}>Heading Sample</div>
                          <div style={{fontSize: `calc(1rem * ${themeVariables.fontSize})`}}>This is how your body text will look</div>
                          <div className="text-muted-foreground" style={{fontSize: `calc(0.875rem * ${themeVariables.fontSize})`}}>Small caption text</div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="font-weight">Base Font Weight</Label>
                          <span className="text-sm text-muted-foreground">
                            {themeVariables.fontWeight}
                          </span>
                        </div>
                        <Slider
                          id="font-weight"
                          min={300}
                          max={500}
                          step={100}
                          value={[themeVariables.fontWeight]}
                          onValueChange={(value) => updateFontWeight(value[0])}
                        />
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="line-height">Line Height Scale</Label>
                          <span className="text-sm text-muted-foreground">
                            {themeVariables.lineHeight.toFixed(1)}x
                          </span>
                        </div>
                        <Slider
                          id="line-height"
                          min={1.0}
                          max={2.0}
                          step={0.1}
                          value={[themeVariables.lineHeight]}
                          onValueChange={(value) => updateLineHeight(value[0])}
                        />
                        <div className="pt-2 space-y-1 max-w-md">
                          <p className="text-sm" style={{lineHeight: themeVariables.lineHeight}}>
                            This paragraph demonstrates the line height setting. 
                            Proper line spacing improves readability and gives your text room to breathe. 
                            Adjust the slider to find the perfect balance for your design.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Layout & spacing section */}
                {activeSection === "spacing" && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium mb-4">Layout & Spacing</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="border-radius">Border Radius (rem)</Label>
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
                      <div className="pt-2 flex gap-2">
                        <div 
                          className="w-16 h-16 border border-border bg-primary/10" 
                          style={{borderRadius: `${themeVariables.borderRadius}rem`}}
                        ></div>
                        <div 
                          className="w-16 h-16 border border-border bg-secondary/40" 
                          style={{borderRadius: `calc(${themeVariables.borderRadius}rem - 2px)`}}
                        ></div>
                        <div 
                          className="w-16 h-16 border border-border bg-muted" 
                          style={{borderRadius: `calc(${themeVariables.borderRadius}rem - 4px)`}}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Effects section */}
                {activeSection === "effects" && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium mb-4">Visual Effects</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="shadow-size">Shadow Intensity</Label>
                        <span className="text-sm text-muted-foreground">
                          {themeVariables.shadowSize}x
                        </span>
                      </div>
                      <Slider
                        id="shadow-size"
                        min={0}
                        max={5}
                        step={0.5}
                        value={[themeVariables.shadowSize]}
                        onValueChange={(value) => updateShadowSize(value[0])}
                      />
                      <div className="pt-4 flex gap-6 items-center justify-center">
                        <div 
                          className="w-20 h-20 bg-card rounded-md flex items-center justify-center text-sm" 
                          style={{boxShadow: `0 1px ${2 * themeVariables.shadowSize}px 0 rgba(0, 0, 0, 0.05)`}}
                        >
                          Small
                        </div>
                        <div 
                          className="w-24 h-24 bg-card rounded-md flex items-center justify-center text-sm" 
                          style={{boxShadow: `0 4px ${6 * themeVariables.shadowSize}px -1px rgba(0, 0, 0, 0.1), 0 2px ${4 * themeVariables.shadowSize}px -1px rgba(0, 0, 0, 0.06)`}}
                        >
                          Medium
                        </div>
                        <div 
                          className="w-28 h-28 bg-card rounded-md flex items-center justify-center text-sm" 
                          style={{boxShadow: `0 10px ${15 * themeVariables.shadowSize}px -3px rgba(0, 0, 0, 0.1), 0 4px ${6 * themeVariables.shadowSize}px -2px rgba(0, 0, 0, 0.05)`}}
                        >
                          Large
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <DesignSuggestions 
                  suggestions={suggestions} 
                  onApplySuggestion={applySuggestion} 
                />
              </div>
            </TabsContent>
            
            <TabsContent value="ai" className="animate-fade-in">
              <AIPromptInput 
                onGenerateTheme={handleGenerateTheme} 
                isGenerating={isGenerating || isThemeGenerating} 
              />
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
