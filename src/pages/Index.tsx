
import React, { useState, useEffect } from 'react';
import { useThemeCustomizer } from '@/hooks/useThemeCustomizer';
import { useEnhancedDesignGenerator } from '@/hooks/useEnhancedDesignGenerator';
import ThemeCustomizer from '@/components/ThemeCustomizer';
import ComponentPreview from '@/components/ComponentPreview';
import ComponentEditor from '@/components/ComponentEditor';
import Navbar from '@/components/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Palette, Code, Layout, Lightbulb, ImageIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Index = () => {
  const { 
    isDarkMode, 
    toggleDarkMode, 
    generatedComponent,
    isGenerating: isThemeGenerating,
    generateFromPrompt
  } = useThemeCustomizer();
  
  const {
    generateComponent,
    isGenerating: isEnhancedGenerating,
    generationResult,
    generationError
  } = useEnhancedDesignGenerator();
  
  const [activeTab, setActiveTab] = useState<string>("customize");
  const [isAnyGenerating, setIsAnyGenerating] = useState(false);

  // Combine the generation status from both systems
  useEffect(() => {
    setIsAnyGenerating(isThemeGenerating || isEnhancedGenerating);
  }, [isThemeGenerating, isEnhancedGenerating]);

  // Handle component generation with the enhanced workflow
  const handleGenerateComponent = async (prompt: string, inspirations: string[] = [], options: any = {}) => {
    const result = await generateComponent(prompt, inspirations, options);
    
    if (result) {
      // Also update the theme customizer with the generated component
      // This ensures backward compatibility with the existing system
      generateFromPrompt(prompt, inspirations, options);
      setActiveTab("component");
    }
  };

  const handleDownloadComponent = () => {
    // Create a blob with the component code
    if (generatedComponent) {
      const blob = new Blob([generatedComponent.code], { type: 'text/javascript' });
      const url = URL.createObjectURL(blob);
      
      // Create a temporary link and trigger download
      const a = document.createElement('a');
      a.href = url;
      a.download = 'GeneratedComponent.jsx';
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  };

  const handleCopyComponentCode = () => {
    if (generatedComponent) {
      navigator.clipboard.writeText(generatedComponent.code);
      // Toast notification handled by ComponentEditor
    }
  };

  const handleCustomizeComponent = () => {
    setActiveTab("customize");
  };

  return (
    <div className={`min-h-screen bg-background ${isDarkMode ? 'dark' : ''}`}>
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="container pt-20 pb-16">
        <div className="flex flex-col gap-8">
          <section className="text-center max-w-3xl mx-auto animate-fade-in">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              <span className="text-gradient">Component Studio</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Create stunning, unique UI components with advanced AI assistance. Customize every aspect and export your code.
            </p>
          </section>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full max-w-md mx-auto mb-8">
              <TabsTrigger value="customize" className="flex items-center gap-2 flex-1">
                <Palette className="h-4 w-4" /> Customize
              </TabsTrigger>
              {generatedComponent && (
                <TabsTrigger value="component" className="flex items-center gap-2 flex-1">
                  <Layout className="h-4 w-4" /> Component
                </TabsTrigger>
              )}
              {generationResult && (
                <TabsTrigger value="inspirations" className="flex items-center gap-2 flex-1">
                  <ImageIcon className="h-4 w-4" /> Inspirations
                </TabsTrigger>
              )}
              <TabsTrigger value="code" className="flex items-center gap-2 flex-1">
                <Code className="h-4 w-4" /> Code
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="customize" className="animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ThemeCustomizer onGenerateTheme={handleGenerateComponent} isGenerating={isAnyGenerating} />
                
                <div className="glass-card p-6 w-full h-full flex flex-col">
                  <h2 className="text-xl font-bold mb-4">Live Preview</h2>
                  <div className="flex-1 overflow-hidden">
                    <ComponentPreview isDarkMode={isDarkMode} />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="component" className="animate-fade-in">
              {generatedComponent && (
                <ComponentEditor 
                  componentCode={generatedComponent.code}
                  componentPreview={generatedComponent.preview}
                  onDownload={handleDownloadComponent}
                  onCopy={handleCopyComponentCode}
                  onCustomize={handleCustomizeComponent}
                />
              )}
            </TabsContent>
            
            <TabsContent value="inspirations" className="animate-fade-in">
              {generationResult && (
                <div className="glass-card p-6 w-full">
                  <h2 className="text-xl font-bold mb-4">Design Inspiration Analysis</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                        <Palette className="h-4 w-4" /> Color Palette
                      </h3>
                      <div className="flex gap-2 flex-wrap">
                        {generationResult.designAnalysis.colorPalette.map((color, index) => (
                          <div
                            key={index}
                            className="w-12 h-12 rounded-md border"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                        <Layout className="h-4 w-4" /> Layout Structure
                      </h3>
                      <p className="text-muted-foreground">
                        {generationResult.designAnalysis.layoutStructure}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                        <ImageIcon className="h-4 w-4" /> Typography
                      </h3>
                      <p className="text-muted-foreground">
                        {generationResult.designAnalysis.typographySystem}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                        <Lightbulb className="h-4 w-4" /> Design Patterns
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {generationResult.designAnalysis.designPatterns.map((pattern, index) => (
                          <span key={index} className="px-3 py-1 bg-secondary rounded-full text-sm">
                            {pattern}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="code" className="animate-fade-in">
              <div className="glass-card p-6 w-full">
                <h2 className="text-xl font-bold mb-4">Generated Code</h2>
                
                {generationError && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertTitle>Error generating component</AlertTitle>
                    <AlertDescription>{generationError}</AlertDescription>
                  </Alert>
                )}
                
                <div className="bg-muted/30 p-4 rounded-md overflow-x-auto">
                  <pre className="text-xs">
                    <code>{generatedComponent ? generatedComponent.code : "Generate a component to see code"}</code>
                  </pre>
                </div>
                
                {generationResult && generationResult.styleCode && (
                  <>
                    <h3 className="text-lg font-medium mt-6 mb-2">CSS/Styles</h3>
                    <div className="bg-muted/30 p-4 rounded-md overflow-x-auto">
                      <pre className="text-xs">
                        <code>{generationResult.styleCode}</code>
                      </pre>
                    </div>
                  </>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <footer className="border-t border-border py-6 mt-12">
        <div className="container text-center text-sm text-muted-foreground">
          <p>Component Studio — Create unique, AI-assisted UI components with ease.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
