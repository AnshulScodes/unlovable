
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ImageIcon, Palette, Layout, Type, Lightbulb, ExternalLink } from "lucide-react";

interface EnhancedDesignInspirationsDisplayProps {
  designAnalysis?: {
    colorPalette: string[];
    layoutStructure: string;
    typographySystem: string;
    designPatterns: string[];
  };
  inspirationSources?: string[];
  enhancedPrompt?: string;
}

const EnhancedDesignInspirationsDisplay: React.FC<EnhancedDesignInspirationsDisplayProps> = ({
  designAnalysis,
  inspirationSources,
  enhancedPrompt
}) => {
  if (!designAnalysis) {
    return (
      <Card className="w-full">
        <CardContent className="p-8 text-center text-muted-foreground">
          <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-20" />
          <p>No design analysis available yet.</p>
          <p className="text-sm mt-2">Generate a component to see design inspirations and analysis.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <ImageIcon className="h-5 w-5" /> Design Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
            <Palette className="h-4 w-4 text-blue-500" /> Color Palette
          </h3>
          <div className="flex gap-2 flex-wrap">
            {designAnalysis.colorPalette.map((color, index) => (
              <div 
                key={index} 
                className="w-12 h-12 rounded-md border shadow-sm relative group" 
                style={{ backgroundColor: color }}
              >
                <div className="opacity-0 group-hover:opacity-100 absolute -bottom-6 left-0 right-0 text-xs text-center transition-opacity bg-background/95 p-1 rounded">
                  {color}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
            <Layout className="h-4 w-4 text-purple-500" /> Layout
          </h3>
          <p className="text-muted-foreground">
            {designAnalysis.layoutStructure}
          </p>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
            <Type className="h-4 w-4 text-green-500" /> Typography
          </h3>
          <p className="text-muted-foreground">
            {designAnalysis.typographySystem}
          </p>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-amber-500" /> Design Patterns
          </h3>
          <div className="flex flex-wrap gap-2">
            {designAnalysis.designPatterns.map((pattern, index) => (
              <Badge key={index} variant="secondary">
                {pattern}
              </Badge>
            ))}
          </div>
        </div>
        
        {inspirationSources && inspirationSources.length > 0 && (
          <div>
            <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-indigo-500" /> Inspiration Sources
            </h3>
            <div className="space-y-2">
              {inspirationSources.map((source, index) => (
                <div key={index} className="flex items-center justify-between text-sm px-3 py-2 bg-muted/50 rounded-md">
                  <span className="truncate max-w-[80%]">{source}</span>
                  <a 
                    href={source} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-muted-foreground hover:text-primary"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {enhancedPrompt && (
          <div>
            <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-orange-500" /> Enhanced AI Prompt
            </h3>
            <div className="bg-muted/30 p-3 rounded-md text-xs font-mono overflow-auto max-h-40">
              {enhancedPrompt.split('\n').map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedDesignInspirationsDisplay;
