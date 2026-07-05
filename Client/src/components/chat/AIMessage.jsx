import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const AIMessage = ({ message }) => {
    return (
        <div className="flex justify-start">
            <div
                className="
                    max-w-[90%]
                    rounded-3xl
                    rounded-bl-lg
                    bg-[#2F2F2F]
                    px-5
                    py-4
                    text-white
                    shadow-sm
                "
            >
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        code({inline,className,children,...props}) {
                            const match = /language-(\w+)/.exec( className || "");
                            return !inline && match ? (
                                <SyntaxHighlighter
                                    style={atomOneDark}
                                    language={match[1]}
                                    PreTag="div"
                                    customStyle={{
                                        borderRadius: "12px",
                                        padding: "16px",
                                        marginTop: "12px",
                                        marginBottom: "12px",
                                    }}
                                    {...props}
                                >
                                    {String(children).replace(/\n$/, "")}
                                </SyntaxHighlighter>
                            ) : (
                                <code
                                    className="
                                        rounded
                                        bg-neutral-800
                                        px-1
                                        py-0.5
                                        text-green-300
                                    "
                                    {...props}
                                >
                                    {children}
                                </code>
                            );
                        },
                    }}
                >
                    {message.content}
                </ReactMarkdown>
            </div>
        </div>
    );
};
export default AIMessage;