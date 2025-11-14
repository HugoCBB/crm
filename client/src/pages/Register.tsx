import { RegisterForms } from "@/components/RegisterForms";

export default function Register() {

    return (
    <section className="flex items-center justify-center min-h-screen bg-[#111111] font-inter">
      <div className="flex flex-col bg-white p-8 md:p-10 rounded-xl shadow-2xl w-full max-w-md mx-4">
        <h2 className="text-3xl text-gray-900 text-center font-extrabold mb-6">
          Crie sua conta
        </h2>
        <RegisterForms/>

        <p className="text-center text-sm text-gray-600 mt-6">
          Já tem uma conta?{' '}
          <a href="/login" className="text-blue-600 hover:underline font-medium">
            Faça login
          </a>
        </p>
      </div>
    </section>
  );
}