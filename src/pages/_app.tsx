import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { VFC } from 'react';

import { theme } from '../theme';

const MyApp: VFC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default MyApp;
