"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { ShoppingBag, User } from "lucide-react"
import Link from "next/link"

export function Header() {
  const items = useCart((state) => state.items)
  const toggleCart = useCart((state) => state.toggleCart)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4" aria-label="Menu principal">
        <div className="flex items-center gap-2">
          <div className="flex size-10 items-center justify-center rounded-full bg-primary" aria-hidden="true">
            <span className="text-xl font-bold text-primary-foreground">🍔</span>
          </div>
          <h1 className="text-xl font-bold text-balance md:text-2xl">Burger House</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-9 gap-2 sm:h-10" asChild>
            <Link href="/sign-in">
              <User className="size-4 sm:size-5" aria-hidden="true" />
              <span className="hidden sm:inline">Entrar</span>
            </Link>
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="relative bg-transparent"
            onClick={toggleCart}
            aria-label={`Carrinho de compras com ${itemCount} ${itemCount === 1 ? "item" : "itens"}`}
          >
            <ShoppingBag className="size-5" aria-hidden="true" />
            {itemCount > 0 && (
              <span
                className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground"
                aria-label={`${itemCount} itens no carrinho`}
              >
                {itemCount}
              </span>
            )}
          </Button>
        </div>


      </nav>
    </header>
  )
}
