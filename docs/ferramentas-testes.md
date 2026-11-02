# Ferramentas de teste do SimuLAR

## Vitest — executor e verificações

O comando npm test executa o Vitest. Ele descobre arquivos .test.ts e .test.tsx, organiza os cenários com describe/it e verifica expectativas com expect. it.each executa o mesmo cenário para diferentes entradas, como os doze extremos de idade da tabela.

No domínio, testes chamam academic, compare, parseMoney e validateForm diretamente. Exemplos: fator 75 para masculino de 18 anos; rejeição de idade 17; soma das amortizações igual ao principal; saldo final zero.

O Vitest gera resultados no console e relatórios JUnit/XML e JSON. JUnit permite intercâmbio com ferramentas de CI. JSON registra resultados estruturados. Eles comprovam o resultado daquela execução, não cobertura percentual nem ausência de todos os defeitos.

## React Testing Library — comportamento da interface

render monta o componente App no ambiente de teste. screen localiza elementos por papel e nome acessível: getByRole para botões/títulos e getByLabelText para campos. Isso verifica se a interface pode ser usada por seus elementos visíveis e rotulados, sem depender de classes CSS ou estados internos do React.

Os cenários verificam cálculo exibido, mensagem de erro, recuperação após correção, remoção do resultado antigo e alternância da tabela SAC/Price. cleanup desmonta a interface entre testes para evitar que um cenário contamine o próximo.

## user-event — interação do usuário

userEvent.setup cria uma sessão de interação simulada. type preenche textos, selectOptions seleciona categorias, click aciona ações, tab percorre o foco e keyboard envia teclas como Enter.

Um teste percorre sexo, idade e salário e envia o formulário pelo teclado. Outro altera uma entrada depois do cálculo e confirma que o resultado anterior desaparece. São simulações no ambiente DOM, não testes de navegador real.

## jsdom — ambiente DOM em Node.js

A diretiva @vitest-environment jsdom fornece document, elementos, eventos e foco para testar React sem abrir navegador. Ela torna a suíte de interface rápida e reproduzível na CI.

jsdom não calcula layout visual como um navegador completo. Por isso, esses testes não comprovam responsividade, aparência, contraste, comportamento de leitor de tela ou compatibilidade entre navegadores. window.scrollTo usa um stub vi.fn porque jsdom não implementa rolagem visual.

## fireEvent, waitFor e vi.fn

- fireEvent dispara um evento específico, como submissão ou mudança, nos poucos cenários em que isso basta.
- waitFor aguarda uma condição assíncrona, como o foco chegar ao resumo de erro após atualização do React.
- vi.fn cria a função substituta de scrollTo. Não substituímos o cálculo financeiro por um mock: os testes executam as funções reais.

## TypeScript e Vite — verificações complementares

npm run typecheck executa tsc --noEmit para detectar incompatibilidades de tipos. Isso não testa o resultado matemático nem o comportamento de negócio.

npm run build verifica tipos e usa Vite para gerar os arquivos de produção. Um build aprovado comprova que o projeto compila, não que todas as funcionalidades estão corretas.

## GitHub Actions — automação e evidências

A CI executa instalação limpa, tipos, testes e build em Ubuntu com Node 24. actions/upload-artifact salva os relatórios e o build para download. GitHub Actions orquestra essas ferramentas; quem executa e verifica os cenários é o Vitest.

## Revisão no navegador real

A revisão complementar observou home e simuladores nas larguras 360 e 1280, executou cálculos e registrou capturas. Ela cobre o aspecto visual que jsdom não reproduz. Não foi usado Playwright Test como executor de uma suíte E2E versionada, nem foram usados Jest, Cypress, Selenium ou GoogleTest.

## Resultado e distribuição

| Grupo | Ferramentas principais | Quantidade |
|---|---|---:|
| Cálculos e regras | Vitest | 48 |
| Validação dos formulários | Vitest | 12 |
| Interação com React | Vitest, React Testing Library, user-event e jsdom | 10 |
| Total | Três arquivos de teste | 70 |

Não há configuração de cobertura percentual nesta entrega. Não foi executado um leitor de tela real nem realizada auditoria formal de acessibilidade.
