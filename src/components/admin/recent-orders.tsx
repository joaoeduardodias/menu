"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getRecentOrders } from "@/lib/admin-actions"
import { useQuery } from "@tanstack/react-query"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

const statusMap = {
  pending: { label: "Pendente", variant: "secondary" as const },
  confirmed: { label: "Confirmado", variant: "default" as const },
  preparing: { label: "Preparando", variant: "default" as const },
  delivering: { label: "Saiu para entrega", variant: "default" as const },
  delivered: { label: "Entregue", variant: "default" as const },
}

export function RecentOrders() {
  const { data: orders, isLoading } = useQuery({
    queryKey: ["recent-orders"],
    queryFn: getRecentOrders,
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pedidos Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-4 w-32 animate-pulse rounded bg-muted" />
                  <div className="h-3 w-24 animate-pulse rounded bg-muted" />
                </div>
                <div className="h-6 w-20 animate-pulse rounded bg-muted" />
              </div>
            ))}
          </div>
        ) : orders && orders.length > 0 ? (
          <ul className="space-y-4" role="list">
            {orders.map((order) => (
              <li
                key={order.id}
                className="flex flex-col gap-2 border-b border-border pb-4 last:border-0 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex-1">
                  <p className="font-medium">{order.customer.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(order.createdAt), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={statusMap[order.status].variant}>{statusMap[order.status].label}</Badge>
                  <span className="font-semibold">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(order.total)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-muted-foreground">Nenhum pedido recente</p>
        )}
      </CardContent>
    </Card>
  )
}
