"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Menu, Package, ShoppingBag, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const navItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Pedidos",
    href: "/admin/orders",
    icon: ShoppingBag,
  },
  {
    title: "Produtos",
    href: "/admin/products",
    icon: Package,
  },
  // {
  //   title: "Configurações",
  //   href: "/admin/configuracoes",
  //   icon: Settings,
  // },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-4 z-50 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setIsOpen(false)} aria-hidden="true" />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform border-r border-border bg-card transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <nav className="flex h-full flex-col p-4" aria-label="Menu administrativo">
          <div className="mb-8 mt-12 lg:mt-0">
            <h2 className="text-2xl font-bold text-primary">Burger House</h2>
            <p className="text-sm text-muted-foreground">Painel Administrativo</p>
          </div>

          <ul className="flex-1 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                      isActive ? "bg-primary text-primary-foreground hover:bg-primary/90" : "text-muted-foreground",
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                    <span>{item.title}</span>
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="mt-auto border-t border-border pt-4">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/" onClick={() => setIsOpen(false)}>
                Ver Cardápio
              </Link>
            </Button>
          </div>
        </nav>
      </aside>
    </>
  )
}
