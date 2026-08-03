# Desenvolvimento da Clínica Dentária

## Infraestrutura

- [x] Next.js
- [x] Tailwind
- [x] shadcn/ui
- [x] Framer Motion
- [x] Lucide
- [x] 21st.dev

---

## Design System

- [ ] Tokens de cor e tipografia
- [ ] Componentes base de UI (revisão)

---

## Layout

- [ ] Navbar
- [ ] Hero
- [ ] Serviços
  - Páginas de Serviços: descrições longas e imagens são placeholder — atualizar com conteúdo real e fotos por serviço.
- [ ] Sobre
- [ ] Diferenciais
  - Diferenciais: conteúdo placeholder (tecnologia, anos de experiência, certificações, atendimento) — atualizar com dados reais da clínica.
- [ ] Equipa
  - Equipa: nomes, especialidades e fotos são placeholder — atualizar com dados reais. Redes sociais dos profissionais ainda não implementadas (aguardando confirmação se serão incluídas).
- [ ] Antes e Depois
  - Casos Clínicos: fotos antes/depois são placeholder — atualizar com casos reais (com consentimento dos pacientes, conforme já aprovado com a clínica/advogado).
- [ ] Testemunhos
  - Testemunhos: depoimentos e nomes são placeholder — atualizar com depoimentos reais de pacientes (com consentimento, mesmo cuidado legal já aplicado a Antes/Depois e Casos Clínicos).
- [ ] FAQ
  - FAQ: perguntas e respostas são placeholder — atualizar com conteúdo real da clínica (políticas de pagamento, seguros aceites, etc.).
- [ ] Contacto (formulário interface + botão WhatsApp)
  - Contacto: formulário sem integração de envio real — substituir por Resend antes do lançamento. Número de WhatsApp e informações de contacto (morada, horário) são placeholder — atualizar com dados reais da clínica.
- [ ] Footer
  - Footer: redes sociais são placeholder (sem URLs reais) — atualizar quando as contas da clínica existirem. Ícones sociais são genéricos, não logos de marca — considerar react-icons ou SVGs próprios se quiserem os logos reais.

---

## Funcionalidades

- [ ] RGPD (banner de cookies + política de privacidade)
- [ ] SEO
- [ ] Performance
- [ ] Responsividade

---

## Segurança / Dependências

- [ ] ATENÇÃO: next/postcss/sharp têm vulnerabilidades conhecidas (SSRF, DoS, bypass em Server Functions) corrigíveis apenas via upgrade forçado (next@16.2.12, fora do range atual). Requer teste isolado antes do deploy — não aplicar displicentemente.

---

## Deploy

- [ ] Testes
- [ ] Lighthouse
- [ ] Deploy