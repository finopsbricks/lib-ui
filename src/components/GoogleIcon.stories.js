/**
 * GoogleIcon Stories - User Journey Pattern
 */

import GoogleIcon from './GoogleIcon';

export default {
  title: 'components/GoogleIcon',
  component: GoogleIcon,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes to apply. Default size is h-6 w-6 (24px)',
    },
  },
};

/**
 * USER JOURNEY STORY 1: On Google Sign-In Button
 */
export const OnGoogleSignInButton = {
  args: {},
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1.5rem', border: '1px solid #dadce0', borderRadius: '0.375rem', backgroundColor: 'white', cursor: 'pointer' }}>
      <GoogleIcon {...args} />
      <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#3c4043' }}>Sign in with Google</span>
    </div>
  ),
};

/**
 * USER JOURNEY STORY 2: In Authentication Header
 */
export const InAuthenticationHeader = {
  args: {
    className: 'h-8 w-8',
  },
  render: (args) => (
    <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: '#f8f9fa', borderRadius: '0.5rem' }}>
      <GoogleIcon {...args} />
      <h2 style={{ marginTop: '1rem', fontSize: '1.25rem', fontWeight: '600', color: '#202124' }}>Continue with Google</h2>
      <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#5f6368' }}>Use your Google account to sign in</p>
    </div>
  ),
};

/**
 * USER JOURNEY STORY 3: On Social Login List
 */
export const OnSocialLoginList = {
  args: {
    className: 'h-4 w-4',
  },
  render: (args) => (
    <div style={{ width: '300px', padding: '1rem', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}>
      <h3 style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.75rem', color: '#111827' }}>Sign in with:</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', backgroundColor: 'white', fontSize: '0.875rem' }}>
          <GoogleIcon {...args} />
          <span>Google</span>
        </button>
        <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', backgroundColor: 'white', fontSize: '0.875rem' }}>
          <div style={{ width: '16px', height: '16px', backgroundColor: '#1877f2', borderRadius: '50%' }}></div>
          <span>Facebook</span>
        </button>
        <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', backgroundColor: 'white', fontSize: '0.875rem' }}>
          <div style={{ width: '16px', height: '16px', backgroundColor: '#333', borderRadius: '50%' }}></div>
          <span>GitHub</span>
        </button>
      </div>
    </div>
  ),
};

/**
 * USER JOURNEY STORY 4: With Hover Effect
 */
export const WithHoverEffect = {
  args: {
    className: 'h-10 w-10 opacity-75 hover:opacity-100 transition-opacity',
  },
  render: (args) => (
    <div style={{ padding: '2rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem', textAlign: 'center' }}>
      <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>Hover over the icon to see the effect</p>
      <GoogleIcon {...args} />
    </div>
  ),
};

/**
 * USER JOURNEY STORY 5: Developer Interactive
 */
export const DeveloperInteractive = {
  args: {
    className: 'h-6 w-6',
  },
};
