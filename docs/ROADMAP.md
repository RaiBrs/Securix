# Roadmap

> **Estado atual:** a narrativa está completa; qualidade ampliada e publicação seguem como próximas etapas.

[← README](../README.md) · [Visão](PROJECT_BRIEF.md) · [Requisitos](REQUIREMENTS.md)

---

| Etapa | Estado |
| :--- | :--- |
| Fundação, arquitetura, especialidades e convite | Concluídas |
| Cadeado, movimento e qualidade | Em curso |
| Publicação | Pendente |

Cada etapa usa Goal, Context, Constraints e Done when (GCCD). O estado abaixo separa a fundação da experiência final.

## 1. Fundação e Hero — concluída

- **Goal:** iniciar a aplicação e estabelecer a identidade Securix®.
- **Context:** briefing mestre; template Vite existente.
- **Constraints:** React + TypeScript, CSS nativo, pt-PT, sem backend e sem 3D prematuro.
- **Done when:** Header, Hero e Footer responsivos; documentação criada; lint, typecheck e build aprovados.

## 2. Arquitetura e narrativa — concluída

- **Goal:** desenvolver o capítulo II e a ligação visual ao III.
- **Context:** textos de arquitetura e sequência de seis capítulos.
- **Constraints:** conteúdo acessível sem animação; evitar claims não comprovados.
- **Done when:** narrativa compreensível, camadas selecionáveis e secção responsiva. Verificado no Chrome local.

## 3. Especialidades e setores — concluída

- **Goal:** implementar os capítulos III e IV com leitura vertical contínua.
- **Context:** quatro especialidades e quatro setores do briefing.
- **Constraints:** navegação nativa e conteúdo legível com movimento reduzido.
- **Done when:** as quatro especialidades e os setores seguem o fluxo vertical sem prender o título. Verificado em quatro larguras e com movimento reduzido.

## 4. Confiança e convite — concluída

- **Goal:** concluir os capítulos V e VI e a resposta às seis perguntas comerciais.
- **Constraints:** CTA com destino real; nenhum contacto simulado como real.
- **Done when:** percurso completo, CTA com destino existente e rodapé coerente.

## 5. Cadeado, movimento e qualidade — em curso

- **Goal:** consolidar o cadeado 3D procedural, movimento controlado e medir qualidade.
- **Constraints:** desempenho, WebGL fallback e `prefers-reduced-motion`.
- **Feito:** fallback CSS, movimento reduzido, carregamento separado, pausa fora do ecrã e teste local em Chrome desktop/tablet/mobile.
- **Falta:** medir Lighthouse, verificar dispositivos físicos e outros browsers, avaliar o peso do módulo 3D e o aviso de depreciação de `THREE.Clock` emitido pelas bibliotecas, e refinar arte dos setores.

## 6. Publicação — pendente

- **Goal:** preparar hospedagem estática.
- **Constraints:** publicação externa apenas com autorização própria.
- **Done when:** artefacto de produção e instruções de publicação validados.

---

**Voltar para:** [README ↑](../README.md)
