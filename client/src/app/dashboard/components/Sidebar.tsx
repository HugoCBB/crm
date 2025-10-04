
import {
    LayoutDashboard,
    User,
    BarChart,
    ClipboardList,
    ShoppingCart,
    DollarSign,
    MessageSquare,
    Settings,
    Star,
    History,
    LogOut
} from "lucide-react";

export const Sidebar = () => {
    const navItems = [
        { icon: LayoutDashboard, label: "Dashboard", active: true },
        { icon: User, label: "Profile", active: false },
        { icon: BarChart, label: "Leaderboard", active: false },
        { icon: ClipboardList, label: "Order", active: false },
        { icon: ShoppingCart, label: "Product", active: false },
        { icon: DollarSign, label: "Sales Report", active: false },
        { icon: MessageSquare, label: "Message", active: false },
        { icon: Settings, label: "Settings", active: false },
        { icon: Star, label: "Favourite", active: false },
        { icon: History, label: "History", active: false },
    ];

    return (
        <div className="w-20 md:w-64 bg-[#282B33] p-4 flex flex-col justify-between transition-all duration-300">
            
            {/* Logo e Controles de Janela */}
            <div className="mb-8">
                <div className="text-xl font-bold hidden md:block">Name</div>
            </div>
            
            {/* Navegação Principal */}
            <nav className="flex-1 space-y-1">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <a 
                            key={item.label} 
                            href="#"
                            className={`flex items-center p-3 rounded-lg transition-colors ${
                                item.active 
                                    ? 'bg-[#3A3D46] text-white font-semibold border-l-4 border-blue-500' 
                                    : 'text-gray-400 hover:bg-[#3A3D46]'
                            }`}
                        >
                            <Icon className="w-5 h-5 md:mr-3" />
                            <span className="hidden md:block">{item.label}</span>
                        </a>
                    );
                })}
            </nav>

            {/* Signout */}
            <a href="#" className="flex items-center p-3 mt-4 text-gray-400 hover:bg-[#3A3D46] rounded-lg">
                <LogOut className="w-5 h-5 md:mr-3" />
                <span className="hidden md:block">Signout</span>
            </a>
        </div>
    );
};