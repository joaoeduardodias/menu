"use client"

import type { CartItem, Product } from "@/lib/types"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
  total: number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      isOpen: false,

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

        // Atualizar total
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
    }),
    {
      name: "cart-storage",
    },
  ),
)
