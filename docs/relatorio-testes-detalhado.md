# SimuLAR — Relatório detalhado de testes

Execução local: **04/11/2026 às 18:16:06**, horário de São Paulo.

## 1. Resultado geral

| Indicador | Resultado |
|---|---:|
| Testes executados | 70 |
| Aprovados | 70 |
| Falhas | 0 |
| Pendentes | 0 |

Aprovação significa que as asserções daquele caso foram satisfeitas. Em um caso inválido, a aprovação confirma a rejeição correta. Não significa que todos os dados de entrada foram aceitos.

## 2. Ambiente, ferramentas e método

Execução local em Windows com Node.js 24 e Vitest 5.0.5. Vitest executa cenários e asserções; React Testing Library monta a interface e consulta rótulos/papéis; user-event simula interações; jsdom fornece o DOM sem renderização visual real. Detalhes em [ferramentas de testes](ferramentas-testes.md).

Estratégias: valores de fronteira das faixas, partições válidas e inválidas, combinações de decisão, robustez numérica, referências manuais, invariantes financeiros e interação de usuário.

Comando usado:

```sh
npm test -- --reporter=default --reporter=junit --reporter=json --outputFile.junit=reports/junit.xml --outputFile.json=reports/tests.json
```

## 3. Distribuição por arquivo

| Arquivo | Casos | Resultado |
|---|---:|---|
| App.test.tsx | 10 | passed |
| calculations.test.ts | 48 | passed |
| formValidation.test.ts | 12 | passed |

## 4. Casos selecionados com entradas e critérios

Os valores a seguir vêm das entradas e expectativas do código-fonte. O Vitest registra o status, mas não serializa o valor retornado em cada asserção aprovada. Portanto, “resultado verificado” descreve a expectativa satisfeita, não um log bruto do retorno da função.

### TC01 — modelo acadêmico fator de masculino aos 18 anos

- **Requisitos:** RF03, RF05, RF07.
- **Entrada ou procedimento:** Masculino; 18 anos; salário R$ 5.000,00.
- **Resultado esperado:** Fator 75 e financiamento R$ 375.000,00.
- **Verificação realizada:** Compara o objeto retornado com fator 75 e total de 37.500.000 centavos.
- **Status real:** **APROVADO**.
- **Duração do caso:** 1.96 ms.

### TC02 — modelo acadêmico fator de masculino aos 36 anos

- **Requisitos:** RF03, RF05.
- **Entrada ou procedimento:** Masculino; 36 anos; salário R$ 5.000,00.
- **Resultado esperado:** Fator 55 e financiamento R$ 275.000,00.
- **Verificação realizada:** Confere a primeira idade da segunda faixa masculina.
- **Status real:** **APROVADO**.
- **Duração do caso:** 0.13 ms.

### TC03 — modelo acadêmico fator de feminino aos 31 anos

- **Requisitos:** RF03, RF05.
- **Entrada ou procedimento:** Feminino; 31 anos; salário R$ 5.000,00.
- **Resultado esperado:** Fator 50 e financiamento R$ 250.000,00.
- **Verificação realizada:** Confere a transição da primeira para a segunda faixa feminina.
- **Status real:** **APROVADO**.
- **Duração do caso:** 0.13 ms.

### TC04 — modelo acadêmico não inventa fator ausente

- **Requisitos:** RF06.
- **Entrada ou procedimento:** Feminino; 51 anos; salário R$ 5.000,00.
- **Resultado esperado:** Rejeitar cálculo com mensagem contendo “Não há fator”.
- **Verificação realizada:** Verifica a exceção esperada. O resultado aprovado significa que a ausência de fator foi tratada.
- **Status real:** **APROVADO**.
- **Duração do caso:** 0.75 ms.

### TC05 — SAC e Price rejeita idade 17

- **Requisitos:** RF03.
- **Entrada ou procedimento:** Função acadêmica: masculino; 17 anos; salário zero.
- **Resultado esperado:** Rejeitar idade abaixo do mínimo.
- **Verificação realizada:** Verifica que a chamada lança erro. O teste fica sob o grupo SAC e Price no código, mas testa a função acadêmica.
- **Status real:** **APROVADO**.
- **Duração do caso:** 0.17 ms.

### TC06 — modelo acadêmico aceita salário zero

