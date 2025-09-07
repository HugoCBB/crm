"use client"
import { useState } from 'react';


export const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: any) => {
        e.preventDefault();
    };


    return(
        <form onSubmit={handleSubmit}>

          {/* Campo: Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold mb-2 text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-800 placeholder-gray-400 transition duration-200 ease-in-out"
              placeholder="seuemail@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Campo: Senha */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-semibold mb-2 text-gray-700">
              Senha
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-800 placeholder-gray-400 transition duration-200 ease-in-out"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Botão de Envio */}
          <button
            type="submit"
            className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Login
          </button>
        </form>
    )
}