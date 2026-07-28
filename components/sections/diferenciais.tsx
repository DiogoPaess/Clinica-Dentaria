import {
  Award,
  GraduationCap,
  HeartHandshake,
  Microscope,
  type LucideIcon,
} from "lucide-react";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

interface Diferencial {
  icon: LucideIcon;
  title: string;
  description: string;
}

// PLACEHOLDER: atualizar com dados reais da clínica (incluindo o número de anos de experiência).
const DIFERENCIAIS: Diferencial[] = [
  {
    icon: Microscope,
    title: "Tecnologia de Ponta",
    description:
      "Equipamentos modernos para diagnósticos precisos e tratamentos mais confortáveis.",
  },
  {
    icon: Award,
    // TODO: número de anos ainda não confirmado com a clínica.
    title: "+15 Anos de Experiência",
    description: "Uma trajetória dedicada à excelência em medicina dentária.",
  },
  {
    icon: GraduationCap,
    title: "Equipa Certificada",
    description: "Profissionais qualificados e em constante atualização.",
  },
  {
    icon: HeartHandshake,
    title: "Atendimento Personalizado",
    description: "Cada paciente é único — e o seu plano de tratamento também.",
  },
];

function DiferencialItem({ icon: Icon, title, description }: Diferencial) {
  return (
    <CardContainer containerClassName="w-full py-0" className="w-full">
      <CardBody className="bg-card flex w-full flex-col items-center gap-3 rounded-lg p-6 text-center">
        <CardItem translateZ={40}>
          <div className="bg-muted rounded-full p-4">
            <Icon className="text-primary size-7" aria-hidden="true" />
          </div>
        </CardItem>
        <CardItem translateZ={20} className="w-full">
          <h3 className="font-heading text-foreground text-base font-medium">
            {title}
          </h3>
          <p className="text-muted-foreground mt-1 text-sm">{description}</p>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}

export function Diferenciais() {
  return (
    <section id="diferenciais" className="bg-muted">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="font-heading text-foreground text-3xl font-medium tracking-tight sm:text-4xl">
            Porque Escolher-nos
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {DIFERENCIAIS.map((item) => (
            <DiferencialItem key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Diferenciais;