- **Requisitos:** RF04, RF07.
- **Entrada ou procedimento:** Masculino; 18 anos; salário R$ 0,00.
- **Resultado esperado:** Financiamento zero.
- **Verificação realizada:** Compara o total retornado com zero, preservando zero como entrada válida.
- **Status real:** **APROVADO**.
- **Duração do caso:** 0.16 ms.

### TC07 — valores monetários converte centavos sem truncamento

- **Requisitos:** RF04.
- **Entrada ou procedimento:** Texto salarial “5000,50”.
- **Resultado esperado:** Conversão para 500.050 centavos.
- **Verificação realizada:** Confere exatamente o inteiro retornado pelo parser.
- **Status real:** **APROVADO**.
- **Duração do caso:** 0.16 ms.

### TC08 — valores monetários rejeita 10,001

- **Requisitos:** RF04.
- **Entrada ou procedimento:** Texto monetário “10,001”, com três casas decimais.
- **Resultado esperado:** Rejeitar a precisão excedente.
- **Verificação realizada:** Verifica que o parser lança erro em vez de arredondar silenciosamente.
- **Status real:** **APROVADO**.
- **Duração do caso:** 0.15 ms.

### TC09 — SAC e Price confere cálculo manual em dois meses

- **Requisitos:** RF14, RF18.
- **Entrada ou procedimento:** Principal R$ 1.000,00; entrada zero; 2 meses; taxa anual efetiva 12,682503013196978%, equivalente a 1% ao mês.
- **Resultado esperado:** SAC: R$ 510,00 e R$ 505,00. Price: R$ 507,51 e R$ 507,51.
- **Verificação realizada:** Compara as duas listas de prestações em centavos com valores de referência.
- **Status real:** **APROVADO**.
- **Duração do caso:** 0.16 ms.

### TC10 — SAC e Price taxa zero não gera juros

- **Requisitos:** RF14, RF18.
- **Entrada ou procedimento:** Principal R$ 1.000,00; entrada zero; 3 meses; taxa zero.
- **Resultado esperado:** Juros totais SAC iguais a zero e total Price igual a R$ 1.000,00.
- **Verificação realizada:** Confere essas duas asserções. Não afirma que este teste isolado verifica cada coluna dos dois cronogramas.
- **Status real:** **APROVADO**.
- **Duração do caso:** 0.14 ms.

### TC11 — SAC e Price conserva principal e liquida saldo com taxa 10

- **Requisitos:** RF18.
- **Entrada ou procedimento:** Imóvel R$ 500.000,00; entrada R$ 100.000,00; 360 meses; taxa anual efetiva 10%.
- **Resultado esperado:** Em ambos: amortização soma R$ 400.000,00, saldo final zero e total = principal + juros. SAC tem menos juros que Price.
- **Verificação realizada:** Verifica também saldos não negativos e prestações em centavos inteiros.
- **Status real:** **APROVADO**.
- **Duração do caso:** 0.32 ms.

### TC12 — SAC e Price rejeita entrada igual ao imóvel

- **Requisitos:** RF13.
- **Entrada ou procedimento:** Imóvel R$ 1.000,00 e entrada R$ 1.000,00; 12 meses; taxa 10%.
- **Resultado esperado:** Rejeitar financiamento sem principal positivo.
- **Verificação realizada:** Verifica a exceção esperada na função compare.
- **Status real:** **APROVADO**.
- **Duração do caso:** 0.13 ms.

### TC13 — SAC e Price rejeita prazo fracionário

- **Requisitos:** RF13.
- **Entrada ou procedimento:** Principal R$ 1.000,00; prazo 12,5 meses; taxa 10%.
- **Resultado esperado:** Rejeitar prazo não inteiro.
- **Verificação realizada:** Verifica erro na função de cálculo.
- **Status real:** **APROVADO**.
- **Duração do caso:** 0.16 ms.

### TC14 — valida todos os campos de uma vez

- **Requisitos:** RF02, RF03, RF04.
- **Entrada ou procedimento:** Formulário financeiro com imóvel, entrada, prazo e taxa vazios.
- **Resultado esperado:** Retornar erros associados aos quatro campos.
- **Verificação realizada:** Compara as chaves dos erros com property, entry, months e annual.
- **Status real:** **APROVADO**.
- **Duração do caso:** 0.20 ms.

### TC15 — calcula exercício e remove resultado antigo ao editar

