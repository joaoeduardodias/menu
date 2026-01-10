"use client"

import { ProductCard } from "@/components/product-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getProducts } from "@/lib/actions"
import { useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"

export function MenuSection() {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  })

  if (isLoading) {
    return (
      <section id="menu" className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center py-20">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      </section>
    )
  }

  const popularProducts = products?.filter((p) => p.popular) || []
  const classicProducts = products?.filter((p) => p.category === "classic") || []
  const premiumProducts = products?.filter((p) => p.category === "premium") || []
  const specialProducts = products?.filter((p) => p.category === "special") || []

  return (
    <section id="menu" className="container mx-auto  px-8 py-12 md:py-20">
      <div className="mb-8 text-center md:mb-12">
        <h2 className="mb-3 text-3xl font-bold tracking-tight text-balance md:text-4xl">Nosso Cardápio</h2>
        <p className="text-lg text-muted-foreground text-pretty">Escolha seu hambúrguer favorito e faça seu pedido</p>
      </div>

      <Tabs defaultValue="popular" className="w-full">
        <TabsList className="mb-8 grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
          <TabsTrigger value="popular">Populares</TabsTrigger>
          <TabsTrigger value="classic">Clássicos</TabsTrigger>
          <TabsTrigger value="premium">Premium</TabsTrigger>
          <TabsTrigger value="special">Especiais</TabsTrigger>
        </TabsList>

        <TabsContent value="popular">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="classic">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {classicProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="premium">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {premiumProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="special">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {specialProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  )
}
