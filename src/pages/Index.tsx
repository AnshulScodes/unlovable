
import React, { useState } from 'react';
import { useThemeCustomizer } from '@/hooks/useThemeCustomizer';
import ThemeCustomizer from '@/components/ThemeCustomizer';
import ComponentPreview from '@/components/ComponentPreview';
import ComponentEditor from '@/components/ComponentEditor';
import Navbar from '@/components/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Palette, Code, Layout } from "lucide-react";

const Index = () => {
  const { 
    isDarkMode, 
    toggleDarkMode, 
    generatedComponent,
    isGenerating
  } = useThemeCustomizer();
  
  const [activeTab, setActiveTab] = useState<string>("customize");

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
              <TabsTrigger value="code" className="flex items-center gap-2 flex-1">
                <Code className="h-4 w-4" /> Code
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="customize" className="animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ThemeCustomizer />
                
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
            
            <TabsContent value="code" className="animate-fade-in">
              <div className="glass-card p-6 w-full">
                <h2 className="text-xl font-bold mb-4">Theme Code</h2>
                <div className="bg-muted/30 p-4 rounded-md overflow-x-auto">
                  <pre className="text-xs">
                    <code>{generatedComponent ? generatedComponent.code : "Generate a component to see code"}</code>
                  </pre>
                </div>
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
