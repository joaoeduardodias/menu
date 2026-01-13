import type { Metadata } from "next"
import Link from "next/link"
import { SignInForm } from "./components/sign-in-form"

export const metadata: Metadata = {
  title: "Login",
  description: "Acesse sua conta para fazer pedidos e acompanhar seus hambúrgueres favoritos",
}

export default function SignPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center md:text-left">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Bem-vindo de volta</h2>
        <p className="text-muted-foreground text-sm sm:text-base">Entre com suas credenciais para continuar</p>
      </div>

      <SignInForm />

      <div className="text-center text-sm text-muted-foreground">
        <p>
          Não tem uma conta?{" "}
          <Link href="/sign-up" className="text-primary hover:underline font-medium">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  )
}
