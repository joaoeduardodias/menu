"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/hooks/use-cart"
import { CreditCard, DollarSign, MapPin, User } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function CheckoutForm() {
  const router = useRouter()
  const { total, clearCart } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"credit" | "debit" | "cash" | "pix">("credit")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    clearCart()
    router.push("/sucesso")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="size-5" aria-hidden="true" />
            Dados Pessoais
          </CardTitle>
          <CardDescription>Informe seus dados para entrega</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo *</Label>
              <Input id="name" name="name" placeholder="João Silva" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone *</Label>
              <Input id="phone" name="phone" type="tel" placeholder="(11) 99999-9999" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">E-mail *</Label>
            <Input id="email" name="email" type="email" placeholder="joao@exemplo.com" required />
          </div>
        </CardContent>
      </Card>

      {/* Delivery Address */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="size-5" aria-hidden="true" />
            Endereço de Entrega
          </CardTitle>
          <CardDescription>Para onde devemos levar seu pedido?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="street">Rua *</Label>
              <Input id="street" name="street" placeholder="Rua das Flores" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="number">Número *</Label>
              <Input id="number" name="number" placeholder="123" required />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="complement">Complemento</Label>
              <Input id="complement" name="complement" placeholder="Apto 45" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="neighborhood">Bairro *</Label>
              <Input id="neighborhood" name="neighborhood" placeholder="Centro" required />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="city">Cidade *</Label>
              <Input id="city" name="city" placeholder="São Paulo" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zipcode">CEP *</Label>
              <Input id="zipcode" name="zipcode" placeholder="01234-567" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="reference">Ponto de Referência</Label>
            <Textarea id="reference" name="reference" placeholder="Próximo ao mercado" rows={2} />
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="size-5" aria-hidden="true" />
            Forma de Pagamento
          </CardTitle>
          <CardDescription>Como você deseja pagar?</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as any)}>
            <div className="flex items-center space-x-3 rounded-lg border p-4">
              <RadioGroupItem value="credit" id="credit" />
              <Label htmlFor="credit" className="flex flex-1 cursor-pointer items-center gap-2">
                <CreditCard className="size-5" aria-hidden="true" />
                <span className="font-medium">Cartão de Crédito</span>
              </Label>
            </div>
            <div className="flex items-center space-x-3 rounded-lg border p-4">
              <RadioGroupItem value="debit" id="debit" />
              <Label htmlFor="debit" className="flex flex-1 cursor-pointer items-center gap-2">
                <CreditCard className="size-5" aria-hidden="true" />
                <span className="font-medium">Cartão de Débito</span>
              </Label>
            </div>
            <div className="flex items-center space-x-3 rounded-lg border p-4">
              <RadioGroupItem value="pix" id="pix" />
              <Label htmlFor="pix" className="flex flex-1 cursor-pointer items-center gap-2">
                <DollarSign className="size-5" aria-hidden="true" />
                <span className="font-medium">PIX</span>
              </Label>
            </div>
            <div className="flex items-center space-x-3 rounded-lg border p-4">
              <RadioGroupItem value="cash" id="cash" />
              <Label htmlFor="cash" className="flex flex-1 cursor-pointer items-center gap-2">
                <DollarSign className="size-5" aria-hidden="true" />
                <span className="font-medium">Dinheiro</span>
              </Label>
            </div>
          </RadioGroup>

          {paymentMethod === "cash" && (
            <div className="mt-4 space-y-2">
              <Label htmlFor="change">Troco para quanto?</Label>
              <Input id="change" name="change" type="number" placeholder="50.00" step="0.01" />
            </div>
          )}
        </CardContent>
      </Card>

      <Button type="submit" size="lg" className="w-full text-base" disabled={isSubmitting}>
        {isSubmitting ? "Processando..." : `Confirmar Pedido - R$ ${(total + 5).toFixed(2)}`}
      </Button>
    </form>
  )
}
