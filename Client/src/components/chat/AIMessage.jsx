import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css"; 
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

//convert AI math delimiters to standard markdown delimiters
const preprocessLaTeX = (content) => {
    if (!content) return "";
    return content
        // Replace block math \[ \] with $$ $$
        .replace(/\\\[/g, () => "$$")
        .replace(/\\\]/g, () => "$$")
        // Replace inline math \( \) with $ $
        .replace(/\\\(/g, () => "$")
        .replace(/\\\)/g, () => "$");
};

const AIMessage = ({ message }) => {
    return (
        <div className="flex justify-start">
            <div
                className=" max-w-[90%] rounded-3xl rounded-bl-lg bg-[#131722] border border-[#242B3D] px-5 py-4 text-[#E9ECF3] shadow-sm prose  prose-invert " >
                <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}
                    components={{code({inline, className, children, ...props}) 
                        {
                            const match = /language-(\w+)/.exec(className || "");
                            return !inline && match ? 
                            (
                                <SyntaxHighlighter style={atomOneDark} language={match[1]} PreTag="div" customStyle={{ borderRadius: "12px", padding: "16px", marginTop: "12px",  marginBottom: "12px", }} {...props} >
                                    {String(children).replace(/\n$/, "")}
                                </SyntaxHighlighter>
                            ) : (
                                <code className=" rounded bg-[#1A1F2C]  px-1.5 py-0.5 text-[#4FD9C5] " {...props} >
                                    {children}
                                </code>
                            );
                        },
                    }}
                >
                    
                    {preprocessLaTeX(message.content)}
                </ReactMarkdown>
            </div>
        </div>
    );
};
export default AIMessage;