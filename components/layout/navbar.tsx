"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// TODO: substituir por logo real da clínica quando disponível.
const CLINIC_NAME = "Clínica Dentária";

const NAV_LINKS = [
  { href: "#servicos", label: "Serviços" },
  { href: "#equipa", label: "Equipa" },
  { href: "#casos-clinicos", label: "Casos Clínicos" },
] as const;

const CTA_HREF = "#contacto";
const CTA_LABEL = "Marcar Consulta";

function useScrolled() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrolled;
}

export function Navbar() {
  const scrolled = useScrolled();

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300",
        scrolled
          ? "bg-background/80 shadow-sm backdrop-blur-sm"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-heading text-foreground text-lg font-medium"
        >
          {CLINIC_NAME}
        </Link>

        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-8 md:flex"
        >
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-foreground/80 hover:text-foreground text-sm font-medium transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>

        <Button
          render={<a href={CTA_HREF} />}
          nativeButton={false}
          className="bg-accent text-accent-foreground hover:bg-accent/90 hidden md:inline-flex"
        >
          {CTA_LABEL}
        </Button>

        <Sheet>
          <SheetTrigger
            render={
              <button
                type="button"
                aria-label="Abrir menu"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "md:hidden",
                )}
              />
            }
          >
            <Menu className="size-5" aria-hidden="true" />
          </SheetTrigger>
          <SheetContent side="right" className="flex flex-col gap-8 p-6">
            <SheetTitle className="sr-only">Menu de navegação</SheetTitle>
            <nav
              aria-label="Navegação mobile"
              className="flex flex-col gap-6 pt-8"
            >
              {NAV_LINKS.map(({ href, label }) => (
                <SheetClose
                  key={href}
                  render={<a href={href} />}
                  className="text-foreground text-base font-medium"
                >
                  {label}
                </SheetClose>
              ))}
            </nav>
            <SheetClose
              render={
                <a
                  href={CTA_HREF}
                  className={cn(
                    buttonVariants(),
                    "bg-accent text-accent-foreground hover:bg-accent/90 mt-auto w-full",
                  )}
                />
              }
            >
              {CTA_LABEL}
            </SheetClose>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export default Navbar;
