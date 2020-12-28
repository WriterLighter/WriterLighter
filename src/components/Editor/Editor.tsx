import { Box, Textarea } from '@chakra-ui/react';
import {
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
  VFC,
} from 'react';

import { Value, EditorProps } from './types';

export const Editor: VFC<EditorProps> = ({ value, onChange, direction }) => {
  const [innerValue, setInnerValue] = useState<Value>('');

  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // when value is changed by program. not by user types key.
    if (innerValue !== value) {
      setInnerValue(value);

      if (inputRef.current !== null) {
        inputRef.current.innerText = value;
      }
    }
  }, [innerValue, value]);

  const handleInput = useCallback(
    (event: FormEvent<HTMLElement>) => {
      const newText = event.currentTarget.innerText;

      setInnerValue(newText);
      onChange(newText);
    },
    [onChange]
  );

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
      onInput={handleInput}
      ref={inputRef}
      contentEditable
      lineHeight={2}
      _focus={{ outline: 'none', boxShadow: 'outline' }}
    />
  );
};
