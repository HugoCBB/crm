
export const CustomerFulfillmentChart = () => (
    <div className="bg-[#282B33] p-6 rounded-xl shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Customer Fulfilment</h2>
        
        {/* Placeholder do Gráfico de Área */}
        <div className="h-32 relative">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                {/* Linha Fundo */}
                <polyline fill="none" stroke="#3A3D46" strokeWidth="0.5" 
                    points="0,90 10,60 20,70 30,50 40,80 50,65 60,40 70,55 80,30 90,45 100,50" />
                {/* Linha Azul (This Month) */}
                <polyline fill="none" stroke="#3B82F6" strokeWidth="1" 
                    points="0,70 10,40 20,50 30,30 40,60 50,45 60,20 70,35 80,10 90,25 100,30" />
                {/* Área Azul (para simular o preenchimento) */}
                <polygon fill="rgba(59, 130, 246, 0.15)" 
                    points="0,70 10,40 20,50 30,30 40,60 50,45 60,20 70,35 80,10 90,25 100,30 100,100 0,100" />
            </svg>
        </div>
        
        <div className="flex justify-center text-sm mt-4 space-x-6">
            <div className="flex items-center">
                <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                <span className="text-gray-400">Last Month</span>
                <span className="font-semibold ml-2 text-white">$4,067</span>
            </div>
            <div className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                <span className="text-gray-400">This Month</span>
                <span className="font-semibold ml-2 text-white">$5,506</span>
            </div>
        </div>
    </div>
);

