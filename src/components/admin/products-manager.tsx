"use client"

import type React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { getProducts } from "@/lib/actions"
import { createProduct, deleteProduct, updateProduct } from "@/lib/admin-actions"
import type { Product } from "@/lib/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Edit, Plus, Trash2 } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

const categoryMap = {
  classic: "Clássico",
  premium: "Premium",
  special: "Especial",
}

export function ProductsManager() {
  const queryClient = useQueryClient()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  })

  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
      setIsDialogOpen(false)
      setEditingProduct(null)
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Product> }) => updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
      setIsDialogOpen(false)
      setEditingProduct(null)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: Number.parseFloat(formData.get("price") as string),
      image: formData.get("image") as string,
      category: formData.get("category") as Product["category"],
      popular: formData.get("popular") === "true",
    }

    if (editingProduct) {
      updateMutation.mutate({ id: editingProduct.id, data })
    } else {
      createMutation.mutate(data as Omit<Product, "id">)
    }
  }

  function handleEdit(product: Product) {
    setEditingProduct(product)
    setIsDialogOpen(true)
  }

  function handleDelete(id: string) {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
      deleteMutation.mutate(id)
    }
  }

  function handleDialogClose() {
    setIsDialogOpen(false)
    setEditingProduct(null)
  }

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="h-48 animate-pulse rounded bg-muted" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex justify-end">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingProduct(null)}>
              <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
              Adicionar Produto
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-125">
            <DialogHeader>
              <DialogTitle>{editingProduct ? "Editar Produto" : "Adicionar Produto"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Nome</Label>
                <Input id="name" name="name" required defaultValue={editingProduct?.name} />
              </div>

              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea id="description" name="description" required defaultValue={editingProduct?.description} />
              </div>

              <div>
                <Label htmlFor="price">Preço (R$)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  required
                  defaultValue={editingProduct?.price}
                />
              </div>

              <div>
                <Label htmlFor="image">URL da Imagem</Label>
                <Input
                  id="image"
                  name="image"
                  type="url"
                  required
                  defaultValue={editingProduct?.image}
                  placeholder="/hamburguer-exemplo.jpg"
                />
              </div>

              <div>
                <Label htmlFor="category">Categoria</Label>
                <Select name="category" defaultValue={editingProduct?.category || "classic"} required>
                  <SelectTrigger id="category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="classic">Clássico</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="special">Especial</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="popular">Produto Popular</Label>
                <Select name="popular" defaultValue={editingProduct?.popular ? "true" : "false"}>
                  <SelectTrigger id="popular">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Sim</SelectItem>
                    <SelectItem value="false">Não</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  {editingProduct ? "Atualizar" : "Criar"}
                </Button>
                <Button type="button" variant="outline" onClick={handleDialogClose}>
                  Cancelar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
        {products?.map((product) => (
          <Card key={product.id}>
            <CardContent className="p-4">
              <article>
                <div className="relative mb-4 aspect-video overflow-hidden rounded-lg bg-muted">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                </div>

                <div className="mb-2 flex items-start justify-between gap-2">
                  <h3 className="font-semibold">{product.name}</h3>
                  {product.popular && (
                    <Badge variant="secondary" className="shrink-0">
                      Popular
                    </Badge>
                  )}
                </div>

                <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">{product.description}</p>

                <div className="mb-4 flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(product.price)}
                  </span>
                  <Badge variant="outline">{categoryMap[product.category]}</Badge>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                    onClick={() => handleEdit(product)}
                  >
                    <Edit className="mr-2 h-4 w-4" aria-hidden="true" />
                    Editar
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(product.id)}
                    aria-label={`Excluir ${product.name}`}
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </article>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
