"use client";

// Client Component: os controles do carrossel (setas, dots, teclado) exigem
// estado (índice ativo) e uma ref ao container rolável — nenhum dos dois
// existe em Server Components.

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface Testimonial {
  name: string;
  quote: string;
}

// PLACEHOLDER: depoimentos e nomes são fictícios — atualizar com depoimentos
// reais de pacientes (com consentimento, mesmo cuidado legal já aplicado a
// Antes/Depois e Casos Clínicos).
const TESTIMONIALS: Testimonial[] = [
  {
    name: "Ana",
    quote:
      "Fiquei impressionada com o cuidado e profissionalismo de toda a equipa. Recomendo!",
  },
  {
    name: "Ricardo",
    quote:
      "Ambiente acolhedor e tratamento sem dor. Nunca pensei que fosse possível.",
  },
  {
    name: "Marta",
    quote:
      "Excelente acompanhamento em todas as consultas, sinto-me sempre bem cuidada.",
  },
  {
    name: "João",
    quote: "Equipa atenciosa, instalações modernas e resultados excelentes.",
  },
];

function getInitials(name: string) {
  return name.slice(0, 2).toUpperCase();
}

function TestimonialCard({ name, quote }: Testimonial) {
  return (
    <div className="bg-card flex w-[85%] shrink-0 snap-center flex-col gap-4 rounded-lg border p-6 sm:w-[45%] lg:w-[30%]">
      <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-full text-sm font-semibold">
        {getInitials(name)}
      </div>
      <p className="text-foreground text-sm leading-relaxed">“{quote}”</p>
      <span className="text-muted-foreground text-sm font-medium">{name}</span>
    </div>
  );
}

export function Testemunhos() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Distância real (em px) entre o início de dois cards consecutivos —
  // medida a partir do DOM, não estimada. `scrollWidth / length` (versão
  // anterior) não descontava o `gap-6` entre os cards, então cada clique
  // acumulava um pequeno erro até o dot ativo dessincronizar do card visível.
  const getStep = () => {
    const container = containerRef.current;
    if (!container || container.children.length < 2) return 0;

    const first = container.children[0] as HTMLElement;
    const second = container.children[1] as HTMLElement;
    return (
      second.getBoundingClientRect().left - first.getBoundingClientRect().left
    );
  };

  const scrollToIndex = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const clamped = Math.max(0, Math.min(index, TESTIMONIALS.length - 1));
    const step = getStep();
    container.scrollTo({ left: clamped * step, behavior: "smooth" });
    setActiveIndex(clamped);
  };

  const handlePrev = () => scrollToIndex(activeIndex - 1);
  const handleNext = () => scrollToIndex(activeIndex + 1);

  // Mantém os dots sincronizados quando o utilizador arrasta/faz swipe
  // manualmente (sem passar pelos botões) — listener escopado ao próprio
  // container, não a `window`.
  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const step = getStep();
    if (step <= 0) return;

    const index = Math.round(container.scrollLeft / step);
    setActiveIndex(index);
  };

  // Navegação por teclado escopada: só reage quando o próprio carrossel tem
  // foco (evita o problema de listener global em `window` visto no
  // "Testimonial Section 3" pesquisado, que moveria qualquer carrossel da
  // página inteira ao apertar as setas em qualquer lugar).
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      handlePrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      handleNext();
    }
  };

  return (
    <section
      id="testemunhos"
      className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="font-heading text-foreground text-3xl font-medium tracking-tight sm:text-4xl">
          O Que Dizem os Nossos Pacientes
        </h2>
      </div>

      <div
        ref={containerRef}
        role="region"
        aria-label="Depoimentos de pacientes"
        tabIndex={0}
        onScroll={handleScroll}
        onKeyDown={handleKeyDown}
        className="focus-visible:ring-ring/50 flex snap-x snap-mandatory [scrollbar-width:none] gap-6 overflow-x-auto scroll-smooth pb-2 outline-none focus-visible:ring-3 [&::-webkit-scrollbar]:hidden"
      >
        {TESTIMONIALS.map((testimonial) => (
          <TestimonialCard key={testimonial.name} {...testimonial} />
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Depoimento anterior"
          className="text-muted-foreground hover:text-foreground hover:bg-muted rounded-full p-2 transition-colors"
        >
          <ChevronLeft className="size-5" aria-hidden="true" />
        </button>

        <div className="flex items-center gap-2">
          {TESTIMONIALS.map((testimonial, index) => (
            <button
              key={testimonial.name}
              type="button"
              onClick={() => scrollToIndex(index)}
              aria-label={`Ir para o depoimento de ${testimonial.name}`}
              aria-current={index === activeIndex ? "true" : undefined}
              className={cn(
                "size-2 rounded-full transition-colors",
                index === activeIndex ? "bg-primary" : "bg-muted",
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Próximo depoimento"
          className="text-muted-foreground hover:text-foreground hover:bg-muted rounded-full p-2 transition-colors"
        >
          <ChevronRight className="size-5" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}

export default Testemunhos;
