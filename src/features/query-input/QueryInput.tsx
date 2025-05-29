import { Plus, X } from 'lucide-react';
import { useRef, useState } from 'react';
import cn from 'clsx';
import { Button, Kbd } from '@heroui/react';
import QueryInputEditor from '@/features/query-input/QueryInputEditor';
import { useRunQuery } from '@/utils/useRunQuery';

export type InputFile = {
   name: string;
   value: string;
};

const DEFAULT_FILE = {
   name: 'query.sql',
   value: 'SELECT * FROM table_name;',
};

const QueryInput = () => {
   const [files, setFiles] = useState<InputFile[]>([DEFAULT_FILE]);
   const [activeFilename, setActiveFilename] = useState(DEFAULT_FILE.name);
   const [fileCounter, setFileCounter] = useState(1); // отдельный счётчик
   const runButtonRef = useRef<HTMLButtonElement>(null);
   const { runQuery } = useRunQuery();

   const handleRunQuery = () => {
      const a = runQuery('SELECT 1');
      console.log(a);
   };

   const handleTabChange = (name: string) => {
      setActiveFilename(name);
   };

   const handleAddFile = () => {
      const filename = `query${fileCounter}.sql`;
      const newFile: InputFile = {
         name: filename,
         value: `-- Add your queries here. ${filename}`,
      };
      setFiles((prev) => [...prev, newFile]);
      setActiveFilename(newFile.name);
      setFileCounter((prev) => prev + 1); // увеличиваем только при создании
   };

   const handleRemoveFile = (name: string) => {
      setFiles((prev) => {
         const filtered = prev.filter((file) => file.name !== name);
         if (name === activeFilename && filtered.length > 0) {
            setActiveFilename(filtered[filtered.length - 1].name);
         } else if (filtered.length === 0) {
            setActiveFilename(DEFAULT_FILE.name);
            setFileCounter(1);
            return [DEFAULT_FILE];
         }
         return filtered;
      });
   };

   const activeFile = files.find((file) => file.name === activeFilename);

   return (
      <div className="h-full flex flex-col">
         <div className="flex justify-between pr-3 items-center border-b border-foreground-200 bg-background">
            <div className="flex">
               <div className="flex">
                  {files.map((file) => (
                     <button
                        type="button"
                        onClick={() => handleTabChange(file.name)}
                        key={file.name}
                        className={cn(
                           'relative flex items-center gap-2 px-4 py-2 transition-all border-0 border-x-1 border-x-foreground-200 border-t-3 border-transparent outline-none200',
                           activeFilename === file.name
                              ? 'bg-background border-t-primary cursor-default'
                              : 'text-foreground-400 hover:text-foreground-700 cursor-pointer',
                        )}
                     >
                        <span>
                           <svg
                              width={16}
                              height={16}
                              viewBox="0 0 32 32"
                              xmlns="http://www.w3.org/2000/svg"
                              fill={'#ffda44'}
                           >
                              <title>file_type_sql</title>
                              <path d="M8.562,15.256A21.159,21.159,0,0,0,16,16.449a21.159,21.159,0,0,0,7.438-1.194c1.864-.727,2.525-1.535,2.525-2V9.7a10.357,10.357,0,0,1-2.084,1.076A22.293,22.293,0,0,1,16,12.078a22.36,22.36,0,0,1-7.879-1.3A10.28,10.28,0,0,1,6.037,9.7v3.55C6.037,13.724,6.7,14.528,8.562,15.256Z" />
                              <path d="M8.562,21.961a15.611,15.611,0,0,0,2.6.741A24.9,24.9,0,0,0,16,23.155a24.9,24.9,0,0,0,4.838-.452,15.614,15.614,0,0,0,2.6-.741c1.864-.727,2.525-1.535,2.525-2v-3.39a10.706,10.706,0,0,1-1.692.825A23.49,23.49,0,0,1,16,18.74a23.49,23.49,0,0,1-8.271-1.348,10.829,10.829,0,0,1-1.692-.825V19.96C6.037,20.426,6.7,21.231,8.562,21.961Z" />
                              <path d="M16,30c5.5,0,9.963-1.744,9.963-3.894V23.269a10.5,10.5,0,0,1-1.535.762l-.157.063A23.487,23.487,0,0,1,16,25.445a23.422,23.422,0,0,1-8.271-1.351c-.054-.02-.106-.043-.157-.063a10.5,10.5,0,0,1-1.535-.762v2.837C6.037,28.256,10.5,30,16,30Z" />
                              <ellipse
                                 cx="16"
                                 cy="5.894"
                                 rx="9.963"
                                 ry="3.894"
                              />
                           </svg>
                        </span>
                        <span>{file.name}</span>
                        <span
                           className="group cursor-pointer bg-transparent text-foreground-500 hover:text-foreground-900 transition-colors"
                           onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveFile(file.name);
                           }}
                        >
                           <div className="p-0.5 group-hover:bg-foreground-200">
                              <X size={16} />
                           </div>
                        </span>
                     </button>
                  ))}
               </div>
               <button
                  type="button"
                  onClick={(e) => {
                     e.stopPropagation();
                     handleAddFile();
                  }}
                  className="group cursor-pointer bg-transparent text-foreground-500 hover:text-foreground-900 transition-colors px-2"
                  tabIndex={0}
               >
                  <div className="p-0.5 group-hover:bg-foreground-200">
                     <Plus size={16} />
                  </div>
               </button>
            </div>
            <div>
               <Button
                  ref={runButtonRef}
                  variant="solid"
                  className="bg-primary-600 text-white rounded-sm"
                  size="sm"
                  onPress={handleRunQuery}
               >
                  <div className="flex items-center gap-2">
                     <span>Run</span>
                     <Kbd
                        className="rounded bg-transparent border-none py-0 text-white"
                        keys={['ctrl', 'enter']}
                     />
                  </div>
               </Button>
            </div>
         </div>
         <QueryInputEditor
            activeFile={activeFile}
            onRunQuery={() => {
               if (runButtonRef.current) {
                  const buttonElement = runButtonRef.current;

                  buttonElement.focus();

                  const keyDownEvent = new KeyboardEvent('keydown', {
                     key: 'Enter',
                     code: 'Enter',
                     keyCode: 13,
                     which: 13,
                     bubbles: true,
                     cancelable: true,
                  });
                  buttonElement.dispatchEvent(keyDownEvent);

                  const keyUpEvent = new KeyboardEvent('keyup', {
                     key: 'Enter',
                     code: 'Enter',
                     keyCode: 13,
                     which: 13,
                     bubbles: true,
                     cancelable: true,
                  });
                  buttonElement.dispatchEvent(keyUpEvent);
               }
            }}
         />
      </div>
   );
};

export default QueryInput;
