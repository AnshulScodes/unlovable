
import React from 'react';
import { useThemeCustomizer } from '@/hooks/useThemeCustomizer';
import ThemeCustomizer from '@/components/ThemeCustomizer';
import ComponentPreview from '@/components/ComponentPreview';
import Navbar from '@/components/Navbar';

const Index = () => {
  const { isDarkMode, toggleDarkMode } = useThemeCustomizer();

  return (
    <div className={`min-h-screen bg-background ${isDarkMode ? 'dark' : ''}`}>
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="container pt-24 pb-16">
        <div className="flex flex-col gap-8">
          <section className="text-center max-w-3xl mx-auto animate-fade-in">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              <span className="text-gradient">Theme Studio</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Create beautiful custom themes for your shadcn/ui projects. Adjust colors, spacing, and typography — then export your code.
            </p>
          </section>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-scale-in">
            <ThemeCustomizer />
            
            <div className="glass-card p-6 w-full h-full flex flex-col">
              <h2 className="text-xl font-bold mb-4">Live Preview</h2>
              <div className="flex-1 overflow-hidden">
                <ComponentPreview isDarkMode={isDarkMode} />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="border-t border-border py-6 mt-12">
        <div className="container text-center text-sm text-muted-foreground">
          <p>Theme Studio for shadcn/ui — Customize your design system with ease.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
