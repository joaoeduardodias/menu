"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useCart } from "@/hooks/use-cart"
import type { Product } from "@/lib/types"
import { Plus } from "lucide-react"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCart((state) => state.addItem)

  function handleAddToCart() {
    addItem(product)

    // Feedback visual
    const button = document.activeElement as HTMLButtonElement
    button?.classList.add("scale-95")
    setTimeout(() => button?.classList.remove("scale-95"), 100)
  }

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="size-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          {product.popular && (
            <Badge className="absolute right-3 top-3 bg-accent text-accent-foreground">Popular</Badge>
          )}
        </div>

        <div className="p-4">
          <h3 className="mb-2 text-lg font-semibold text-balance leading-tight">{product.name}</h3>
          <p className="mb-3 text-sm text-muted-foreground text-pretty line-clamp-2">{product.description}</p>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <span className="text-2xl font-bold text-primary">R$ {product.price.toFixed(2)}</span>
        <Button
          size="icon"
          onClick={handleAddToCart}
          className="rounded-full transition-transform hover:scale-105 active:scale-95"
        >
          <Plus className="size-5" />
          <span className="sr-only">Adicionar ao carrinho</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