- **Requisitos:** RF08, RF10.
- **Entrada ou procedimento:** Preencher masculino, 18 e 5000; calcular; acrescentar “0” na idade, transformando-a em 180.
- **Resultado esperado:** Exibir R$ 375.000,00 inicialmente e remover esse resultado assim que a idade mudar.
- **Verificação realizada:** React Testing Library consulta o título de resultado antes e depois da interação.
- **Status real:** **APROVADO**.
- **Duração do caso:** 447.46 ms.

### TC16 — explica ausência de fator sem exibir financiamento

- **Requisitos:** RF06, RQ03.
- **Entrada ou procedimento:** Na interface: feminino, idade 51, salário 5000; acionar cálculo.
- **Resultado esperado:** Exibir alerta contendo “Não há fator” e mover foco para ele.
- **Verificação realizada:** Verifica texto do alerta e aguarda o foco com waitFor. O nome do teste menciona ausência de financiamento, mas a asserção explícita cobre alerta e foco.
- **Status real:** **APROVADO**.
- **Duração do caso:** 351.84 ms.

### TC17 — associa mensagens ao campo inválido e limpa após correção

- **Requisitos:** RF09, RQ03.
- **Entrada ou procedimento:** Submeter formulário acadêmico vazio; depois preencher idade 18.
- **Resultado esperado:** Idade marcada aria-invalid=true e vinculada a age-error; após correção, atributo false e mensagem removida.
- **Verificação realizada:** Confere atributos acessíveis e existência da mensagem no DOM.
- **Status real:** **APROVADO**.
- **Duração do caso:** 149.06 ms.

### TC18 — permite preencher e enviar o exercício por teclado

- **Requisitos:** RF01, RF07, RQ03.
- **Entrada ou procedimento:** Selecionar masculino; percorrer com Tab; digitar 18 e 5000; enviar com Enter.
- **Resultado esperado:** Foco segue idade, salário e botão; resultado R$ 375.000,00 aparece.
- **Verificação realizada:** user-event simula Tab/Enter e o teste consulta o elemento ativo e o título de resultado.
- **Status real:** **APROVADO**.
- **Duração do caso:** 425.69 ms.

### TC19 — compara cenários, troca tabela e limpa ao alterar entrada

- **Requisitos:** RF14, RF16, RF10.
- **Entrada ou procedimento:** Comparar valores iniciais: 500000, 100000, 360, 10; selecionar Price; editar entrada.
- **Resultado esperado:** Principal R$ 400.000,00; tabela SAC inicial; troca para Price; gráfico acessível; tabela anterior some após edição.
- **Verificação realizada:** Verifica regiões nomeadas, título do principal e descrição do gráfico. Não compara todos os totais financeiros neste teste.
- **Status real:** **APROVADO**.
- **Duração do caso:** 466.64 ms.

### TC20 — salto de conteúdo preserva rota e move foco

- **Requisitos:** RQ03.
- **Entrada ou procedimento:** Na página acadêmica, acionar “Pular para o conteúdo”.
- **Resultado esperado:** Manter #/exercicio e focar o elemento content.
- **Verificação realizada:** Verifica location.hash e document.activeElement.id.
- **Status real:** **APROVADO**.
- **Duração do caso:** 57.49 ms.

## 5. Exemplo de referência financeira

Para R$ 1.000 em dois meses a 1% mensal, no SAC a amortização é R$ 500 por mês. O primeiro juro é R$ 10 e o segundo R$ 5, gerando prestações de R$ 510 e R$ 505. Na Price, a fórmula produz aproximadamente R$ 507,5124, arredondada para R$ 507,51; a segunda parcela também resulta em R$ 507,51 após o cálculo em centavos. O TC09 compara explicitamente essas listas.

## 6. Inventário completo da execução

Cada linha abaixo foi extraída do JSON desta execução. Nomes que terminam em “rejeita” ou “inválida” sem valor representam parâmetros de texto vazio. Alguns testes acadêmicos estão agrupados sob “SAC e Price” no arquivo original; o grupo não altera a função realmente testada.

