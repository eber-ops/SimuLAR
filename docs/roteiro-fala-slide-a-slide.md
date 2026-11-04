# SimuLAR — Roteiro de fala por slide

Base: apresentação final com 11 slides, no estilo UTFPR. Tempo total previsto: 15 minutos, incluindo dois minutos de demonstração. Use as falas como guia, sem ler cada palavra. Os tempos incluem apontar os elementos do slide e fazer pequenas pausas.

## Slide 1 — SimuLAR: simulação de financiamento

**Tempo: 30 segundos. Encerrar em 0:30.**

**Fala sugerida**

“Boa noite. Nós somos Eber Delgado de Souza, Jonas de Souza Ferreira e Lucas Lourenço Barbosa. Vamos apresentar o SimuLAR, uma aplicação web de simulação de financiamento imobiliário.

O projeto parte do exercício da disciplina e acrescenta uma comparação entre SAC e Price. Além da aplicação, vamos mostrar como organizamos os requisitos, a implementação, os testes automatizados e as evidências de qualidade.”

**Transição:** “Primeiro, vamos entender os dois modos disponíveis.”

## Slide 2 — Dois modos, regras independentes

**Tempo: 1 minuto. Encerrar em 1:30.**

**Fala sugerida**

“O SimuLAR tem uma página inicial com aparência de site imobiliário e acesso a dois simuladores.

O primeiro é o modelo acadêmico. Ele recebe sexo, idade e salário e aplica os fatores definidos no exercício. Nesse modo, calculamos um valor pela regra salário multiplicado pelo fator.

O segundo é o comparador financeiro. Ele recebe valor do imóvel, entrada, prazo e taxa efetiva anual. Com esses dados, calcula dois cronogramas, um pelo SAC e outro pela Price.

As regras dos dois modos são independentes. Os fatores por sexo e idade pertencem exclusivamente ao exercício e não entram no comparador financeiro.

Essa separação nos permitiu preservar o enunciado e ampliar a aplicação com um exemplo de financiamento que apresenta parcelas, juros e saldo devedor.”

**O que apontar:** os dois blocos de funcionalidades.

**Transição:** “Vamos começar pelas regras que vieram do exercício.”

## Slide 3 — Regras do exercício

**Tempo: 1 minuto e 30 segundos. Encerrar em 3:00.**

**Fala sugerida**

“No modelo acadêmico, a fórmula é simples: financiamento igual ao salário multiplicado pelo fator. O trabalho de engenharia está em selecionar esse fator corretamente e tratar os limites e as entradas inválidas.

Na tabela masculina, por exemplo, de 18 a 35 anos o fator é 75. Aos 36 anos, ele muda para 55. Para uma pessoa de 18 anos com salário de cinco mil reais, o resultado é 375 mil reais.

A idade precisa ser inteira e estar entre 18 e 55. O salário pode ir de zero a dez mil reais. Salário zero é válido; campo vazio precisa gerar erro.

Encontramos uma ambiguidade: o limite geral de idade chega a 55, mas a tabela feminina só define fatores até os 50. Documentamos a decisão de apresentar uma mensagem de ausência de fator para mulheres entre 51 e 55, sem criar um valor que o enunciado não fornece.

Também decidimos trabalhar com centavos inteiros. Isso preserva os valores monetários durante as operações e deixa o formato em reais para a apresentação.”

**O que apontar:** fronteira 35/36 e a observação sobre feminino 51–55.

**Transição:** “O comparador financeiro usa outro conjunto de regras.”

## Slide 4 — Comparação SAC e Price

**Tempo: 1 minuto e 30 segundos. Encerrar em 4:30.**

**Fala sugerida**

“Para comparar os sistemas, usamos o mesmo valor financiado, o mesmo prazo e a mesma taxa. O valor financiado é o preço do imóvel menos a entrada.

Amortização é a parte da prestação que reduz a dívida. No SAC, essa parcela do principal é constante, com ajuste de centavos no final. Como os juros incidem sobre um saldo que diminui, as prestações tendem a cair.

Na Price, a prestação de principal e juros é regular quando a taxa é fixa. Ao longo do contrato, a parte de juros diminui e a amortização aumenta. Nossa implementação ajusta a última prestação para liquidar o saldo residual.

