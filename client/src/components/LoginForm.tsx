import { userApi } from '@/services/api';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

export default function LoginForm() {
  const [statusMessage, setStatusMessage] = useState(Boolean)
  const [loginMessage, setLoginMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      navigate('/dashboard')
    }
  }, [navigate]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    if (localStorage.getItem('authToken')) {
      navigate('/dashboard')
      return
    }

    try {
      const response = await userApi.login(form)
      localStorage.setItem('authToken', response.token);

      setForm({ email: "", password: "" })
      setStatusMessage(true)
      setLoginMessage(response.status)

      // Small delay to show success state before redirect
      setTimeout(() => {
        navigate('/dashboard')
      }, 500);

    } catch (error: any) {
      console.error(error)
      setStatusMessage(false)
      setLoginMessage("Erro ao realizar login. Verifique suas credenciais.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {loginMessage && (
        <Alert variant={statusMessage ? "default" : "destructive"} className={statusMessage ? "bg-green-500/15 text-green-600 border-green-500/50" : ""}>
          <AlertDescription>{loginMessage}</AlertDescription>
        </Alert>
      )}

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
            Entrando...
          </>
        ) : (
          "Entrar"
        )}
      </Button>
    </form>
  )
}