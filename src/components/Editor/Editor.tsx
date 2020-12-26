import { FormEvent, useEffect, useRef, useState, VFC } from 'react';

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

  const handleInput = (event: FormEvent<HTMLElement>) => {
    const newText = event.currentTarget.innerText;

    setInnerValue(newText);
    onChange(newText);
  };

  return (
    <div
      className={`${
        direction === 'horizontal'
          ? 'writing-horizontal max-w-full '
          : direction === 'vertical'
          ? 'writing-vertical max-h-full '
          : ''
      }min-h-full min-w-full focus:outline-none focus:ring whitespace-pre-wrap`}
      onInput={handleInput}
      ref={inputRef}
      contentEditable
    />
  );
};
