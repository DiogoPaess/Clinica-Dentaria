import { MessageCircle } from "lucide-react";

import { cn } from "@/lib/utils";

// PLACEHOLDER: número de WhatsApp fictício — atualizar com o número real da
// clínica antes do lançamento.
const WHATSAPP_NUMBER = "351900000000";

// Usamos o ícone genérico "MessageCircle" (lucide-react) em vez do logótipo
// oficial do WhatsApp: é marca registada da Meta, com diretrizes de uso
// próprias — decisão a confirmar separadamente se quiserem o logo real.
export function WhatsappButton({ className }: { className?: string }) {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar via WhatsApp"
      className={cn(
        "bg-accent text-accent-foreground hover:bg-accent/90 inline-flex w-fit items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
        className,
      )}
    >
      <MessageCircle className="size-5" aria-hidden="true" />
      Falar no WhatsApp
    </a>
  );
}
