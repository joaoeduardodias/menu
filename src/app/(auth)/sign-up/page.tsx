import type { Metadata } from "next"
import Link from "next/link"
import { SignupForm } from "./components/sign-up-form"

export const metadata: Metadata = {
  title: "Cadastro",
  description: "Crie sua conta para fazer pedidos e aproveitar ofertas exclusivas",
}

export default function SignupPage() {

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center md:text-left">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Criar conta</h2>
        <p className="text-muted-foreground text-sm sm:text-base">Preencha os dados abaixo para começar</p>
      </div>

      <SignupForm />

      <div className="text-center text-sm text-muted-foreground">
        <p>
          Já tem uma conta?{" "}
          <Link href="/sign-in" className="text-primary hover:underline font-medium">
            Fazer login
          </Link>
        </p>
      </div>
    </div>
  )
}
