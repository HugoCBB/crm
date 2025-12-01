import LoginForm from "@/components/LoginForm";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Hero/Branding */}
      <div className="hidden lg:flex flex-col justify-between bg-zinc-900 p-10 text-white">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center text-zinc-900">
            C
          </div>
          CRM Pro
        </div>

        <div className="space-y-4">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "This CRM has completely transformed how we manage our client relationships. It's intuitive, fast, and beautiful."
            </p>
            <footer className="text-sm text-zinc-400">Sofia Davis, CEO at TechCorp</footer>
          </blockquote>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex items-center justify-center p-8 bg-background">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Bem-vindo de volta
            </h1>
            <p className="text-sm text-muted-foreground">
              Entre com seu email e senha para acessar sua conta
            </p>
          </div>

          <LoginForm />

          <p className="px-8 text-center text-sm text-muted-foreground">
            Não tem uma conta?{" "}
            <Link
              to="/register"
              className="underline underline-offset-4 hover:text-primary"
            >
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}