# Dicionário de dados

Referência: [Especificação de requisitos](requisitos.md).

| Dado | Representação planejada | Domínio e significado |
|---|---|---|
| sexo | União TypeScript `'masculino' \| 'feminino'` | Categoria da tabela acadêmica; seleção obrigatória. |
| idade | `number` inteiro | Anos completos, entre 18 e 55. Não converter fração em inteiro. |
| salarioEntrada | `string` | Texto digitado; vazio é inválido. Aceita vírgula ou ponto decimal, sem agrupamento de milhares. |
| salarioCentavos | `number` inteiro | De 0 a 1.000.000 centavos, após validação e conversão da entrada. |
| fator | `number` inteiro | Um dos valores 75, 55, 30, 70, 50 ou 35, selecionado por sexo e idade. |
| financiamentoCentavos | `number` inteiro | Produto de salarioCentavos por fator; máximo de 75.000.000 centavos. |
| erros | Coleção de mensagens por campo ou combinação | Obrigatoriedade, formato, limite ou ausência de fator. |
| resultado | Objeto válido ou ausência | Contém fator e financiamentoCentavos; ausente antes do cálculo, após erro ou alteração de entrada. |

Valores formatados como `R$ 375.000,00` pertencem à apresentação. A lógica de cálculo opera em centavos inteiros. Não armazenar dados pessoais nem resultados entre sessões.
