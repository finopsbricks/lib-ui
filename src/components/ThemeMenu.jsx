'use client'
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Monitor, Moon, Sun } from 'lucide-react';
import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '../primitives/dropdown-menu';

const THEME_OPTIONS = [
  { value: 'light', label: 'Light', Icon: Sun },
  { value: 'dark', label: 'Dark', Icon: Moon },
  { value: 'system', label: 'System', Icon: Monitor },
];

/**
 * "Theme" sub-menu (Light / Dark / System) for use inside a `DropdownMenuContent`,
 * e.g. an app's NavUser menu. Requires a `ThemeProvider` ancestor.
 *
 * @returns {React.JSX.Element}
 */
export function ThemeMenu() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  // The stored theme is only known on the client; render nothing checked until mounted.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const TriggerIcon = mounted && resolvedTheme === 'dark' ? Moon : Sun;

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className="gap-2 [&_svg:not([class*='text-'])]:text-muted-foreground">
        <TriggerIcon className="size-4" />
        Theme
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuRadioGroup value={mounted ? theme : ''} onValueChange={setTheme}>
          {THEME_OPTIONS.map(({ value, label, Icon }) => (
            <DropdownMenuRadioItem key={value} value={value}>
              <Icon />
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
}
