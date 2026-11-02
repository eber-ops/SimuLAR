# Etapa 6 — Integração contínua

O workflow `.github/workflows/ci.yml` executa em pushes, pull requests e disparo manual. Usa Ubuntu e Node.js 24, instala as versões do package-lock.json com npm ci e mantém permissões de leitura do código.

## Verificações

1. Verificação de tipos TypeScript.
2. Testes de domínio, formulário e interface, com saída de console e relatórios JUnit e JSON.
3. Build de produção.

Qualquer erro reprova o job. O build depende de tipos e testes aprovados. Os relatórios já gerados são enviados mesmo quando testes falham. Se a instalação ou a verificação de tipos falhar antes dos testes, não haverá relatório: os logs do respectivo passo são a evidência.

## Artefatos

- `test-reports-N`: relatórios JUnit e JSON, retidos por 30 dias.
- `simular-dist-N`: aplicação compilada, retida por 14 dias e enviada apenas após sucesso.

Os relatórios locais em docs/evidencias são registros históricos e não são sobrescritos pela CI. Os artefatos do GitHub são vinculados ao run e ao commit correspondentes. Este workflow verifica e compila, mas não publica um site.

## Consultar resultados

Abrir a aba Actions do repositório, selecionar SimuLAR CI e a execução do commit desejado. Os detalhes exibem cada passo e, ao final, os artefatos para download.

O check exibido é `Tipos, testes e build`. Uma futura proteção de branches pode torná-lo obrigatório. O workflow sozinho não impede merges sem aprovação; nenhuma regra de proteção foi alterada.

## Reprodução local

Com Node.js 24:

```sh
npm ci
npm run typecheck
npm test -- --reporter=default --reporter=junit --reporter=json --outputFile.junit=reports/junit.xml --outputFile.json=reports/tests.json
npm run build
```

Status da execução remota será registrado após o primeiro push da configuração.
