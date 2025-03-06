
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Copy, Download, ClipboardCheck, Code } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ThemeCodeDisplayProps {
  code: string;
}

const ThemeCodeDisplay: React.FC<ThemeCodeDisplayProps> = ({ code }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [selectedTab, setSelectedTab] = useState("css");

  // Split the code to get CSS and Tailwind config separately
  const cssCode = code.split('/* Update your tailwind.config.js */')[0].trim();
  const tailwindCode = code.includes('module.exports = {') 
    ? code.split('module.exports = {')[1].split('}')[0].trim()
    : '';

  const handleCopy = (textToCopy: string, type: string) => {
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    toast.success(`${type} code copied to clipboard!`);
    
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([code], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = 'shadcn-theme.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast.success('Theme code downloaded!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Code className="h-4 w-4" /> Generated Theme Code
        </h3>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleCopy(code, 'Theme')}
            className="flex items-center gap-1.5"
          >
            {isCopied ? (
              <>
                <Check className="h-4 w-4" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy All
              </>
            )}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleDownload}
            className="flex items-center gap-1.5"
          >
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="css" value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="css">CSS Variables</TabsTrigger>
          <TabsTrigger value="tailwind">Tailwind Config</TabsTrigger>
        </TabsList>
        
        <TabsContent value="css">
          <Card className="bg-muted/50 border-border overflow-hidden">
            <div className="flex justify-between items-center p-2 bg-muted/80 border-b border-border">
              <div className="text-xs font-mono">globals.css</div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleCopy(cssCode, 'CSS')}
                className="h-7 text-xs"
              >
                <ClipboardCheck className="h-3 w-3 mr-1" />
                Copy
              </Button>
            </div>
            <pre className="p-4 text-sm overflow-x-auto font-mono scrollbar-hide text-left">
              {cssCode}
            </pre>
          </Card>
          
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">How to use:</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
              <li>Copy the CSS variables above to your <code className="bg-muted px-1 py-0.5 rounded text-xs">globals.css</code> file</li>
              <li>Replace the existing <code className="bg-muted px-1 py-0.5 rounded text-xs">:root</code> section with these variables</li>
              <li>Update your dark mode variables as needed following the same pattern</li>
            </ol>
          </div>
        </TabsContent>
        
        <TabsContent value="tailwind">
          <Card className="bg-muted/50 border-border overflow-hidden">
            <div className="flex justify-between items-center p-2 bg-muted/80 border-b border-border">
              <div className="text-xs font-mono">tailwind.config.js</div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleCopy(`module.exports = {\n  ${tailwindCode}\n}`, 'Tailwind Config')}
                className="h-7 text-xs"
              >
                <ClipboardCheck className="h-3 w-3 mr-1" />
                Copy
              </Button>
            </div>
            <pre className="p-4 text-sm overflow-x-auto font-mono scrollbar-hide text-left">
              {`module.exports = {\n  ${tailwindCode}\n}`}
            </pre>
          </Card>
          
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">How to use:</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
              <li>Open your <code className="bg-muted px-1 py-0.5 rounded text-xs">tailwind.config.js</code> file</li>
              <li>Update the <code className="bg-muted px-1 py-0.5 rounded text-xs">theme.extend</code> section with these values</li>
              <li>Ensure you keep any existing configurations that you need</li>
            </ol>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="p-3 bg-muted/30 border border-border rounded-md mt-6">
        <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
          <Info className="h-4 w-4 text-blue-500" /> Installation Tips
        </h4>
        <div className="text-sm text-muted-foreground space-y-2">
          <p>
            After copying the theme code, you'll need to rebuild your application for the changes to take effect.
          </p>
          <p>
            If you're using a component that isn't properly styled after applying the theme, check that the component is using the correct CSS variables from your theme.
          </p>
        </div>
      </div>
    </div>
  );
};

// Add this import at the top
import { Info } from "lucide-react";

export default ThemeCodeDisplay;
