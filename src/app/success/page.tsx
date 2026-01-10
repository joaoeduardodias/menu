import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Home } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Pedido Confirmado",
  description: "Seu pedido foi realizado com sucesso",
  robots: {
    index: false,
    follow: false,
  },
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto flex min-h-screen items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center py-12 text-center">
            <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="size-12 text-green-600" aria-hidden="true" />
            </div>

            <h1 className="mb-2 text-2xl font-bold">Pedido Confirmado!</h1>

            <p className="mb-6 text-muted-foreground text-pretty">
              Seu pedido foi recebido e está sendo preparado com muito carinho. Você receberá uma confirmação por e-mail
              em instantes.
            </p>

            <div className="mb-8 rounded-lg bg-muted p-4 w-full">
              <p className="text-sm font-medium mb-1">Tempo estimado de entrega</p>
              <p className="text-2xl font-bold text-primary">30-40 minutos</p>
            </div>

            <div className="flex flex-col gap-3 w-full sm:flex-row">
              <Button asChild className="flex-1" size="lg">
                <Link href="/">
                  <Home className="mr-2 size-4" aria-hidden="true" />
                  Voltar ao Cardápio
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
