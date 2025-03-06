
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Loader2, Lightbulb, Palette, FileSearch, Layout, PanelLeft, Zap, Cpu, ImageIcon, ExternalLink } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

interface AIPromptInputProps {
  onGenerateTheme: (prompt: string, inspirations?: string[], options?: any) => void;
  isGenerating: boolean;
}

const styleOptions = [
  { value: "neobrutalist", label: "Neobrutalist" },
  { value: "glassmorphic", label: "Glassmorphic" },
  { value: "skeuomorphic", label: "Skeuomorphic" },
  { value: "neumorphic", label: "Neumorphic" },
  { value: "y2k", label: "Y2K" },
  { value: "memphis", label: "Memphis" },
  { value: "synthwave", label: "Synthwave" },
  { value: "cyberpunk", label: "Cyberpunk" },
  { value: "vaporwave", label: "Vaporwave" },
  { value: "claymorphism", label: "Claymorphism" },
  { value: "web1.0", label: "Web 1.0" },
  { value: "material", label: "Material Design" },
  { value: "apple", label: "Apple Design" },
  { value: "bauhaus", label: "Bauhaus" },
];

const colorOptions = [
  { value: "monochromatic", label: "Monochromatic" },
  { value: "analogous", label: "Analogous" },
  { value: "complementary", label: "Complementary" },
  { value: "triadic", label: "Triadic" },
  { value: "vibrant", label: "Vibrant" },
  { value: "pastel", label: "Pastel" },
  { value: "earthy", label: "Earthy" },
  { value: "neon", label: "Neon" },
]

const layoutOptions = [
  { value: "centered", label: "Centered" },
  { value: "asymmetric", label: "Asymmetric" },
  { value: "grid", label: "Grid-based" },
  { value: "overlapping", label: "Overlapping Elements" },
  { value: "modular", label: "Modular Blocks" },
  { value: "staggered", label: "Staggered" },
  { value: "split", label: "Split Screen" },
  { value: "layered", label: "Layered Depth" },
]

