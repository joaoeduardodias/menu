"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-linear-to-b from-accent/20 to-background"
      aria-labelledby="hero-title"
    >
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <article className="flex flex-col justify-center space-y-6">
            <div
              className="inline-block rounded-full bg-accent/20 px-4 py-1.5 text-sm font-medium text-accent-foreground w-fit"
              role="status"
            >
              🔥 Novidade: Hot Jalapeño
            </div>

            <h2 id="hero-title" className="text-4xl font-bold tracking-tight text-balance md:text-5xl lg:text-6xl">
              Hambúrgueres Artesanais Irresistíveis
            </h2>

            <p className="text-lg text-muted-foreground text-pretty md:text-xl">
              Feitos com ingredientes selecionados e muito amor. Experimente o sabor da qualidade premium.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                className="text-base"
                onClick={() => {
                  document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Ver Cardápio
              </Button>
              <Button size="lg" variant="outline" className="text-base bg-transparent">
                Delivery
              </Button>
            </div>

            <dl className="flex items-center gap-6 pt-4">
              <div className="text-center">
                <dt className="sr-only">Avaliação média</dt>
                <dd className="text-2xl font-bold" aria-label="4.9 estrelas de 5">
                  4.9⭐
                </dd>
                <dd className="text-sm text-muted-foreground">Avaliação</dd>
              </div>
              <div className="h-12 w-px bg-border" aria-hidden="true" />
              <div className="text-center">
                <dt className="sr-only">Total de pedidos</dt>
                <dd className="text-2xl font-bold">2.5k+</dd>
                <dd className="text-sm text-muted-foreground">Pedidos</dd>
              </div>
              <div className="h-12 w-px bg-border" aria-hidden="true" />
              <div className="text-center">
                <dt className="sr-only">Tempo de entrega</dt>
                <dd className="text-2xl font-bold">30min</dd>
                <dd className="text-sm text-muted-foreground">Entrega</dd>
              </div>
            </dl>
          </article>

          <div className="relative">
            <figure className="aspect-square overflow-hidden rounded-2xl bg-muted">
              <Image
                src="/hamburguer-gourmet-gigante-apetitoso-com-ingredien.jpg"
                width={900}
                height={900}
                alt="Hambúrguer artesanal gourmet gigante com ingredientes frescos"
                className="size-full object-cover"
                loading="eager"
                fetchPriority="high"
              />
            </figure>
            <aside
              className="absolute -bottom-4 -right-4 rounded-xl bg-card p-4 shadow-lg md:-bottom-6 md:-right-6"
              aria-label="Promoção especial"
            >
              <div className="text-sm font-medium text-muted-foreground">Promoção</div>
              <div className="text-2xl font-bold text-primary">30% OFF</div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  )
}
