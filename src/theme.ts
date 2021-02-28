import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import type { Styles } from '@chakra-ui/theme-tools';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const styles: Styles = {
  global: {
    'html, body, #__next': {
      h: 'full',
      w: 'full',
    },
    body: {
      fontFamily: 'serif',
    },
  },
};

export const theme = extendTheme({
  styles,
  config,
});
