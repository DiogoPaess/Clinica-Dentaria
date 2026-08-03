import {
  Baby,
  Brush,
  Drill,
  ShieldCheck,
  Smile,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  slug: string;
  icon: LucideIcon;
  title: string;
  shortDescription: string;
  longDescription: string[];
  imagePlaceholder: string;
}

// PLACEHOLDER: descrições longas e imagens são placeholder — atualizar com
// conteúdo real e fotos por serviço (ver TASKS.md).
export const SERVICES: Service[] = [
  {
    slug: "ortodontia",
    icon: Smile,
    title: "Ortodontia",
    shortDescription:
      "Alinhamento dentário com aparelhos tradicionais ou invisíveis, para um sorriso mais harmonioso.",
    longDescription: [
      "A ortodontia trata o alinhamento dos dentes e a relação entre as arcadas dentárias, corrigindo problemas de mordida e posicionamento que afetam tanto a estética como a função da mastigação.",
      "Na nossa clínica, avaliamos cada caso individualmente para recomendar a solução mais adequada — desde aparelhos tradicionais a alinhadores transparentes — sempre com acompanhamento regular ao longo do tratamento.",
      "O objetivo final é um sorriso mais equilibrado e uma mordida mais saudável, com o mínimo impacto possível no dia a dia do paciente.",
    ],
    imagePlaceholder: "/images/servicos/ortodontia.jpg",
  },
  {
    slug: "implantologia",
    icon: ShieldCheck,
    title: "Implantologia",
    shortDescription:
      "Implantes dentários e reabilitação oral com tecnologia de precisão.",
    longDescription: [
      "A implantologia permite substituir dentes perdidos por soluções fixas e duradouras, devolvendo função e estética à boca através de implantes de titânio biocompatíveis.",
      "Utilizamos tecnologia de planeamento digital para posicionar cada implante com precisão, reduzindo o tempo de recuperação e aumentando a previsibilidade do resultado final.",
      "Seja para repor um único dente ou para reabilitações mais complexas, acompanhamos o paciente em todas as fases, do planeamento à manutenção a longo prazo.",
    ],
    imagePlaceholder: "/images/servicos/implantologia.jpg",
  },
  {
    slug: "estetica-dentaria",
    icon: Sparkles,
    title: "Estética Dentária",
    shortDescription:
      "Branqueamento, facetas e harmonização para o sorriso que sempre quis.",
    longDescription: [
      "A estética dentária reúne tratamentos focados em melhorar a aparência do sorriso, sem comprometer a saúde oral — do branqueamento profissional a facetas de resina ou cerâmica.",
      "Cada plano de tratamento é desenhado à medida, tendo em conta a forma do rosto, a cor natural dos dentes e as expectativas do paciente.",
      "O resultado é um sorriso mais uniforme e luminoso, alcançado de forma gradual e conservadora.",
    ],
    imagePlaceholder: "/images/servicos/estetica-dentaria.jpg",
  },
  {
    slug: "odontopediatria",
    icon: Baby,
    title: "Odontopediatria",
    shortDescription:
      "Cuidados dentários especializados e acolhedores para os mais pequenos.",
    longDescription: [
      "A odontopediatria acompanha a saúde oral das crianças desde os primeiros dentes de leite até à adolescência, com uma abordagem pensada para tornar cada visita confortável e sem stress.",
      "Damos particular atenção à prevenção — selantes, aplicação de flúor e hábitos de higiene — para reduzir o risco de cáries e problemas futuros.",
      "Um ambiente acolhedor ajuda a criar uma relação positiva da criança com o dentista, essencial para a saúde oral ao longo da vida.",
    ],
    imagePlaceholder: "/images/servicos/odontopediatria.jpg",
  },
  {
    slug: "endodontia",
    icon: Drill,
    title: "Endodontia",
    shortDescription:
      "Tratamento de canal com foco na preservação do dente natural.",
    longDescription: [
      "A endodontia trata problemas na polpa dentária — o tecido interno do dente — habitualmente causados por cáries profundas, traumatismos ou infeções.",
      "O tratamento de canal remove o tecido afetado e sela o interior do dente, eliminando a dor e a infeção, sem necessidade de extração.",
      "Sempre que possível, priorizamos a preservação do dente natural, por ser a opção mais funcional e duradoura a longo prazo.",
    ],
    imagePlaceholder: "/images/servicos/endodontia.jpg",
  },
  {
    slug: "higiene-oral-e-prevencao",
    icon: Brush,
    title: "Higiene Oral e Prevenção",
    shortDescription:
      "Destartarização e check-ups regulares para uma saúde oral duradoura.",
    longDescription: [
      "A prevenção é a base de uma saúde oral duradoura — consultas regulares permitem identificar e tratar problemas numa fase inicial, antes de se tornarem mais complexos.",
      "As sessões de destartarização removem placa bacteriana e tártaro acumulados, reduzindo o risco de cáries e doença periodontal.",
      "Complementamos cada consulta com recomendações personalizadas de higiene oral, adaptadas aos hábitos e necessidades de cada paciente.",
    ],
    imagePlaceholder: "/images/servicos/higiene-oral-prevencao.jpg",
  },
];
