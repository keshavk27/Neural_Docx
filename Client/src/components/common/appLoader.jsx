const AppLoader = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#0B0E14]">
            <div className="flex flex-col items-center gap-8">
                
                <div className="relative flex items-center justify-center">
                    <div className="absolute h-24 w-24 animate-spin rounded-full border-[6px] border-transparent border-t-[#4FD9C5] border-b-[#4FD9C5] opacity-80"></div>
                    <div className="h-16 w-16 animate-[spin_1.5s_linear_infinite_reverse] rounded-full border-[5px] border-[#242B3D] border-r-[#4FD9C5] border-l-[#4FD9C5]"></div>
                </div>

                <div className="flex flex-col items-center gap-3">
                    <p className="animate-pulse text-2xl font-bold tracking-widest text-[#4FD9C5]">
                        LOADING...
                    </p>
                    <p className="text-base font-medium text-[#565F75]">
                        Initializing Neural Docx...
                    </p>
                </div>

            </div>
        </div>
    );
};

export default AppLoader;