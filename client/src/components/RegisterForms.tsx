import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userApi } from '@/services/api';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

export const RegisterForms = () => {

  const [statusMessage, setStatusMessage] = useState(Boolean)
  const [registerMessage, setRegisterMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  })

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      navigate('/dashboard')
    }
  }, [navigate]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post("http://localhost:8080/api/users/register", form, {
        headers: { 'Content-Type': 'application/json' },
      })

      // Auto login after registration
      const loginResponse = await userApi.login({
        email: form.email,
        password: form.password
      });

      localStorage.setItem('authToken', loginResponse.token);

      setForm({ name: "", email: "", password: "", phone: "" });
      setStatusMessage(true)
      setRegisterMessage("Conta criada com sucesso! Redirecionando...")

      setTimeout(() => {
        navigate('/dashboard')
      }, 1000);

    } catch (error) {
      console.error(error)
      setStatusMessage(false)
      setRegisterMessage("Ocorreu um erro ao cadastrar. Tente novamente.");

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {registerMessage && (
        <Alert variant={statusMessage ? "default" : "destructive"} className={statusMessage ? "bg-green-500/15 text-green-600 border-green-500/50" : ""}>
          <AlertDescription>{registerMessage}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          type="text"
          placeholder="Seu nome completo"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="seu@email.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Telefone</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="(XX) XXXXX-XXXX"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          disabled={isLoading}
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Registrando...
          </>
        ) : (
          "Criar conta"
        )}
      </Button>
    </form>

  )
}