import Editor, { OnChange } from '@monaco-editor/react';
import { PrimaryLoader } from '@/ui/PrimaryLoader';
import { InputFile } from '@/features/query-input/QueryInput';

interface QueryInputEditorProps {
   activeFile: InputFile;
   // onRunQuery: () => void;
   onChange: OnChange;
}

const QueryInputEditor = ({
   activeFile,
   // onRunQuery,
   onChange,
}: QueryInputEditorProps) => {
   return (
      <Editor
         theme="light"
         path={activeFile?.name}
         defaultLanguage="sql"
         loading={<PrimaryLoader />}
         options={{
            fontSize: 14,
            minimap: { autohide: true },
            cursorBlinking: 'smooth',
            smoothScrolling: true,
            mouseWheelZoom: true,
            quickSuggestions: true,
            parameterHints: { enabled: true },
            folding: true,
            links: true,
            scrollBeyondLastLine: false,
            padding: {
               bottom: 52,
            },
         }}
         value={activeFile.value}
         onChange={onChange}
         onMount={(editor) => {
            editor.focus();
            // editor.addCommand(
            //    monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
            //    () => {
            //       onRunQuery();
            //    },
            // );
         }}
      />
   );
};

export default QueryInputEditor;
