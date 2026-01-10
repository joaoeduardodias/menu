"use server"

import type { Order, Product } from "./types"

// Mock database - em produção, usar um banco de dados real
const mockOrders: Order[] = []
let mockProducts: Product[] = []

export async function getDashboardStats() {
  // Simular estatísticas do dashboard
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const todayOrders = mockOrders.filter((order) => new Date(order.createdAt) >= today)

  const todaySales = todayOrders.reduce((sum, order) => sum + order.total, 0)
  const pendingOrders = mockOrders.filter((order) => order.status === "pending").length

  return {
    todaySales,
    todayOrders: todayOrders.length,
    pendingOrders,
    averageTicket: todayOrders.length > 0 ? todaySales / todayOrders.length : 0,
    activeCustomers: mockOrders.length,
  }
}

export async function getRecentOrders(): Promise<Order[]> {
  // Retornar os 5 pedidos mais recentes
  return mockOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5)
}

export async function getSalesData() {
  // Simular dados de vendas dos últimos 7 dias
  const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
  const today = new Date().getDay()

  return Array.from({ length: 7 }, (_, i) => ({
    day: days[(today - 6 + i + 7) % 7],
    sales: Math.floor(Math.random() * 3000) + 1000,
  }))
}

export async function getAllOrders(): Promise<Order[]> {
  // Retornar todos os pedidos ordenados por data
  return mockOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export async function updateOrderStatus(orderId: string, status: Order["status"]) {
  const orderIndex = mockOrders.findIndex((order) => order.id === orderId)
  if (orderIndex !== -1) {
    mockOrders[orderIndex].status = status
  }
  return mockOrders[orderIndex]
}

export async function createProduct(data: Omit<Product, "id">) {
  const newProduct: Product = {
    ...data,
    id: Date.now().toString(),
  }
  mockProducts.push(newProduct)
  return newProduct
}

export async function updateProduct(id: string, data: Partial<Product>) {
  const productIndex = mockProducts.findIndex((product) => product.id === id)
  if (productIndex !== -1) {
    mockProducts[productIndex] = { ...mockProducts[productIndex], ...data }
  }
  return mockProducts[productIndex]
}

export async function deleteProduct(id: string) {
  mockProducts = mockProducts.filter((product) => product.id !== id)
  return { success: true }
}

// Função auxiliar para adicionar pedidos de teste
export async function addMockOrder(order: Omit<Order, "id">) {
  const newOrder: Order = {
    ...order,
    id: Date.now().toString(),
  }
  mockOrders.push(newOrder)
  return newOrder
}
