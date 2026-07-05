const UserMessage = ({ message }) => {

    return (
        <div className="flex justify-end">
            <div className="max-w-[80%]">
                <div className=" rounded-3xl rounded-br-lg bg-white px-5 py-3 text-black shadow-sm wrap-break-words " >
                    <p className="whitespace-pre-wrap leading-7">
                        {message.content}
                    </p>
                </div>
            
                {/* Message Status */}
                {message.status === "sending" && (
                    <p className="mt-1 text-right text-xs text-neutral-400">
                        Sending...
                    </p>
                )}

                {message.status === "failed" && (
                    <p className="mt-1 text-right text-xs text-red-500">
                        Failed to send
                    </p>
                )}
            </div>
        </div>
    );
};
export default UserMessage;