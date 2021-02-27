import { Box, Button, ButtonGroup, Flex } from '@chakra-ui/react';
import Head from 'next/head';
import { VFC } from 'react';

import { Editor } from '../components/Editor/Editor';
import { useEditorState } from '../components/Editor/useEditorState';
import { Logo } from '../components/Logo';

const IndexPage: VFC = () => {
  const editor = useEditorState();

  return (
    <Flex w="full" h="full" flexDir="column">
      <Head>
        <title>WriterLighter</title>
      </Head>
      <ButtonGroup p="2">
        <Button variant="ghost" p="2">
          <Box as="span" display="inline-block" h="10" w="10">
            <Logo />
          </Box>
        </Button>
      </ButtonGroup>
      <Box flexGrow={1} overflow="scroll">
        <Editor {...editor} />
      </Box>
    </Flex>
  );
};

export default IndexPage;
