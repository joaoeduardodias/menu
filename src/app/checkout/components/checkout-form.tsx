"use client"

import { signInWithGoogle } from "@/app/(auth)/actions"
import { OrderSummary } from "@/components/order-summary"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/hooks/use-cart"
import type { GetAddressesByUser200, GetProfile200User } from "@/lib/api/model"
import { CreditCard, DollarSign, MapPin, ShoppingBag, Store, User, UtensilsCrossed } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { AddressForm } from "./address-form"
import { AddressSelector } from "./address-selector"

interface CheckoutFormProps {
  isAuth: boolean
  user?: GetProfile200User
  addresses: GetAddressesByUser200
}
export function CheckoutForm({ isAuth, user, addresses }: CheckoutFormProps) {
  const { total, orderType, setOrderType, } = useCart()
  const [selectedAddressId, setSelectedAddressId] = useState<string>("")
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"credit" | "debit" | "cash" | "pix">("credit")


  function handleOrderTypeChange(value: string) {
    setOrderType(value as "delivery" | "pickup" | "dine-in")
  }
  function handleAddressSelect(addressId: string) {
    setSelectedAddressId(addressId)
  }

  function handleAddNewAddress() {
    setShowAddressForm(true)
  }

  return (
    <div className="space-y-6">
      {!isAuth && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Já tem uma conta?</CardTitle>
            <CardDescription>Faça login para agilizar seu pedido e acessar seus endereços salvos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              type="button"
              variant="outline"
              className="w-full h-11 bg-transparent"
              onClick={signInWithGoogle}
            >

              Continuar com o Google
            </Button>
            <div className="text-center">
              <Link href="/sign-in" className="text-sm text-primary hover:underline">
                Ou faça login com e-mail e senha
              </Link>
            </div>
            <p className="text-xs text-center text-muted-foreground">Opcional - você pode continuar sem fazer login</p>
          </CardContent>
        </Card>
      )}
      <form className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="size-5" aria-hidden="true" />
              Tipo de Pedido
            </CardTitle>
            <CardDescription>Como você deseja receber seu pedido?</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={orderType} onValueChange={handleOrderTypeChange}>
              <div className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-accent/50 transition-colors">
                <RadioGroupItem value="delivery" id="delivery" />
                <Label htmlFor="delivery" className="flex flex-1 cursor-pointer items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                    <ShoppingBag className="size-5 text-primary" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <span className="font-medium block">Entrega</span>
                    <span className="text-sm text-muted-foreground">Receba em casa - Taxa: R$ 5,00</span>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-accent/50 transition-colors">
                <RadioGroupItem value="pickup" id="pickup" />
                <Label htmlFor="pickup" className="flex flex-1 cursor-pointer items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                    <Store className="size-5 text-primary" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <span className="font-medium block">Retirar no Balcão</span>
                    <span className="text-sm text-muted-foreground">Busque na loja - Sem taxa</span>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-accent/50 transition-colors">
                <RadioGroupItem value="dine-in" id="dine-in" />
                <Label htmlFor="dine-in" className="flex flex-1 cursor-pointer items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                    <UtensilsCrossed className="size-5 text-primary" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <span className="font-medium block">Comer no Local</span>
                    <span className="text-sm text-muted-foreground">Aproveite no restaurante - Sem taxa</span>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
        {orderType === "delivery" && (
          <>
            {isAuth && !showAddressForm && user && (
              <AddressSelector
                addresses={addresses}
                selectedAddressId={selectedAddressId}
                onAddressSelect={handleAddressSelect}
                onAddNew={handleAddNewAddress}
              />
            )}

            {isAuth && showAddressForm && user && (
              <AddressForm />
            )}

            {!isAuth && (
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

                  <div className="space-y-2">
                    <Label htmlFor="reference">Ponto de Referência</Label>
                    <Textarea id="reference" name="reference" placeholder="Próximo ao mercado" rows={2} />
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}

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
        <OrderSummary />
        <Button type="submit" size="lg" className="w-full text-base" >
          {/* {isPending ? "Processando..." : `Confirmar Pedido - R$ ${(total + 5).toFixed(2)}`} */}
          Confirmar Pedido - R$ ${(total + 5).toFixed(2)}
        </Button>
      </form>
    </div>
  )
}
