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

        <div className="border-b border-[#242B3D] bg-[#0B0E14] px-6 py-0.5">
            <div className="mx-auto max-w-6xl">
                <h3 className="mb-0.5 text-xs font-semibold uppercase tracking-wide text-[#97A1B8]">
                    Uploaded Documents
                </h3>
                <div className="flex gap-3 overflow-x-auto pb-1">
                    {files.map((file) => (
                        <div key={file._id} onClick={() => window.open(file.cloudinaryUrl, "_blank")} className="  w-48 shrink-0 cursor-pointer rounded-xl  border border-[#242B3D] bg-[#131722]  p-2.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#4FD9C5] hover:bg-[#1A1F2C] hover:shadow-lg " >

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                    <FileText size={20} className="shrink-0 text-[#4FD9C5]"/>
                                    <div className="min-w-0">
                                        <p title={file.fileName} className="truncate text-xs font-medium text-[#E9ECF3]" >
                                            {file.fileName}
                                        </p>
                                        <p className="text-[10px] text-[#565F75]">
                                            {file.fileType.toUpperCase()}
                                        </p>
                                    </div>
                                </div>
                                <button onClick={(e) => handleDownload(e, file)} className=" rounded-md p-1.5 text-[#97A1B8] transition hover:bg-[#242B3D] hover:text-[#E9ECF3] " title="Download" >
                                    <Download size={14} />
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