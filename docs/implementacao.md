# SimuLAR — Implementação inicial

Home, navegação por hash, calculadora acadêmica e comparador SAC/Price implementados. Ilustração residencial original em CSS, sem fotografia externa. Tipografia Google Fonts com fallback sans-serif.

## Execução

Usar Node.js 24 LTS. O Node 21 instalado originalmente no computador não atende às versões atuais das ferramentas.

```sh
npm ci
npm run dev
```

## Verificações executadas

- `npm run build`: TypeScript e build de produção aprovados.
- `npm test`: 28 testes de domínio aprovados.
- Auditoria após atualização de dependências: zero vulnerabilidades reportadas.

Os testes incluem fatores e fronteiras, dinheiro, combinação sem fator, referência manual de duas prestações, taxa zero, conservação do principal e saldo final. Taxas extremas com prazos longos podem produzir amortização inicial menor que um centavo; esses cenários são rejeitados conforme a política de precisão documentada.

## Limites da revisão

Prévia servida em http://127.0.0.1:5173/. A abertura pelo navegador integrado falhou por erro de sessão. Revisão visual desktop/mobile e testes automatizados de interação ainda pendentes da etapa 5.

A implementação inicial organiza as páginas no arquivo main.tsx e o domínio em domain/calculations.ts. A extração dos componentes em arquivos separados pode ocorrer durante a revisão. O domínio usa exceções tratadas pelo formulário para validação, uma simplificação em relação ao contrato discriminado proposto na arquitetura.

Mensagens de erro aparecem no resumo acessível com foco. A associação de mensagens individuais a cada campo ainda precisa ser refinada para atender integralmente aos critérios de acessibilidade. A aplicação não persiste nem envia os dados digitados.

## Atualização após etapa 5

A suíte cresceu para 70 testes. A revisão desktop/mobile e os erros por campo foram concluídos conforme docs/testes-etapa-5.md, que substitui as pendências históricas acima.
