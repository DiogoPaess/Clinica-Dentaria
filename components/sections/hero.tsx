"use client";

// Client Component: pausar o vídeo de fundo quando o utilizador tem
// prefers-reduced-motion ativo exige `useEffect` + `window.matchMedia`,
// que não existem em Server Components.

import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";

// TODO: substituir por copy definitiva quando aprovada.
const HERO_HEADLINE = "Cuidado dentário de excelência, com atenção ao detalhe";
const HERO_SUBHEADLINE =
  "Uma equipa dedicada a cuidar do seu sorriso com atenção, tecnologia e conforto, em cada consulta.";

function HeroBackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Acessibilidade (WCAG 2.3.3): com prefers-reduced-motion ativo, o vídeo é
    // pausado (fica parado no frame atual) em vez de reproduzir em loop.
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const applyMotionPreference = () => {
      if (reducedMotionQuery.matches) {
        video.pause();
      } else {
        void video.play().catch(() => {
          // Autoplay pode ser bloqueado pelo browser; o vídeo é decorativo e
          // sem áudio, então não há fallback crítico necessário aqui.
        });
      }
    };

    applyMotionPreference();
    reducedMotionQuery.addEventListener("change", applyMotionPreference);
    return () =>
      reducedMotionQuery.removeEventListener("change", applyMotionPreference);
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        tabIndex={-1}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/hero-clinic.mp4" type="video/mp4" />
      </video>
      <div className="bg-background/50 absolute inset-0" aria-hidden="true" />
    </>
  );
}

export function Hero() {
  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center gap-8 overflow-hidden bg-[var(--hero-background)] px-4 pt-24 pb-16 text-center sm:px-6 lg:px-8">
      <HeroBackgroundVideo />

      <div className="relative z-10 flex max-w-3xl flex-col items-center gap-6">
        <h1 className="font-heading text-4xl leading-tight font-medium tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl">
          {HERO_HEADLINE}
        </h1>
        <p className="text-muted-foreground max-w-2xl text-base text-pretty sm:text-lg md:text-xl">
          {HERO_SUBHEADLINE}
        </p>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
        <Button
          size="lg"
          render={<a href="#contacto" />}
          nativeButton={false}
          className="bg-accent text-accent-foreground hover:bg-accent/90"
        >
          Marcar Consulta
        </Button>
        <Button
          size="lg"
          variant="ghost"
          render={<a href="#servicos" />}
          nativeButton={false}
        >
          Conhecer os Serviços
        </Button>
      </div>
    </section>
  );
}

export default Hero;
