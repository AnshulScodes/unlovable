
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Loader2 } from "lucide-react";

interface AIPromptInputProps {
  onGenerateTheme: (prompt: string) => void;
  isGenerating: boolean;
}

const AIPromptInput: React.FC<AIPromptInputProps> = ({ onGenerateTheme, isGenerating }) => {
  const [prompt, setPrompt] = useState('');
  const [examples] = useState([
    "Create a warm, cozy theme with earthy tones for a coffee shop website",
    "Design a sleek, modern tech startup theme with bold colors",
    "Generate a pastel, playful theme for a children's education platform",
    "Make a luxurious, high-end theme with gold accents for a fashion brand",
    "Design a clean, minimalist theme with subtle gradients for a portfolio site"
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isGenerating) {
      onGenerateTheme(prompt);
    }
  };

  const handleExampleClick = (example: string) => {
    setPrompt(example);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
          <Sparkles className="h-4 w-4" /> AI-Assisted Theme Generation
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Describe the theme you want in natural language, and our AI will generate a custom theme for you.
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
        <h4 className="text-md font-medium mb-3">Example Prompts</h4>
        <div className="grid gap-2">
          {examples.map((example, index) => (
            <Card key={index} className="cursor-pointer hover:bg-muted/50 transition-colors">
              <CardContent 
                className="p-3 text-sm"
                onClick={() => handleExampleClick(example)}
              >
                "{example}"
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIPromptInput;
