# Decisões técnicas

> **Registro de escolhas:** cada decisão explica um comportamento visível ou uma restrição do projeto.

[← README](../README.md) · [Arquitetura](ARCHITECTURE.md) · [Roadmap](ROADMAP.md)

---

| Decisão | Motivo |
| :--- | :--- |
| D1–D2 | Preservar a stack e usar CSS nativo. |
| D3–D4 | Isolar o cadeado e manter destinos reais. |
| D5–D6 | Evitar provas fictícias e manter o scroll nativo. |
| D7–D8 | Revelar conteúdo e adaptar o header à rolagem. |

## D1 — Preservar o projeto Vite existente

O diretório já contém React e Vite. Migramos os ficheiros de entrada para TypeScript estrito sem recriar o projeto nem mudar a stack.

## D2 — CSS nativo na primeira fase

A estrutura inicial não exigia Tailwind nem GSAP. CSS nativo mantém os estilos e breakpoints fáceis de inspecionar; o 3D entrou depois, isolado num módulo WebGL.

## D3 — Cadeado e alternativa isolados

`LockVisual` continua como alternativa. `LockCanvas` cria o objeto 3D com geometria simples e materiais metálicos, num módulo carregado sob demanda. O modelo move-se lentamente sozinho e pode ser girado por arrasto ou pelas setas do teclado. A indicação visual “Arraste para rodar” continua ausente; o ponteiro e o nome acessível comunicam a interação.

## D4 — Ligações internas existentes

A navegação aponta apenas para secções implementadas nesta fase. Não há botões de contacto ou soluções que prometam funcionalidades futuras.

## D5 — Sem claims de prova social

Os textos comunicam a abordagem conceitual, e o rodapé identifica o projeto como fictício. Não são criados dados, clientes ou resultados para sustentar o design.

## D6 — Scroll vertical nativo nas especialidades

A página usa rolagem vertical nativa em todos os capítulos e tamanhos de ecrã. Cada especialidade ocupa um artigo no fluxo normal. O percurso fixado anteriormente mantinha o título imóvel enquanto os painéis avançavam e atrasava a passagem para Setores; removê-lo resolve essa discrepância sem lógica de scroll adicional.

## D7 — Movimento progressivo sem ocultar conteúdo

`IntersectionObserver` aciona entradas que elevam ligeiramente os elementos e os trazem à escala final. Os elementos permanecem legíveis antes da transição e totalmente visíveis com movimento reduzido ou sem JavaScript de animação.

## D8 — Header guiado pela direção da rolagem

No desktop, o Header sai do ecrã após uma descida e volta quando a página sobe. Um limite de movimento evita oscilações por pequenos ajustes do scroll, e o foco visível revela os links para navegação por teclado. No mobile, a marca permanece no topo e os atalhos ficam ocultos para dar mais espaço ao conteúdo.

---

**Continue em:** [Roadmap →](ROADMAP.md)
