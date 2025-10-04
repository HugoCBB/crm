
import { Search, Bell, MessageCircle } from 'lucide-react';

export const Header = () => (
    <header className="flex justify-between items-center p-4 bg-[#1F2128] border-b border-[#3A3D46]">
        {/* Search Bar */}
        <div className="relative flex items-center w-full max-w-lg">
            <Search className="absolute left-3 w-5 h-5 text-gray-400" />
            <input 
                type="text" 
                placeholder="Search here..." 
                className="w-full bg-[#282B33] text-white py-2 pl-10 pr-4 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
        </div>

        {/* User and Notifications */}
        <div className="flex items-center space-x-4">
            <a href="https://www.nickelfox.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white hidden sm:block">

            </a>
            <div className="relative text-gray-400">
                <Bell className="w-6 h-6 hover:text-white cursor-pointer" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </div>
            <MessageCircle className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
            <img 
                src="https://imgs.search.brave.com/kgE_RJyBQEy0CGLHR9pvlAs335anSrJFNB5PQYltVw0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvY29v/bC1wcm9maWxlLXBp/Y3R1cmUtbTMycnF3/bTZ6emYxb3NveC5q/cGc" // Substituir pela imagem do usuário
                alt="User Avatar" 
                className="w-8 h-8 rounded-full object-cover cursor-pointer"
            />
        </div>
    </header>
);
