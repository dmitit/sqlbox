import { Button, ButtonGroup } from '@heroui/react';
import Editor from '@monaco-editor/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';

type File = {
   name: string;
   value: string;
};

const QueryInput = () => {
   const [files, setFiles] = useState<File[]>([
      {
         name: 'query.sql',
         value: 'SELECT * FROM table_name;',
      },
   ]);

   const [activeFilename, setActiveFilename] = useState(files[0].name);

   const handleTabChange = (name: string) => {
      setActiveFilename(name);
   };

   const handleAddFile = () => {
      const filename = `query${files.length}.sql`;

      const newFile: File = {
         name: filename,
         value: `-- Add your queries here. ${filename}`,
      };

      setFiles((prev) => [...prev, newFile]);
      setActiveFilename(newFile.name);
   };

   const activeFile = files.find((file) => file.name === activeFilename);

   return (
      <div className="h-full flex flex-col">
         <div className="flex">
            <ButtonGroup>
               {files.map((file) => (
                  <Button
                     onClick={() => handleTabChange(file.name)}
                     size="sm"
                     radius="none"
                     key={file.name}
                  >
                     {file.name}
                  </Button>
               ))}
               <Button
                  isIconOnly
                  size="sm"
                  radius="none"
                  onClick={handleAddFile}
               >
                  <Plus size={16} />
               </Button>
            </ButtonGroup>
         </div>
         <Editor
            height="100%"
            theme="light"
            path={activeFile?.name}
            defaultLanguage="sql"
            defaultValue={activeFile?.value}
         />
      </div>
   );
};

export default QueryInput;
