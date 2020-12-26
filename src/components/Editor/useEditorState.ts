import { useCallback, useState } from 'react';

import { EditorProps, Value, Direction } from './types';

export const useEditorState = (): EditorProps => {
  const [value, setValue] = useState<Value>('');
  const [direction, setDirection] = useState<Direction>('vertical');

  const toggleDirection = useCallback(
    () =>
      setDirection((oldDirection) => {
        switch (oldDirection) {
          case 'horizontal':
            return 'vertical';
          case 'vertical':
            return 'horizontal';
          default:
            throw new Error(
              `an invalid value was set to direction: \`${oldDirection}\``
            );
        }
      }),
    []
  );

  return {
    value,
    onChange: setValue,
    direction,
    setDirection,
    toggleDirection,
  };
};
