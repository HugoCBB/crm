
export const TopProductsTable = () => {
    const products = [
        { id: 1, name: "Home Decore Range", popularity: 48, sales: 48 },
        { id: 2, name: "Disney Princess Dress", popularity: 65, sales: 17 },
        { id: 3, name: "Bathroom Essentials", popularity: 30, sales: 19 },
        { id: 4, name: "Apple Smartwatch", popularity: 90, sales: 29 },
    ];

    return (
        <div className="bg-[#282B33] p-6 rounded-xl shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Top Products</h2>
            
            <table className="min-w-full text-sm">
                <thead>
                    <tr className="text-left text-gray-400 border-b border-[#3A3D46]">
                        <th className="py-2 font-normal">#</th>
                        <th className="py-2 font-normal">Name</th>
                        <th className="py-2 font-normal">Popularity</th>
                        <th className="py-2 font-normal">Sales</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id} className="border-b border-[#3A3D46] last:border-b-0">
                            <td className="py-3 text-gray-400">{String(product.id).padStart(2, '0')}</td>
                            <td className="py-3 font-medium">{product.name}</td>
                            <td className="py-3">
                                {/* Barra de Popularidade Simples */}
                                <div className="w-full bg-[#3A3D46] rounded-full h-2.5">
                                    <div 
                                        className="h-2.5 rounded-full bg-cyan-400" 
                                        style={{ width: `${product.popularity}%` }}
                                    ></div>
                                </div>
                            </td>
                            <td className="py-3 text-sm font-semibold">
                                <span className="bg-[#3A3D46] px-2 py-0.5 rounded text-cyan-400">
                                    {product.sales}%
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};