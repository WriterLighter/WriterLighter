import { Editor } from 'slate';
import { ReactEditor, RenderElementProps } from 'slate-react';

import { Endomorphism } from '../../utilTypes';

export type RenderElement = (props: RenderElementProps) => JSX.Element;

export type EditorPlug<T extends Editor = ReactEditor> = Endomorphism<T>;
export type RenderElementPlug = Endomorphism<RenderElement>;
