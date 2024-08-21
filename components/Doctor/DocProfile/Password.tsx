export default function Password() {
    return (
        <div className="flex flex-col gap-5 w-full md:w-[30vw]">
            <div className="flex">
                <h1 className="font-bold text-lg md:text-xl">Change Password</h1>
            </div>
            <div className="flex flex-col border-2 shadow-lg rounded-lg p-5 gap-4">
                <div>
                    <h1 className="text-sm md:text-md">Your Password</h1>
                </div>
                <div className="flex justify-between items-center p-3">
                    <div>
                        <h1 className="text-sm md:text-md">Sid</h1>
                    </div>
                    <div>
                        <button className="bg-purple-200 px-3 py-1 rounded-lg cursor-pointer text-xs md:text-sm">
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
