
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Loader2, Lightbulb, Palette } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AIPromptInputProps {
  onGenerateTheme: (prompt: string) => void;
  isGenerating: boolean;
}

const AIPromptInput: React.FC<AIPromptInputProps> = ({ onGenerateTheme, isGenerating }) => {
  const [prompt, setPrompt] = useState('');
  const [promptTab, setPromptTab] = useState('examples');
  
  const examples = [
    {
      title: "Warm Vintage",
      prompt: "Create a warm, cozy theme with earthy tones for a coffee shop website, vintage feel with subtle textures",
      tags: ["warm", "vintage", "earthy"]
    },
    {
      title: "Modern Tech",
      prompt: "Design a sleek, modern tech startup theme with bold colors, sharp angles, and minimalist UI elements",
      tags: ["modern", "tech", "minimalist"]
    },
    {
      title: "Playful Education",
      prompt: "Generate a playful, colorful theme for a children's education platform with rounded corners and fun typography",
      tags: ["playful", "education", "rounded"]
    },
    {
      title: "Luxury Brand",
      prompt: "Make a luxurious, high-end theme with gold accents for a fashion brand, elegant typography and refined spacing",
      tags: ["luxury", "elegant", "fashion"]
    },
    {
      title: "Clean Portfolio",
      prompt: "Design a clean, minimalist theme with subtle gradients for a portfolio site, focus on typography and whitespace",
      tags: ["clean", "minimalist", "portfolio"]
    }
  ];
  
  const tips = [
    "Be specific about colors: 'deep blues with coral accents' rather than just 'colorful'",
    "Mention your industry or purpose: 'for a healthcare website' or 'for a tech blog'",
    "Include aesthetic direction: 'minimalist', 'brutalist', 'skeuomorphic', 'glassmorphism'",
    "Specify mood or emotion: 'calming', 'energetic', 'serious', 'playful'",
    "Reference design periods: 'cyberpunk', '80s retrowave', 'mid-century modern'"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isGenerating) {
      onGenerateTheme(prompt);
    }
  };

  const handleExampleClick = (examplePrompt: string) => {
    setPrompt(examplePrompt);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
          <Sparkles className="h-4 w-4" /> AI-Assisted Theme Generation
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Describe the theme you want in natural language, and our AI will generate a custom theme based on your description.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="e.g. Create a modern, tech-focused theme with blue accents and rounded corners..."
            className="glass-input resize-none min-h-[120px]"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={!prompt.trim() || isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Theme...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Theme
              </>
            )}
          </Button>
        </form>
      </div>
      
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
