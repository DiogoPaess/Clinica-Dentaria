"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
  type SpringOptions,
} from "framer-motion";

import { cn } from "@/lib/utils";

interface ImageComparisonContextValue {
  sliderPosition: number;
  setPosition: (position: number) => void;
  motionSliderPosition: MotionValue<number>;
}

const ImageComparisonContext = createContext<
  ImageComparisonContextValue | undefined
>(undefined);

function useImageComparisonContext() {
  const context = useContext(ImageComparisonContext);
  if (!context) {
    throw new Error(
      "ImageComparison* deve ser usado dentro de <ImageComparison>",
    );
  }
  return context;
}

const DEFAULT_SPRING_OPTIONS: SpringOptions = {
  bounce: 0,
  duration: 0,
};

interface ImageComparisonProps {
  children: React.ReactNode;
  className?: string;
  enableHover?: boolean;
  springOptions?: SpringOptions;
}

function ImageComparison({
  children,
  className,
  enableHover,
  springOptions,
}: ImageComparisonProps) {
  const [isDragging, setIsDragging] = useState(false);
  const motionValue = useMotionValue(50);
  const motionSliderPosition = useSpring(
    motionValue,
    springOptions ?? DEFAULT_SPRING_OPTIONS,
  );
  const [sliderPosition, setSliderPositionState] = useState(50);

  // Setter único usado tanto pelo arrasto (mouse/touch) quanto pelo teclado —
  // mantém o valor do framer-motion (para o clip-path suave) e o estado React
  // (para aria-valuenow) sempre sincronizados.
  const setPosition = (position: number) => {
    const clamped = Math.min(Math.max(position, 0), 100);
    motionValue.set(clamped);
    setSliderPositionState(clamped);
  };

  const handleDrag = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging && !enableHover) return;

    const containerRect = (
      event.currentTarget as HTMLElement
    ).getBoundingClientRect();
    const x =
      "touches" in event
        ? event.touches[0].clientX - containerRect.left
        : (event as React.MouseEvent).clientX - containerRect.left;

    const percentage = Math.min(
      Math.max((x / containerRect.width) * 100, 0),
      100,
    );
    setPosition(percentage);
  };

  // Corrige o "arrasto preso": se o usuário solta o botão/dedo fora da área do
  // slider, onMouseUp/onTouchEnd (anexados só ao container) nunca disparam, e
  // isDragging ficaria travado em true. Escutamos globalmente enquanto o
  // arrasto estiver ativo para garantir que ele sempre é desligado.
  useEffect(() => {
    if (!isDragging) return;

    const stopDragging = () => setIsDragging(false);

    window.addEventListener("mouseup", stopDragging);
    window.addEventListener("touchend", stopDragging);

    return () => {
      window.removeEventListener("mouseup", stopDragging);
      window.removeEventListener("touchend", stopDragging);
    };
  }, [isDragging]);

  return (
    <ImageComparisonContext.Provider
      value={{ sliderPosition, setPosition, motionSliderPosition }}
    >
      <div
        className={cn(
          "relative overflow-hidden select-none",
          enableHover && "cursor-ew-resize",
          className,
        )}
        onMouseMove={handleDrag}
        onMouseDown={() => !enableHover && setIsDragging(true)}
        onMouseUp={() => !enableHover && setIsDragging(false)}
        onMouseLeave={() => !enableHover && setIsDragging(false)}
        onTouchMove={handleDrag}
        onTouchStart={() => !enableHover && setIsDragging(true)}
        onTouchEnd={() => !enableHover && setIsDragging(false)}
      >
        {children}
      </div>
    </ImageComparisonContext.Provider>
  );
}

interface ImageComparisonImageProps {
  className?: string;
  alt: string;
  src: string;
  position: "left" | "right";
}

function ImageComparisonImage({
  className,
  alt,
  src,
  position,
}: ImageComparisonImageProps) {
  const { motionSliderPosition } = useImageComparisonContext();
  const leftClipPath = useTransform(
    motionSliderPosition,
    (value) => `inset(0 0 0 ${value}%)`,
  );
  const rightClipPath = useTransform(
    motionSliderPosition,
    (value) => `inset(0 ${100 - value}% 0 0)`,
  );

  return (
    <motion.img
      src={src}
      alt={alt}
      className={cn("absolute inset-0 h-full w-full object-cover", className)}
      style={{
        clipPath: position === "left" ? leftClipPath : rightClipPath,
      }}
    />
  );
}

interface ImageComparisonSliderProps {
  className?: string;
  children?: React.ReactNode;
  label?: string;
}

const KEYBOARD_STEP = 5;

function ImageComparisonSlider({
  className,
  children,
  label = "Comparação antes e depois",
}: ImageComparisonSliderProps) {
  const { sliderPosition, setPosition, motionSliderPosition } =
    useImageComparisonContext();

  const left = useTransform(motionSliderPosition, (value) => `${value}%`);

  // Acessibilidade (não vem de fábrica no componente original): setas
  // movem em incrementos de 5%, Home/End vão para os extremos.
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault();
        setPosition(sliderPosition - KEYBOARD_STEP);
        break;
      case "ArrowRight":
        event.preventDefault();
        setPosition(sliderPosition + KEYBOARD_STEP);
        break;
      case "Home":
        event.preventDefault();
        setPosition(0);
        break;
      case "End":
        event.preventDefault();
        setPosition(100);
        break;
      default:
        break;
    }
  };

  return (
    <motion.div
      role="slider"
      tabIndex={0}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(sliderPosition)}
      aria-label={label}
      onKeyDown={handleKeyDown}
      className={cn(
        "focus-visible:ring-ring/50 absolute top-0 bottom-0 w-1 cursor-ew-resize outline-none focus-visible:ring-3",
        className,
      )}
      style={{ left }}
    >
      {children}
    </motion.div>
  );
}

export {
  ImageComparison,
  ImageComparisonImage,
  ImageComparisonSlider,
  type ImageComparisonProps,
};
