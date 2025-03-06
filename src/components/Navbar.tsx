
import React from 'react';
import { Button } from '@/components/ui/button';
import { PaintBrush, Github, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <header className="w-full border-b border-border bg-background/95 backdrop-blur-sm fixed top-0 z-50">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <PaintBrush className="h-5 w-5 text-primary" />
          <span className="font-bold text-lg">Theme Studio</span>
        </div>
        
        <nav className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={toggleDarkMode} aria-label="Toggle theme">
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          <Button variant="outline" size="sm" className="gap-2" asChild>
            <a href="https://github.com/shadcn/ui" target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </Button>
          
          <Button size="sm">Get Started</Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