A entrada de juros é uma taxa efetiva anual. Nós a convertemos para uma taxa mensal equivalente usando juros compostos. Não fazemos uma simples divisão por doze.

O objetivo é comparar os sistemas sob hipóteses claras. A versão atual não inclui correção por TR ou IPCA, seguros, tarifas e tributos. Por isso, o resultado não representa o custo efetivo total de uma proposta bancária.”

**O que apontar:** diferença entre amortização e prestação; exclusões do modelo.

**Transição:** “Agora vamos ver como essas regras foram organizadas no software.”

## Slide 5 — Interface e domínio separados

**Tempo: 1 minuto e 30 segundos. Encerrar em 6:00.**

**Fala sugerida**

“Escolhemos React e TypeScript para construir a aplicação web. Essa escolha adapta as ferramentas do enunciado original, mantendo o processo de especificar, implementar, testar e verificar.

O React cuida da interface: páginas, formulários, mensagens e resultados. O TypeScript ajuda a definir os tipos de dados, e as funções de domínio concentram a validação e os cálculos.

Por exemplo, a função de cálculo acadêmico recebe dados já convertidos e devolve fator e valor. Ela não precisa conhecer um botão ou um campo da tela. Isso permite executar os testes da regra diretamente, sem abrir a aplicação.

Na imagem vemos a home real do SimuLAR. Ela apresenta o projeto e leva aos dois modos. A navegação usa rotas por hash, que facilitam a execução em hospedagem estática.

Os dados digitados ficam na memória do navegador. Não implementamos login, banco de dados ou envio das simulações para um servidor. Também revisamos a organização das páginas em celular e desktop.”

**O que apontar:** captura da home; diferença entre interface e funções de domínio.

**Transição:** “Essa separação também aparece nos testes.”

## Slide 6 — Testes: estratégias e caso de fronteira

**Tempo: 1 minuto e 15 segundos. Encerrar em 7:15.**

**Fala sugerida**

“Usamos o Vitest para executar os testes e verificar as expectativas. A suíte tem 70 casos aprovados: 48 de cálculos, 12 de validação e 10 de interface.

As estratégias incluem fronteiras, como idades imediatamente antes e depois de uma mudança de fator; partições, que representam faixas válidas e inválidas; robustez, com valores inadequados; e combinações da tabela de decisão.

No código mostrado, testamos masculino, 18 anos e salário de cinco mil reais. O expect chama a função, e o toEqual compara o retorno com fator 75 e total de 375 mil reais. Os números do código estão em centavos.

Também testamos idades 17 e 56 e salários fora dos limites. Nesses casos, passar significa rejeitar a entrada corretamente. Portanto, um erro esperado da aplicação pode produzir um teste aprovado.”

**O que apontar:** entrada do snippet, toEqual e status aprovado. Não ler todos os dígitos em centavos.

**Transição:** “Os próximos exemplos mostram como verificamos erros e cálculos financeiros.”

## Slide 7 — Testes: rejeição e referência financeira

**Tempo: 1 minuto e 15 segundos. Encerrar em 8:30.**

**Fala sugerida**

“À esquerda, o caso de feminino com 51 anos verifica a lacuna da tabela. O toThrow espera que a função lance um erro contendo ‘Não há fator’. Esse teste passou porque o sistema sinalizou a condição prevista.

À direita, usamos uma referência pequena, possível de conferir manualmente: mil reais em dois meses, com juros equivalentes a um por cento ao mês.

No SAC, a amortização é de quinhentos reais. Os juros são dez reais no primeiro mês e cinco no segundo. Assim, esperamos prestações de 510 e 505 reais. Na Price, esperamos duas prestações de 507 reais e 51 centavos. Os testes comparam essas listas com os valores calculados.

Na interface, usamos React Testing Library, user-event e jsdom para verificar preenchimento, teclado e mensagens. A aparência visual foi revisada separadamente em navegador real.”

**O que apontar:** toThrow, valores SAC/Price e uso de centavos.

**Transição:** “Além de rodar localmente, essas verificações foram automatizadas.”

