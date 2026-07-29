"use client";

// Client Component: o slider de comparação exige estado (posição, arrasto) e
// motion values do framer-motion — nenhum dos dois existe em Server Components.

import { CaseCard, type CaseStudy } from "./case-card";

// PLACEHOLDER: casos e imagens são fictícios — atualizar com casos reais
// (com consentimento dos pacientes, conforme já aprovado com a clínica/advogado)
// assim que disponíveis. As mesmas duas imagens placeholder são reutilizadas
// nos 4 casos por enquanto.
const CASE_STUDIES: CaseStudy[] = [
  {
    title: "Ortodontia",
    description:
      "Alinhamento dentário com aparelho invisível, 18 meses de tratamento.",
    beforeSrc: "/images/placeholder-antes.svg",
    afterSrc: "/images/placeholder-depois.svg",
  },
  {
    title: "Implantologia",
    description: "Reabilitação com implante unitário.",
    beforeSrc: "/images/placeholder-antes.svg",
    afterSrc: "/images/placeholder-depois.svg",
  },
  {
    title: "Estética Dentária",
    description: "Clareamento e facetas em resina.",
    beforeSrc: "/images/placeholder-antes.svg",
    afterSrc: "/images/placeholder-depois.svg",
  },
  {
    title: "Odontopediatria",
    description: "Tratamento preventivo em paciente jovem.",
    beforeSrc: "/images/placeholder-antes.svg",
    afterSrc: "/images/placeholder-depois.svg",
  },
];

export function CasosClinicos() {
  return (
    <section
      id="casos-clinicos"
      className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="font-heading text-foreground text-3xl font-medium tracking-tight sm:text-4xl">
          Casos Clínicos
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {CASE_STUDIES.map((caseStudy) => (
          <CaseCard key={caseStudy.title} {...caseStudy} />
        ))}
      </div>
    </section>
  );
}

export default CasosClinicos;
