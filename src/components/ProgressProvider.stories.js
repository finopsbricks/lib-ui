/**
 * ProgressProvider Stories - User Journey Pattern
 */

import React from 'react';
import { ProgressProvider } from './ProgressProvider';

const meta = {
  title: 'components/ProgressProvider',
  component: ProgressProvider,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

/**
 * USER JOURNEY STORY 1: During Navigation
 */
export const DuringNavigation = {
  render: () => (
    <ProgressProvider>
      <div style={{ padding: '2rem' }}>
        <h1>Page Content</h1>
        <p>During navigation, you would see a thin blue progress bar at the very top of the viewport.</p>
        <p>The bar animates from left to right showing loading progress.</p>

        <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f3f4f6', borderRadius: '0.5rem' }}>
          <p style={{ fontSize: '0.875rem', color: '#374151', margin: 0 }}>
            <strong>Simulated navigation state:</strong> Imagine a 4px blue bar (#0d99fd) sliding across the top of the screen.
          </p>
          <div style={{
            marginTop: '0.5rem',
            height: '4px',
            backgroundColor: '#0d99fd',
            width: '60%',
            borderRadius: '2px',
            animation: 'shimmer 1.5s infinite'
          }}></div>
        </div>
      </div>
    </ProgressProvider>
  ),
};

/**
 * USER JOURNEY STORY 2: Configured State
 */
export const ConfiguredState = {
  render: () => (
    <ProgressProvider>
      <div style={{ padding: '2rem' }}>
        <h1>Application with Progress Bar Provider</h1>
        <p>Progress bar provider is configured and ready to show loading bar during navigation.</p>

        <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#eff6ff', borderRadius: '0.5rem', border: '1px solid #bfdbfe' }}>
          <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1e40af', marginBottom: '0.5rem' }}>
            Configuration:
          </p>
          <ul style={{ fontSize: '0.875rem', color: '#1e3a8a', margin: 0, paddingLeft: '1.5rem' }}>
            <li>Height: 4px</li>
            <li>Color: #0d99fd (blue)</li>
            <li>Spinner: Disabled</li>
            <li>Position: Top of viewport</li>
          </ul>
        </div>
      </div>
    </ProgressProvider>
  ),
};

/**
 * USER JOURNEY STORY 3: After Navigation Complete
 */
export const AfterNavigationComplete = {
  render: () => (
    <ProgressProvider>
      <div style={{ padding: '2rem' }}>
        <h1>Page Loaded Successfully</h1>
        <p>Navigation completed. Progress bar reached 100% and disappeared.</p>

        <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f0fdf4', borderRadius: '0.5rem', border: '1px solid #bbf7d0' }}>
          <p style={{ fontSize: '0.875rem', color: '#166534', margin: 0 }}>
            Page fully loaded - Progress bar completed and hidden - Ready for next navigation
          </p>
        </div>

        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f3f4f6', borderRadius: '0.5rem' }}>
          <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
            Try navigating:
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}>
              Transactions
            </button>
            <button style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}>
              Statements
            </button>
            <button style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}>
              Rules
            </button>
          </div>
          <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.5rem', marginBottom: 0 }}>
            In real app, clicking these would show the progress bar during navigation
          </p>
        </div>
      </div>
    </ProgressProvider>
  ),
};

/**
 * USER JOURNEY STORY 4: Developer Interactive
 */
export const DeveloperInteractive = {
  render: () => (
    <ProgressProvider>
      <div style={{ padding: '2rem' }}>
        <h1>Progress Bar Provider Testing</h1>
        <p>For developer testing of the progress bar configuration and behavior.</p>

        <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#fef3c7', borderRadius: '0.5rem', border: '1px solid #fde68a' }}>
          <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#92400e', marginBottom: '0.5rem' }}>
            Testing Notes:
          </p>
          <ul style={{ fontSize: '0.875rem', color: '#78350f', margin: 0, paddingLeft: '1.5rem' }}>
            <li>Provider uses @bprogress/next library</li>
            <li>Automatically hooks into Next.js router events</li>
            <li>Appears at top of viewport during navigation</li>
            <li>4px height keeps it subtle and unobtrusive</li>
            <li>Blue color (#0d99fd) matches primary brand color</li>
            <li>No spinner for cleaner appearance</li>
          </ul>
        </div>

        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f3f4f6', borderRadius: '0.5rem' }}>
          <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
            How to test:
          </p>
          <ol style={{ fontSize: '0.875rem', color: '#4b5563', margin: 0, paddingLeft: '1.5rem' }}>
            <li>Navigate between pages in the app</li>
            <li>Observe thin blue bar at top during loading</li>
            <li>Verify bar disappears after page loads</li>
            <li>Check bar height and color match config</li>
            <li>Confirm no spinner appears during loading</li>
          </ol>
        </div>
      </div>
    </ProgressProvider>
  ),
};
