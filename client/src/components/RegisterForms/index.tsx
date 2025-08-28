"use client"
import axios from 'axios';
import { useState } from 'react';


export const RegisterForms = () => {
   
    const [form, setForm] = useState({
      name: '',
      email: '',
      password: '',
      phone: '',
    })
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
          const response = await axios.post("/api/user/",{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
          })

          setForm(response.data)

        } catch (error) {
          console.error(error)
          
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
              type="tel" // Use type="tel" para telefones
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

          {/* Botão de Envio */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Registrar
          </button>
        </form>
        
    )
}