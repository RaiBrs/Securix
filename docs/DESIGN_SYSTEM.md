# Linguagem visual

> **Grafite, luz violeta e espaço negativo.** Este guia explica a aplicação visual; os tokens formais estão em [DESIGN.md](../DESIGN.md).

[← README](../README.md) · [Design formal](../DESIGN.md) · [Arquitetura](ARCHITECTURE.md)

---

## Direção

O visual combina fundo preto dominante, superfícies grafite e iluminação violeta concentrada no cadeado e nas interações. O espaço vazio separa as ideias e evita que cartões ou detalhes decorativos disputem atenção com o conteúdo.

## Tokens

Os tokens implementados em `src/styles/tokens.css` são a fonte técnica. O texto secundário foi clareado face ao briefing para melhorar a leitura. A escala de espaço usa passos de 4 a 96 px, com valores fluidos para o contentor e a composição responsiva.

| Papel | Token | Cor |
| :--- | :--- | :--- |
| Fundo | `--color-bg` | `#050507` |
| Superfície | `--color-surface` | `#111116` |
| Texto | `--color-text` | `#F5F5F7` |
| Texto secundário | `--color-muted` | `#AAAAB4` |
| Acento | `--color-violet` | `#6545D8` |
| Foco e detalhe | `--color-violet-light` | `#9D7BFF` |
| Divisão | `--color-border` | `#24242C` |

## Tipografia

Inter, com fallback de sistema. Títulos com escala fluida e entrelinha confortável; parágrafos com largura de leitura controlada. Os ficheiros de fonte são locais, para a página não depender de um serviço externo.

## Componentes e estados

- Header com símbolo de cadeado minimalista e marca Securix®. No desktop, os atalhos aparecem quando a página sobe e o header desliza para fora quando desce; o foco por teclado também o revela.
- Hero com texto prioritário no DOM; o cadeado 3D aceita arrasto e navegação pelas setas do teclado.
- Arquitetura com três estados selecionáveis, quatro especialidades com símbolos SVG na paleta violeta e composições geométricas para os setores.
- Ligação de exploração é uma âncora nativa; as imagens surgem com escala e opacidade progressivas.
- Hover amplia os símbolos e as composições dos setores; foco mais evidente que hover.
- Movimento reduzido desativa o movimento decorativo e o scroll suave.

## Responsividade

Mobile first. Em ecrãs estreitos, o header mostra só a marca; texto, cadeado e símbolos empilham-se. Em ecrãs largos, o header oferece atalhos e texto e símbolo alternam de lado entre as especialidades. A leitura segue o scroll vertical em todas as larguras, inclusive com movimento reduzido. Nenhuma informação depende do efeito visual.

---

**Continue em:** [Arquitetura →](ARCHITECTURE.md)
