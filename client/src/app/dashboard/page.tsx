
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { SummaryCard } from './components/SummaryCard';
import { TopProductsTable } from './components/TopProductsTable';
import { EarningsCard } from './components/EarningsCard';
import { VisitorInsightsChart } from './components/VisitorInsightsChart';
import { LevelChart } from './components/LevelChart';
import { CustomerFulfillmentChart } from './components/CustomerFulfillmentChart';



const summaryData = [
    { title: "Total Sales", value: "$5k", change: "+10% from yesterday" },
    { title: "Total Order", value: "500", change: "+6% from yesterday" },
    { title: "Product Sold", value: "9", change: "+2% from yesterday" },
    { title: "New Customer", value: "12", change: "+3% from yesterday" },
];




export default function DashboardPage() {
    return (
        <div className="flex h-screen bg-[#1F2128] text-white">
            
            <Sidebar/>

            <div className="flex-1 flex flex-col overflow-hidden">
                <Header/>

                <main className="flex-1 overflow-y-auto p-6 md:p-8">
                    <h1 className="text-xl font-bold mb-6 flex items-center">
                        Dashboard
                    </h1>
                    
                    <div className="grid grid-cols-12 gap-6">
                        
                        {/* COLUNA CENTRAL (col-span-8) */}
                        <div className="col-span-12 lg:col-span-8 space-y-6">
                            
                            {/* TODAY'S SALES - Summary Cards */}
                            <section>
                                <h2 className="text-lg font-semibold mb-3">Today's Sales</h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {summaryData.map((data, index) => (
                                        <SummaryCard key={index} {...data} />
                                    ))}
                                </div>
                            </section>

                            {/* TOP PRODUCTS */}
                            <TopProductsTable />

                            {/* EARNINGS & VISITOR INSIGHTS */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="md:col-span-1">
                                    <EarningsCard />
                                </div>
                                <div className="md:col-span-2">
                                    <VisitorInsightsChart />
                                </div>
                            </div>
                        </div>
                        
                        {/* COLUNA DIREITA (col-span-4) */}
                        <div className="col-span-12 lg:col-span-4 space-y-6">
                            <LevelChart />
                            <CustomerFulfillmentChart />
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
}