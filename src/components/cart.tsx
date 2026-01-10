"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/hooks/use-cart"
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function Cart() {
  const { items, total, updateQuantity, removeItem, clearCart, isOpen, closeCart } = useCart()
  const router = useRouter()

  useEffect(() => {
    const drawer = document.getElementById("cart-drawer")
    if (drawer) {
      if (isOpen) {
        drawer.classList.remove("translate-x-full")
      } else {
        drawer.classList.add("translate-x-full")
      }
    }
  }, [isOpen])

  function handleCheckout() {
    closeCart()
    router.push("/checkout")
  }

  return (
    <aside
      id="cart-drawer"
      className="fixed right-0 top-0 z-50 h-full w-full transform bg-card shadow-2xl transition-transform duration-300 translate-x-full min-[400px]:w-95 sm:w-96"
      role="dialog"
      aria-labelledby="cart-title"
      aria-modal="true"
    >
      <div className="flex h-full flex-col">
        <header className="flex items-center justify-between border-b p-3 sm:p-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="size-4 sm:size-5" aria-hidden="true" />
            <h2 id="cart-title" className="text-base font-semibold sm:text-lg">
              Seu Pedido
            </h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 sm:size-9"
            onClick={closeCart}
            aria-label="Fechar carrinho"
          >
            <X className="size-4 sm:size-5" aria-hidden="true" />
          </Button>
        </header>

        <div className="flex-1 overflow-auto p-3 sm:p-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center" role="status">
              <ShoppingBag className="mb-3 size-12 text-muted-foreground sm:mb-4 sm:size-16" aria-hidden="true" />
              <p className="text-sm text-muted-foreground sm:text-base">Seu carrinho está vazio</p>
              <p className="mt-1.5 text-xs text-muted-foreground sm:mt-2 sm:text-sm">Adicione itens do cardápio</p>
            </div>
          ) : (
            <ul className="space-y-3 sm:space-y-4" role="list">
              {items.map((item) => (
                <li key={item.id} className="flex gap-2.5 rounded-lg border p-2.5 sm:gap-3 sm:p-3">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={`Foto de ${item.name}`}
                    className="size-16 rounded-md object-cover sm:size-20"
                    loading="lazy"
                  />

                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-medium text-xs leading-tight sm:text-sm">{item.name}</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-5 shrink-0 sm:size-6"
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remover ${item.name} do carrinho`}
                      >
                        <Trash2 className="size-3 sm:size-3.5" aria-hidden="true" />
                      </Button>
                    </div>

                    <div className="mt-auto flex items-center justify-between">
                      <span
                        className="text-sm font-semibold text-primary sm:text-base"
                        aria-label={`Preço: ${(item.price * item.quantity).toFixed(2)} reais`}
                      >
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </span>

                      <div
                        className="flex items-center gap-1.5 sm:gap-2"
                        role="group"
                        aria-label={`Quantidade de ${item.name}`}
                      >
                        <Button
                          variant="outline"
                          size="icon"
                          className="size-6 bg-transparent sm:size-7"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label={`Diminuir quantidade de ${item.name}`}
                        >
                          <Minus className="size-2.5 sm:size-3" aria-hidden="true" />
                        </Button>

                        <span
                          className="w-7 text-center text-sm font-medium sm:w-8"
                          aria-label={`${item.quantity} unidades`}
                        >
                          {item.quantity}
                        </span>

                        <Button
                          variant="outline"
                          size="icon"
                          className="size-6 bg-transparent sm:size-7"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label={`Aumentar quantidade de ${item.name}`}
                        >
                          <Plus className="size-2.5 sm:size-3" aria-hidden="true" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}

              {items.length > 0 && (
                <li>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-xs text-destructive hover:text-destructive sm:text-sm"
                    onClick={clearCart}
                  >
                    Limpar carrinho
                  </Button>
                </li>
              )}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <footer className="border-t p-3 sm:p-4">
            <div className="space-y-2.5 sm:space-y-3">
              <dl className="space-y-2.5 sm:space-y-3">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd className="font-medium">R$ {total.toFixed(2)}</dd>
                </div>

                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <dt className="text-muted-foreground">Taxa de entrega</dt>
                  <dd className="font-medium">R$ 5,00</dd>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <dt className="text-sm font-semibold sm:text-base">Total</dt>
                  <dd className="text-xl font-bold text-primary sm:text-2xl">R$ {(total + 5).toFixed(2)}</dd>
                </div>
              </dl>

              <Button size="lg" className="w-full text-sm sm:text-base" onClick={handleCheckout}>
                Finalizar Pedido
              </Button>
            </div>
          </footer>
        )}
      </div>
    </aside>
  )
}
