import { createEditor as slateCreateEditor } from 'slate';
import { withReact } from 'slate-react';

import { withRuby, withRubyRenderElement } from './plugins/ruby';
import { RenderElement } from './types';

const renderDefaultElement: RenderElement = (props) => (
  <div {...props.attributes}>{props.children}</div>
);

export const createEditor = () => withRuby(withReact(slateCreateEditor()));

export const renderElement: RenderElement = withRubyRenderElement(
  renderDefaultElement
);
