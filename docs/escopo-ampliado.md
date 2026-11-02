# SimuLAR — Ampliação dos requisitos

02/11/2026. Complementa `requisitos.md`, preservando RF01–RF10 para o modo acadêmico. Nome e home solicitados pelo usuário. SAC/Price constituem a primeira versão proposta do simulador brasileiro.

| ID | Requisito | Aceitação |
|---|---|---|
| RF11 | Apresentar a home SimuLAR com estilo de imobiliária | Marca, conteúdo residencial e links funcionais para ambos os simuladores em celular e desktop. |
| RF12 | Identificar os modos acadêmico e financeiro | Cada página explica as entradas e o significado do resultado sem aplicar fatores por idade ao comparador financeiro. |
| RF13 | Receber imóvel, entrada, prazo e taxa efetiva anual | Validar os limites definidos em arquitetura.md e informar formato e unidade de cada campo. |
| RF14 | Comparar SAC e Price | Gerar ambos com o mesmo principal, prazo e taxa, incluindo tratamento de taxa zero. |
| RF15 | Mostrar custos comparáveis | Informar primeira/última prestação, total de juros, total das prestações e entrada separadamente. |
| RF16 | Exibir cronograma mensal e gráfico | Cada mês apresenta amortização, juros, prestação e saldo; tabela oferece os mesmos dados essenciais do gráfico. |
| RF17 | Explicitar hipóteses | Informar taxa fixa configurada e exclusão de indexação, seguros e tarifas; não rotular resultado como CET ou oferta bancária. |
| RF18 | Manter consistência financeira | Amortizações somam o principal, prestações somam principal mais juros e saldo final é zero, com ajuste de centavos documentado. |

O projeto passa a ter 18 requisitos funcionais. RQ01–RQ06 continuam válidos para ambos os módulos. Não exigir idade ou sexo no simulador financeiro simplificado. Taxas referenciadas de bancos, cenários TR/IPCA e regras específicas de programas habitacionais são evoluções futuras, fora da primeira implementação.
