type Flat<T> = { [K in keyof T]: T[K] };

export type NovelElements =
  | { name: 'text'; children?: never; value: string }
  | { name: 'line'; children: NovelElement<'text'>[] }
  | { name: 'root'; children: NovelElement<'line'>[] };

export type NovelElementName = NovelElements['name'];

export type NovelElement<Name extends NovelElementName> = Flat<
  NovelElements & { name: Name }
>;
