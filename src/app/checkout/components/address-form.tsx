"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NativeSelect } from "@/components/ui/native-select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, MapPin } from "lucide-react"

interface AddressFormProps {

}

export function AddressForm() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const addressData = {
      label: formData.get("label") as string,
      street: formData.get("street") as string,
      number: formData.get("number") as string,
      complement: formData.get("complement") as string,
      neighborhood: formData.get("neighborhood") as string,
      city: formData.get("city") as string,
      state: "SP",
      zipcode: formData.get("zipcode") as string,
      reference: formData.get("reference") as string,
      isDefault: formData.get("isDefault") === "on",
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Button type="button" variant="ghost" size="icon" >
            <ArrowLeft className="size-4" />
            <span className="sr-only">Voltar</span>
          </Button>
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="size-5" />
              Novo Endereço
            </CardTitle>
            <CardDescription>Adicione um novo endereço de entrega</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="label">Nome do Endereço (opcional)</Label>
            <Input id="label" name="label" placeholder="Ex: Casa, Trabalho, Casa da Praia" />
            <p className="text-xs text-muted-foreground">Dê um nome para identificar este endereço facilmente</p>
          </div>

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
              <Input id="complement" name="complement" placeholder="Apto 45, Bloco B" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="neighborhood">Bairro *</Label>
              <Input id="neighborhood" name="neighborhood" placeholder="Centro" required />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="city">Cidade *</Label>
              <NativeSelect id="city" name="city" required>
                <option value="">Selecione a cidade</option>
                <option value="São Paulo">São Paulo</option>
                <option value="Rio de Janeiro">Rio de Janeiro</option>
                <option value="Belo Horizonte">Belo Horizonte</option>
                <option value="Curitiba">Curitiba</option>
                <option value="Porto Alegre">Porto Alegre</option>
              </NativeSelect>
            </div>
            <div className="space-y-2">
              <Label htmlFor="zipcode">CEP *</Label>
              <Input id="zipcode" name="zipcode" placeholder="01234-567" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reference">Ponto de Referência</Label>
            <Textarea id="reference" name="reference" placeholder="Próximo ao mercado, portão azul" rows={2} />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="isDefault" name="isDefault" />
            <Label
              htmlFor="isDefault"
              className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Usar como endereço padrão
            </Label>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" className="flex-1 bg-transparent" >
              Cancelar
            </Button>
            <Button type="submit" className="flex-1" >
              Salvar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
