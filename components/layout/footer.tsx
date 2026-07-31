import { Share2 } from "lucide-react";

import { CLINIC_NAME } from "@/components/layout/navbar";
import { CONTACT_INFO } from "@/lib/contact-info";

const QUICK_LINKS = [
  { href: "#servicos", label: "Serviços" },
  { href: "#equipa", label: "Equipa" },
  { href: "#casos-clinicos", label: "Casos Clínicos" },
  { href: "#faq", label: "FAQ" },
  { href: "#contacto", label: "Contacto" },
] as const;

// PLACEHOLDER: sem URLs reais ainda — atualizar quando as contas da clínica
// existirem. Sem `href` propositadamente: um `href="#"` faria o link saltar
// para o topo da página ao clicar (comportamento nativo do browser, que só
// se evita com JS/'use client'); sem `href`, o elemento não é navegável.
const SOCIAL_LINKS = [{ label: "Instagram" }, { label: "Facebook" }] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-muted">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="font-heading text-foreground text-lg font-medium">
              {CLINIC_NAME}
            </span>
          </div>

          <nav aria-label="Links rápidos">
            <h3 className="text-foreground mb-3 text-sm font-semibold">
              Links Rápidos
            </h3>
            <ul className="flex flex-col gap-2">
              {QUICK_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-foreground mb-3 text-sm font-semibold">
              Contacto
            </h3>
            <ul className="flex flex-col gap-2">
              <li className="text-muted-foreground text-sm">
                {CONTACT_INFO.phone}
              </li>
              <li className="text-muted-foreground text-sm">
                {CONTACT_INFO.address}
              </li>
            </ul>
          </div>

          <nav aria-label="Redes sociais">
            <h3 className="text-foreground mb-3 text-sm font-semibold">
              Redes Sociais
            </h3>
            <ul className="flex flex-col gap-2">
              {SOCIAL_LINKS.map(({ label }) => (
                <li key={label}>
                  <a
                    aria-disabled="true"
                    tabIndex={-1}
                    className="text-muted-foreground flex cursor-not-allowed items-center gap-2 text-sm opacity-60"
                  >
                    <Share2 className="size-4" aria-hidden="true" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="border-border mt-10 border-t pt-6">
          <p className="text-muted-foreground text-center text-xs">
            © {year} {CLINIC_NAME}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
