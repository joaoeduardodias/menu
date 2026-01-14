import { getAddressesByUser } from "@/lib/api/generated"
import { auth, isAuthenticated } from "@/utils/auth"
import type { Metadata } from "next"
import { CheckoutForm } from "./components/checkout-form"

export const metadata: Metadata = {
  title: "Finalizar Pedido",
  description: "Complete seu pedido e receba seus hambúrgueres artesanais em até 30 minutos",
}

export default async function CheckoutPage() {
  const isAuth = await isAuthenticated()
  const session = isAuth ? await auth() : null
  const { data: addresses } = await getAddressesByUser()

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Finalizar Pedido</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[1fr,400px]">
          <CheckoutForm isAuth={isAuth} user={session?.user} addresses={addresses} />
        </div>
      </main>
    </div>
  )
}
