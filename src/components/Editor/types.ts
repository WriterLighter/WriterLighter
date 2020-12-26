export type Value = string;

export type Direction = 'vertical' | 'horizontal';
export type EditorProps = {
  value: Value;
  direction: Direction;
  setDirection: (direction: Direction) => void;
  toggleDirection: () => void;
  onChange: (newValue: Value) => void;
};