| Nº | Arquivo | Caso registrado pelo Vitest | Status | Duração (ms) |
|---:|---|---|---|---:|
| 1 | App.test.tsx | home oferece acesso aos dois modos | APROVADO | 136.23 |
| 2 | App.test.tsx | calcula exercício e remove resultado antigo ao editar | APROVADO | 447.46 |
| 3 | App.test.tsx | explica ausência de fator sem exibir financiamento | APROVADO | 351.84 |
| 4 | App.test.tsx | não converte idade vazia em zero e permite corrigir | APROVADO | 331.24 |
| 5 | App.test.tsx | compara cenários, troca tabela e limpa ao alterar entrada | APROVADO | 466.64 |
| 6 | App.test.tsx | recusa entrada igual ao imóvel | APROVADO | 13.61 |
| 7 | App.test.tsx | mostra página inexistente e mantém retorno | APROVADO | 8.20 |
| 8 | App.test.tsx | associa mensagens ao campo inválido e limpa após correção | APROVADO | 149.06 |
| 9 | App.test.tsx | permite preencher e enviar o exercício por teclado | APROVADO | 425.69 |
| 10 | App.test.tsx | salto de conteúdo preserva rota e move foco | APROVADO | 57.49 |
| 11 | calculations.test.ts | modelo acadêmico fator de masculino aos 18 anos | APROVADO | 1.96 |
| 12 | calculations.test.ts | modelo acadêmico fator de masculino aos 35 anos | APROVADO | 0.16 |
| 13 | calculations.test.ts | modelo acadêmico fator de masculino aos 36 anos | APROVADO | 0.13 |
| 14 | calculations.test.ts | modelo acadêmico fator de masculino aos 45 anos | APROVADO | 0.13 |
| 15 | calculations.test.ts | modelo acadêmico fator de masculino aos 46 anos | APROVADO | 0.12 |
| 16 | calculations.test.ts | modelo acadêmico fator de masculino aos 55 anos | APROVADO | 0.12 |
| 17 | calculations.test.ts | modelo acadêmico fator de feminino aos 18 anos | APROVADO | 0.11 |
| 18 | calculations.test.ts | modelo acadêmico fator de feminino aos 30 anos | APROVADO | 0.11 |
| 19 | calculations.test.ts | modelo acadêmico fator de feminino aos 31 anos | APROVADO | 0.13 |
| 20 | calculations.test.ts | modelo acadêmico fator de feminino aos 40 anos | APROVADO | 0.16 |
| 21 | calculations.test.ts | modelo acadêmico fator de feminino aos 41 anos | APROVADO | 0.09 |
| 22 | calculations.test.ts | modelo acadêmico fator de feminino aos 50 anos | APROVADO | 0.07 |
| 23 | calculations.test.ts | modelo acadêmico não inventa fator ausente | APROVADO | 0.75 |
| 24 | calculations.test.ts | modelo acadêmico rejeita idade fracionária | APROVADO | 0.16 |
| 25 | calculations.test.ts | modelo acadêmico aceita salário zero | APROVADO | 0.16 |
| 26 | calculations.test.ts | valores monetários converte centavos sem truncamento | APROVADO | 0.16 |
| 27 | calculations.test.ts | valores monetários rejeita  | APROVADO | 0.17 |
| 28 | calculations.test.ts | valores monetários rejeita 1.000,00 | APROVADO | 0.11 |
| 29 | calculations.test.ts | valores monetários rejeita 10,001 | APROVADO | 0.15 |
| 30 | calculations.test.ts | valores monetários rejeita NaN | APROVADO | 0.17 |
| 31 | calculations.test.ts | valores monetários rejeita -1 | APROVADO | 0.14 |
| 32 | calculations.test.ts | SAC e Price rejeita idade 17 | APROVADO | 0.17 |
| 33 | calculations.test.ts | SAC e Price rejeita idade 56 | APROVADO | 0.11 |
| 34 | calculations.test.ts | SAC e Price rejeita idade NaN | APROVADO | 0.10 |
| 35 | calculations.test.ts | SAC e Price rejeita idade Infinity | APROVADO | 0.09 |
| 36 | calculations.test.ts | SAC e Price rejeita salário -1 | APROVADO | 0.13 |
| 37 | calculations.test.ts | SAC e Price rejeita salário 1000001 | APROVADO | 0.08 |
| 38 | calculations.test.ts | SAC e Price rejeita salário NaN | APROVADO | 0.09 |
| 39 | calculations.test.ts | SAC e Price rejeita salário Infinity | APROVADO | 0.08 |
| 40 | calculations.test.ts | SAC e Price aceita teto salarial e calcula centavos | APROVADO | 0.09 |
| 41 | calculations.test.ts | SAC e Price rejeita prazo 0 | APROVADO | 0.20 |
| 42 | calculations.test.ts | SAC e Price rejeita prazo -1 | APROVADO | 0.09 |
| 43 | calculations.test.ts | SAC e Price rejeita prazo 601 | APROVADO | 0.08 |
| 44 | calculations.test.ts | SAC e Price rejeita prazo NaN | APROVADO | 0.08 |
| 45 | calculations.test.ts | SAC e Price rejeita prazo Infinity | APROVADO | 0.08 |
| 46 | calculations.test.ts | SAC e Price rejeita taxa -1 | APROVADO | 0.13 |
| 47 | calculations.test.ts | SAC e Price rejeita taxa 101 | APROVADO | 0.09 |
| 48 | calculations.test.ts | SAC e Price rejeita taxa NaN | APROVADO | 0.08 |
| 49 | calculations.test.ts | SAC e Price rejeita taxa Infinity | APROVADO | 0.09 |
| 50 | calculations.test.ts | SAC e Price rejeita precisão insuficiente com juros extremos e prazo longo | APROVADO | 0.55 |
| 51 | calculations.test.ts | SAC e Price liquida financiamento de um único mês | APROVADO | 0.15 |
| 52 | calculations.test.ts | SAC e Price confere cálculo manual em dois meses | APROVADO | 0.16 |
| 53 | calculations.test.ts | SAC e Price conserva principal e liquida saldo com taxa 0 | APROVADO | 0.41 |
| 54 | calculations.test.ts | SAC e Price conserva principal e liquida saldo com taxa 10 | APROVADO | 0.32 |
| 55 | calculations.test.ts | SAC e Price conserva principal e liquida saldo com taxa 100 | APROVADO | 0.12 |
| 56 | calculations.test.ts | SAC e Price taxa zero não gera juros | APROVADO | 0.14 |
| 57 | calculations.test.ts | SAC e Price rejeita entrada igual ao imóvel | APROVADO | 0.13 |
| 58 | calculations.test.ts | SAC e Price rejeita prazo fracionário | APROVADO | 0.16 |
| 59 | formValidation.test.ts | aceita os dois formulários válidos | APROVADO | 1.91 |
| 60 | formValidation.test.ts | rejeita categoria inválida  | APROVADO | 0.73 |
| 61 | formValidation.test.ts | rejeita categoria inválida outro | APROVADO | 0.20 |
| 62 | formValidation.test.ts | rejeita categoria inválida true | APROVADO | 0.17 |
| 63 | formValidation.test.ts | rejeita formato de idade  | APROVADO | 0.16 |
| 64 | formValidation.test.ts | rejeita formato de idade 0x12 | APROVADO | 0.09 |
| 65 | formValidation.test.ts | rejeita formato de idade 1e2 | APROVADO | 0.09 |
| 66 | formValidation.test.ts | rejeita formato de idade 18.5 | APROVADO | 0.11 |
| 67 | formValidation.test.ts | associa falta de fator à idade | APROVADO | 0.23 |
| 68 | formValidation.test.ts | associa erro de entrada ao campo correspondente | APROVADO | 0.18 |
| 69 | formValidation.test.ts | valida todos os campos de uma vez | APROVADO | 0.20 |
| 70 | formValidation.test.ts | aceita taxa e salário zero explicitamente | APROVADO | 0.16 |

## 7. Evidências e reprodução

- [Snapshot JSON desta execução](evidencias/vitest-detalhado.json).
- [Snapshot JUnit/XML desta execução](evidencias/vitest-detalhado.xml).
- Fontes: src/domain/calculations.test.ts, src/domain/formValidation.test.ts e src/App.test.tsx.
- [Revisão visual anterior de celular/desktop](testes-etapa-5.md). As imagens são evidências de outra verificação e não foram produzidas pelo Vitest.
- [CI da versão candidata](https://github.com/eber-ops/SimuLAR/actions/runs/41460353407). Essa execução remota é distinta da execução local documentada aqui.

## 8. Limites e conclusão

Não foram medidos cobertura percentual, desempenho, carga, segurança ou compatibilidade entre navegadores nesta execução. jsdom não comprova layout ou comportamento com leitor de tela. Uma chamada inválida que usa toThrow pode apenas confirmar que houve erro; a mensagem exata só está garantida quando o teste a compara explicitamente.

Resultado desta execução: 70 de 70 testes aprovados, 0 falhas. Os exemplos e o inventário acima permitem verificar quais comportamentos foram efetivamente cobertos.
