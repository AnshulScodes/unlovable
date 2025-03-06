
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

interface ThemeCodeDisplayProps {
  code: string;
}

const ThemeCodeDisplay: React.FC<ThemeCodeDisplayProps> = ({ code }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    toast.success("Theme code copied to clipboard!");
    
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Generated Theme Code</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleCopy}
          className="flex items-center gap-1"
        >
          {isCopied ? (
            <>
              <Check className="h-4 w-4" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy
            </>
          )}
        </Button>
      </div>
      
      <Card className="bg-muted/50 border-border overflow-hidden">
        <pre className="p-4 text-sm overflow-x-auto font-mono scrollbar-hide text-left">
          {code}
        </pre>
      </Card>
      
      <div className="mt-4 space-y-2">
        <h4 className="text-md font-medium">How to use this code:</h4>
        <ol className="list-decimal list-inside space-y-2 text-sm">
          <li>Copy the generated CSS variables to your <code className="bg-muted px-1 py-0.5 rounded text-xs">globals.css</code> file.</li>
          <li>Update your <code className="bg-muted px-1 py-0.5 rounded text-xs">tailwind.config.js</code> with the provided configuration.</li>
          <li>Your shadcn/ui components will automatically use the new theme.</li>
        </ol>
      </div>
    </div>
  );
};

export default ThemeCodeDisplay;
