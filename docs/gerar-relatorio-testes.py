"""Gera relatório legível a partir do JSON real do Vitest, sem executar a aplicação."""
import json
import shutil
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo

root = Path(__file__).resolve().parents[1]
report = json.loads((root / 'reports/tests.json').read_text(encoding='utf-8'))
tests = [t for suite in report['testResults'] for t in suite['assertionResults']]
by_name = {t['fullName']: t for t in tests}
date = datetime.fromtimestamp(report['startTime']/1000, ZoneInfo('America/Sao_Paulo'))
cases = [
 ('TC01','RF03, RF05, RF07','modelo acadêmico fator de masculino aos 18 anos','Masculino; 18 anos; salário R$ 5.000,00.','Fator 75 e financiamento R$ 375.000,00.','Compara o objeto retornado com fator 75 e total de 37.500.000 centavos.'),
 ('TC02','RF03, RF05','modelo acadêmico fator de masculino aos 36 anos','Masculino; 36 anos; salário R$ 5.000,00.','Fator 55 e financiamento R$ 275.000,00.','Confere a primeira idade da segunda faixa masculina.'),
 ('TC03','RF03, RF05','modelo acadêmico fator de feminino aos 31 anos','Feminino; 31 anos; salário R$ 5.000,00.','Fator 50 e financiamento R$ 250.000,00.','Confere a transição da primeira para a segunda faixa feminina.'),
 ('TC04','RF06','modelo acadêmico não inventa fator ausente','Feminino; 51 anos; salário R$ 5.000,00.','Rejeitar cálculo com mensagem contendo “Não há fator”.','Verifica a exceção esperada. O resultado aprovado significa que a ausência de fator foi tratada.'),
 ('TC05','RF03','SAC e Price rejeita idade 17','Função acadêmica: masculino; 17 anos; salário zero.','Rejeitar idade abaixo do mínimo.','Verifica que a chamada lança erro. O teste fica sob o grupo SAC e Price no código, mas testa a função acadêmica.'),
 ('TC06','RF04, RF07','modelo acadêmico aceita salário zero','Masculino; 18 anos; salário R$ 0,00.','Financiamento zero.','Compara o total retornado com zero, preservando zero como entrada válida.'),
 ('TC07','RF04','valores monetários converte centavos sem truncamento','Texto salarial “5000,50”.','Conversão para 500.050 centavos.','Confere exatamente o inteiro retornado pelo parser.'),
 ('TC08','RF04','valores monetários rejeita 10,001','Texto monetário “10,001”, com três casas decimais.','Rejeitar a precisão excedente.','Verifica que o parser lança erro em vez de arredondar silenciosamente.'),
 ('TC09','RF14, RF18','SAC e Price confere cálculo manual em dois meses','Principal R$ 1.000,00; entrada zero; 2 meses; taxa anual efetiva 12,682503013196978%, equivalente a 1% ao mês.','SAC: R$ 510,00 e R$ 505,00. Price: R$ 507,51 e R$ 507,51.','Compara as duas listas de prestações em centavos com valores de referência.'),
 ('TC10','RF14, RF18','SAC e Price taxa zero não gera juros','Principal R$ 1.000,00; entrada zero; 3 meses; taxa zero.','Juros totais SAC iguais a zero e total Price igual a R$ 1.000,00.','Confere essas duas asserções. Não afirma que este teste isolado verifica cada coluna dos dois cronogramas.'),
 ('TC11','RF18','SAC e Price conserva principal e liquida saldo com taxa 10','Imóvel R$ 500.000,00; entrada R$ 100.000,00; 360 meses; taxa anual efetiva 10%.','Em ambos: amortização soma R$ 400.000,00, saldo final zero e total = principal + juros. SAC tem menos juros que Price.','Verifica também saldos não negativos e prestações em centavos inteiros.'),
 ('TC12','RF13','SAC e Price rejeita entrada igual ao imóvel','Imóvel R$ 1.000,00 e entrada R$ 1.000,00; 12 meses; taxa 10%.','Rejeitar financiamento sem principal positivo.','Verifica a exceção esperada na função compare.'),
 ('TC13','RF13','SAC e Price rejeita prazo fracionário','Principal R$ 1.000,00; prazo 12,5 meses; taxa 10%.','Rejeitar prazo não inteiro.','Verifica erro na função de cálculo.'),
 ('TC14','RF02, RF03, RF04','valida todos os campos de uma vez','Formulário financeiro com imóvel, entrada, prazo e taxa vazios.','Retornar erros associados aos quatro campos.','Compara as chaves dos erros com property, entry, months e annual.'),
 ('TC15','RF08, RF10','calcula exercício e remove resultado antigo ao editar','Preencher masculino, 18 e 5000; calcular; acrescentar “0” na idade, transformando-a em 180.','Exibir R$ 375.000,00 inicialmente e remover esse resultado assim que a idade mudar.','React Testing Library consulta o título de resultado antes e depois da interação.'),
 ('TC16','RF06, RQ03','explica ausência de fator sem exibir financiamento','Na interface: feminino, idade 51, salário 5000; acionar cálculo.','Exibir alerta contendo “Não há fator” e mover foco para ele.','Verifica texto do alerta e aguarda o foco com waitFor. O nome do teste menciona ausência de financiamento, mas a asserção explícita cobre alerta e foco.'),
 ('TC17','RF09, RQ03','associa mensagens ao campo inválido e limpa após correção','Submeter formulário acadêmico vazio; depois preencher idade 18.','Idade marcada aria-invalid=true e vinculada a age-error; após correção, atributo false e mensagem removida.','Confere atributos acessíveis e existência da mensagem no DOM.'),
 ('TC18','RF01, RF07, RQ03','permite preencher e enviar o exercício por teclado','Selecionar masculino; percorrer com Tab; digitar 18 e 5000; enviar com Enter.','Foco segue idade, salário e botão; resultado R$ 375.000,00 aparece.','user-event simula Tab/Enter e o teste consulta o elemento ativo e o título de resultado.'),
 ('TC19','RF14, RF16, RF10','compara cenários, troca tabela e limpa ao alterar entrada','Comparar valores iniciais: 500000, 100000, 360, 10; selecionar Price; editar entrada.','Principal R$ 400.000,00; tabela SAC inicial; troca para Price; gráfico acessível; tabela anterior some após edição.','Verifica regiões nomeadas, título do principal e descrição do gráfico. Não compara todos os totais financeiros neste teste.'),
 ('TC20','RQ03','salto de conteúdo preserva rota e move foco','Na página acadêmica, acionar “Pular para o conteúdo”.','Manter #/exercicio e focar o elemento content.','Verifica location.hash e document.activeElement.id.'),
]
lines = [
 '# SimuLAR — Relatório detalhado de testes',
 '', f'Execução local: **{date:%d/%m/%Y às %H:%M:%S}**, horário de São Paulo.',
 '', '## 1. Resultado geral', '',
 '| Indicador | Resultado |','|---|---:|',
 f"| Testes executados | {report['numTotalTests']} |",f"| Aprovados | {report['numPassedTests']} |",f"| Falhas | {report['numFailedTests']} |",f"| Pendentes | {report.get('numPendingTests',0)} |",
 '', 'Aprovação significa que as asserções daquele caso foram satisfeitas. Em um caso inválido, a aprovação confirma a rejeição correta. Não significa que todos os dados de entrada foram aceitos.',
 '', '## 2. Ambiente, ferramentas e método', '',
 'Execução local em Windows com Node.js 24 e Vitest 5.0.5. Vitest executa cenários e asserções; React Testing Library monta a interface e consulta rótulos/papéis; user-event simula interações; jsdom fornece o DOM sem renderização visual real. Detalhes em [ferramentas de testes](ferramentas-testes.md).',
 '', 'Estratégias: valores de fronteira das faixas, partições válidas e inválidas, combinações de decisão, robustez numérica, referências manuais, invariantes financeiros e interação de usuário.',
 '', 'Comando usado:', '', '```sh', 'npm test -- --reporter=default --reporter=junit --reporter=json --outputFile.junit=reports/junit.xml --outputFile.json=reports/tests.json', '```',
 '', '## 3. Distribuição por arquivo', '', '| Arquivo | Casos | Resultado |','|---|---:|---|'
]
for suite in report['testResults']:
    name=Path(suite['name']).name
    lines.append(f"| {name} | {len(suite['assertionResults'])} | {suite['status']} |")
