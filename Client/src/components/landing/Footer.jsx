import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

const Footer = () => {

    const [copied, setCopied] = useState(false);
    const handleCopyEmail = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText("keshavkk812@gmail.com");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <footer className="border-t border-[#242B3D] bg-[#0B0E14]">
            <div className=" mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-5 text-sm text-[#97A1B8]  md:flex-row">
                <div className="text-center md:text-left">
                    © {new Date().getFullYear()} Neural Docx.
                    All rights reserved.
                </div>

                <div className="text-center md:text-right">
                    Developer Contact:{"keshavkk812@gmail.com"}
                    <button onClick={handleCopyEmail} className="font-medium text-[#4FD9C5] transition hover:underline" title="Click to copy email address">
                        {copied ? "Copied to clipboard!" : "developer@neuraldocx.com"}
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;