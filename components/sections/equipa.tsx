import type { LucideIcon } from "lucide-react";

interface SocialLink {
  icon: LucideIcon;
  href: string;
}

interface TeamMember {
  name: string;
  designation: string;
  imageSrc: string;
  socialLinks?: SocialLink[];
}

// PLACEHOLDER: nomes, especialidades e fotos são fictícios — atualizar com dados
// reais da clínica assim que confirmados.
const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Dr. Miguel Santos",
    designation: "Médico Dentista — Ortodontia",
    imageSrc: "/placeholder-avatar.svg",
  },
  {
    name: "Dr.ª Beatriz Ferreira",
    designation: "Médica Dentista — Implantologia",
    imageSrc: "/placeholder-avatar.svg",
  },
  {
    name: "Dr. Tiago Almeida",
    designation: "Médico Dentista — Odontopediatria",
    imageSrc: "/placeholder-avatar.svg",
  },
  {
    name: "Dr.ª Carolina Duarte",
    designation: "Médica Dentista — Clínica Geral",
    imageSrc: "/placeholder-avatar.svg",
  },
];

function TeamMemberCard({ name, designation, imageSrc }: TeamMember) {
  return (
    <div className="bg-card flex flex-col items-center gap-4 rounded-lg border p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="size-32 overflow-hidden rounded-full">
        {/* PLACEHOLDER: foto ilustrativa — substituir por foto real do profissional. */}
        <img src={imageSrc} alt={name} className="h-full w-full object-cover" />
      </div>
      <div>
        <h3 className="font-heading text-foreground text-lg font-medium">
          {name}
        </h3>
        <p className="text-muted-foreground mt-1 text-sm">{designation}</p>
      </div>
    </div>
  );
}

export function Equipa() {
  return (
    <section
      id="equipa"
      className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="font-heading text-foreground text-3xl font-medium tracking-tight sm:text-4xl">
          A Nossa Equipa
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {TEAM_MEMBERS.map((member) => (
          <TeamMemberCard key={member.name} {...member} />
        ))}
      </div>
    </section>
  );
}

export default Equipa;
