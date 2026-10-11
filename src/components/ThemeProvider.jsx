'use client'
import { ThemeProvider as NextThemesProvider } from 'next-themes';

/**
 * App-wide theme provider (Light / Dark / System). Toggles the `dark` class on `<html>`
 * and persists the choice in localStorage per origin, so self-hosted apps need no shared
 * cookie or backend. The root `<html>` must carry `suppressHydrationWarning`.
 *
 * Any next-themes prop can be overridden, e.g. `forcedTheme="light"` as a kill-switch.
 *
 * @param {import('next-themes').ThemeProviderProps} props
 * @returns {React.JSX.Element}
 */
export function ThemeProvider({ children, ...props }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
      themes={['light', 'dark']}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
