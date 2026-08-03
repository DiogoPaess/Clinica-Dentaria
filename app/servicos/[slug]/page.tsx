import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SERVICES } from "@/lib/services-data";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((item) => item.slug === slug);

  if (!service) {
    return { title: "Serviço não encontrado | Clínica Dentária" };
  }

  return { title: `${service.title} | Clínica Dentária` };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = SERVICES.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
      <Link
        href="/#servicos"
        className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-2 text-sm transition-colors"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Voltar aos Serviços
      </Link>

      <h1 className="font-heading text-foreground text-4xl font-medium tracking-tight sm:text-5xl">
        {service.title}
      </h1>

      <div className="bg-muted mt-8 aspect-video w-full overflow-hidden rounded-lg">
        {/* PLACEHOLDER: imagem ilustrativa — substituir por foto real do serviço. */}
        <img
          src={service.imagePlaceholder}
          alt={`Ilustração representativa do serviço de ${service.title}`}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="mt-8 flex flex-col gap-4">
        {service.longDescription.map((paragraph) => (
          <p
            key={paragraph}
            className="text-muted-foreground text-base leading-relaxed"
          >
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-12">
        <Button
          size="lg"
          render={<Link href="/#contacto" />}
          nativeButton={false}
          className="bg-accent text-accent-foreground hover:bg-accent/90"
        >
          Marcar Consulta
        </Button>
      </div>
    </article>
  );
}
