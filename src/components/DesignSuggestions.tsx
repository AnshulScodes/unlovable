
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb } from "lucide-react";
import { ThemeSuggestion } from '@/hooks/useThemeCustomizer';

interface DesignSuggestionsProps {
  suggestions: ThemeSuggestion[];
  onApplySuggestion: (id: string) => void;
}

const DesignSuggestions: React.FC<DesignSuggestionsProps> = ({ suggestions, onApplySuggestion }) => {
  if (suggestions.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="h-5 w-5 text-amber-500" />
        <h3 className="text-lg font-medium">Design Suggestions</h3>
      </div>
      
      <div className="space-y-3">
        {suggestions.map((suggestion) => (
          <Card key={suggestion.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{suggestion.title}</CardTitle>
                {suggestion.applied && (
                  <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                    Applied
                  </Badge>
                )}
              </div>
              <CardDescription>{suggestion.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onApplySuggestion(suggestion.id)}
                disabled={suggestion.applied}
              >
                {suggestion.applied ? "Applied" : "Apply Suggestion"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DesignSuggestions;
