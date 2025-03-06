
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Code, Copy, Check, Eye, Paintbrush, Layers } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ComponentEditorProps {
  componentCode: string;
  componentPreview: React.ReactNode;
  onDownload: () => void;
  onCopy: () => void;
  onCustomize: () => void;
}

const ComponentEditor: React.FC<ComponentEditorProps> = ({
  componentCode,
  componentPreview,
  onDownload,
  onCopy,
  onCustomize
}) => {
  const { toast } = useToast();
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("preview");

  const handleCopyCode = () => {
    navigator.clipboard.writeText(componentCode);
    setCopiedCode(true);
    toast({
      title: "Code copied to clipboard",
      description: "You can now paste the component code into your project",
    });
    
    setTimeout(() => {
      setCopiedCode(false);
    }, 2000);
  };

  return (
    <Card className="w-full h-full flex flex-col overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-xl font-bold">Component Editor</CardTitle>
          <CardDescription>
            Preview, customize and get the code for your unique component
          </CardDescription>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={onCustomize}>
            <Paintbrush className="h-4 w-4 mr-2" />
            Customize
          </Button>
          <Button variant="outline" size="sm" onClick={onDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </CardHeader>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="px-6">
          <TabsList className="grid grid-cols-3 mb-2">
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Eye className="h-4 w-4" /> Preview
            </TabsTrigger>
            <TabsTrigger value="code" className="flex items-center gap-2">
              <Code className="h-4 w-4" /> Code
            </TabsTrigger>
            <TabsTrigger value="layers" className="flex items-center gap-2">
              <Layers className="h-4 w-4" /> Structure
            </TabsTrigger>
          </TabsList>
        </div>
        
        <CardContent className="flex-1 overflow-y-auto p-0">
          <TabsContent value="preview" className="m-0 h-full flex flex-col">
            <div className="p-4 bg-muted/30 flex-1 overflow-auto">
              <div className="flex justify-center items-center min-h-full">
                {componentPreview}
              </div>
            </div>
            <div className="bg-background p-4 border-t">
              <p className="text-sm text-muted-foreground">
                This is a live preview of your component. The actual appearance may vary depending on your project's theme.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="code" className="m-0 h-full flex flex-col">
            <div className="relative">
              <Button 
                variant="ghost" 
                size="sm" 
                className="absolute right-2 top-2 z-10"
                onClick={handleCopyCode}
              >
                {copiedCode ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
              <pre className="p-4 bg-muted/30 text-xs overflow-x-auto h-[calc(100vh-340px)] whitespace-pre-wrap">
                <code className="language-tsx">
                  {componentCode}
                </code>
              </pre>
            </div>
            <div className="bg-background p-4 border-t">
              <p className="text-sm text-muted-foreground">
                Copy this code to use the component in your project. Make sure to install any required dependencies.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="layers" className="m-0 h-full flex flex-col">
            <div className="p-4 bg-muted/30 flex-1 overflow-auto">
              <div className="space-y-2">
                <div className="text-sm font-medium">Component Structure</div>
                <div className="border rounded-md p-3">
                  {/* This would be a hierarchical view of the component structure */}
                  <div className="text-xs font-mono space-y-1">
                    <div>{'<Component>'}</div>
                    <div className="pl-4">{'<Header>'}</div>
                    <div className="pl-6">{'<Title />'}</div>
                    <div className="pl-6">{'<Description />'}</div>
                    <div className="pl-4">{'</Header>'}</div>
                    <div className="pl-4">{'<Content>'}</div>
                    <div className="pl-6">{'<Item />'}</div>
                    <div className="pl-6">{'<Item />'}</div>
                    <div className="pl-4">{'</Content>'}</div>
                    <div className="pl-4">{'<Footer>'}</div>
                    <div className="pl-6">{'<Button />'}</div>
                    <div className="pl-4">{'</Footer>'}</div>
                    <div>{'</Component>'}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-background p-4 border-t">
              <p className="text-sm text-muted-foreground">
                This view shows the structure of your component, making it easier to understand its organization.
              </p>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default ComponentEditor;
