# Especificação de requisitos — Calculadora de financiamento

Versão: 1.0 — 02/11/2026

## Objetivo e referência

Desenvolver uma aplicação web em React e TypeScript que receba sexo, idade e salário e calcule o valor do financiamento conforme a tabela do Projeto 1, página 4 do arquivo `2-EmbeddedSystems-12SEP2026.pdf`.

O cálculo acadêmico é `financiamento = salário × fator`. Não inclui parcelas, juros, prazo, análise de crédito ou aprovação bancária.

A adaptação de C++/GoogleTest/CMake para TypeScript/Vitest/Vite foi escolhida para este projeto. A equivalência acadêmica dessa substituição ainda não foi confirmada pelo professor.

## Escopo

Inclui formulário, validação, seleção de fator, cálculo, exibição de resultado e mensagens de erro. Nas etapas seguintes serão produzidos testes, CI, documentação e evidências de rastreabilidade.

Não inclui login, banco de dados, histórico persistente ou integração bancária. Os dados serão processados no navegador, sem envio a um servidor.

## Regras de negócio

| ID | Regra |
|---|---|
| RN01 | Todos os três campos são obrigatórios. |
| RN02 | As categorias da tabela do exercício são masculino e feminino. |
| RN03 | A idade deve ser um número inteiro entre 18 e 55, inclusive. |
| RN04 | O salário deve ser finito e estar entre 0 e 10.000, inclusive. |
| RN05 | O fator deve ser selecionado pela tabela abaixo, sem interpolação. |
| RN06 | O financiamento é o salário multiplicado pelo fator. |
| RN07 | Uma combinação sem fator não deve gerar resultado numérico. |

| Sexo | Idade inclusiva | Fator |
|---|---|---:|
| Masculino | 18–35 | 75 |
| Masculino | 36–45 | 55 |
| Masculino | 46–55 | 30 |
| Feminino | 18–30 | 70 |
| Feminino | 31–40 | 50 |
| Feminino | 41–50 | 35 |

## Decisões para pontos não definidos no infográfico

Estas decisões complementam o enunciado; não são regras explicitamente fornecidas por ele.

| ID | Decisão |
|---|---|
| D01 | Feminino entre 51 e 55: informar “Não há fator definido para esta faixa etária”, sem calcular. Não interpretar como reprovação de crédito. |
| D02 | Salário zero é válido e produz financiamento zero. Campo vazio não equivale a zero. |
| D03 | Adotar reais (BRL), formato brasileiro e duas casas decimais para apresentação. |
| D04 | Aceitar salário com até duas casas decimais; rejeitar precisão adicional em vez de arredondar silenciosamente. |
| D05 | A entrada salarial aceita dígitos e vírgula ou ponto decimal, sem separador de milhares; exemplo: 5000,50 ou 5000.50. Explicar esse formato no formulário. |
| D06 | Rejeitar texto não numérico, NaN e infinito. Não truncar idade fracionária. |
| D07 | Ao alterar qualquer entrada, remover o resultado anterior para evitar associação com dados desatualizados. |
| D08 | Representar valores monetários em centavos inteiros no domínio, mantendo exatidão no cálculo. |

## Requisitos funcionais e aceitação

| ID | Requisito | Critério de aceitação |
|---|---|---|
| RF01 | Coletar sexo, idade e salário. | Exibir três campos identificados e ação Calcular; nenhuma categoria pré-selecionada. |
| RF02 | Validar obrigatoriedade e categorias. | Campo vazio ou categoria desconhecida impede cálculo e recebe mensagem específica. |
| RF03 | Validar idade. | Aceitar inteiros 18 a 55; rejeitar 17, 56, 18,5 e texto. |
| RF04 | Validar salário. | Aceitar 0, 5000,50 e 10000; rejeitar negativo, 10000,01, texto, não finitos e mais de duas casas decimais. |
| RF05 | Selecionar fator. | Cada uma das seis faixas retorna exatamente o fator definido, incluindo seus extremos. |
| RF06 | Tratar combinação sem fator. | Feminino de 51 a 55 apresenta a mensagem de D01 e nenhum financiamento. |
| RF07 | Calcular financiamento. | Masculino, 18 anos, salário 5000 resulta em 375000; feminino, 41 anos, salário 5000 resulta em 175000. |
| RF08 | Exibir resultado. | Mostrar fator aplicado e valor em BRL com duas casas; salário zero apresenta R$ 0,00. |
| RF09 | Permitir corrigir entradas. | Após erro, usuário pode editar e calcular novamente sem recarregar a página. |
| RF10 | Evitar resultado desatualizado. | Editar qualquer campo remove o resultado anterior; novo resultado exige novo cálculo válido. |

## Requisitos de qualidade

| ID | Requisito | Verificação planejada |
|---|---|---|
| RQ01 | Separar regras de negócio da interface React. | Testes de domínio executam sem renderizar componentes. |
| RQ02 | Permitir uso em celular e desktop. | Verificar formulário em larguras de 360 e 1280 pixels sem rolagem horizontal. |
| RQ03 | Permitir operação por teclado e identificar erros textualmente. | Campos com rótulos associados, foco visível e mensagens vinculadas aos campos. |
| RQ04 | Verificar código automaticamente. | CI executa checagem TypeScript, testes e build; falhas tornam a execução reprovada. |
| RQ05 | Manter rastreabilidade. | Cada RF ligado a pelo menos um teste e sua evidência na entrega final. |
| RQ06 | Não persistir nem transmitir os dados do formulário. | Inspeção confirma ausência de envio e armazenamento de sexo, idade e salário. |

## Cenários de referência

| Cenário | Sexo | Idade | Salário | Resultado esperado |
|---|---|---:|---:|---|
| C01 | Masculino | 18 | 5000 | Fator 75; R$ 375.000,00 |
| C02 | Masculino | 36 | 5000 | Fator 55; R$ 275.000,00 |
| C03 | Masculino | 46 | 5000 | Fator 30; R$ 150.000,00 |
| C04 | Feminino | 18 | 5000 | Fator 70; R$ 350.000,00 |
| C05 | Feminino | 31 | 5000 | Fator 50; R$ 250.000,00 |
| C06 | Feminino | 41 | 5000 | Fator 35; R$ 175.000,00 |
| C07 | Feminino | 51 | 5000 | Combinação sem fator |
| C08 | Masculino | 18 | 0 | Fator 75; R$ 0,00 |
| C09 | Masculino | 18 | 5000,50 | Fator 75; R$ 375.037,50 |
| C10 | Masculino | 17 | 5000 | Idade inválida |
| C11 | Masculino | 18 | 10000,01 | Salário inválido |

Os cenários são exemplos de aceitação, não substituem a suíte completa de fronteiras, partições, robustez e tabela de decisão da etapa 5.

## Conclusão da etapa 1

Requisitos, regras, ambiguidades, critérios de aceitação, casos de uso e dados estão documentados. Implementação e execução dos testes pertencem às etapas seguintes. Prazo e composição da equipe ainda não foram informados e não alteram estas regras funcionais.
