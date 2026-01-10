"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getAllOrders, updateOrderStatus } from "@/lib/admin-actions"
import type { Order } from "@/lib/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Clock, CreditCard, Mail, MapPin, Phone } from "lucide-react"

const statusMap = {
  pending: { label: "Pendente", variant: "secondary" as const },
  confirmed: { label: "Confirmado", variant: "default" as const },
  preparing: { label: "Preparando", variant: "default" as const },
  delivering: { label: "Saiu para entrega", variant: "default" as const },
  delivered: { label: "Entregue", variant: "default" as const },
}

const paymentMethodMap = {
  credit: "Cartão de Crédito",
  debit: "Cartão de Débito",
  cash: "Dinheiro",
  pix: "PIX",
}

export function OrdersManager() {
  const queryClient = useQueryClient()
  const { data: orders, isLoading } = useQuery({
    queryKey: ["all-orders"],
    queryFn: getAllOrders,
  })

  const updateStatusMutation = useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: Order["status"] }) =>
      updateOrderStatus(orderId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-orders"] })
    },
  })

  function handleStatusChange(orderId: string, newStatus: Order["status"]) {
    updateStatusMutation.mutate({ orderId, status: newStatus })
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="h-32 animate-pulse rounded bg-muted" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!orders || orders.length === 0) {
    return (
      <Card>
        <CardContent className="flex h-48 items-center justify-center">
          <p className="text-muted-foreground">Nenhum pedido encontrado</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4" role="list">
      {orders.map((order) => (
        <Card key={order.id}>
          <CardContent className="p-4 lg:p-6">
            <article>
              <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Pedido #{order.id}</h2>
                  <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" aria-hidden="true" />
                    <time dateTime={new Date(order.createdAt).toISOString()}>
                      {formatDistanceToNow(new Date(order.createdAt), {
                        addSuffix: true,
                        locale: ptBR,
                      })}
                    </time>
                  </div>
                </div>
                <div className="flex flex-col gap-2 sm:items-end">
                  <Badge variant={statusMap[order.status].variant}>{statusMap[order.status].label}</Badge>
                  <Select
                    value={order.status}
                    onValueChange={(value) => handleStatusChange(order.id, value as Order["status"])}
                  >
                    <SelectTrigger className="w-full sm:w-45">
                      <SelectValue placeholder="Alterar status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pendente</SelectItem>
                      <SelectItem value="confirmed">Confirmado</SelectItem>
                      <SelectItem value="preparing">Preparando</SelectItem>
                      <SelectItem value="delivering">Saiu para entrega</SelectItem>
                      <SelectItem value="delivered">Entregue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <section>
                  <h3 className="mb-2 font-semibold">Informações do Cliente</h3>
                  <div className="space-y-2 text-sm">
                    <p className="font-medium">{order.customer.name}</p>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-4 w-4" aria-hidden="true" />
                      <a href={`tel:${order.customer.phone}`} className="hover:underline">
                        {order.customer.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4" aria-hidden="true" />
                      <a href={`mailto:${order.customer.email}`} className="hover:underline">
                        {order.customer.email}
                      </a>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="mb-2 font-semibold">Endereço de Entrega</h3>
                  <div className="flex gap-2 text-sm">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                    <address className="not-italic text-muted-foreground">
                      {order.address.street}, {order.address.number}
                      {order.address.complement && `, ${order.address.complement}`}
                      <br />
                      {order.address.neighborhood}, {order.address.city}
                      <br />
                      CEP: {order.address.zipCode}
                      {order.address.reference && (
                        <>
                          <br />
                          Ref: {order.address.reference}
                        </>
                      )}
                    </address>
                  </div>
                </section>
              </div>

              <section className="mt-4">
                <h3 className="mb-2 font-semibold">Itens do Pedido</h3>
                <ul className="space-y-2" role="list">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex items-center justify-between text-sm">
                      <span>
                        {item.quantity}x {item.name}
                      </span>
                      <span className="font-medium">
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(item.price * item.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 space-y-1 border-t border-border pt-4 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(order.total - order.deliveryFee)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxa de entrega</span>
                    <span>
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(order.deliveryFee)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-2 text-base font-bold">
                    <span>Total</span>
                    <span>
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(order.total)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-sm">
                  <CreditCard className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <span className="text-muted-foreground">
                    Pagamento: {paymentMethodMap[order.paymentMethod as keyof typeof paymentMethodMap]}
                  </span>
                </div>
              </section>
            </article>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
