import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  question: string;
  answer: string;
}

// PLACEHOLDER: perguntas e respostas são fictícias — atualizar com conteúdo
// real da clínica (políticas de pagamento, seguros aceites, etc.).
const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Preciso de marcação prévia para uma consulta?",
    answer:
      "Sim, recomendamos sempre marcação prévia por telefone ou através do nosso formulário de contacto, para garantirmos o melhor atendimento possível.",
  },
  {
    question: "Que meios de pagamento aceitam?",
    answer:
      "Aceitamos pagamento em numerário, multibanco e cartão de crédito/débito.",
  },
  {
    question: "Trabalham com seguros de saúde/ADSE?",
    answer:
      "Trabalhamos com a maioria dos seguros de saúde e ADSE em regime de convenção. Contacte-nos para confirmar as condições da sua seguradora.",
  },
  {
    question: "Quanto tempo dura uma consulta de rotina?",
    answer:
      "Uma consulta de rotina dura, em média, entre 30 e 45 minutos, dependendo do tratamento necessário.",
  },
  {
    question: "Atendem emergências dentárias?",
    answer:
      "Sim, temos disponibilidade para atender emergências dentárias o mais rapidamente possível. Contacte-nos diretamente nesses casos.",
  },
  {
    question: "Como faço para cancelar ou remarcar uma consulta?",
    answer:
      "Basta contactar-nos com a maior antecedência possível, por telefone ou email, para reagendarmos a sua consulta sem custos adicionais.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h2 className="font-heading text-foreground text-3xl font-medium tracking-tight sm:text-4xl">
          Perguntas Frequentes
        </h2>
        <p className="text-muted-foreground mt-4">
          Tudo o que precisa de saber antes da sua consulta.
        </p>
      </div>

      <Accordion defaultValue={[]}>
        {FAQ_ITEMS.map((item) => (
          <AccordionItem key={item.question} value={item.question}>
            <AccordionTrigger className="font-heading text-foreground text-base">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

export default Faq;
