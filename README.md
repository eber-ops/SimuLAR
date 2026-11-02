# SimuLAR

Aplicação web acadêmica de simulação de financiamento imobiliário, planejada em React e TypeScript.

## Experiência planejada

- Home com estilo de imobiliária.
- Modelo acadêmico: salário multiplicado pelo fator de sexo e idade do exercício.
- Comparador SAC/Price: imóvel, entrada, prazo e taxa efetiva anual configurável.

O comparador inicial não inclui indexação TR/IPCA, seguros ou tarifas e não representa CET nem oferta bancária.

## Documentação

- [Requisitos originais](docs/requisitos.md)
- [Ampliação do escopo](docs/escopo-ampliado.md)
- [Arquitetura e fluxogramas](docs/arquitetura.md)
- [Casos de uso](docs/casos-de-uso.md)
- [Dicionário de dados](docs/dicionario-dados.md)
- [Organização do desenvolvimento](CONTRIBUTING.md)
- [Backlog](docs/backlog.md)
- [Apresentação de 15 minutos](apresentacao/simular-v03.pptx)

## Situação

Etapas 1 e 2 documentadas e organização inicial do repositório preparada. Etapa 4 implementada em versão inicial: home, calculadora acadêmica e comparador SAC/Price com gráfico e tabela. Etapa 5 concluída com 70 testes, revisão visual em 360/1280 pixels e mensagens acessíveis por campo. CI é a próxima etapa.

## Executar

Requer Node.js 24 LTS. Com as dependências instaladas, a aplicação executa localmente no navegador.

```sh
npm ci
npm run dev
```

Verificações: `npm test`, `npm run typecheck` e `npm run build`.

Consulte [a implementação e seus limites de validação](docs/implementacao.md).

Relatório da etapa 5: [testes e evidências](docs/testes-etapa-5.md).
