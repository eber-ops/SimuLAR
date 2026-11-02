# Etapa 5 — Verificação do SimuLAR

## Resultado desta execução

- 55 testes aprovados: 48 de domínio e 7 de interface em jsdom.
- TypeScript e build de produção aprovados.
- Dependências de teste instaladas: React Testing Library, user-event e jsdom.

## Estratégias e rastreabilidade

| Requisitos | Evidência automatizada |
|---|---|
| RF01–RF02 | Formulário preenchido por rótulos e seleção de categoria no teste de interface. Categoria desconhecida ainda precisa de caso específico de domínio. |
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

## Limitações e verificações restantes

Testes jsdom verificam comportamento, não layout real. Ainda verificar explicitamente larguras 360 e 1280, ausência de overflow, contraste, navegação completa por teclado e uso com leitor de tela. Mensagens por campo com aria-invalid ainda pendentes; o resumo de erro já recebe foco. Portanto, a revisão de acessibilidade e responsividade não está integralmente concluída.

Não foi medida cobertura percentual. Não confundir 55 testes aprovados com cobertura integral dos requisitos. CI pertence à etapa 6 e ainda não existe.
