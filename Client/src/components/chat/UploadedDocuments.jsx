import { Download, FileText } from "lucide-react";

const UploadedDocuments = ({ files = [] }) => {

    const handleDownload = (e, file) => {
        e.stopPropagation();
        const link = document.createElement("a");
        link.href = file.cloudinaryUrl;
        link.download = file.fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (files.length === 0) return null;
    return (

        <div className="border-b border-neutral-800 bg-[#212121] px-6 py-4">
            <div className="mx-auto max-w-4xl">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral-400">
                    Uploaded Documents
                </h3>
                <div className="flex gap-3 overflow-x-auto pb-2">
                    {files.map((file) => (
                        <div
                            key={file._id}
                            onClick={() => window.open(file.cloudinaryUrl, "_blank")}
                            className="
                                w-56
                                shrink-0
                                cursor-pointer
                                rounded-xl
                                border
                                border-neutral-700
                                bg-[#2B2B2B]
                                p-3
                                transition-all
                                duration-200
                                hover:-translate-y-0.5
                                hover:border-neutral-500
                                hover:bg-[#333333]
                                hover:shadow-lg
                            "
                        >

                            {/* Top */}
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <FileText  size={24}  className="text-blue-400 shrink-0"/>
                                    <div className="min-w-0">
                                        <p title={file.fileName} className="truncate text-sm font-medium text-white" >
                                            {file.fileName}
                                        </p>
                                        <p className="text-xs text-neutral-500">
                                            {file.fileType.toUpperCase()}
                                        </p>
                                    </div>
                                </div>
                                <button onClick={(e) =>  handleDownload(e, file) }
                                    className="
                                        rounded-md
                                        p-2
                                        text-neutral-400
                                        transition
                                        hover:bg-neutral-700
                                        hover:text-white
                                    "
                                    title="Download"
                                >
                                    <Download size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

};

export default UploadedDocuments;