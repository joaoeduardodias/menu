"use client"

import type { CartItem, Product } from "@/lib/types"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  orderType: "delivery" | "pickup" | "dine-in"
  setOrderType: (type: "delivery" | "pickup" | "dine-in") => void
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
  total: number
  deliveryFree: number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      isOpen: false,
      orderType: "delivery",
      deliveryFree: 5,

      addItem: (product: Product) => {
        const items = get().items
        const existingItem = items.find((item) => item.id === product.id)

        if (existingItem) {
          set({
            items: items.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)),
          })
        } else {
          set({ items: [...items, { ...product, quantity: 1 }] })
        }

        const newItems = get().items
        const total = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
        set({ total })
      },

      removeItem: (productId: string) => {
        set({ items: get().items.filter((item) => item.id !== productId) })
        const newItems = get().items
        const total = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
        set({ total })
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }

        set({
          items: get().items.map((item) => (item.id === productId ? { ...item, quantity } : item)),
        })

        const newItems = get().items
        const total = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
        set({ total })
      },

      clearCart: () => set({ items: [], total: 0 }),

      toggleCart: () => set({ isOpen: !get().isOpen }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      setOrderType: (type: "delivery" | "pickup" | "dine-in") => {
        set({
          orderType: type,
          deliveryFree: type === "delivery" ? 5 : 0,
        })
      },
    }),
    {
      name: "cart-storage",
    },
  ),
)
