import {
  Box,
  Button,
  ButtonGroup,
  Icon,
  IconButton,
  useColorMode,
} from '@chakra-ui/react';
import Head from 'next/head';
import { useState, VFC } from 'react';
import {
  HiMoon,
  HiOutlineArrowNarrowDown,
  HiOutlineArrowNarrowRight,
  HiSun,
} from 'react-icons/hi';
import { Node } from 'slate';
import { Slate } from 'slate-react';

import { Editable } from '../components/Editable/Editable';
import { Logo } from '../components/Logo';
import { useDirection } from '../lib/direction';
import { createEditor } from '../lib/editor/plugins';

const IndexPage: VFC = () => {
  const [editor] = useState(createEditor);
  const { direction, toggleDirection } = useDirection();
  const { colorMode, toggleColorMode } = useColorMode();

  const [value, setValue] = useState<Node[]>([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]);

  return (
    <>
      <Head>
        <title>WriterLighter</title>
      </Head>
      <ButtonGroup p="2" position="fixed" top="0" left="0">
        <Button variant="ghost" p="2">
          <Box as="span" display="inline-block" h="10" w="10">
            <Logo />
          </Box>
        </Button>
      </ButtonGroup>
      <Slate
        editor={editor}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      >
        <Editable direction={direction} />
        <ButtonGroup p="2" position="fixed" bottom="0" right="0">
          <IconButton
            colorScheme="gray"
            variant="ghost"
            p="2"
            onClick={toggleDirection}
            aria-label={
              direction === 'horizontal'
                ? '縦書きで表示する'
                : '横書きで表示する'
            }
            icon={
              <Box
                as="span"
                display="inline-block"
                position="relative"
                h="6"
                w="6"
              >
                <Box
                  as="span"
                  fontSize="xs"
                  position="absolute"
                  top="0"
                  left="0"
                  aria-hidden="true"
                >
                  あ
                </Box>
                {direction === 'horizontal' ? (
                  <HiOutlineArrowNarrowRight
                    style={{
                      position: 'absolute',
                      width: '1.5rem',
                      height: '1.5rem',
                      bottom: '-0.5rem',
                      right: 0,
                    }}
                  />
                ) : (
                  <HiOutlineArrowNarrowDown
                    style={{
                      position: 'absolute',
                      width: '1.5rem',
                      height: '1.5rem',
                      bottom: 0,
                      right: '-0.5rem',
                    }}
                  />
                )}
              </Box>
            }
          />

          <IconButton
            colorScheme="gray"
            variant="ghost"
            p="2"
            onClick={toggleColorMode}
            aria-label={
              colorMode === 'light'
                ? 'ダークモードにする'
                : 'ライトモードにする'
            }
            icon={<Icon as={colorMode === 'light' ? HiMoon : HiSun} />}
          />
        </ButtonGroup>
      </Slate>
    </>
  );
};

export default IndexPage;
