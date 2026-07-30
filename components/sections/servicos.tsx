import {
  ArrowRight,
  Baby,
  Brush,
  Drill,
  ShieldCheck,
  Smile,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
}

const SERVICES: Service[] = [
  {
    icon: Smile,
    title: "Ortodontia",
    description:
      "Alinhamento dentário com aparelhos tradicionais ou invisíveis, para um sorriso mais harmonioso.",
  },
  {
    icon: ShieldCheck,
    title: "Implantologia",
    description:
      "Implantes dentários e reabilitação oral com tecnologia de precisão.",
  },
  {
    icon: Sparkles,
    title: "Estética Dentária",
    description:
      "Branqueamento, facetas e harmonização para o sorriso que sempre quis.",
  },
  {
    icon: Baby,
    title: "Odontopediatria",
    description:
      "Cuidados dentários especializados e acolhedores para os mais pequenos.",
  },
  {
    icon: Drill,
    title: "Endodontia",
    description:
      "Tratamento de canal com foco na preservação do dente natural.",
  },
  {
    icon: Brush,
    title: "Higiene Oral e Prevenção",
    description:
      "Destartarização e check-ups regulares para uma saúde oral duradoura.",
  },
];

function ServiceCard({ icon: Icon, title, description }: Service) {
  return (
    <div className="group bg-card text-card-foreground flex h-full flex-col items-start gap-4 rounded-lg border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <Icon className="text-primary size-8" aria-hidden="true" />
      <div className="flex-1">
        <h3 className="font-heading text-foreground mb-1 text-lg font-medium">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      <ArrowRight
        className="text-muted-foreground group-hover:text-primary mt-auto ml-auto size-5 transition-transform duration-300 group-hover:translate-x-1"
        aria-hidden="true"
      />
    </div>
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
          <ServiceCard key={service.title} {...service} />
        ))}
      </div>
    </section>
  );
}

export default Servicos;
