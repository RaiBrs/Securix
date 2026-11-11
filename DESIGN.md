---
name: Securix
description: Experiência conceitual de cibersegurança empresarial
colors:
  background: "#050507"
  surface: "#111116"
  text: "#f5f5f7"
  muted: "#aaaab4"
  violet: "#6545d8"
  violet-light: "#9d7bff"
  border: "#24242c"
typography:
  display:
    fontFamily: "Inter, Segoe UI, sans-serif"
    fontSize: "clamp(3rem, 7vw, 4.8rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Inter, Segoe UI, sans-serif"
    fontSize: "clamp(2.35rem, 4.4vw, 4.75rem)"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-0.028em"
spacing:
  "1": "0.25rem"
  "2": "0.5rem"
  "3": "0.75rem"
  "4": "1rem"
  "6": "1.5rem"
  "8": "2rem"
  "12": "3rem"
  "16": "4rem"
  "24": "6rem"
---

# Design System: Securix

## Overview

**Creative North Star: “Segurança em camadas”.** A composição é discreta e precisa. Espaço negativo, superfícies grafite e uma luz violeta contida dão presença ao cadeado sem competir com o conteúdo. O site é uma narrativa vertical de seis capítulos; cada transição revela uma parte da abordagem de proteção.

## Colors

O fundo quase preto (`--color-bg`) e a superfície grafite (`--color-surface`) sustentam texto claro (`--color-text`). O violeta (`--color-violet` e `--color-violet-light`) identifica foco, progresso e detalhes interativos. Texto secundário usa `--color-muted`; divisões usam `--color-border`. Os tokens de `src/styles/tokens.css` são a fonte técnica.

| Base | Leitura | Acento |
| :--- | :--- | :--- |
| `#050507` fundo · `#111116` superfície | `#f5f5f7` texto · `#aaaab4` secundário | `#6545d8` violeta · `#9d7bff` foco |

## Typography

Inter local, com Segoe UI e sans-serif como fallback. O display da Hero usa peso 600; títulos de capítulo usam 500 e uma escala fluida. Corpo e descrições usam entrelinha ampla e medida curta. Títulos curtos são balanceados; parágrafos usam quebra natural aprimorada quando o navegador suporta `text-wrap: pretty`.

## Layout

Contentor limitado a 84rem, com margens laterais fluidas. A Hero divide texto e objeto em ecrãs largos; no telemóvel, a leitura segue uma coluna vertical. As especialidades alternam texto e símbolo no desktop e empilham-se no mobile. A navegação por capítulos só aparece onde há largura suficiente; no mobile, o fluxo principal é a rolagem.

## Elevation & Depth

Profundidade vem sobretudo de camadas tonais, luz e geometria. Sombras macias dão volume ao cadeado e aos painéis ilustrativos; não há sombras de cartão em todo o conteúdo.

## Shapes

Linhas finas, cantos moderados e formas geométricas precisas. O cadeado minimalista da marca é a forma recorrente. Bordas e raios específicos ficam junto dos componentes CSS, pois ainda não formam uma escala global.

## Components

O header usa a marca Securix® e atalhos apenas em larguras suficientes; no desktop desaparece ao descer e reaparece ao subir ou receber foco. O cadeado 3D permite arrasto e setas do teclado, com alternativa estática para movimento reduzido ou falta de WebGL. Símbolos SVG das especialidades surgem com movimento suave e aumentam no hover. Estados de foco usam violeta claro e mantêm contorno visível.

| Elemento | Comportamento característico |
| :--- | :--- |
| Header | Responde à direção da rolagem e ao foco por teclado. |
| Cadeado | Movimento ambiente, arrasto em dois eixos e alternativa em CSS. |
| Especialidades | Quatro símbolos SVG no fluxo vertical, com entrada suave. |

## Do's and Don'ts

- Manter a paleta contida e usar violeta para orientar atenção e interação.
- Manter conteúdo legível sem animação, com texto ampliado e sem WebGL.
- Evitar alegações sobre clientes, certificações e resultados da empresa fictícia.
