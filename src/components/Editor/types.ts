import { NovelElement, NovelElementName } from '../../lib/novel';
import { UniqueId } from '../../lib/uniqueId';

export type ValueElement<Name extends NovelElementName> = NovelElement<Name> & {
  id: UniqueId;
  children: NovelElement<Name>['children'] extends NovelElement<
    infer ChildrenName
  >[]
    ? ValueElement<ChildrenName>[]
    : NovelElement<Name>['children'];
};

export type Value = {
  root: ValueElement<'root'>;
  ValueElements: { [Id in UniqueId]: ValueElement<NovelElementName> };
};

export type Direction = 'vertical' | 'horizontal';
export type EditorProps = {
  value: Value;
  direction: Direction;
  setDirection: (direction: Direction) => void;
  toggleDirection: () => void;
  onChange: (newValue: Value) => void;
};

export type EditorElementProps = {
  value: NovelElement<Exclude<NovelElementName, 'root'>>;
  // onChange: (newValue: NovelElement<Exclude<NovelElementName, 'root'>>) => void;
};
