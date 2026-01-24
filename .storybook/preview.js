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
    viewport: {
      options: INITIAL_VIEWPORTS,
    },
    layout: 'centered',
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
