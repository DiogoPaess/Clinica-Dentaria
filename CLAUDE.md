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

Componentes reutilizáveis devem ficar em:

components/ui

Seções da página:

components/sections

Layouts:

components/layout

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