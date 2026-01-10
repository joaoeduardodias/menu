"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getDashboardStats } from "@/lib/admin-actions"
import { useQuery } from "@tanstack/react-query"
import { DollarSign, ShoppingBag, TrendingUp, Users } from "lucide-react"

export function DashboardStats() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: getDashboardStats,
  })

  const statsConfig = [
    {
      title: "Vendas Hoje",
      value: stats?.todaySales
        ? new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(stats.todaySales)
        : "R$ 0,00",
      icon: DollarSign,
      description: "+12% em relação a ontem",
    },
    {
      title: "Pedidos Hoje",
      value: stats?.todayOrders?.toString() || "0",
      icon: ShoppingBag,
      description: `${stats?.pendingOrders || 0} pendentes`,
    },
    {
      title: "Ticket Médio",
      value: stats?.averageTicket
        ? new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(stats.averageTicket)
        : "R$ 0,00",
      icon: TrendingUp,
      description: "+5% em relação ao mês passado",
    },
    {
      title: "Clientes Ativos",
      value: stats?.activeCustomers?.toString() || "0",
      icon: Users,
      description: "No último mês",
    },
  ]

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 w-24 animate-pulse rounded bg-muted" />
              <div className="h-8 w-8 animate-pulse rounded bg-muted" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-32 animate-pulse rounded bg-muted" />
              <div className="mt-2 h-3 w-full animate-pulse rounded bg-muted" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statsConfig.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <Icon className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
