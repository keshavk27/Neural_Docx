import { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";

const ALLOWED_TYPES = [".pdf",".docx",".pptx",".txt",".csv",".xlsx",];

const FileDropzone = ({files,setFiles,maxFiles = 3,disabled=false}) => {

    const inputRef = useRef(null);
    const [dragActive, setDragActive] = useState(false);

    const addFiles = (selectedFiles) => {

        let newFiles = [...files];

        for (const file of selectedFiles) 
        {
            const extension ="." + file.name.split(".").pop().toLowerCase();

            if (!ALLOWED_TYPES.includes(extension)) 
            {
                alert(`${file.name} is not supported.`);
                continue;
            }

            const alreadyExists = newFiles.some((f) =>f.name === file.name &&f.size === file.size);

            if (alreadyExists) continue;

            if (newFiles.length >= maxFiles) 
            {
                alert(`Maximum ${maxFiles} files allowed.`);
                break;
            }

            newFiles.push(file);
        }
        setFiles(newFiles);
    };

    const handleInputChange = (e) => {
        if(disabled) return;
        if (!e.target.files) return;
        addFiles(Array.from(e.target.files));
    };

    const handleDrop = (e) => {
        e.preventDefault();
        if(disabled) return;
        setDragActive(false);
        if (!e.dataTransfer.files) return;
        addFiles(Array.from(e.dataTransfer.files));
    };

    return (
        <div
            onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
            }}

            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={`
                flex
                cursor-pointer
                flex-col
                items-center
                justify-center
                rounded-2xl
                border-2
                border-dashed
                p-10
                transition-all
                duration-200
                ${
                    dragActive
                        ? "border-white bg-neutral-800"
                        : "border-neutral-600"
                }
            `}
            onClick={() => {
                if(!disabled) 
                {
                    inputRef.current.click()
                }
            }}
        >

            <UploadCloud
                size={48}
                className="mb-4 text-neutral-400"
            />

            <h3 className="text-lg font-semibold text-white">

                Drag & Drop Documents

            </h3>

            <p className="mt-2 text-sm text-neutral-400">

                or click to browse

            </p>

            <p className="mt-4 text-xs text-neutral-500">

                PDF • DOCX • PPTX • TXT • CSV • XLSX

            </p>

            <input
                ref={inputRef}
                type="file"
                multiple
                accept={ALLOWED_TYPES.join(",")}
                onChange={handleInputChange}
                className="hidden"
            />

        </div>

    );
};

export default FileDropzone;