"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/hooks/use-cart"
import { Clock, MapPin, ShoppingBag } from "lucide-react"

export function OrderSummary() {
  const { items, total } = useCart()

  if (items.length === 0) {
    return (
      <Card className="sticky top-4">
        <CardContent className="flex h-64 flex-col items-center justify-center">
          <ShoppingBag className="mb-4 size-12 text-muted-foreground" aria-hidden="true" />
          <p className="text-center text-muted-foreground">Seu carrinho está vazio</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <aside className="space-y-4">
      <Card className="sticky top-4">
        <CardHeader>
          <CardTitle>Resumo do Pedido</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="space-y-3" role="list">
            {items.map((item) => (
              <li key={item.id} className="flex items-start gap-3">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={`Foto de ${item.name}`}
                  className="size-16 rounded-md object-cover"
                  loading="lazy"
                />
                <div className="flex-1 space-y-1">
                  <h3 className="font-medium text-sm leading-tight">{item.name}</h3>
                  <p className="text-xs text-muted-foreground">Qtd: {item.quantity}</p>
                  <p className="font-semibold text-sm text-primary">R$ {(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </li>
            ))}
          </ul>

          <Separator />

          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd className="font-medium">R$ {total.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Taxa de entrega</dt>
              <dd className="font-medium">R$ 5,00</dd>
            </div>
            <Separator />
            <div className="flex justify-between text-base">
              <dt className="font-semibold">Total</dt>
              <dd className="text-xl font-bold text-primary">R$ {(total + 5).toFixed(2)}</dd>
            </div>
          </dl>

          <Separator />

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="size-4 shrink-0" aria-hidden="true" />
              <span>Entrega em 30-40 minutos</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="size-4 shrink-0" aria-hidden="true" />
              <span>Entrega grátis acima de R$ 50</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </aside>
  )
}
