import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";
import { Servicos } from "@/components/sections/servicos";
import { Diferenciais } from "@/components/sections/diferenciais";
import { Equipa } from "@/components/sections/team/team";
import { CasosClinicos } from "@/components/sections/casos-clinicos/casos-clinicos";
import { Testemunhos } from "@/components/sections/testemunhos";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Servicos />
      <Diferenciais />
      <Equipa />
      <CasosClinicos />
      <Testemunhos />
    </>
  );
}
