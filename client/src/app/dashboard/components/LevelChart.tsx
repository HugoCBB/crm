
export const LevelChart = () => (
    <div className="bg-[#282B33] p-6 rounded-xl shadow-lg">
        <h2 className="text-lg font-semibold mb-6">Level</h2>
        <div className="flex justify-between items-end h-32">
            <div className="w-1/2 pr-2">
                <div className="text-gray-400 text-sm mb-2">Volume</div>
                <div className="flex items-end h-full space-x-2">
                    <div className="w-2 bg-blue-500 h-[60%] rounded-t"></div>
                    <div className="w-2 bg-blue-500 h-[80%] rounded-t"></div>
                    <div className="w-2 bg-blue-500 h-[40%] rounded-t"></div>
                    <div className="w-2 bg-blue-500 h-[90%] rounded-t"></div>
                    <div className="w-2 bg-blue-500 h-[50%] rounded-t"></div>
                </div>
            </div>
            <div className="w-1/2 pl-2 border-l border-[#3A3D46]">
                <div className="text-gray-400 text-sm mb-2">Service</div>
                <div className="flex items-end h-full space-x-2">
                    <div className="w-2 bg-cyan-400 h-[70%] rounded-t"></div>
                    <div className="w-2 bg-cyan-400 h-[50%] rounded-t"></div>
                    <div className="w-2 bg-cyan-400 h-[85%] rounded-t"></div>
                    <div className="w-2 bg-cyan-400 h-[30%] rounded-t"></div>
                    <div className="w-2 bg-cyan-400 h-[65%] rounded-t"></div>
                </div>
            </div>
        </div>
    </div>
);
