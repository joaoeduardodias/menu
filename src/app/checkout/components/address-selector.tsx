"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { GetAddressesByUser200 } from "@/lib/api/model"
import { Check, MapPin, Plus, Trash2 } from "lucide-react"

interface AddressSelectorProps {
  selectedAddressId?: string
  onAddressSelect: (addressId: string) => void
  onAddNew: () => void
  addresses: GetAddressesByUser200
}

export function AddressSelector({ selectedAddressId, onAddressSelect, onAddNew, addresses }: AddressSelectorProps) {

  async function handleDeleteAddress(addressId: string) {
    // try {
    //   await deleteAddress(addressId)
    //   setAddresses((prev) => prev.filter((addr) => addr.id !== addressId))
    //   toast.success("Endereço removido com sucesso")

    //   if (selectedAddressId === addressId) {
    //     onAddressSelect("")
    //   }
    // } catch (error) {
    //   toast.error("Erro ao remover endereço")
    // }
  }

  // if (isLoading) {
  //   return (
  //     <Card>
  //       <CardHeader>
  //         <CardTitle className="flex items-center gap-2">
  //           <MapPin className="size-5" />
  //           Selecione o Endereço
  //         </CardTitle>
  //       </CardHeader>
  //       <CardContent>
  //         <p className="text-sm text-muted-foreground">Carregando endereços...</p>
  //       </CardContent>
  //     </Card>
  //   )
  // }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="size-5" />
          Selecione o Endereço
        </CardTitle>
        <CardDescription>Escolha um endereço salvo ou adicione um novo</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {addresses.addresses.length > 0 ? (
          <RadioGroup value={selectedAddressId} onValueChange={onAddressSelect}>
            {addresses.addresses.map((address) => (
              <div
                key={address.id}
                className="flex items-start gap-3 rounded-lg border p-4 hover:bg-accent/50 transition-colors"
              >
                <RadioGroupItem value={address.id} id={address.id} className="mt-1" />
                <Label htmlFor={address.id} className="flex-1 cursor-pointer space-y-1">
                  <div className="flex items-center gap-2">
                    {address.name && <span className="font-semibold">{address.name}</span>}
                    {address.isDefault && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                        <Check className="size-3" />
                        Padrão
                      </span>
                    )}
                  </div>
                  <p className="text-sm">
                    {address.street}, {address.number}
                    {address.complement && ` - ${address.complement}`}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {address.neighborhood} - CEP: {address.zipCode}
                  </p>
                </Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="mt-1 text-muted-foreground hover:text-destructive"
                  onClick={(e) => {
                    e.preventDefault()
                    handleDeleteAddress(address.id)
                  }}
                >
                  <Trash2 className="size-4" />
                  <span className="sr-only">Remover endereço</span>
                </Button>
              </div>
            ))}
          </RadioGroup>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">Você ainda não tem endereços salvos</p>
        )}

        <Button type="button" variant="outline" className="w-full bg-transparent" onClick={onAddNew}>
          <Plus className="mr-2 size-4" />
          Adicionar Novo Endereço
        </Button>
      </CardContent>
    </Card>
  )
}
