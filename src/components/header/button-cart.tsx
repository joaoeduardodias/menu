"use client"
import { useCart } from "@/hooks/use-cart";
import { ShoppingBag } from "lucide-react";
import { Button } from "../ui/button";


export function ButtonCart() {
  const items = useCart((state) => state.items)
  const toggleCart = useCart((state) => state.toggleCart)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  return (
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
  )
}