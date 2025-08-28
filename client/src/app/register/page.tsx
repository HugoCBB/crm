"use client"
import { useState } from 'react';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = (e: any) => {
        e.preventDefault();
    };

    return (
    <section className="flex items-center justify-center min-h-screen bg-[#111111] font-inter">
      <div className="flex flex-col bg-white p-8 md:p-10 rounded-xl shadow-2xl w-full max-w-md mx-4">
        <h2 className="text-3xl text-gray-900 text-center font-extrabold mb-6">
          Crie sua conta
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Campo: Nome */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold mb-2 text-gray-700">
              Nome
            </label>
            <input
              id="name"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-800 placeholder-gray-400 transition duration-200 ease-in-out"
              placeholder="Seu nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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

          {/* Campo: Telefone */}
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-semibold mb-2 text-gray-700">
              Telefone
            </label>
            <input
              id="phone"
              type="tel" // Use type="tel" para telefones
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-800 placeholder-gray-400 transition duration-200 ease-in-out"
              placeholder="(XX) XXXXX-XXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Registrar
          </button>
        </form>

        {/* Link para Login */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Já tem uma conta?{' '}
          <a href="#" className="text-blue-600 hover:underline font-medium">
            Faça login
          </a>
        </p>
      </div>
    </section>
  );
}
