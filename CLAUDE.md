@AGENTS.md
# CLAUDE.md

## Projeto

Este projeto é um website premium para uma clínica dentária em Portugal.

O objetivo é criar uma experiência moderna, elegante, rápida e acessível.

---

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui
- Framer Motion
- Lucide React
- 21st.dev MCP

---

## Arquitetura

Sempre reutilizar componentes.

Nunca duplicar código.

components/ui:

Apenas primitivos do shadcn/ui (button, input, dialog, etc), gerados via CLI, nunca editados manualmente sem necessidade.

components/common:

Componentes reutilizáveis criados para este projeto (cards, badges, wrappers, etc).

components/layout:

Navbar, Footer, containers estruturais.

components/sections:

Seções de página (Hero, Serviços, Sobre, etc), geralmente não reutilizadas fora da página.

Utilitários:

lib/

---

## Design

Visual premium.

Minimalista.

Muito espaço em branco.

Animações suaves.

Glassmorphism apenas quando fizer sentido.

Nunca exagerar em sombras.

---

## Cores

Primária:
Azul escuro.

Secundária:
Branco.

Destaque:
Dourado discreto.

Nunca utilizar cores muito saturadas.

---

## Tipografia

Preferir fontes elegantes.

Boa hierarquia.

Excelente legibilidade.

---

## UX

Priorizar:

- acessibilidade
- contraste
- performance
- responsividade
- navegação intuitiva

---

## Componentes

Antes de criar um componente:

1. Verificar se existe um equivalente no 21st.dev.
2. Adaptar esse componente ao projeto.
3. Somente criar do zero quando não houver alternativa adequada.

---

## Código

Sempre utilizar TypeScript.

Nunca usar any sem justificativa.

Evitar código duplicado.

Preferir composição de componentes.

Seguir boas práticas do React.

---

## Animações

Utilizar Framer Motion.

Animações discretas.

Duração entre 0.3s e 0.8s.

Nunca exagerar.

---

## Performance

Lazy loading quando possível.

Imagens otimizadas.

Server Components quando fizer sentido.

---

## Antes de alterar arquivos

Sempre analisar a estrutura existente.

Não sobrescrever código desnecessariamente.

Explicar alterações significativas antes de executá-las.

---

## Antes de instalar bibliotecas

Verificar se já estão instaladas.

Não duplicar dependências.

---

## Fluxo

Para cada nova funcionalidade:

1. Planejar.
2. Escolher componentes do 21st.dev.
3. Adaptar ao projeto.
4. Implementar.
5. Revisar acessibilidade.
6. Revisar performance.
7. Revisar responsividade.

---

## Decisões do Projeto

- next-themes: mantido instalado, sem dark mode implementado por enquanto. Tokens de cor devem ser criados como CSS variables semânticas (--background, --foreground, --accent-gold, etc) para permitir dark mode futuro sem refactor.
- Formulário de Contacto: nesta fase, apenas interface (react-hook-form + Zod para validação client-side), sem integração de envio. Futuro: Resend para e-mail, botão de WhatsApp (componente separado, link direto wa.me, não depende do formulário), possível integração com Calendly.
- Antes e Depois / Testemunhos: uso já confirmado com a clínica/advogado quanto às regras da Ordem dos Médicos Dentistas.
- RGPD: pendente — banner de cookies e política de privacidade a implementar antes do deploy.