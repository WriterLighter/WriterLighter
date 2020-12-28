import { extendTheme, Theme } from '@chakra-ui/react';
import type { Styles } from '@chakra-ui/theme-tools';

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
});
