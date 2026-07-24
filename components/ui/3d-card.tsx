"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

const MouseEnterContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined);

export function useMouseEnter() {
  const context = useContext(MouseEnterContext);
  if (context === undefined) {
    throw new Error("useMouseEnter must be used within a CardContainer");
  }
  return context;
}

// Dispositivos sem hover real (touch) não recebem tilt por mouse: em vez de
// escutar mousemove à toa, disparamos uma oscilação automática única quando o
// card entra em viewport (ver useEntryOscillation abaixo).
function useHoverCapable() {
  const [hoverCapable, setHoverCapable] = useState(true);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const handleChange = () => setHoverCapable(query.matches);
    handleChange();
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  return hoverCapable;
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setPrefersReducedMotion(query.matches);
    handleChange();
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}

// Ao entrar em viewport pela 1ª vez (dispositivos sem hover, sem reduced-motion):
// uma única oscilação sutil nos mesmos eixos do tilt (rotateX/rotateY), depois
// volta ao neutro. Nunca repete no mesmo card (hasAnimatedRef).
function useEntryOscillation(
  ref: React.RefObject<HTMLDivElement | null>,
  mounted: boolean,
  enabled: boolean,
) {
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!enabled || !mounted || hasAnimatedRef.current) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          node.animate(
            [
              { transform: "rotateY(0deg) rotateX(0deg)" },
              { transform: "rotateY(3deg) rotateX(-3deg)", offset: 0.5 },
              { transform: "rotateY(0deg) rotateX(0deg)" },
            ],
            { duration: 700, easing: "ease-out" },
          );
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, mounted, enabled]);
}

export function CardContainer({
  children,
  className,
  containerClassName,
}: {
  children?: ReactNode;
  className?: string;
  containerClassName?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  const hoverCapable = useHoverCapable();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEntryOscillation(
    containerRef,
    mounted,
    !hoverCapable && !prefersReducedMotion,
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const node = containerRef.current;
    if (!node) return;
    const { left, top, width, height } = node.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    node.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  };

  const handleMouseEnter = () => setIsMouseEntered(true);

  const handleMouseLeave = () => {
    setIsMouseEntered(false);
    const node = containerRef.current;
    if (node) {
      node.style.transform = "rotateY(0deg) rotateX(0deg)";
    }
  };

  // Tilt por mouse só é inicializado em dispositivos com hover real e sem
  // prefers-reduced-motion — nos demais, os handlers nem são anexados ao DOM.
  const tiltEnabled = hoverCapable && !prefersReducedMotion;

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={cn("flex items-center justify-center", containerClassName)}
        style={{ perspective: "1000px" }}
      >
        <div
          ref={(el) => {
            containerRef.current = el;
            if (el) setMounted(true);
          }}
          onMouseEnter={tiltEnabled ? handleMouseEnter : undefined}
          onMouseMove={tiltEnabled ? handleMouseMove : undefined}
          onMouseLeave={tiltEnabled ? handleMouseLeave : undefined}
          className={cn(
            "relative flex items-center justify-center transition-all duration-200 ease-linear",
            className,
          )}
          style={{ transformStyle: "preserve-3d" }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
}

export function CardBody({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "[transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardItem({
  as: Tag = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
  [key: string]: unknown;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isMouseEntered] = useMouseEnter();

  useEffect(() => {
    if (!ref.current) return;
    ref.current.style.transform = isMouseEntered
      ? `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`
      : "translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)";
  }, [
    isMouseEntered,
    translateX,
    translateY,
    translateZ,
    rotateX,
    rotateY,
    rotateZ,
  ]);

  return (
    <Tag
      ref={ref}
      className={cn("w-fit transition duration-200 ease-linear", className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
