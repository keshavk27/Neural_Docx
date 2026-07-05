const UserMessage = ({ message }) => {
    return (
        <div className="flex justify-end">
            <div
                className="
                    max-w-[80%]
                    rounded-3xl
                    rounded-br-lg
                    bg-white
                    px-5
                    py-3
                    text-black
                    shadow-sm
                    break-words
                "
            >
                <p className="whitespace-pre-wrap leading-7">
                    {message.content}
                </p>
            </div>
        </div>
    );
};

export default UserMessage;