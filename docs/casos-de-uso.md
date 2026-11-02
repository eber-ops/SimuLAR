# Casos de uso

Referência: [Especificação de requisitos](requisitos.md).

## UC01 — Calcular financiamento

- Ator: pessoa que utiliza a calculadora.
- Precondição: aplicação carregada no navegador.
- Requisitos: RF01–RF08.

Fluxo principal:

1. Usuário seleciona sexo e informa idade e salário.
2. Usuário aciona Calcular.
3. Sistema verifica obrigatoriedade, formatos e limites.
4. Sistema identifica o fator aplicável.
5. Sistema calcula salário × fator.
6. Sistema apresenta fator e financiamento formatado em BRL.

Fluxos alternativos:

- Campo ausente ou inválido: indicar o problema junto ao campo, preservar as entradas para correção e não mostrar resultado.
- Feminino entre 51 e 55 anos: informar ausência de fator e não calcular.
- Salário zero: concluir normalmente com resultado zero.

Pós-condição: resultado corresponde às entradas validadas ou existem mensagens explicando por que não foi possível calcular.

## UC02 — Corrigir ou realizar nova simulação

- Ator: pessoa que utiliza a calculadora.
- Precondição: formulário contém dados, com resultado ou erros anteriores.
- Requisitos: RF09 e RF10.

1. Usuário altera uma ou mais entradas.
2. Sistema remove eventual resultado anterior.
3. Usuário aciona Calcular novamente.
4. Sistema revalida todos os dados e executa UC01.

Pós-condição: nenhum resultado antigo é apresentado como se correspondesse aos novos dados; erros resolvidos desaparecem após nova validação.