## Slide 8 — CI aprovada e requisitos rastreáveis

**Tempo: 1 minuto e 30 segundos. Encerrar em 10:00.**

**Fala sugerida**

“Configuramos integração contínua com GitHub Actions. A cada push ou pull request, o workflow instala as dependências a partir do lockfile, verifica os tipos, executa os testes e gera o build de produção.

O ambiente remoto usa Ubuntu e Node 24. A instalação limpa é importante porque verifica o projeto fora do ambiente já preparado no nosso computador.

Também distinguimos as verificações. TypeScript detecta incompatibilidades de tipos. Vitest verifica os comportamentos definidos nos testes. O build verifica se conseguimos gerar os arquivos da aplicação. Cada etapa responde a uma pergunta diferente.

A execução remota registrada terminou com sucesso. Os relatórios de testes e a aplicação compilada ficam disponíveis como artefatos.

Por fim, fizemos uma matriz de rastreabilidade. Por exemplo, o RF03 exige uma idade inteira no intervalo definido. A matriz liga esse requisito à validação, aos testes de fronteira e à evidência da execução. Isso facilita conferir o que foi implementado e como foi verificado.”

**O que apontar:** sequência da CI e exemplo RF03. Deixe o link da execução preparado, sem gastar tempo procurando.

**Transição:** “Vamos olhar um cenário concreto produzido pela aplicação.”

## Slide 9 — Um cenário, dois caminhos

**Tempo: 1 minuto e 30 segundos. Encerrar em 11:30.**

**Fala sugerida**

“Neste exemplo, o imóvel custa quinhentos mil reais e a entrada é de cem mil. Portanto, o principal financiado é de quatrocentos mil reais. O prazo é de 360 meses, ou trinta anos, e a taxa é de dez por cento efetivos ao ano, usada aqui como exemplo ilustrativo.

A primeira prestação do SAC ficou em 4.300 reais e 77 centavos. Na Price, ficou em 3.383 reais e 56 centavos.

Isso mostra uma diferença relevante: a Price começa com uma prestação menor nesse cenário, mas não devemos decidir apenas pela primeira parcela. Precisamos acompanhar a amortização, o saldo e os juros ao longo do contrato.

A aplicação mostra esses elementos no resumo, no gráfico e no cronograma mensal. Na política de arredondamento adotada, a última parcela pode ter um ajuste para zerar a dívida.

O comparativo usa as mesmas condições nos dois sistemas. Como não incorpora encargos e indexadores, serve para entender a diferença matemática entre SAC e Price, e não para garantir uma condição comercial de banco.”

**O que apontar:** principal, duas primeiras prestações e resumo na captura.

**Transição:** “Vou demonstrar esses comportamentos na aplicação.”

## Slide 10 — Demonstração da aplicação

**Tempo: 2 minutos. Encerrar em 13:30.**

Deixe a aplicação aberta antes de iniciar a apresentação. Use dados de exemplo. A sequência abaixo combina ações e fala para caber no tempo.

### 0:00–0:30 — Cálculo acadêmico válido

**Ação:** abrir o modelo acadêmico, selecionar masculino, preencher idade 18 e salário 5000 e calcular.

**Fala:** “Aqui temos a interface do exercício. Com esses dados, a aplicação seleciona o fator 75 e mostra 375 mil reais. Esse é o mesmo cenário validado no teste automatizado.”

### 0:30–0:55 — Idade inválida

**Ação:** substituir 18 por 17 e calcular.

**Fala:** “Ao editar a idade, o resultado anterior desaparece. Ao calcular novamente, o sistema informa o intervalo permitido, identifica o campo e leva o foco ao resumo de erros.”

### 0:55–1:15 — Combinação sem fator

**Ação:** selecionar feminino, preencher idade 51 e calcular.

**Fala:** “Neste caso, a idade está no intervalo geral, mas não há fator na tabela feminina. A aplicação informa essa ausência.”

### 1:15–1:45 — Comparação financeira

**Ação:** abrir o comparador. Conferir imóvel 500000, entrada 100000, prazo 360 e taxa 10. Acionar a comparação.

