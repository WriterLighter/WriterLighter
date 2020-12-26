import { VFC } from 'react';

import { Editor } from '../components/Editor/Editor';
import { useEditorState } from '../components/Editor/useEditorState';

const IndexPage: VFC = () => {
  const editor = useEditorState();

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="p-2">
        <button
          type="button"
          onClick={() => editor.onChange(`${editor.value}hoge`)}
          className="px-2 py-1 bg-blue-500 text-white rounded mr-4"
        >
          edit (add `hoge` to tail)
        </button>
        <button
          type="button"
          onClick={editor.toggleDirection}
          className="px-2 py-1 bg-blue-500 text-white rounded mr-4"
        >
          toggle
        </button>
      </div>
      <div className="flex-grow overflow-scroll">
        <Editor {...editor} />
      </div>
    </div>
  );
};

export default IndexPage;
