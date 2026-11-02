# Etapa 5 — Verificação do SimuLAR

## Resultado desta execução

- 70 testes aprovados: 48 de cálculos, 12 de validação de formulário e 10 de interface em jsdom.
- TypeScript e build de produção aprovados.
- Dependências de teste instaladas: React Testing Library, user-event e jsdom.

## Estratégias e rastreabilidade

| Requisitos | Evidência automatizada |
|---|---|
| RF01–RF02 | Formulário preenchido por rótulos e seleção de categoria no teste de interface. Categorias desconhecidas cobertas por casos de domínio e formulário. |
| RF03 | Extremos de faixas, idades externas, não finitas e fracionárias. |
| RF04 | Zero, teto e salário inválido; precisão e formato monetário. |
| RF05–RF07 | Doze extremos das seis faixas, combinação sem fator e valores esperados. |
| RF08–RF10 | Resultado visível, recuperação de erro e remoção após edição. |
| RF11–RF12 | Home com acessos para os dois modos. |
| RF13–RF14 | Prazo e taxa externos, entrada igual ao imóvel, taxa zero e referência manual. |
| RF15–RF16 | Resumo financeiro, gráfico com descrição acessível e alternância da tabela. Conferência visual completa dos valores ainda não automatizada. |
| RF17 | Hipóteses presentes no formulário, verificadas por inspeção. |
| RF18 | Soma de amortização, total principal + juros, saldo não negativo e quitação. |

## Defeitos corrigidos

1. O texto auxiliar dentro do label alterava o nome acessível dos campos. Agora o rótulo é separado e o texto auxiliar usa aria-describedby.
2. O link de salto para conteúdo usava um hash interpretado como rota. Agora impede navegação e move o foco para o conteúdo.
3. O componente App foi separado do ponto de inicialização para permitir testes de interação sem montar uma segunda aplicação.

## Revisão no navegador

Home e comparador observados em largura reduzida no navegador integrado. O cenário de imóvel de R$ 500.000, entrada de R$ 100.000, 360 meses e taxa ilustrativa de 10% efetivos anuais gerou principal de R$ 400.000. Primeiro pagamento SAC: R$ 4.300,77; Price: R$ 3.383,56. O cronograma SAC termina com saldo zero.

Evidência visual: [comparador](evidencias/comparador.png). A captura mostra a região inicial do formulário; não substitui o registro dos resultados acima nem demonstra revisão de toda a página.

## Encerramento da etapa 5

Revisão funcional concluída para o escopo desta entrega. Erros individuais usam aria-invalid e aria-describedby; todos os campos inválidos são identificados na submissão, sem interromper a validação no primeiro erro. O resumo recebe foco. A edição remove o erro do campo e o resultado antigo.

Foram verificadas as três páginas em viewports 360×800 e 1280×900. A largura de scroll da página não excedeu o viewport (360 ou 345 no celular, 1265 no desktop, conforme presença da barra vertical). Tabelas mantêm rolagem própria. Em 360px, comparações e campos de prazo/taxa passam para uma coluna. Os principais textos auxiliares receberam cores mais escuras e há foco visível explícito.

Evidências:

- [Home 360](evidencias/home-360.png) e [home 1280](evidencias/home-1280.png).
- [Acadêmico 360](evidencias/academico-360.png), [erros 360](evidencias/academico-erros-360.png) e [acadêmico 1280](evidencias/academico-1280.png).
- [Comparador 360](evidencias/comparador-360.png) e [comparador 1280](evidencias/comparador-1280.png).
- [Relatório JUnit de 70 testes](evidencias/testes.xml).

O teste de teclado percorre seleção, idade, salário e botão e envia por Enter. O salto de conteúdo preserva a rota e move foco. A árvore de acessibilidade do navegador foi inspecionada para rótulos, mensagens e resultado. Isso não equivale a certificação de acessibilidade nem a teste com leitor de tela real. Auditoria especializada e outros navegadores são melhorias futuras, não evidências realizadas.

Não foi medida cobertura percentual. CI pertence à etapa 6 e ainda não existe. Não declarar testes automatizados como cobertura integral de todos os possíveis cenários.