**Fala:** “No segundo modo, usamos dados financeiros. O sistema gera os dois cronogramas para o mesmo principal e mostra a diferença entre as primeiras parcelas e os custos totais.”

### 1:45–2:00 — Evolução mensal

**Ação:** rolar até o gráfico e alternar a tabela para Price.

**Fala:** “O gráfico mostra a evolução do saldo. A tabela detalha amortização, juros e prestação de cada mês, permitindo conferir a formação do resultado.”

**Alternativa se houver falha:** mostrar as capturas de docs/evidencias. Dizer “Esta captura registra a execução do mesmo cenário” e seguir a explicação. Não gastar o tempo da apresentação tentando resolver o ambiente.

**Transição:** “Para concluir, vamos resumir a entrega e seus limites.”

## Slide 11 — Entrega e limites

**Tempo: 1 minuto e 30 segundos. Encerrar em 15:00.**

**Fala sugerida**

“A entrega reúne a aplicação, a documentação dos requisitos, a arquitetura, os testes, a integração contínua, o relatório técnico e a matriz de rastreabilidade.

Os 70 testes passaram na execução registrada, e a CI foi validada no GitHub. Também revisamos as três páginas em larguras de celular e desktop e tratamos mensagens por campo e navegação por teclado.

Essas evidências têm limites. Não medimos cobertura percentual e não realizamos certificação de acessibilidade ou teste com leitor de tela real. No comparador, taxas são configuráveis e não há encargos nem atualização por indexadores.

No processo de colaboração, temos branches e commits, mas o cadastro de issues, os pull requests e a integração em main ainda estão pendentes. Por isso, identificamos a entrega como versão candidata para avaliação acadêmica.

Como evolução, podemos acrescentar encargos e cenários de indexação com regras documentadas. A contribuição principal do projeto é demonstrar um processo verificável: partir de requisitos, implementar comportamentos e registrar evidências dos resultados.”

**Encerramento:** “Obrigado. Estamos à disposição para as perguntas.”

## Preparação e divisão da apresentação

Uma divisão possível, a ajustar à equipe:

- Eber: slides 1–4, até 4:30.
- Jonas: slides 5–8, até 10:00.
- Lucas: slides 9–11, até 15:00, incluindo demonstração.

Antes da apresentação, confirmar a disponibilidade dos integrantes e ensaiar a troca de fala. Esta divisão é sugestão, não atribuição de autoria individual do desenvolvimento.

Preparar o Node 24 e iniciar npm run dev antecipadamente. Conferir a URL local, ter o PowerPoint e as capturas disponíveis e desligar notificações que possam interromper a demonstração.

Se as perguntas precisarem caber nos 15 minutos, reduzir o slide 9 a 30 segundos e a demonstração a um minuto, usando apenas o cálculo acadêmico válido e a comparação financeira. Assim, a exposição termina em 13 minutos.

## Respostas curtas para perguntas

**Por que React e TypeScript?** Para construir uma interface web e manter funções de domínio testáveis. A troca das ferramentas originais do enunciado precisa ser aceita pelo professor.

**Por que não usar somente npm test no Node antigo?** As versões atuais das ferramentas do projeto exigem uma versão compatível. A execução validada utiliza Node 24.

**O que significa um teste de erro aprovado?** Significa que a entrada inválida provocou a rejeição esperada. Aceitar essa entrada indevidamente faria o teste falhar.

**O que garante que o saldo final zera?** O algoritmo ajusta a última amortização e os testes verificam o saldo final, a soma das amortizações e a relação entre principal, juros e pagamentos.

**Vitest verifica o layout?** Não. A suíte de interface usa jsdom para verificar comportamento. A revisão visual foi realizada separadamente no navegador.

**A taxa de 10% é atual?** Não é apresentada como taxa vigente. É uma hipótese configurável usada no exemplo.

**Qual sistema é melhor?** O simulador compara os efeitos de cada sistema sob as mesmas hipóteses. A decisão real depende de capacidade de pagamento, proposta e encargos que não estão todos modelados aqui.

**Onde estão os resultados?** No relatório detalhado, nos snapshots XML/JSON em docs/evidencias e nas execuções do GitHub Actions.
