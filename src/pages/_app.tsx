import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { VFC } from 'react';

import { theme } from '../theme';

const MyApp: VFC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default MyApp;
