import { Flex } from '@chakra-ui/react';
import { VFC } from 'react';
import { Editable as SlateEditable } from 'slate-react';

import { renderElement } from '../../lib/editor/plugins';

export const Editable: VFC<{ direction: 'vertical' | 'horizontal' }> = ({
  direction,
}) => {
  return (
    <Flex
      h="max-content"
      w="max-content"
      minH="full"
      minW="full"
      alignItems="center"
      flexDir={direction === 'vertical' ? 'row' : 'column'}
    >
      <SlateEditable
        placeholder="自由にお書き下さい。"
        style={{
          lineHeight: 2,

          height: '100%',
          width: '100%',

          maxHeight: direction === 'vertical' ? '40rem' : 'max-content',
          maxWidth: direction === 'horizontal' ? '40rem' : 'max-content',

          minHeight: direction === 'horizontal' ? '100%' : 0,
          minWidth: direction === 'vertical' ? '100%' : 0,

          paddingTop: direction === 'horizontal' ? '4rem' : '1rem',
          paddingBottom: direction === 'horizontal' ? '50vh' : '1rem',
          paddingRight: direction === 'vertical' ? '4rem' : '1rem',
          paddingLeft: direction === 'vertical' ? '50vw' : '1rem',

          writingMode:
            direction === 'horizontal'
              ? 'horizontal-tb'
              : direction === 'vertical'
              ? 'vertical-rl'
              : undefined,
        }}
        renderElement={renderElement}
      />
    </Flex>
  );
};
