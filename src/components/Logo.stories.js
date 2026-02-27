/**
 * Logo Stories - User Journey Pattern
 *
 * These stories represent real user scenarios/journeys rather than technical component variations.
 * Each story answers: "When/why does a user see this component?"
 *
 * Story naming convention: <UserAction/State>
 * Examples: OnDesktopNavigation, OnMobileHeader, InAuthenticationPages
 */

import Logo from './Logo';

export default {
  title: 'components/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/',
      },
    },
  },
  argTypes: {
    offering: {
      control: { type: 'text' },
      description: 'Text to display next to the logo icon. Set to empty string to hide text (icon-only mode).',
    },
    href: {
      control: { type: 'text' },
      description: 'URL to navigate to when logo is clicked.',
    },
    class_name: {
      control: { type: 'text' },
      description: 'Additional CSS classes to apply to the logo container.',
    },
  },
};

/**
 * USER JOURNEY STORY 1: On Desktop Navigation
 *
 * When: User viewing the app on desktop/laptop with full width navigation bar.
 *       Logo appears in header with both icon and "Cashflowy" text.
 *
 * User sees: Full logo with icon and "Cashflowy" text, clickable to navigate home.
 *            Standard branding presentation with good visibility.
 *
 * Tests: Full logo rendering with text, clickability, proper spacing, brand recognition.
 */
export const OnDesktopNavigation = {
  parameters: {
    description: 'Desktop header: User sees full Cashflowy logo with icon and text in navigation bar. Clicking navigates to homepage. Most common logo presentation across the app. Provides strong brand presence and easy navigation.',
  },
  args: {
    offering: 'Cashflowy',
    href: '/',
  },
};

/**
 * USER JOURNEY STORY 2: On Mobile Header
 *
 * When: User viewing the app on mobile device with limited horizontal space.
 *       Header space is constrained, showing icon-only version to save space.
 *
 * User sees: Compact logo showing just the icon without "Cashflowy" text.
 *            Maintains brand identity while conserving precious mobile screen space.
 *
 * Tests: Icon-only rendering, proper sizing for mobile, still clickable, recognizable brand.
 */
export const OnMobileHeader = {
  parameters: {
    description: 'Mobile compact view: User on phone sees icon-only logo to save horizontal space. Icon is still clickable and recognizable. Common in mobile navigation where every pixel counts. Text hidden but brand identity maintained through icon.',
  },
  args: {
    offering: '',
    href: '/',
  },
};

/**
 * USER JOURNEY STORY 3: In Authentication Pages
 *
 * When: User on login, signup, or password reset page. Logo provides branding
 *       context while user authenticates.
 *
 * User sees: Full logo (icon + text) centered on authentication page.
 *            Creates professional, branded experience during login flow.
 *
 * Tests: Logo rendering on auth pages, proper alignment, navigation to home from auth context.
 */
export const InAuthenticationPages = {
  parameters: {
    description: 'Login/signup context: User sees Cashflowy logo at top of authentication page. Provides brand context and assurance. Logo links to home page, allowing user to return to main site. Common on login, signup, password reset pages.',
  },
  args: {
    offering: 'Cashflowy',
    href: '/',
  },
  render: (args) => (
    <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem' }}>
      <Logo {...args} />
      <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: 'white', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem' }}>Sign in to your account</h2>
        <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Enter your credentials to continue</p>
      </div>
    </div>
  ),
};

/**
 * USER JOURNEY STORY 4: With Custom Styling
 *
 * When: Logo needs to adapt to different page contexts (marketing pages, special sections)
 *       with custom backgrounds or styling requirements.
 *
 * User sees: Logo with custom styling applied (background, padding, borders, etc.).
 *            Flexible presentation maintaining brand while fitting page design.
 *
 * Tests: Custom className application, style inheritance, visual adaptability.
 */
export const WithCustomStyling = {
  parameters: {
    description: 'Styled variant: Logo with custom background and styling for special sections. Demonstrates flexibility - logo can adapt to different page contexts while maintaining brand identity. Useful for marketing pages, banners, or highlighted sections.',
  },
  args: {
    offering: 'Cashflowy',
    href: '/',
    className: 'bg-blue-50 px-4 py-2 rounded-lg border border-blue-200',
  },
};

/**
 * USER JOURNEY STORY 5: In Footer
 *
 * When: User scrolled to bottom of page where footer contains logo and links.
 *       Footer logo provides branding consistency and navigation option.
 *
 * User sees: Logo in footer context, typically smaller or styled to match footer design.
 *            Provides brand presence throughout entire page scroll.
 *
 * Tests: Logo rendering in footer context, appropriate sizing, navigation behavior.
 */
export const InFooter = {
  parameters: {
    description: 'Footer context: Logo appears in page footer with subtle opacity, increasing on hover. Provides branding consistency from header to footer. Common in marketing and public pages. Maintains navigation capability throughout page.',
  },
  args: {
    offering: 'Cashflowy',
    href: '/',
    className: 'opacity-80 hover:opacity-100 transition-opacity',
  },
  render: (args) => (
    <div style={{ backgroundColor: '#1f2937', color: 'white', padding: '2rem', borderRadius: '0.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Logo {...args} />
        <div style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
          © 2024 Cashflowy. All rights reserved.
        </div>
      </div>
    </div>
  ),
};

/**
 * USER JOURNEY STORY 6: Developer Interactive
 *
 * When: Developer is testing logo component in different contexts, sizes, and styling scenarios.
 *
 * User sees: Interactive logo to test various configurations including text visibility,
 *            custom styling, and sizing.
 *
 * Tests: Manual testing of complete functionality:
 *        - Test with and without "offering" text
 *        - Test different href values
 *        - Test custom className styling
 *        - Test responsive behavior
 *        - Test in different color contexts (light/dark backgrounds)
 *        - Test clickability and navigation
 */
export const DeveloperInteractive = {
  parameters: {
    description: 'Interactive testing: For developer manual testing of logo configurations. Try modifying args:\\n\\n**offering options:**\\n- "Cashflowy" - Full logo with text\\n- "" (empty string) - Icon only\\n- "Custom Text" - Different brand text\\n\\n**href:** Change navigation destination\\n\\n**className:** Add custom styles (backgrounds, padding, borders, opacity, hover effects, sizing with scale-*)\\n\\nTest logo in different contexts: headers, footers, auth pages, mobile views.',
  },
  args: {
    offering: 'Cashflowy',
    href: '/',
  },
};
