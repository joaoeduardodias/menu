import { ChefHat } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import type React from "react"

export const metadata: Metadata = {
  title: {
    default: "Autenticação | Burger House",
    template: "%s | Burger House",
  },
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <aside className="hidden md:flex md:w-1/2 bg-linear-to-br from-primary via-accent to-primary/80 p-8 lg:p-12 flex-col justify-between text-primary-foreground">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-2xl font-bold hover:opacity-90 transition-opacity"
          >
            <ChefHat className="h-8 w-8" />
            <span>Burger House</span>
          </Link>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight">Os melhores hambúrgueres da cidade</h1>
          <p className="text-lg text-primary-foreground/90">
            Ingredientes premium, receitas exclusivas e entrega rápida
          </p>
        </div>

        <div className="text-sm text-primary-foreground/80">
          <p>Mais de 10.000 clientes satisfeitos</p>
        </div>
      </aside>

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-md">
          <div className="md:hidden text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold text-primary">
              <ChefHat className="h-8 w-8" />
              <span>Burger House</span>
            </Link>
          </div>

          {children}
        </div>
      </main>
    </div>
  )
}
