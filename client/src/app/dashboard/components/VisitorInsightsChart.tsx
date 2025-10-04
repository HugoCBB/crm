
export const VisitorInsightsChart = () => (
    <div className="bg-[#282B33] p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Visitor Insights</h2>
            <div className="flex items-center text-sm text-yellow-400">
                <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                New Visitors
            </div>
        </div>
        
        {/* Placeholder do Gráfico de Linha */}
        <div className="h-48 relative">
            <div className="absolute top-0 left-0 bottom-0 text-gray-400 text-xs flex flex-col justify-between py-2">
                <span>500</span><span>400</span><span>300</span><span>200</span><span>100</span><span>0</span>
            </div>
            <div className="pl-6 h-full">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                    {/* Linha do Gráfico (Simulada) */}
                    <polyline fill="none" stroke="#3B82F6" strokeWidth="1" 
                        points="0,90 10,65 20,80 30,50 40,75 50,40 60,70 70,35 80,60 90,30 100,55" />
                </svg>
            </div>
        </div>

        {/* Labels do Eixo X */}
        <div className="flex justify-between text-xs text-gray-400 pl-6 mt-1">
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
            <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
        </div>
    </div>
);