lines += ['', '## 4. Casos selecionados com entradas e critérios', '', 'Os valores a seguir vêm das entradas e expectativas do código-fonte. O Vitest registra o status, mas não serializa o valor retornado em cada asserção aprovada. Portanto, “resultado verificado” descreve a expectativa satisfeita, não um log bruto do retorno da função.']
for cid,req,name,inputs,expected,verification in cases:
    test=by_name[name]
    status='APROVADO' if test['status']=='passed' else test['status'].upper()
    lines += ['',f'### {cid} — {name}', '',f'- **Requisitos:** {req}.',f'- **Entrada ou procedimento:** {inputs}',f'- **Resultado esperado:** {expected}',f'- **Verificação realizada:** {verification}',f'- **Status real:** **{status}**.',f"- **Duração do caso:** {test.get('duration',0):.2f} ms."]
lines += ['', '## 5. Exemplo de referência financeira', '',
 'Para R$ 1.000 em dois meses a 1% mensal, no SAC a amortização é R$ 500 por mês. O primeiro juro é R$ 10 e o segundo R$ 5, gerando prestações de R$ 510 e R$ 505. Na Price, a fórmula produz aproximadamente R$ 507,5124, arredondada para R$ 507,51; a segunda parcela também resulta em R$ 507,51 após o cálculo em centavos. O TC09 compara explicitamente essas listas.',
 '', '## 6. Inventário completo da execução', '', 'Cada linha abaixo foi extraída do JSON desta execução. Nomes que terminam em “rejeita” ou “inválida” sem valor representam parâmetros de texto vazio. Alguns testes acadêmicos estão agrupados sob “SAC e Price” no arquivo original; o grupo não altera a função realmente testada.', '', '| Nº | Arquivo | Caso registrado pelo Vitest | Status | Duração (ms) |', '|---:|---|---|---|---:|']
