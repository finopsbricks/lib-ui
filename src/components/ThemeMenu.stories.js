/**
 * ThemeMenu Stories - User Journey Pattern
 */

import React from 'react';
import { User, LogOut } from 'lucide-react';
import { ThemeProvider } from './ThemeProvider';
import { ThemeMenu } from './ThemeMenu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../primitives/dropdown-menu';
import { Button } from '../primitives/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../primitives/card';
import { Input } from '../primitives/input';

const meta = {
  title: 'components/ThemeMenu',
  component: ThemeMenu,
  parameters: {
    layout: 'centered',
    description: 'Theme sub-menu (Light / Dark / System) placed inside an app\'s user dropdown. Picking an option switches the whole app and is remembered in this browser.',
  },
  decorators: [
    (Story) => (
      <ThemeProvider storageKey="storybook-theme-menu">
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;

/**
 * USER JOURNEY STORY 1: User opens their account menu to switch theme
 */
export const InUserMenu = {
  render: () => (
    <div className="bg-background text-foreground p-6 rounded-lg">
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <User />
            Account
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-56">
          <DropdownMenuItem disabled>
            <User />
            Account
          </DropdownMenuItem>
          <ThemeMenu />
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
};

/**
 * USER JOURNEY STORY 2: User sees common surfaces re-color after switching theme
 */
export const SurfacesFollowTheme = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div className="bg-background text-foreground min-h-screen p-6 space-y-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Change theme</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-56">
          <ThemeMenu />
        </DropdownMenuContent>
      </DropdownMenu>
      <Card>
        <CardHeader>
          <CardTitle>Card title</CardTitle>
          <CardDescription>Muted description text uses semantic tokens.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input placeholder="Input field" />
          <div className="flex gap-2">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};
