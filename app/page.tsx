import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";
import { Servicos } from "@/components/sections/servicos";
import { Diferenciais } from "@/components/sections/diferenciais";
import { Equipa } from "@/components/sections/team/team";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Servicos />
      <Diferenciais />
      <Equipa />
    </>
  );
}
