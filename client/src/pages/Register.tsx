import { RegisterForms } from "@/components/RegisterForms";
import { Link } from "react-router-dom";

export default function Register() {
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
              "Joining CRM Pro was the best decision for our sales team. The efficiency gains were immediate."
            </p>
            <footer className="text-sm text-zinc-400">Alex Chen, VP of Sales</footer>
          </blockquote>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="flex items-center justify-center p-8 bg-background">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Crie sua conta
            </h1>
            <p className="text-sm text-muted-foreground">
              Preencha os dados abaixo para começar
            </p>
          </div>

          <RegisterForms />

          <p className="px-8 text-center text-sm text-muted-foreground">
            Já tem uma conta?{" "}
            <Link
              to="/login"
              className="underline underline-offset-4 hover:text-primary"
            >
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}