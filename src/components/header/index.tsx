import { auth, isAuthenticated } from "@/utils/auth"
import { ButtonAuth } from "./button-auth"
import { ButtonCart } from "./button-cart"

export async function Header() {
  const isAuth = await isAuthenticated()
  const session = isAuth ? await auth() : null

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4" aria-label="Menu principal">
        <div className="flex items-center gap-2">
          <div className="flex size-10 items-center justify-center rounded-full bg-primary" aria-hidden="true">
            <span className="text-xl font-bold text-primary-foreground">🍔</span>
          </div>
          <h1 className="text-xl font-bold text-balance md:text-2xl">Burger House</h1>
        </div>
        <div className="flex items-center gap-2">
          <ButtonAuth isAuthenticate={isAuth} user={session?.user} />
          <ButtonCart />

        </div>
      </nav>
    </header>
  )
}
