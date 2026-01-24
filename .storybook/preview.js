import { INITIAL_VIEWPORTS } from 'storybook/viewport';
import '../src/styles/globals.css';

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    },
    viewport: {
      options: INITIAL_VIEWPORTS,
    },
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/',
        query: {},
      },
    },
    layout: 'centered',
  },
  initialGlobals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
  decorators: [
    (Story, context) => {
      const description = context.parameters?.description;

      return (
        <div>
          {description && (
            <div className="px-4 py-2 mb-2 bg-sky-50 border-b border-sky-600 text-sm leading-relaxed text-slate-700">
              <span className='font-semibold'>Description: </span>{description}
            </div>
          )}
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
