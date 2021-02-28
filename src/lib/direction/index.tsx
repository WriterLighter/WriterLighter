import { useCallback, useState } from 'react';

export type Direction = 'vertical' | 'horizontal';

export const useDirection = (): {
  direction: Direction;
  setDirection: (newDirection: Direction) => void;
  toggleDirection: () => void;
} => {
  const [direction, setDirection] = useState<Direction>('horizontal');
  const toggleDirection = useCallback(
    () =>
      setDirection((old) => (old === 'horizontal' ? 'vertical' : 'horizontal')),
    []
  );

  return { direction, setDirection, toggleDirection };
};
