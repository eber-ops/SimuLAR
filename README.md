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
- [Apresentação final de 15 minutos](apresentacao/simular-apresentacao-final.pptx)
- [Relatório técnico final](docs/relatorio-final.md)
- [Matriz de rastreabilidade](docs/rastreabilidade.md)
- [Roteiro de demonstração](docs/roteiro-apresentacao.md)

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

Relatório detalhado: [20 casos explicados e inventário dos 70 resultados](docs/relatorio-testes-detalhado.md). Para atualizar após uma execução que gere JSON e JUnit, execute `python docs/gerar-relatorio-testes.py` com Python 3.9+ e base de fusos horários disponível.

## Integração contínua

O workflow [SimuLAR CI](.github/workflows/ci.yml) verifica tipos, executa testes e gera o build a cada push e pull request. Relatórios e aplicação compilada ficam disponíveis como artefatos da execução. Consulte [a documentação da etapa 6](docs/ci-etapa-6.md).

## Entrega para avaliação

Versão candidata `v1.0.0-rc.1`: aplicação, 70 testes, CI validada, evidências, relatório, matriz e PowerPoint de 15 minutos. A integração em develop/main por pull request e o cadastro das issues continuam pendentes. A adaptação das tecnologias do enunciado precisa de aceitação acadêmica. Esta entrega não representa uma oferta bancária ou um site já publicado.
