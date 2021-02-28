import { EditorPlug, RenderElementPlug } from '../types';

export const withRuby: EditorPlug = (editor) => {
  const { isInline } = editor;

  editor.isInline = (element) => {
    return (
      element.type === 'ruby' ||
      element.type === 'ruby-text' ||
      isInline(element)
    );
  };

  return editor;
};

export const withRubyRenderElement: RenderElementPlug = (renderElement) => {
  return function renderRubyElement(props) {
    switch (props.element.type) {
      case 'ruby':
        return <ruby {...props.attributes}>{props.children}</ruby>;
      case 'ruby-text':
        return <rt {...props.attributes}>{props.children}</rt>;
      default:
        return renderElement(props);
    }
  };
};
