
import { ArrowUp } from "lucide-react";

const summaryData = [
    { title: "Total Sales", value: "$5k", change: "+10% from yesterday" },
    { title: "Total Order", value: "500", change: "+6% from yesterday" },
    { title: "Product Sold", value: "9", change: "+2% from yesterday" },
    { title: "New Customer", value: "12", change: "+3% from yesterday" },
];

export const SummaryCard = ({ title, value, change }: typeof summaryData[0]) => (
    <div className="bg-[#282B33] p-4 rounded-xl shadow-lg">
        <h3 className="text-sm text-gray-400 mb-1">{title}</h3>
        <p className="text-2xl font-bold mb-2">{value}</p>
        <p className="text-xs text-green-400 flex items-center">
            <ArrowUp className="w-3 h-3 mr-1" />
            {change}
        </p>
    </div>
);