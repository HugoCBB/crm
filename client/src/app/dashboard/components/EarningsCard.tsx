
export const EarningsCard = () => (
    <div className="bg-[#282B33] p-6 rounded-xl shadow-lg h-full">
        <h2 className="text-lg font-semibold mb-6">Earnings</h2>
        <p className="text-3xl font-bold mb-1">$6078.76</p>
        <p className="text-sm text-gray-400 mb-6">
            Profit is 48% More than last Month
        </p>

        <div className="flex justify-center items-center h-2/3">
            {/* Gráfico de Donut Simulado (80%) */}
            <div 
                className="relative w-32 h-32 rounded-full flex items-center justify-center 
                        bg-gradient-to-r from-blue-500 to-cyan-400 p-1"
                style={{ 
                    // Simula 80% preenchido com azul/ciano
                    background: 'conic-gradient(#3B82F6 0% 80%, #1F2128 80% 100%)' 
                }}
            >
                {/* O centro para criar o efeito de donut */}
                <div className="w-[85%] h-[85%] bg-[#282B33] rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-white">80%</span>
                </div>
            </div>
        </div>
    </div>
);