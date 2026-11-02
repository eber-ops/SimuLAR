# SimuLAR — Roteiro de 15 minutos

| Slide | Assunto | Tempo | Acumulado |
|---|---|---:|---:|
| 1 | Tema e objetivo | 0:30 | 0:30 |
| 2 | Escopo e dois modos | 1:00 | 1:30 |
| 3 | Regras acadêmicas e decisão sem fator | 1:30 | 3:00 |
| 4 | SAC, Price e hipóteses | 1:30 | 4:30 |
| 5 | Arquitetura e home real | 1:30 | 6:00 |
| 6 | Resultados de testes | 1:30 | 7:30 |
| 7 | CI e rastreabilidade | 1:30 | 9:00 |
| 8 | Comparativo real da simulação | 1:30 | 10:30 |
| 9 | Demonstração | 3:00 | 13:30 |
| 10 | Entrega, limites e conclusão | 1:30 | 15:00 |

Se perguntas fizerem parte do limite, reservar dois minutos reduzindo a demonstração para dois minutos e o slide 8 para 30 segundos.

## Demonstração ao vivo

Preparar Node 24, executar npm ci antecipadamente e npm run dev. Abrir a aplicação antes de iniciar a fala. Usar capturas da pasta docs/evidencias como alternativa se a execução local falhar.

1. Mostrar a home e abrir o modelo acadêmico.
2. Masculino, idade 18 e salário 5000: mostrar R$ 375.000,00 e fator 75.
3. Alterar idade para 17: o resultado desaparece e novo cálculo mostra erro.
4. Feminino, idade 51: explicar que não existe fator na tabela.
5. Abrir comparador e usar imóvel 500000, entrada 100000, 360 meses e taxa efetiva anual ilustrativa 10%.
6. Mostrar principal R$ 400.000,00, primeira prestação SAC R$ 4.300,77 e Price R$ 3.383,56.
7. Mostrar gráfico e alternar a tabela para Price. Explicar que saldo final zero é testado, e que a última parcela pode ajustar centavos.

## Perguntas prováveis

- Por que React? Adaptação escolhida para interface web, mantendo requisitos, testes e CI; professor precisa aceitar a troca das ferramentas do enunciado.
- São taxas vigentes? Não. A taxa é configurável e o exemplo de 10% é ilustrativo.
- Isso é CET? Não. Indexadores, seguros, tarifas e tributos não compõem esta versão.
- Os testes garantem tudo? Não. Há 70 testes e revisão responsiva, sem cobertura percentual ou certificação de acessibilidade.
- O fluxo de PR foi cumprido? Ainda não. Branches e commits existem, mas issues, PRs e revisão independente continuam pendentes.
