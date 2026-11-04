# Fluxo de desenvolvimento

## Formatação de código

O projeto usa Prettier, com dois espaços por nível, limite de referência de 100 colunas e quebra de linha LF. Execute `npm run format` para formatar código e configurações, ou `npm run format:check` para conferir o padrão. O arquivo .editorconfig também orienta o editor; scripts Python usam quatro espaços.

## Branches

- `main`: versões estáveis e entregas.
- `develop`: integração do desenvolvimento.
- `feature/<descricao>`: funcionalidades e documentação.
- `test/<descricao>`: novos testes.
- `fix/<descricao>`: correções.

Criar branches de trabalho a partir de develop. Abrir pull request para develop, vincular a issue e revisar o diff. Integrar develop em main por pull request ao concluir uma entrega validada. Publicar tag v1.0.0 apenas quando a implementação e as verificações estiverem concluídas.

## Commits

Usar mensagens objetivas, por exemplo `docs: especificar regras do financiamento`, `feat: implementar calculo SAC` e `test: cobrir limites de idade`. Referenciar a issue quando ela existir.

## Revisão

Verificar requisitos atendidos, regras de negócio, clareza, acessibilidade e evidências. Após configurar a CI, exigir resultados aprovados antes da integração. Até lá não declarar verificações automáticas inexistentes como aprovadas.

Em trabalho individual, registrar uma autorrevisão no pull request. Não simular revisão independente nem atribuir aprovação a outra pessoa.

## Issues e rastreabilidade

Usar os modelos de tarefa e defeito. O backlog em docs/backlog.md contém atividades prontas para abrir como issues. Associar RF/RQ a alterações e, depois, a testes e evidências reais.
