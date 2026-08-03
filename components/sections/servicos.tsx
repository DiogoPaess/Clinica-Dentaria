import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SERVICES, type Service } from "@/lib/services-data";

function ServiceCard({ slug, icon: Icon, title, shortDescription }: Service) {
  return (
    <Link
      href={`/servicos/${slug}`}
      className="group bg-card text-card-foreground focus-visible:ring-ring/50 flex h-full flex-col items-start gap-4 rounded-lg border p-6 transition-all duration-300 outline-none hover:-translate-y-1 hover:shadow-md focus-visible:ring-3"
    >
      <Icon className="text-primary size-8" aria-hidden="true" />
      <div className="flex-1">
        <h3 className="font-heading text-foreground mb-1 text-lg font-medium">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm">{shortDescription}</p>
      </div>
      <ArrowRight
        className="text-muted-foreground group-hover:text-primary mt-auto ml-auto size-5 transition-transform duration-300 group-hover:translate-x-1"
        aria-hidden="true"
      />
    </Link>
  );
}

export function Servicos() {
  return (
    <section
      id="servicos"
      className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="font-heading text-foreground text-3xl font-medium tracking-tight sm:text-4xl">
          Os Nossos Serviços
        </h2>
        <p className="text-muted-foreground mt-4">
          Cuidados odontológicos completos, adaptados a cada fase da sua vida.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service) => (
          <ServiceCard key={service.slug} {...service} />
        ))}
      </div>
    </section>
  );
}

export default Servicos;