n=0
for suite in report['testResults']:
    for test in suite['assertionResults']:
        n+=1
        name=test['fullName'].replace('|','\\|')
        lines.append(f"| {n} | {Path(suite['name']).name} | {name} | {'APROVADO' if test['status']=='passed' else test['status']} | {test.get('duration',0):.2f} |")
lines += ['', '## 7. Evidências e reprodução', '',
 '- [Snapshot JSON desta execução](evidencias/vitest-detalhado.json).',
 '- [Snapshot JUnit/XML desta execução](evidencias/vitest-detalhado.xml).',
 '- Fontes: src/domain/calculations.test.ts, src/domain/formValidation.test.ts e src/App.test.tsx.',
 '- [Revisão visual anterior de celular/desktop](testes-etapa-5.md). As imagens são evidências de outra verificação e não foram produzidas pelo Vitest.',
 '- [CI da versão candidata](https://github.com/eber-ops/SimuLAR/actions/runs/41460353407). Essa execução remota é distinta da execução local documentada aqui.',
 '', '## 8. Limites e conclusão', '',
 'Não foram medidos cobertura percentual, desempenho, carga, segurança ou compatibilidade entre navegadores nesta execução. jsdom não comprova layout ou comportamento com leitor de tela. Uma chamada inválida que usa toThrow pode apenas confirmar que houve erro; a mensagem exata só está garantida quando o teste a compara explicitamente.',
 '', f"Resultado desta execução: {report['numPassedTests']} de {report['numTotalTests']} testes aprovados, {report['numFailedTests']} falhas. Os exemplos e o inventário acima permitem verificar quais comportamentos foram efetivamente cobertos."
]
(root/'docs/evidencias').mkdir(exist_ok=True)
shutil.copyfile(root/'reports/tests.json', root/'docs/evidencias/vitest-detalhado.json')
shutil.copyfile(root/'reports/junit.xml', root/'docs/evidencias/vitest-detalhado.xml')
(root/'docs/relatorio-testes-detalhado.md').write_text('\n'.join(lines)+'\n',encoding='utf-8')
print(f'Relatório criado: {len(cases)} casos detalhados; {n} resultados reais no inventário.')
