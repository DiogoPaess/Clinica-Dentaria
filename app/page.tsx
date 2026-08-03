import { Hero } from "@/components/sections/hero";
import { Servicos } from "@/components/sections/servicos";
import { Diferenciais } from "@/components/sections/diferenciais";
import { Equipa } from "@/components/sections/team/team";
import { CasosClinicos } from "@/components/sections/casos-clinicos/casos-clinicos";
import { Testemunhos } from "@/components/sections/testemunhos";
import { Faq } from "@/components/sections/faq";
import { Contacto } from "@/components/sections/contacto";

export default function Home() {
  return (
    <>
      <Hero />
      <Servicos />
      <Diferenciais />
      <Equipa />
      <CasosClinicos />
      <Testemunhos />
      <Faq />
      <Contacto />
    </>
  );
}
