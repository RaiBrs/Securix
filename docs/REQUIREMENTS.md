# Requisitos

> **Estado:** percurso principal implementado; medições de desempenho e validação em dispositivos físicos continuam no roadmap.

[← README](../README.md) · [Visão](PROJECT_BRIEF.md) · [Arquitetura](ARCHITECTURE.md) · [Roadmap](ROADMAP.md)

---

## Funcionais — estado atual

- [x] Identidade Securix®, título e descrição da Hero em pt-PT.
- [x] Header com atalhos internos no desktop e apenas a marca no mobile.
- [x] Cadeado 3D procedural com arrasto e controlo por teclado; alternativa em CSS para WebGL indisponível ou movimento reduzido.
- [x] Rodapé com a natureza fictícia do projeto e ligação ao GitHub do autor.
- [x] Website estático sem recolha ou envio de dados.
- [x] Seis capítulos verticais, âncoras no desktop e indicador de progresso.
- [x] Camadas da arquitetura selecionáveis por botão.
- [x] Quatro especialidades no fluxo vertical em todas as larguras, com símbolos SVG decorativos.
- [x] Título de Especialidades com entrada suave durante a rolagem.

## Não funcionais

- Layout adaptável a desktop e mobile, sem perda de conteúdo.
- HTML semântico, hierarquia de títulos, foco visível e navegação por teclado.
- Movimento discreto com alternativa para `prefers-reduced-motion`.
- TypeScript estrito, lint e build.
- O módulo Three.js/React Three Fiber é carregado separadamente e não bloqueia o texto principal.
- O conteúdo não produz rolagem horizontal com texto ampliado; o cadeado preserva rolagem e pinça em ecrãs táteis.

## Critérios de aceitação

1. `npm run typecheck`, `npm run lint` e `npm run build` terminam sem erro.
2. Os links do Header no desktop e a ligação de exploração alcançam secções existentes sem encobrir os títulos.
3. Os seis capítulos permanecem legíveis em larguras pequenas e grandes, sem overflow horizontal do documento.
4. O conteúdo e os controlos continuam presentes com movimento reduzido; o cadeado usa o fallback em CSS.
5. O rodapé deixa explícito que a empresa é fictícia.
6. Ao rolar pelas especialidades, o título acompanha a página e o capítulo Setores surge após o quarto artigo.
7. O cadeado 3D move-se automaticamente quando visível e pode ser girado em dois eixos; os símbolos ampliam no hover e entram suavemente, respeitando movimento reduzido.
8. No desktop, o Header esconde-se ao descer e volta ao subir; no mobile, os atalhos não aparecem.

## Fases futuras

Metas Lighthouse e validação em dispositivos físicos ainda exigem medição própria. As pontuações não são declaradas sem auditoria.

---

**Continue em:** [Arquitetura →](ARCHITECTURE.md)
