import { Editor, EditorState } from 'draft-js';
import { useStore } from 'effector-react';
import * as React from 'react';
import database from '../database';
import { change, load, open as openEditor } from '../states/editor/events';
import { editors as editorsStore } from '../states/editor/stores';
import { createNovel, open as openNovel } from '../states/novels/events';

const App = () => {
  const editor = useStore(editorsStore)[0];
  const onChange = React.useCallback(
    (editorState: EditorState) => change({ editorId: 0, editorState }),
    [],
  );

  React.useEffect(() => {
    (async () => {
      if ((await database.novels.count()) === 0) {
        await createNovel({
          title: 'WriterLighterへようこそ！',
          author: 'WriterLighter',
        });
      }

      await openNovel({ id: 1 });
      openEditor();
      load({ partId: 0, editorId: 0 });
    })();
  },              []);

  if (editor == null || editor.editorState == null) {
    return <span>loading...</span>;
  }
  return <Editor editorState={editor.editorState} onChange={onChange} />;
};

export default App;
