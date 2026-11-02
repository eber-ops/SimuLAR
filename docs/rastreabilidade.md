# SimuLAR — Matriz de rastreabilidade

Base: requisitos.md, escopo-ampliado.md e arquitetura.md. Evidência automatizada: [JUnit](evidencias/testes.xml), 70 testes aprovados. Evidência de integração: [CI aprovada](https://github.com/eber-ops/SimuLAR/actions/runs/41456858487). Esta matriz indica evidência existente, sem afirmar cobertura percentual.

| Requisito | Elemento de design / implementação | Teste ou inspeção | Evidência |
|---|---|---|---|
| RF01 Receber dados | Calculator e Field em src/App.tsx | Preenchimento do exercício por rótulos e teclado | src/App.test.tsx |
| RF02 Categoria e obrigatoriedade | validateForm e academic | Categoria vazia/desconhecida e formulário vazio | formValidation.test.ts e calculations.test.ts |
| RF03 Idade inteira 18–55 | validateForm e academic | Extremos, 17, 56, fração, não finitos e formatos | calculations.test.ts e formValidation.test.ts |
| RF04 Salário 0–10000 | parseMoney, validateForm e academic | Zero, teto, decimal, negativos, não finitos e precisão | calculations.test.ts |
| RF05 Selecionar fator | academic | Doze fronteiras das seis faixas | calculations.test.ts |
| RF06 Ausência de fator | academic e validateForm | Feminino 51/55 e erro na interface | Três suítes |
| RF07 Multiplicar salário | academic | Valores conhecidos e centavos | calculations.test.ts |
| RF08 Exibir resultado | Calculator e money | Valor formatado e fator | App.test.tsx e academico-360.png |
| RF09 Corrigir entradas | Estado de Calculator | Erro seguido de cálculo válido | App.test.tsx |
| RF10 Remover resultado antigo | change em Calculator | Edição após resultado nos dois modos | App.test.tsx |
| RF11 Home e navegação | Home e App | Links e inspeção 360/1280 | App.test.tsx e capturas home |
| RF12 Identificar modos | Páginas e textos de hipótese | Inspeção dos títulos e explicações | Capturas e código App.tsx |
| RF13 Entradas financeiras | validateForm e compare | Prazo, taxa, entrada e limites | formValidation.test.ts e calculations.test.ts |
| RF14 Comparar SAC/Price | compare | Referência manual, taxa zero e mesmo principal | calculations.test.ts |
| RF15 Custos comparáveis | Summary | Resumo e cenário de 400 mil | App.test.tsx e comparador-1280.png |
| RF16 Gráfico e tabela | Chart e cronograma | Descrição do gráfico e troca SAC/Price | App.test.tsx e capturas comparador |
| RF17 Hipóteses | Texto do formulário financeiro | Inspeção: taxa fixa, exclusões, sem CET | App.tsx e capturas |
| RF18 Consistência financeira | compare | Conservação de principal, juros, saldo final, mês único | calculations.test.ts |
| RQ01 Domínio independente | src/domain separado de React | Execução das suítes sem renderização | calculations.test.ts e formValidation.test.ts |
| RQ02 Responsividade | Media queries em styles.css | Três páginas em 360×800 e 1280×900, sem overflow da página | Evidências PNG e testes-etapa-5.md |
| RQ03 Teclado e erros | Rótulos, foco, aria-invalid, aria-describedby | Preenchimento e envio por teclado, foco no erro e salto | App.test.tsx, academico-erros-360.png |
| RQ04 Automação | .github/workflows/ci.yml | npm ci, tipos, testes e build no Ubuntu | CI 41456858487 |
| RQ05 Rastreabilidade | Esta matriz e relatório | Revisão de RF01–RF18 e RQ01–RQ06 | Este documento |
| RQ06 Sem persistência de entradas | Estado React em memória | Inspeção: ausência de fetch, armazenamento ou backend para dados digitados | src/App.tsx e src/domain |

Os caminhos de testes de domínio são relativos a src/domain. As imagens estão em docs/evidencias. RQ03 não equivale a certificação de acessibilidade. RQ06 não significa ausência de requisições de recursos: fontes externas podem ser carregadas pelo CSS, sem incluir os dados do formulário.
