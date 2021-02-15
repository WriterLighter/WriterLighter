import { Box, Text } from '@chakra-ui/react';
import {
  ClipboardEvent,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
  VFC,
} from 'react';

import { Value, EditorProps, EditorElementProps } from './types';

export const EditorElement: VFC<EditorElementProps> = ({ value }) => {
  if (value.name === 'text') {
    return (
      <Text display="inline" as="span">
        {value.value}
      </Text>
    );
  }

  const children = value.children.map((childValue) => (
    <EditorElement value={childValue} key={JSON.stringify(childValue)} />
  ));

  switch (value.name) {
    case 'line':
      return <Text as="p">{children}</Text>;
    default:
      throw new Error('Invalid child value');
  }
};

export const Editor: VFC<EditorProps> = ({ value, onChange, direction }) => {
  const inputRef = useRef<HTMLDivElement>(null);

  return (
    <Box
      as="div"
      sx={{
        writingMode:
          direction === 'horizontal'
            ? 'horizontal-tb'
            : direction === 'vertical'
            ? 'vertical-rl'
            : '',
      }}
      maxH={direction === 'vertical' ? 'full' : undefined}
      maxW={direction === 'horizontal' ? 'full' : undefined}
      minH="full"
      minW="full"
      whiteSpace="pre-wrap"
      ref={inputRef}
      contentEditable
      lineHeight={2}
      _focus={{ outline: 'none', boxShadow: 'outline' }}
    >
      {value.children.map((childValue) => (
        <EditorElement value={childValue} key={JSON.stringify(childValue)} />
      ))}
    </Box>
  );
};
