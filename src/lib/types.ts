export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: "classic" | "premium" | "special"
  popular?: boolean
}

export interface CartItem extends Product {
  quantity: number
}

export interface CheckoutFormData {
  name: string
  email: string
  phone: string
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  zipCode: string
  reference?: string
  paymentMethod: "credit" | "debit" | "cash" | "pix"
  changeFor?: number
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  deliveryFee: number
  customer: {
    name: string
    email: string
    phone: string
  }
  address: {
    street: string
    number: string
    complement?: string
    neighborhood: string
    city: string
    zipCode: string
    reference?: string
  }
  paymentMethod: string
  status: "pending" | "confirmed" | "preparing" | "delivering" | "delivered"
  createdAt: Date
}
