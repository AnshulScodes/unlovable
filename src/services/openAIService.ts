import OpenAI from 'openai';
import { OPENAI_CONFIG } from '@/lib/api-config';
import { toast } from 'sonner';

// Create a function to get the OpenAI client only when needed
const getOpenAIClient = () => {
  if (!OPENAI_CONFIG.apiKey) {
    throw new Error('OpenAI API key is not configured. Please add your API key to the .env file.');
  }
  
  return new OpenAI({
    apiKey: OPENAI_CONFIG.apiKey,
    dangerouslyAllowBrowser: true // Note: In production, you should use a backend proxy
  });
};

// Interface for component generation request
export interface ComponentGenerationRequest {
  prompt: string;
  componentType: string;
  designStyle?: string;
  colorScheme?: string;
  uniquenessLevel: number;
  inspirations?: string[];
}

// Interface for component generation response
export interface ComponentGenerationResponse {
  componentCode: string;
  styleCode: string;
  designAnalysis: {
    colorPalette: string[];
    layoutStructure: string;
    typographySystem: string;
    designPatterns: string[];
  };
}

/**
 * Generate a unique component using OpenAI
 */
export const generateUniqueComponentWithAI = async (
  request: ComponentGenerationRequest
): Promise<ComponentGenerationResponse> => {
  try {
    // Get the OpenAI client
    const openai = getOpenAIClient();

    // Create a detailed prompt for the AI
    const detailedPrompt = createDetailedPrompt(request);
    
    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: OPENAI_CONFIG.model,
      messages: [
        {
          role: 'system',
          content: `You are an expert UI designer and developer specializing in creating unique, visually stunning React components using Tailwind CSS and shadcn/ui. 
          Your task is to generate a completely unique ${request.componentType} component based on the user's requirements.
          The component should be visually distinctive while maintaining usability and accessibility.
          Return your response as a JSON object with the following structure:
          {
            "componentCode": "// React JSX code here",
            "styleCode": "/* CSS code here (if needed beyond Tailwind) */",
            "designAnalysis": {
              "colorPalette": ["#color1", "#color2", ...],
              "layoutStructure": "Description of layout",
              "typographySystem": "Description of typography",
              "designPatterns": ["pattern1", "pattern2", ...]
            }
          }`
        },
        {
          role: 'user',
          content: detailedPrompt
        }
      ],
      temperature: OPENAI_CONFIG.temperature,
      max_tokens: OPENAI_CONFIG.maxTokens,
      response_format: { type: 'json_object' }
    });

    // Parse the response
    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    try {
      return JSON.parse(content) as ComponentGenerationResponse;
    } catch (parseError) {
      console.error('Error parsing OpenAI response:', parseError);
      throw new Error('Failed to parse OpenAI response. The API returned an invalid JSON format.');
    }
  } catch (error) {
    console.error('Error generating component with AI:', error);
    toast.error(`Failed to generate component: ${error instanceof Error ? error.message : 'Unknown error'}`);
    
    // Return a fallback response instead of throwing
    return {
      componentCode: "// Error generating component. Please check your API key and try again.",
      styleCode: "/* No styles generated due to an error */",
      designAnalysis: {
        colorPalette: ['#3B82F6', '#10B981', '#6366F1', '#F59E0B', '#EF4444'],
        layoutStructure: 'Standard component layout',
        typographySystem: 'System default typography',
        designPatterns: ['Basic UI patterns']
      }
    };
  }
};

/**
 * Create a detailed prompt for the AI based on the request
 */
const createDetailedPrompt = (request: ComponentGenerationRequest): string => {
  const { prompt, componentType, designStyle, colorScheme, uniquenessLevel, inspirations } = request;
  
  let detailedPrompt = `Create a unique ${componentType} component with the following characteristics:\n\n`;
  detailedPrompt += `Description: ${prompt}\n\n`;
  
  if (designStyle) {
    detailedPrompt += `Design Style: ${designStyle}\n`;
  }
  
  if (colorScheme) {
    detailedPrompt += `Color Scheme: ${colorScheme}\n`;
  }
  
  detailedPrompt += `Uniqueness Level (1-10): ${uniquenessLevel}\n\n`;
  
  if (inspirations && inspirations.length > 0) {
    detailedPrompt += `Inspirations:\n${inspirations.join('\n')}\n\n`;
  }
  
  detailedPrompt += `The component should use shadcn/ui components and Tailwind CSS for styling. Make it visually distinctive and ensure it follows accessibility best practices.`;
  
  return detailedPrompt;
};

/**
 * Analyze design inspirations using OpenAI
 */
export const analyzeDesignInspirations = async (
  prompt: string,
  inspirations: string[]
): Promise<{
  enhancedPrompt: string;
  analysis: {
    colorPalette: string[];
    layoutStructure: string;
    typographySystem: string;
    designPatterns: string[];
  }
}> => {
  try {
    // If no inspirations provided, return a basic analysis
    if (!inspirations || inspirations.length === 0) {
      return {
        enhancedPrompt: prompt,
        analysis: {
          colorPalette: ['#3B82F6', '#10B981', '#6366F1', '#F59E0B', '#EF4444'],
          layoutStructure: 'Standard component layout',
          typographySystem: 'System default typography',
          designPatterns: ['Basic UI patterns']
        }
      };
    }

    // Get the OpenAI client
    const openai = getOpenAIClient();

    // Call OpenAI API to analyze inspirations
    const response = await openai.chat.completions.create({
      model: OPENAI_CONFIG.model,
      messages: [
        {
          role: 'system',
          content: `You are an expert UI designer specializing in analyzing design inspirations and extracting key design elements.
          Analyze the provided design inspiration URLs and the user's prompt to create an enhanced design brief.
          Return your response as a JSON object with the following structure:
          {
            "enhancedPrompt": "Detailed design brief based on inspirations and original prompt",
            "analysis": {
              "colorPalette": ["#color1", "#color2", ...],
              "layoutStructure": "Description of layout",
              "typographySystem": "Description of typography",
              "designPatterns": ["pattern1", "pattern2", ...]
            }
          }`
        },
        {
          role: 'user',
          content: `Original prompt: ${prompt}\n\nDesign inspirations:\n${inspirations.join('\n')}`
        }
      ],
      temperature: 0.5,
      max_tokens: 1000,
      response_format: { type: 'json_object' }
    });

    // Parse the response
    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    try {
      return JSON.parse(content);
    } catch (parseError) {
      console.error('Error parsing OpenAI response:', parseError);
      throw new Error('Failed to parse OpenAI response. The API returned an invalid JSON format.');
    }
  } catch (error) {
    console.error('Error analyzing design inspirations:', error);
    toast.error(`Failed to analyze inspirations: ${error instanceof Error ? error.message : 'Unknown error'}`);
    
    // Return a fallback analysis
    return {
      enhancedPrompt: prompt,
      analysis: {
        colorPalette: ['#3B82F6', '#10B981', '#6366F1', '#F59E0B', '#EF4444'],
        layoutStructure: 'Standard component layout',
        typographySystem: 'System default typography',
        designPatterns: ['Basic UI patterns']
      }
    };
  }
}; 