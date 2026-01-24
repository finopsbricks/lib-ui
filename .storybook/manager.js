import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming/create';

const theme = create({
  base: 'light',
  brandTitle: 'SB / Fobrix UI',
});

addons.setConfig({
  theme,
});
