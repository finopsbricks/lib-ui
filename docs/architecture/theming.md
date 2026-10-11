# Theming (Light / Dark / System)

lib-ui owns the theme mechanism. Apps wire it in with three edits and never handle the theme
themselves.

## How it works

- Colors are CSS variables (`--background`, `--foreground`, `--card`, …) defined in
  `src/styles/globals.css`, once under `:root` (light) and again under `.dark`.
- `ThemeProvider` wraps [`next-themes`](https://github.com/pacocoursey/next-themes). It toggles the
  `dark` class on `<html>` and sets `color-scheme`, so native scrollbars and inputs follow along.
  An inline script applies the class before first paint, so there is no flash.
- `@custom-variant dark (&:is(.dark *))` makes `dark:` utilities key off that class rather than
  the OS setting.
- Default is **light**. Users opt into `dark` or `system` from the `ThemeMenu`.

## Persistence

The choice is stored in `localStorage` (key `theme`), **per origin**. Each app remembers its own
setting. This is deliberate: apps may be self-hosted on arbitrary domains, so we don't rely on a
shared parent-domain cookie or a user-preference column in the auth service.

## Wiring an app

1. Root layout: add `suppressHydrationWarning` to `<html>`, because next-themes edits its
   attributes before hydration. Then wrap the body in `ThemeProvider`, outside
   `SnackbarProvider` so toasts follow the theme:

   ```jsx
   import { ThemeProvider } from '@fob/lib-ui/components/ThemeProvider';

   <html lang="en" suppressHydrationWarning>
     <body>
       <ThemeProvider>
         <SnackbarProvider>{children}</SnackbarProvider>
       </ThemeProvider>
     </body>
   </html>
   ```

2. User menu (`NavUser`): place `<ThemeMenu />` inside the `DropdownMenuContent`:

   ```jsx
   import { ThemeMenu } from '@fob/lib-ui/components/ThemeMenu';
   ```

3. `globals.css`: import the lib-ui tokens instead of copying them, so palette changes ship
   with a version bump (see below).

Kill-switch: `<ThemeProvider forcedTheme="light">` pins an app to light without removing the
picker wiring.

## Writing theme-safe components

Use semantic token utilities (`bg-background`, `bg-card`, `text-foreground`,
`text-muted-foreground`, `bg-muted`, `border-border`, `bg-primary`, `text-destructive`, …),
not raw palette classes (`bg-white`, `text-gray-600`, `bg-red-50`) or hex values. Raw colors don't
change with the theme. When a raw color is unavoidable, pair it with a `dark:` variant.
