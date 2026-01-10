import { DashboardStats } from "@/components/admin/dashboard-stats"
import { RecentOrders } from "@/components/admin/recent-orders"
import { SalesChart } from "@/components/admin/sales-chart"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard - Administração | Burger House",
  description: "Painel administrativo para gerenciar pedidos e produtos",
  robots: "noindex, nofollow",
}

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-6 lg:py-8">
        <header className="mb-6 lg:mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl">Dashboard</h1>
          <p className="mt-2 text-muted-foreground">Visão geral do seu negócio em tempo real</p>
        </header>

        <DashboardStats />

        <div className="mt-6 grid gap-6 lg:mt-8 lg:grid-cols-2">
          <SalesChart />
          <RecentOrders />
        </div>
      </div>
    </main>
  )
}
