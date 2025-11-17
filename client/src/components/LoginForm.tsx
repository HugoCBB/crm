import { userApi } from '@/services/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const [statusMessage, setStatusMessage] = useState(Boolean)
  const [loginMessage, setLoginMessage] = useState<string | null>(null)

  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await userApi.login(form)
      localStorage.setItem('authToken', response.token);

      setForm({ email: "", password: "" })
      setStatusMessage(true)


      setLoginMessage(response.status)
      navigate('/dashboard')

    } catch (error: any) {
      console.error(error)
      setStatusMessage(false)
      setLoginMessage("Erro ao realizar login");


    }

  };


  return (
    <form onSubmit={handleSubmit}>

      {loginMessage && (
        <div
          className={`border px-4 py-3 rounded-lg mb-4 ${statusMessage
            ? "bg-green-100 border-green-400 text-green-700"
            : "bg-red-100 border-red-400 text-red-700"
            }`}
          role="alert"
        >
          <span className="block sm:inline">{loginMessage}</span>
        </div>
      )}

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
          onChange={(e) => setForm({ ...form, email: e.target.value })}
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
          onChange={(e) => setForm({ ...form, password: e.target.value })}
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