"use client"
import type { GetProfile200User } from "@/lib/api/model";
import { LogOut, User } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

export interface ButtonAuthProps {
  isAuthenticate: boolean
  user?: GetProfile200User
}

export function ButtonAuth({ isAuthenticate, user }: ButtonAuthProps) {

  const getUserInitials = () => {
    if (!user?.name) return "U"
    return user.name.charAt(0).toUpperCase()
  }

  const getUserName = () => {
    return user?.name || "Usuário"
  }


  return (
    !isAuthenticate ? (
      <Button variant="ghost" size="sm" className="h-9 gap-2 sm:h-10" asChild>
        <Link href="/sign-in">
          <User className="size-4 sm:size-5" aria-hidden="true" />
          <span className="hidden sm:inline">Entrar</span>
        </Link>
      </Button>
    ) : isAuthenticate && user ? (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="hidden md:flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{getUserInitials()}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{getUserName()}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/auth/profile">Meu Perfil</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/auth/orders">Meus Pedidos</Link>
          </DropdownMenuItem>
          {user.role === 'ADMIN' && (
            <DropdownMenuItem asChild>
              <Link href="/admin">
                Dashboard
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild className="text-red-600">
            <a href='/api/auth/sign-out'>
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ) : null
  )
}