
import { useState } from 'react';
import { toast } from 'sonner';
import { generateUniqueComponent } from '@/services/designGenerationService';
import { generateDesignFromInspirations } from '@/services/DesignInspirationService';

export interface DesignGenerationOptions {
  uniquenessLevel: number;
  componentType: string;
  designStyle?: string;
  colorScheme?: string;
  layoutStyle?: string;
}

export interface DesignGenerationResult {
  componentCode: string;
  styleCode: string;
  preview: React.ReactNode;
  designAnalysis: {
    colorPalette: string[];
    layoutStructure: string;
    typographySystem: string;
    designPatterns: string[];
  };
  inspirationSources: string[];
  enhancedPrompt: string;
}

export const useEnhancedDesignGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationResult, setGenerationResult] = useState<DesignGenerationResult | null>(null);
  const [generationError, setGenerationError] = useState<string | null>(null);
  
  const generateComponent = async (
    prompt: string, 
    inspirations: string[] = [], 
    options: Partial<DesignGenerationOptions> = {}
  ) => {
    setIsGenerating(true);
    setGenerationError(null);
    
    try {
      // Step 1: Process the design inspirations workflow
      toast.info("Starting enhanced design generation process...");
      const enhancedDesign = await generateDesignFromInspirations(prompt, inspirations, options);
      
      // Step 2: Generate the component using the enhanced prompt
      toast.info("Creating your unique component...");
      
      // In a real implementation, this call would use the enhancedDesign.prompt
      // For now, we'll use the existing mock implementation
      const generatedComponent = await generateUniqueComponent(
        enhancedDesign.prompt || prompt,
        enhancedDesign.inspirations || inspirations,
        {
          uniquenessLevel: options.uniquenessLevel || 5,
          componentType: options.componentType || 'card',
          designStyle: options.designStyle,
          colorScheme: options.colorScheme,
          layoutStyle: options.layoutStyle
        }
      );
      
      // Step 3: Prepare the final result
      const result: DesignGenerationResult = {
        componentCode: generatedComponent.componentCode,
        styleCode: generatedComponent.styleCode,
        preview: <div className="component-preview">Preview of Generated Component</div>,
        designAnalysis: enhancedDesign.analysis,
        inspirationSources: enhancedDesign.inspirations || [],
        enhancedPrompt: enhancedDesign.prompt || prompt
      };
      
      setGenerationResult(result);
      toast.success("Component generated successfully!");
      
      return result;
    } catch (error) {
      console.error("Error generating component:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      setGenerationError(errorMessage);
      toast.error(`Failed to generate component: ${errorMessage}`);
      return null;
    } finally {
      setIsGenerating(false);
    }
  };
  
  return {
    generateComponent,
    isGenerating,
    generationResult,
    generationError,
    resetResult: () => setGenerationResult(null)
  };
};
