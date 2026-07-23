"use client";

// Client Component: o particle system em canvas exige acesso direto ao Canvas API,
// um loop de animação via requestAnimationFrame e leitura de `window.matchMedia`
// (prefers-reduced-motion) — nenhum destes existe em Server Components.

import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";

// TODO: substituir por copy definitiva quando aprovada.
const HERO_HEADLINE = "Cuidado dentário de excelência, com atenção ao detalhe";
const HERO_SUBHEADLINE =
  "Uma equipa dedicada a cuidar do seu sorriso com atenção, tecnologia e conforto, em cada consulta.";

// Densidade/limites reduzidos em relação ao componente original (1 partícula por 7000px²,
// sem teto) para aliviar o custo em ecrãs grandes e em mobile.
const PARTICLE_DENSITY = 5000;
const MAX_PARTICLES = 220;
// Opacidade base reduzida do original (0.7, pensado para fundo escuro #0a0a0a) para não
// competir com o texto sobre o nosso fundo claro.
const PARTICLE_BASE_OPACITY = 0.85;
// Zona de exclusão circular ao redor do centro (onde fica o texto): proporção do menor
// lado do canvas. Ajustável — ver nota de avaliação no relatório desta mudança.
const EXCLUSION_RADIUS_RATIO = 0.35;

interface Particle {
  x: number;
  y: number;
  speed: number;
  opacity: number;
  fadeDelay: number;
  fadeStart: number;
  fadingOut: boolean;
}

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // Cor das partículas vem do token --muted-foreground já definido em globals.css
    // (nenhuma cor nova fora do Design System).
    const particleColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--muted-foreground")
      .trim();

    let particles: Particle[] = [];
    let rafId = 0;

    const particleCount = () =>
      Math.min(
        MAX_PARTICLES,
        Math.floor((canvas.width * canvas.height) / PARTICLE_DENSITY),
      );

    // Fator de 0 (no centro) a 1 (na borda do raio de exclusão, ou fora dele) — usado
    // para reduzir suavemente a opacidade de partículas perto do texto, sem re-sorteio
    // abrupto de posição.
    const exclusionFactor = (x: number, y: number) => {
      const radius =
        EXCLUSION_RADIUS_RATIO * Math.min(canvas.width, canvas.height);
      if (radius <= 0) return 1;
      const distance = Math.hypot(x - canvas.width / 2, y - canvas.height / 2);
      return Math.min(1, distance / radius);
    };

    const makeParticle = (): Particle => {
      const fadeDelay = Math.random() * 600 + 100;
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      return {
        x,
        y,
        speed: Math.random() / 5 + 0.1,
        opacity: PARTICLE_BASE_OPACITY * exclusionFactor(x, y),
        fadeDelay,
        fadeStart: Date.now() + fadeDelay,
        fadingOut: false,
      };
    };

    const resetParticle = (p: Particle) => {
      p.x = Math.random() * canvas.width;
      p.y = Math.random() * canvas.height;
      p.speed = Math.random() / 5 + 0.1;
      p.opacity = PARTICLE_BASE_OPACITY * exclusionFactor(p.x, p.y);
      p.fadeDelay = Math.random() * 600 + 100;
      p.fadeStart = Date.now() + p.fadeDelay;
      p.fadingOut = false;
    };

    const setSize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      particles = Array.from({ length: particleCount() }, makeParticle);
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = particleColor;
      particles.forEach((p) => {
        p.y -= p.speed;
        if (p.y < 0) resetParticle(p);
        if (!p.fadingOut && Date.now() > p.fadeStart) p.fadingOut = true;
        if (p.fadingOut) {
          p.opacity -= 0.008;
          if (p.opacity <= 0) resetParticle(p);
        }
        ctx.globalAlpha = p.opacity;
        ctx.fillRect(p.x, p.y, 1, Math.random() * 2.5 + 1.5);
      });
      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(draw);
    };

    const onResize = () => setSize();

    // Acessibilidade (WCAG 2.3.3): utilizadores com prefers-reduced-motion ativo não
    // recebem nenhuma animação — o canvas permanece limpo, sem loop de rAF.
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const stop = () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const start = () => {
      setSize();
      window.addEventListener("resize", onResize);
      rafId = requestAnimationFrame(draw);
    };

    const handleMotionPreferenceChange = () => {
      stop();
      if (!reducedMotionQuery.matches) {
        start();
      }
    };

    if (!reducedMotionQuery.matches) {
      start();
    }
    reducedMotionQuery.addEventListener("change", handleMotionPreferenceChange);

    return () => {
      stop();
      reducedMotionQuery.removeEventListener(
        "change",
        handleMotionPreferenceChange,
      );
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

export function Hero() {
  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center gap-8 overflow-hidden bg-[var(--hero-background)] px-4 pt-24 pb-16 text-center sm:px-6 lg:px-8">
      <ParticleCanvas />

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
