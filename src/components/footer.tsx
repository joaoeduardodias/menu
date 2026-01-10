import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {/* About */}
          <section>
            <h3 className="mb-3 text-base font-semibold tracking-tight">Sobre Nós</h3>
            <p className="text-sm text-muted-foreground leading-relaxed text-pretty">
              Hambúrgueres artesanais feitos com ingredientes premium e muito amor.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h3 className="mb-3 text-base font-semibold tracking-tight">Contato</h3>
            <address className="not-italic">
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Phone className="size-4 shrink-0 text-primary/60" aria-hidden="true" />
                  <a href="tel:+5511999999999" className="hover:text-primary transition-colors">
                    (11) 99999-9999
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="size-4 shrink-0 text-primary/60" aria-hidden="true" />
                  <a href="mailto:contato@burgerhouse.com" className="hover:text-primary transition-colors">
                    contato@burgerhouse.com
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="size-4 shrink-0 mt-0.5 text-primary/60" aria-hidden="true" />
                  <span className="leading-relaxed">
                    Rua dos Hambúrgueres, 123
                    <br />
                    São Paulo - SP
                  </span>
                </li>
              </ul>
            </address>
          </section>

          {/* Hours */}
          <section>
            <h3 className="mb-3 text-base font-semibold tracking-tight">Horário</h3>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Seg - Sex:</dt>
                <dd className="font-medium tabular-nums">11h - 23h</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Sáb - Dom:</dt>
                <dd className="font-medium tabular-nums">12h - 00h</dd>
              </div>
            </dl>
          </section>

          {/* Social */}
          <section>
            <h3 className="mb-3 text-base font-semibold tracking-tight">Redes Sociais</h3>
            <div className="flex gap-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex items-center justify-center size-9 rounded-md border border-input bg-transparent hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Instagram className="size-4" aria-hidden="true" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex items-center justify-center size-9 rounded-md border border-input bg-transparent hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Facebook className="size-4" aria-hidden="true" />
              </a>
            </div>
          </section>
        </div>

        <div className="pt-6 border-t border-border/50">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Burger House. Todos os direitos reservados.
            </p>
            <nav className="flex gap-6" aria-label="Menu legal">
              <a
                href="/politica-privacidade"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacidade
              </a>
              <a href="/termos" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Termos
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
