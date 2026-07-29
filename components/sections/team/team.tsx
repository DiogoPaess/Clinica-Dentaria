import { TeamMemberCard, type TeamMember } from "./team-member-card";

// PLACEHOLDER: nomes, especialidades, fotos e descrições são fictícios —
// atualizar com dados reais da clínica assim que confirmados.
const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Dr. Miguel Santos",
    designation: "Médico Dentista — Ortodontia",
    description:
      "Licenciado em Medicina Dentária, com dedicação especial ao acompanhamento de cada paciente ao longo do tratamento ortodôntico.",
    imageSrc: "/placeholder-avatar.svg",
  },
  {
    name: "Dr.ª Beatriz Ferreira",
    designation: "Médica Dentista — Implantologia",
    description:
      "Especialista em reabilitação oral, com formação contínua nas técnicas mais recentes de implantologia.",
    imageSrc: "/placeholder-avatar.svg",
  },
  {
    name: "Dr. Tiago Almeida",
    designation: "Médico Dentista — Odontopediatria",
    description:
      "Focado em tornar a consulta uma experiência tranquila e positiva para os mais pequenos.",
    imageSrc: "/placeholder-avatar.svg",
  },
  {
    name: "Dr.ª Carolina Duarte",
    designation: "Médica Dentista — Clínica Geral",
    description:
      "Acompanha os pacientes em todas as fases do cuidado oral, com atenção próxima e humana.",
    imageSrc: "/placeholder-avatar.svg",
  },
];

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
