const TypingIndicator = () => {
    return (
        <div className="flex justify-start">
            <div
                className="
                    rounded-3xl
                    rounded-bl-lg
                    bg-[#2F2F2F]
                    px-5
                    py-4
                "
            >
                <div className="flex items-center gap-2">
                    <span
                        className="
                            h-2
                            w-2
                            animate-bounce
                            rounded-full
                            bg-neutral-400
                            [animation-delay:-0.3s]
                        "
                    />
                    <span
                        className="
                            h-2
                            w-2
                            animate-bounce
                            rounded-full
                            bg-neutral-400
                            [animation-delay:-0.15s]
                        "
                    />
                    <span
                        className="
                            h-2
                            w-2
                            animate-bounce
                            rounded-full
                            bg-neutral-400
                        "
                    />
                </div>
            </div>
        </div>
    );
};
export default TypingIndicator;