const AIPromptInput: React.FC<AIPromptInputProps> = ({ onGenerateTheme, isGenerating }) => {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState('');
  const [promptTab, setPromptTab] = useState('generator');
  const [inspirationUrls, setInspirationUrls] = useState<string[]>([]);
  const [currentInspirationUrl, setCurrentInspirationUrl] = useState('');
  const [designIntent, setDesignIntent] = useState<string>('');
  const [selectedStyle, setSelectedStyle] = useState<string>('');
  const [selectedColorScheme, setSelectedColorScheme] = useState<string>('');
  const [selectedLayout, setSelectedLayout] = useState<string>('');
  const [uniquenessLevel, setUniquenessLevel] = useState<number>(5);
  const [componentType, setComponentType] = useState<string>('card');
  const [searchingInspirations, setSearchingInspirations] = useState(false);
  const [designInspirations, setDesignInspirations] = useState<Array<{url: string, thumbnail: string}>>([]);
  const [selectedInspirations, setSelectedInspirations] = useState<string[]>([]);
  
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
    },
    {
      title: "Vaporwave Header",
      prompt: "Design a vaporwave header with retro aesthetics, 80s colors, Greek statues, and grid patterns",
      tags: ["vaporwave", "retro", "80s"]
    },
    {
      title: "Claymorphism UI",
      prompt: "Create a claymorphism style card with soft, puffy buttons that look like they're made of clay",
      tags: ["claymorphism", "soft", "3D"]
    },
    {
      title: "Cyberpunk Interface",
      prompt: "Design a cyberpunk interface with glitchy elements, neon highlights, and dark tech aesthetics",
      tags: ["cyberpunk", "glitch", "neon"]
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
  
  const componentTypes = [
    { value: "card", label: "Card Component" },
    { value: "header", label: "Header/Navigation" },
    { value: "form", label: "Form Elements" },
    { value: "button", label: "Button Component" },
    { value: "dashboard", label: "Dashboard Widget" },
    { value: "pricing", label: "Pricing Table" },
    { value: "testimonial", label: "Testimonial Display" },
    { value: "gallery", label: "Image Gallery" },
  ];

  // In a real implementation, this would fetch from Dribbble, Behance, etc.
  const searchDesignInspirations = async (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    
    setSearchingInspirations(true);
    toast.info("Searching for design inspirations...");
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // These would be actual results from design APIs in a real implementation
      const mockResults = [
        { url: "https://dribbble.com/shots/inspiration1", thumbnail: "https://picsum.photos/seed/insp1/300/200" },
        { url: "https://dribbble.com/shots/inspiration2", thumbnail: "https://picsum.photos/seed/insp2/300/200" },
        { url: "https://dribbble.com/shots/inspiration3", thumbnail: "https://picsum.photos/seed/insp3/300/200" },
        { url: "https://dribbble.com/shots/inspiration4", thumbnail: "https://picsum.photos/seed/insp4/300/200" },
        { url: "https://dribbble.com/shots/inspiration5", thumbnail: "https://picsum.photos/seed/insp5/300/200" },
        { url: "https://dribbble.com/shots/inspiration6", thumbnail: "https://picsum.photos/seed/insp6/300/200" },
      ];
      
      setDesignInspirations(mockResults);
      toast.success("Found design inspirations!");
    } catch (error) {
      toast.error("Failed to fetch design inspirations");
      console.error("Error fetching inspirations:", error);
    } finally {
      setSearchingInspirations(false);
    }
  };
  
  const toggleInspiration = (url: string) => {
    if (selectedInspirations.includes(url)) {
      setSelectedInspirations(selectedInspirations.filter(i => i !== url));
    } else {
      setSelectedInspirations([...selectedInspirations, url]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((prompt.trim() || selectedStyle) && !isGenerating) {
      // Build a comprehensive prompt from all selected options
      let fullPrompt = prompt;
      
      if (selectedStyle) {
        fullPrompt = `${selectedStyle} style ${componentType}: ${fullPrompt}`;
      }
      
      if (selectedColorScheme) {
        fullPrompt = `${fullPrompt} with a ${selectedColorScheme} color scheme`;
      }
      
      if (selectedLayout) {
        fullPrompt = `${fullPrompt} using a ${selectedLayout} layout approach`;
      }
      
      if (designIntent) {
        fullPrompt = `${designIntent}: ${fullPrompt}`;
      }
      
      // Combine manual inspirations and selected design inspirations
      const allInspirations = [
        ...inspirationUrls,
        ...selectedInspirations
      ];
      
      onGenerateTheme(fullPrompt, allInspirations, {
        uniquenessLevel, 
        componentType,
        designStyle: selectedStyle,
        colorScheme: selectedColorScheme,
        layoutStyle: selectedLayout
      });
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
          Describe the component you want in natural language, add design inspirations, and customize generation parameters for truly unique designs.
        </p>
        
        <Tabs value={promptTab} onValueChange={setPromptTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="generator" className="flex items-center gap-2">
              <Zap className="h-4 w-4" /> Generator
            </TabsTrigger>
            <TabsTrigger value="inspirations" className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" /> Inspirations
            </TabsTrigger>
            <TabsTrigger value="examples" className="flex items-center gap-2">
              <Palette className="h-4 w-4" /> Examples
            </TabsTrigger>
            <TabsTrigger value="tips" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" /> Tips
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="generator">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <PanelLeft className="h-4 w-4" /> Component Description
                </label>
                <Textarea
                  placeholder="Describe the design you want, e.g., 'I need a clean, warm header with subtle animations'"
                  className="resize-none min-h-[100px]"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Be specific about visual style, mood, functionality, and any special features you need
                </p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Layout className="h-4 w-4" /> Component Type
                </label>
                <Select value={componentType} onValueChange={setComponentType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select component type" />
                  </SelectTrigger>
                  <SelectContent>
                    {componentTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Palette className="h-4 w-4" /> Design Style
                  </label>
                  <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select design style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">No specific style</SelectItem>
                      {styleOptions.map((style) => (
                        <SelectItem key={style.value} value={style.value}>
                          {style.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Palette className="h-4 w-4" /> Color Scheme
                  </label>
                  <Select value={selectedColorScheme} onValueChange={setSelectedColorScheme}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select color scheme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">No specific colors</SelectItem>
                      {colorOptions.map((color) => (
                        <SelectItem key={color.value} value={color.value}>
                          {color.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Layout className="h-4 w-4" /> Layout Style
                  </label>
                  <Select value={selectedLayout} onValueChange={setSelectedLayout}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select layout style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">No specific layout</SelectItem>
                      {layoutOptions.map((layout) => (
                        <SelectItem key={layout.value} value={layout.value}>
                          {layout.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Cpu className="h-4 w-4" /> Uniqueness Level
                  </label>
                  <span className="text-xs text-muted-foreground">
                    {uniquenessLevel === 1 ? "Conservative" : 
                     uniquenessLevel === 10 ? "Extremely Unique" : 
                     uniquenessLevel < 5 ? "Subtle" : 
                     uniquenessLevel > 7 ? "Very Unique" : "Balanced"}
                  </span>
                </div>
                <Slider
                  min={1}
                  max={10}
                  step={1}
                  value={[uniquenessLevel]}
                  onValueChange={(value) => setUniquenessLevel(value[0])}
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Standard</span>
                  <span>Unique</span>
                </div>
              </div>
              
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
                  <FileSearch className="h-4 w-4" /> Additional URLs
                </label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Paste additional inspiration URL"
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
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={((!prompt.trim() && !selectedStyle) || isGenerating)}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Unique Component...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Unique Component
                  </>
                )}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="inspirations" className="animate-fade-in">
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Search for design inspirations (e.g., 'modern header', 'glassmorphic card')"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => searchDesignInspirations(prompt)}
                  disabled={!prompt.trim() || searchingInspirations}
                >
                  {searchingInspirations ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <FileSearch className="h-4 w-4" />
                  )}
                </Button>
              </div>
              
              {designInspirations.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-2">
                  {designInspirations.map((inspiration, idx) => (
                    <div key={idx} className="relative group">
                      <div 
                        className={`border rounded-md overflow-hidden cursor-pointer transition-all ${
                          selectedInspirations.includes(inspiration.url) 
                            ? 'ring-2 ring-primary border-primary' 
                            : 'hover:border-muted-foreground/50'
                        }`}
                        onClick={() => toggleInspiration(inspiration.url)}
                      >
                        <img 
                          src={inspiration.thumbnail} 
                          alt="Design inspiration" 
                          className="w-full h-32 object-cover"
                        />
                        <div className="p-2 text-xs truncate">{inspiration.url.split('/').pop()}</div>
                      </div>
                      <a 
                        href={inspiration.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="absolute top-1 right-1 p-1 bg-background/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>Search for design inspirations to help guide the AI</p>
                  <p className="text-xs mt-2">We'll find relevant designs from Dribbble, Behance, and more</p>
                </div>
              )}
              
              {selectedInspirations.length > 0 && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium">Selected Inspirations</h4>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setSelectedInspirations([])}
                      className="h-8 text-xs"
                    >
                      Clear All
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedInspirations.map((url, idx) => (
                      <Badge key={idx} variant="secondary" className="flex items-center gap-1">
                        <span className="max-w-[150px] truncate">{url.split('/').pop()}</span>
                        <button 
                          type="button" 
                          className="ml-1 hover:text-destructive" 
                          onClick={() => toggleInspiration(url)}
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          
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
                
                <Separator className="my-4" />
                
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <FileSearch className="h-4 w-4 text-blue-500" /> Design Inspiration Process
                </h4>
                <ol className="space-y-2 list-decimal pl-5">
                  <li className="text-sm">
                    <strong>Input your request</strong> - Describe what you want clearly (e.g., "clean, warm header")
                  </li>
                  <li className="text-sm">
                    <strong>Explore inspirations</strong> - Find and select designs that match your vision
                  </li>
                  <li className="text-sm">
                    <strong>Generate component</strong> - Our AI creates a unique component based on your input and inspirations
                  </li>
                  <li className="text-sm">
                    <strong>Customize</strong> - Fine-tune the results with our interactive tools
                  </li>
                </ol>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AIPromptInput;
