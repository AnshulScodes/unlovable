
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, ChevronsUpDown, PlusCircle, Bell, Settings, Smartphone, Tablet, Monitor } from "lucide-react";
import { toast } from "sonner";

interface ComponentPreviewProps {
  isDarkMode: boolean;
}

const ComponentPreview: React.FC<ComponentPreviewProps> = ({ isDarkMode }) => {
  const [viewportSize, setViewportSize] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  
  const getPreviewWidth = () => {
    switch (viewportSize) {
      case 'mobile': return 'w-full max-w-[320px]';
      case 'tablet': return 'w-full max-w-[600px]';
      case 'desktop': return 'w-full';
      default: return 'w-full';
    }
  };
  
  const handleToastClick = () => {
    toast("This is a toast notification", {
      description: "Toast notifications appear at the top of the screen",
      action: {
        label: "Action",
        onClick: () => console.log("Action clicked"),
      },
    });
  };

  return (
    <div className="w-full overflow-hidden flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-1.5">
          <Button 
            variant="ghost" 
            size="icon" 
            className={`h-7 w-7 rounded-md ${viewportSize === 'mobile' ? 'bg-muted' : ''}`}
            onClick={() => setViewportSize('mobile')}
          >
            <Smartphone className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className={`h-7 w-7 rounded-md ${viewportSize === 'tablet' ? 'bg-muted' : ''}`}
            onClick={() => setViewportSize('tablet')}
          >
            <Tablet className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className={`h-7 w-7 rounded-md ${viewportSize === 'desktop' ? 'bg-muted' : ''}`}
            onClick={() => setViewportSize('desktop')}
          >
            <Monitor className="h-4 w-4" />
          </Button>
        </div>
        <div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleToastClick}
            className="text-xs h-7"
          >
            <Bell className="h-3 w-3 mr-1" /> Test Toast
          </Button>
        </div>
      </div>
      
      <div className={`flex justify-center transition-all duration-300 ${isDarkMode ? 'bg-black/5 dark:bg-white/5' : 'bg-black/5'} rounded-lg p-2 flex-1 overflow-hidden`}>
        <div className={`${getPreviewWidth()} h-full overflow-hidden transition-all duration-300`}>
          <Tabs defaultValue="card" className="w-full h-full">
            <TabsList className="w-full justify-start mb-4 overflow-x-auto scrollbar-hide">
              <TabsTrigger value="card">Card</TabsTrigger>
              <TabsTrigger value="form">Form</TabsTrigger>
              <TabsTrigger value="buttons">Buttons</TabsTrigger>
              <TabsTrigger value="elements">UI Elements</TabsTrigger>
              <TabsTrigger value="layout">Layout</TabsTrigger>
            </TabsList>
            
            <div className="rounded-lg bg-background border border-border overflow-y-auto h-[calc(100%-48px)] scrollbar-hide">
              <TabsContent value="card" className="animate-fade-in p-4 m-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Create project</CardTitle>
                    <CardDescription>
                      Deploy your new project in one-click.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form>
                      <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" placeholder="Name of your project" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="framework">Framework</Label>
                          <Select>
                            <SelectTrigger id="framework">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                              <SelectItem value="next">Next.js</SelectItem>
                              <SelectItem value="sveltekit">SvelteKit</SelectItem>
                              <SelectItem value="astro">Astro</SelectItem>
                              <SelectItem value="nuxt">Nuxt.js</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button>Deploy</Button>
                  </CardFooter>
                </Card>
                
                <div className="mt-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">New notification</CardTitle>
                        <CardDescription>You have a new message</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">
                        Your project "Theme Studio" has been approved. You can now proceed to the next stage.
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="ghost" size="sm">Dismiss</Button>
                      <Button size="sm">View</Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="form" className="animate-fade-in p-4 m-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Update your account preferences.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="user@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" placeholder="@username" />
                    </div>
                    <div className="space-y-4 pt-2">
                      <h4 className="text-sm font-medium">Notifications</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="notifications" className="flex items-center gap-2">
                            <Bell className="h-4 w-4 text-muted-foreground" />
                            Push notifications
                          </Label>
                          <Switch id="notifications" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="marketing" className="flex items-center gap-2">
                            <Settings className="h-4 w-4 text-muted-foreground" />
                            Marketing emails
                          </Label>
                          <Switch id="marketing" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="buttons" className="animate-fade-in p-4 m-0">
                <div className="grid gap-6">
                  <div>
                    <h3 className="text-sm font-medium mb-3">Variants</h3>
                    <div className="flex flex-wrap gap-2">
                      <Button>Default</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="destructive">Destructive</Button>
                      <Button variant="ghost">Ghost</Button>
                      <Button variant="link">Link</Button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-3">Sizes</h3>
                    <div className="flex flex-wrap gap-2 items-center">
                      <Button size="sm">Small</Button>
                      <Button>Default</Button>
                      <Button size="lg">Large</Button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-3">With Icons</h3>
                    <div className="flex flex-wrap gap-2">
                      <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create New
                      </Button>
                      <Button variant="outline">
                        <Check className="mr-2 h-4 w-4" />
                        Confirm
                      </Button>
                      <Button variant="secondary">
                        <ChevronsUpDown className="mr-2 h-4 w-4" />
                        Sort
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-3">States</h3>
                    <div className="flex flex-wrap gap-2">
                      <Button disabled>Disabled</Button>
                      <Button variant="secondary" disabled>Disabled</Button>
                      <Button className="cursor-progress">Loading...</Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="elements" className="animate-fade-in p-4 m-0">
                <div className="grid gap-6">
                  <div>
                    <h3 className="text-sm font-medium mb-3">Badge Variants</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge>Default</Badge>
                      <Badge variant="secondary">Secondary</Badge>
                      <Badge variant="outline">Outline</Badge>
                      <Badge variant="destructive">Destructive</Badge>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-3">Avatar Sizes</h3>
                    <div className="flex gap-2 items-end">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-14 w-14">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium mb-3">Input Fields</h3>
                    <div className="grid gap-3">
                      <div className="space-y-1">
                        <Label htmlFor="default-input">Default</Label>
                        <Input id="default-input" placeholder="Enter text..." />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="disabled-input">Disabled</Label>
                        <Input id="disabled-input" placeholder="Disabled input" disabled />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="with-icon" className="sr-only">Search</Label>
                        <div className="relative">
                          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                          <Input id="with-icon" placeholder="Search..." className="pl-8" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="layout" className="animate-fade-in p-4 m-0">
                <div className="grid gap-6">
                  <div>
                    <h3 className="text-sm font-medium mb-3">Border Radius Sample</h3>
                    <div className="flex gap-4 flex-wrap">
                      <div className="p-4 border border-border rounded-sm bg-muted/30 text-xs text-center w-20 h-20 flex items-center justify-center">
                        Small
                      </div>
                      <div className="p-4 border border-border rounded-md bg-muted/30 text-xs text-center w-20 h-20 flex items-center justify-center">
                        Medium
                      </div>
                      <div className="p-4 border border-border rounded-lg bg-muted/30 text-xs text-center w-20 h-20 flex items-center justify-center">
                        Large
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-3">Typography</h3>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <h1 className="text-3xl font-bold">Heading 1</h1>
                        <p className="text-muted-foreground text-sm">font-size: 1.875rem; font-weight: 700;</p>
                      </div>
                      <div className="space-y-1">
                        <h2 className="text-2xl font-semibold">Heading 2</h2>
                        <p className="text-muted-foreground text-sm">font-size: 1.5rem; font-weight: 600;</p>
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-xl font-medium">Heading 3</h3>
                        <p className="text-muted-foreground text-sm">font-size: 1.25rem; font-weight: 500;</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-base">Body Text</p>
                        <p className="text-muted-foreground text-sm">font-size: 1rem; font-weight: 400;</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-3">Shadows</h3>
                    <div className="flex gap-4 flex-wrap">
                      <div className="p-4 bg-card rounded-md shadow-sm text-xs text-center w-24 h-24 flex items-center justify-center">
                        Small
                      </div>
                      <div className="p-4 bg-card rounded-md shadow text-xs text-center w-24 h-24 flex items-center justify-center">
                        Default
                      </div>
                      <div className="p-4 bg-card rounded-md shadow-lg text-xs text-center w-24 h-24 flex items-center justify-center">
                        Large
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

// Add this import at the top
import { Search } from "lucide-react";

export default ComponentPreview;
