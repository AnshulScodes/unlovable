
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Loader2, Lightbulb, Palette, FileSearch, Layout, PanelLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface AIPromptInputProps {
  onGenerateTheme: (prompt: string, inspirations?: string[]) => void;
  isGenerating: boolean;
}

const AIPromptInput: React.FC<AIPromptInputProps> = ({ onGenerateTheme, isGenerating }) => {
  const [prompt, setPrompt] = useState('');
  const [promptTab, setPromptTab] = useState('examples');
  const [inspirationUrls, setInspirationUrls] = useState<string[]>([]);
  const [currentInspirationUrl, setCurrentInspirationUrl] = useState('');
  const [designIntent, setDesignIntent] = useState<string>('');
  
  const examples = [
    {
      title: "Neobrutalist Portfolio",
      prompt: "Create a bold, high-contrast neobrutalist component with thick borders, bright accent colors, and intentionally crude layout",
      tags: ["bold", "neobrutalist", "high-contrast"]
    },
    {
      title: "Glassmorphic Dashboard",
      prompt: "Design a modern glassmorphic component with subtle blur effects, translucency, and soft glow accents",
      tags: ["glassmorphic", "modern", "translucent"]
    },
    {
      title: "Retro Terminal",
      prompt: "Generate a retro terminal-inspired component with monospace font, scan lines effect, and neon green text on dark background",
      tags: ["retro", "terminal", "monospace"]
    },
    {
      title: "Neumorphic Card",
      prompt: "Create a soft neumorphic component with subtle shadows, light background, and minimal color palette",
      tags: ["neumorphic", "subtle", "soft-shadows"]
    },
    {
      title: "Y2K Nostalgia",
      prompt: "Design a Y2K-inspired component with bubble elements, chrome effects, and iridescent gradients",
      tags: ["Y2K", "nostalgic", "iridescent"]
    }
  ];
  
  const designIntents = [
    "Minimalist and elegant",
    "Bold and attention-grabbing",
    "Playful and energetic",
    "Corporate and professional",
    "Artistic and expressive",
    "Futuristic and tech-forward",
    "Vintage and nostalgic",
    "Organic and natural"
  ];
  
  const tips = [
    "Specify an exact design style: 'neobrutalist', 'glassmorphic', 'neumorphic', 'cyberpunk', 'Y2K', 'Web 1.0'",
    "Include specific layout preferences: 'asymmetrical', 'grid-based', 'card-based', 'overlapping elements'",
    "Mention texture details: 'grainy', 'noisy', 'glossy', 'matte', 'textured', 'paper-like'",
    "Specify interaction preferences: 'subtle hover effects', 'dramatic transitions', 'playful animations'",
    "Reference specific design inspirations: 'reminiscent of Apple's design language', 'inspired by Figma's UI'"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isGenerating) {
      const fullPrompt = designIntent ? `${designIntent}: ${prompt}` : prompt;
      onGenerateTheme(fullPrompt, inspirationUrls);
    }
  };

  const handleExampleClick = (examplePrompt: string) => {
    setPrompt(examplePrompt);
  };
  
  const addInspirationUrl = () => {
    if (currentInspirationUrl && !inspirationUrls.includes(currentInspirationUrl)) {
      setInspirationUrls([...inspirationUrls, currentInspirationUrl]);
      setCurrentInspirationUrl('');
    }
  };
  
  const removeInspirationUrl = (url: string) => {
    setInspirationUrls(inspirationUrls.filter(item => item !== url));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
          <Sparkles className="h-4 w-4" /> AI-Assisted Component Generation
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Describe the component you want in natural language, add design inspirations, and select a design intent to generate unique, beautiful components.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Layout className="h-4 w-4" /> Design Intent
            </label>
            <div className="flex flex-wrap gap-2">
              {designIntents.map((intent, idx) => (
                <Badge 
                  key={idx}
                  variant={designIntent === intent ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/10"
                  onClick={() => setDesignIntent(intent === designIntent ? '' : intent)}
                >
                  {intent}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <FileSearch className="h-4 w-4" /> Design Inspirations
            </label>
            <div className="flex gap-2">
              <Input
                placeholder="Paste design inspiration URL"
                value={currentInspirationUrl}
                onChange={(e) => setCurrentInspirationUrl(e.target.value)}
                className="flex-1"
              />
              <Button 
                type="button" 
                variant="outline" 
                onClick={addInspirationUrl}
                disabled={!currentInspirationUrl}
              >
                Add
              </Button>
            </div>
            {inspirationUrls.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {inspirationUrls.map((url, idx) => (
                  <Badge key={idx} variant="secondary" className="flex items-center gap-1">
                    <span className="max-w-[150px] truncate">{url}</span>
                    <button 
                      type="button" 
                      className="ml-1 hover:text-destructive" 
                      onClick={() => removeInspirationUrl(url)}
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <PanelLeft className="h-4 w-4" /> Component Description
            </label>
            <Textarea
              placeholder="e.g. Create a bold, high-contrast neobrutalist component with thick borders, bright accent colors, and intentionally crude layout"
              className="glass-input resize-none min-h-[120px]"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={!prompt.trim() || isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Component...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Component
              </>
            )}
          </Button>
        </form>
      </div>
      
      <Separator />
      
      <div>
        <Tabs value={promptTab} onValueChange={setPromptTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="examples" className="flex items-center gap-2">
              <Palette className="h-4 w-4" /> Examples
            </TabsTrigger>
            <TabsTrigger value="tips" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" /> Tips
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="examples" className="space-y-3">
            {examples.map((example, index) => (
              <Card key={index} className="cursor-pointer hover:bg-muted/50 transition-colors overflow-hidden">
                <CardContent className="p-3">
                  <div className="font-medium mb-1">{example.title}</div>
                  <p 
                    className="text-sm text-muted-foreground mb-2 line-clamp-2"
                    onClick={() => handleExampleClick(example.prompt)}
                  >
                    "{example.prompt}"
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {example.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="text-xs px-2 py-0.5 bg-secondary rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="tips" className="space-y-3">
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-amber-500" /> Writing Effective Prompts
                </h4>
                <ul className="space-y-2 list-disc pl-5">
                  {tips.map((tip, index) => (
                    <li key={index} className="text-sm">
                      {tip}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AIPromptInput;
