"use client"
import axios from 'axios';
import { useState } from 'react';


export const RegisterForms = () => {
    
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [registerMessage, setRegisterMessage] = useState<string | null>(null)
    const [form, setForm] = useState({
      name: '',
      email: '',
      password: '',
      phone: '',
    })
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
          const response = await axios.post("/api/user/register",form, {
            headers: { 'Content-Type': 'application/json' },
          })

          setForm({ name: "", email: "", password: "", phone: "" });
          setRegisterMessage("Usuario cadastrado com sucesso")

        } catch (error) {
          console.error(error)
          setErrorMessage("Ocorreu um erro inesperado. Por favor, tente novamente.");
          
        }
    };

    return(
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
              value={form.name}
              onChange={(e) => setForm({...form, name: e.target.value})}
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
              value={form.email}
              onChange={(e) => setForm({...form, email: e.target.value})}
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
              type="tel"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-800 placeholder-gray-400 transition duration-200 ease-in-out"
              placeholder="(XX) XXXXX-XXXX"
              value={form.phone}
              onChange={(e) => setForm({...form, phone: e.target.value})}
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
              value={form.password}
              onChange={(e) => setForm({...form, password: e.target.value})}
              required
            />
          </div>

          {registerMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4" role="alert">
              <span className="block sm:inline">{registerMessage}</span>
            </div>
          )}

          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4" role="alert">
              <span className="block sm:inline">{errorMessage}</span>
            </div>
          )}
          

          {/* Botão de Envio */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105">
            Registrar
          </button>
        </form>
        
    )
}