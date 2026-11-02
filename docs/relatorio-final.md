# SimuLAR — Relatório técnico final

Versão de entrega: candidata v1.0.0-rc.1. Data: 02/11/2026. Projeto acadêmico baseado no Projeto 1, página 4 de 2-EmbeddedSystems-12SEP2026.pdf.

## 1. Objetivo e escopo entregue

O SimuLAR é uma aplicação web React + TypeScript com home de inspiração imobiliária e dois modos de cálculo independentes. O modo acadêmico aplica os fatores por sexo e idade do exercício. O comparador financeiro usa valor do imóvel, entrada, prazo e taxa efetiva anual configurada pelo usuário para gerar cronogramas SAC e Price.

O projeto demonstra especificação, design, implementação modular, testes automatizados, integração contínua e evidências. A substituição das tecnologias C++/GoogleTest/CMake por TypeScript/Vitest/Vite é uma decisão do projeto solicitada pelo usuário. A aceitação acadêmica dessa adaptação depende do professor.

## 2. Processo e documentos

| Etapa | Resultado |
|---|---|
| 1 Requisitos | Especificação, casos de uso e dicionário de dados |
| 2 Design | Arquitetura, fluxogramas, contratos e navegação |
| 3 Repositório | Clone conectado ao GitHub, branches, commits, backlog e modelos |
| 4 Implementação | Home, dois simuladores, resumo, gráfico e cronograma |
| 5 Verificação | 70 testes aprovados, revisão responsiva e erros acessíveis |
| 6 CI | GitHub Actions executado com sucesso e artefatos publicados |
| 7 Consolidação | Matriz, relatório, apresentação e roteiro de demonstração |

Documentos relacionados: [requisitos](requisitos.md), [escopo ampliado](escopo-ampliado.md), [arquitetura](arquitetura.md), [rastreabilidade](rastreabilidade.md), [testes](testes-etapa-5.md) e [CI](ci-etapa-6.md).

## 3. Regras e ambiguidades resolvidas

O modelo acadêmico usa financiamento = salário × fator, com salário de zero a dez mil e idade inteira de 18 a 55. Os fatores masculinos são 75/55/30 nas faixas 18–35/36–45/46–55. Os fatores femininos são 70/50/35 nas faixas 18–30/31–40/41–50. Para feminino entre 51 e 55, a ausência de fator gera uma mensagem, sem inventar resultado. Essa é uma decisão complementar, não uma regra bancária.

Valores monetários são recebidos sem separador de milhares, com ponto ou vírgula decimal e até duas casas. A lógica trabalha em centavos inteiros. Campo vazio não é convertido em zero. Edição de qualquer entrada remove o resultado anterior.

## 4. Arquitetura implementada

O ponto de inicialização está em src/main.tsx. App.tsx reúne navegação, páginas e componentes visuais. src/domain/calculations.ts contém conversão monetária e os dois cálculos; formValidation.ts produz mensagens por campo. O domínio não depende de React.

As rotas por hash permitem uso em hospedagem estática. Estado fica em memória, sem login, banco de dados ou envio dos dados de simulação. A casa da home é uma ilustração original em CSS. As fontes Google Fonts têm fallback local.

Em relação ao design inicial, os componentes foram mantidos juntos em App.tsx nesta versão e os erros de domínio usam exceções capturadas pela interface. Não foi implementado o objeto Result discriminado inicialmente proposto. As duas mudanças são simplificações de organização, registradas sem alterar os critérios funcionais.

## 5. Cálculo financeiro

P = imóvel − entrada. Com taxa efetiva anual a, a taxa mensal é i = (1+a/100)^(1/12) − 1. Não dividir taxa efetiva anual por doze.

SAC usa amortização aproximadamente constante em centavos, juros sobre o saldo anterior e ajuste residual no último mês. Price usa T = P×i/[1−(1+i)^(-n)], arredondada para centavos. Em taxa zero, usa P/n. Juros mensais são arredondados, e a última parcela liquida o saldo residual. Valores extremamente pequenos ou combinações de juros/prazos cuja amortização não pode ser representada em centavos são rejeitados.

O comparador exibe primeira e última parcela, juros totais, total das prestações e total com entrada. Gráfico e tabela permitem acompanhar saldo e amortização. Taxas são ilustrativas ou informadas pelo usuário. Não há busca de taxas vigentes, indexação futura TR/IPCA, seguros, tarifas, tributos, análise de elegibilidade ou cálculo de CET.

## 6. Verificação e resultados

70 testes passaram: 48 de cálculo, 12 de validação e 10 de interface. Foram usados valores de fronteira, partições de equivalência, tabela de decisão e entradas inválidas. A referência manual de principal R$ 1.000 em dois meses a 1% mensal produziu SAC de R$ 510/R$ 505 e Price de R$ 507,51/R$ 507,51. A taxa anual equivalente usada foi 12,682503013196978%.

Os testes verificam soma de amortizações igual ao principal, total igual a principal mais juros, saldo final zero, centavos, taxa zero, falta de fator, correção de erro e remoção de resultado antigo. Foram corrigidos o nome acessível dos campos e o link de salto de conteúdo. Erros individuais usam atributos ARIA, e o resumo recebe foco.

As três páginas foram observadas em 360 e 1280 pixels. A largura de scroll não excedeu o viewport, com tabelas em regiões próprias. Há captura de cada página e do estado de erro. Não houve medição de cobertura percentual, teste com leitor de tela real ou certificação WCAG. Esses resultados não devem ser afirmados na apresentação.

## 7. Integração contínua e reprodução

O workflow dispara em push e pull request, usa Node 24 e Ubuntu, instala com npm ci, verifica tipos, testa e compila. A execução [41456858487](https://github.com/eber-ops/SimuLAR/actions/runs/41456858487), do commit 046d499, terminou com sucesso. Relatórios são retidos por 30 dias e build por 14 dias.

Para reproduzir, instalar Node 24 e executar npm ci, npm test e npm run build. Para demonstrar, executar npm run dev e abrir a URL local. A CI não publica o site. A proteção de branches não foi configurada.

## 8. Estado do GitHub e limites da entrega

Repositório: https://github.com/eber-ops/SimuLAR. Há branches de organização, implementação, testes, CI e entrega. Commits foram enviados ao remoto e o histórico de desenvolvimento é verificável.

Ainda não foram criadas issues reais nem pull requests, e não houve revisão independente. O backlog e os templates estão prontos. develop e main ainda não receberam a implementação. Esses itens do fluxo colaborativo do infográfico permanecem pendentes e não devem ser apresentados como realizados. A entrega é uma versão candidata, sem representar aprovação acadêmica ou release estável na main.

## 9. Conclusão

O protótipo conecta requisitos às regras, testes e CI e permite demonstrar o exercício e uma comparação financeira com hipóteses explícitas. A implementação e as evidências estão prontas para avaliação. A integração por pull request e a aceitação da adaptação tecnológica são os próximos passos de fechamento institucional.

## Referências

- Material da disciplina, 2-EmbeddedSystems-12SEP2026.pdf, página 4.
- CAIXA, sistemas e indexadores: https://www.caixa.gov.br/Downloads/habitacao-documentos-gerais/passos_indexadores_amortizacao.pdf
- Banco Central, referências de taxas: https://www.bcb.gov.br/estatisticas/txjuros
- Documentação oficial de actions/setup-node: https://github.com/actions/setup-node
- Evidências locais em docs/evidencias e execução CI vinculada acima.
