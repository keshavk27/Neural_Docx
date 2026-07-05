import { FileText, Download, ExternalLink, } from "lucide-react";

const UploadedDocuments = ({ files = [] }) => {

    if (files.length === 0) return null;
    return (
        <div className="border-b border-neutral-800 bg-[#212121] px-6 py-4">
            <div className="mx-auto max-w-4xl">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral-400">
                    Uploaded Documents
                </h3>
                <div className="flex gap-3 overflow-x-auto pb-2">
                    {
                        files.map((file) => (
                            <div key={file._id} className=" w-52 shrink-0 rounded-xl border border-neutral-700 bg-[#2B2B2B] p-3 hover:border-neutral-500 transition cursor-pointer">
                                <FileText size={22} className="text-blue-400"/>
                                <div className="min-w-0">
                                    <p className="max-w-45 truncate text-sm font-medium text-white">
                                        {file.fileName}
                                    </p>
                                    <p className="text-xs text-neutral-500">
                                        {file.fileType.toUpperCase()}
                                    </p>
                                </div>
                                {/* <a href={file.cloudinaryUrl} target="_blank" rel="noopener noreferrer" className=" rounded-lg p-2 text-neutral-400 transition hover:bg-neutral-700 hover:text-white " title="Open document" >
                                    <ExternalLink size={18} />
                                </a>
                                <a href={file.cloudinaryUrl} download={file.fileName} className="  rounded-lg p-2 text-neutral-400 transition hover:bg-neutral-700 hover:text-white " title="Download document" >
                                    <Download size={18} />
                                </a> */}
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};
export default UploadedDocuments;