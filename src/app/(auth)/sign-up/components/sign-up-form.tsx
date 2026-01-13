"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormState } from "@/hooks/use-form-state"
import { maskPhone } from "@/utils/mask-phone"
import { AlertTriangle, Eye, EyeOff, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { signUpAction } from "../actions"

export function SignupForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [phoneValue, SetPhoneValue] = useState<string>("")
  const [{ success, message, errors }, handleSubmit, isPending] = useFormState(signUpAction,
    () => {
      router.push('/')
    }
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    SetPhoneValue(maskPhone(e.target.value));
  };
  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-xl">Cadastro</CardTitle>
        <CardDescription>Crie sua conta para começar a fazer pedidos</CardDescription>
      </CardHeader>
      <CardContent>
        {success === false && message && (
          <Alert variant="destructive">
            <AlertTriangle className="size-4" />
            <AlertTitle>Falha ao criar conta</AlertTitle>
            <AlertDescription>
              <p>{message}</p>
            </AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome completo</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="João Silva"

              required
              autoComplete="name"
              className="h-11"
            />
            {errors?.name && (
              <p className="text-xs ml-1 text-red-600">{errors.name[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="seu@email.com"
              required
              autoComplete="email"
              className="h-11"
            />
            {errors?.email && (
              <p className="text-xs ml-1 text-red-600">{errors.email[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefone</Label>
            <input
              name="phone"
              type="hidden"
              value={phoneValue.replace(/\D/g, "")}
            />
            <Input
              id="phone"
              value={phoneValue}
              onChange={handleChange}
              type="tel"
              placeholder="(11) 99999-9999"
              autoComplete="tel"
              className="h-11"
            />
            {errors?.phone && (
              <p className="text-xs ml-1 text-red-600">{errors.phone[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                autoComplete="new-password"
                className="h-11 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </button>
            </div>
            {errors?.password && (
              <p className="text-xs ml-1 text-red-600">{errors.password[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="passwordConfirmation">Confirmar senha</Label>
            <Input
              id="passwordConfirmation"
              name="passwordConfirmation"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              required
              autoComplete="new-password"
              className="h-11"
            />
          </div>

          <Button type="submit" className="w-full h-11" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Criando conta...
              </>
            ) : (
              "Criar conta"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
