import { FileText, X } from "lucide-react";

const SelectedFileList = ({files,setFiles,}) => {

    const removeFile = (index) => {
        setFiles((prevFiles) =>
            prevFiles.filter((_, i) => i !== index)
        );
    };

    if (files.length === 0) 
    {
        return (
            <div className="rounded-xl border border-dashed border-neutral-700 py-8 text-center text-sm text-neutral-500">
                No files selected.
            </div>
        );

    }

    return (

        <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white">
                Selected Documents
            </h3>
            <div className="space-y-2">
                {
                    files.map((file, index) => (
                        <div  key={`${file.name}-${index}`} className="flex items-center justify-between rounded-xl border border-neutral-700 bg-[#303030] px-4 py-3">

                            <div className="flex min-w-0 items-center gap-3">
                                <FileText size={20} className="text-blue-400 shrink-0"/>
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-medium text-white">
                                        {file.name}
                                    </p>
                                    <p className="text-xs text-neutral-400">
                                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                                    </p>
                                </div>
                            </div>

                            <button type="button"  onClick={() => removeFile(index)} className="rounded-lg p-2 text-neutral-400 transition hover:bg-neutral-700 hover:text-red-400">
                                <X size={18} />
                            </button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default SelectedFileList;