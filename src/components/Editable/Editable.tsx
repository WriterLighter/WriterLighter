import { VFC } from 'react';
import { Editable as SlateEditable } from 'slate-react';

import { renderElement } from '../../lib/editor/plugins';

export const Editable: VFC<{ direction: 'vertical' | 'horizontal' }> = ({
  direction,
}) => {
  return (
    <SlateEditable
      placeholder="自由にお書き下さい。"
      style={{
        lineHeight: 2,
        height: direction === 'vertical' ? '40rem' : 'auto',
        width: direction === 'horizontal' ? '40rem' : 'auto',
        minHeight: direction === 'horizontal' ? '100%' : 0,
        minWidth: direction === 'vertical' ? '100%' : 0,
        flexGrow: 1,
        paddingTop: direction === 'horizontal' ? '4rem' : 0,
        paddingBottom: direction === 'horizontal' ? '50vh' : 0,
        paddingRight: direction === 'vertical' ? '4rem' : 0,
        paddingLeft: direction === 'vertical' ? '50vw' : 0,
        marginTop: direction === 'vertical' ? 'auto' : 0,
        marginBottom: direction === 'vertical' ? 'auto' : 0,
        marginRight: direction === 'horizontal' ? 'auto' : 0,
        marginLeft: direction === 'horizontal' ? 'auto' : 0,

        writingMode:
          direction === 'horizontal'
            ? 'horizontal-tb'
            : direction === 'vertical'
            ? 'vertical-rl'
            : undefined,
      }}
      renderElement={renderElement}
    />
  );
};
