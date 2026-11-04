// @vitest-environment jsdom
import React from 'react';
import { afterEach, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from './App';

window.scrollTo = vi.fn();
afterEach(() => {
  cleanup();
  location.hash = '';
});
function page(route: string) {
  location.hash = route;
  render(<App />);
}
it('home oferece acesso aos dois modos', () => {
  page('/');
  expect(screen.getByRole('heading', { level: 1 }).textContent).toContain('Seu próximo lar');
  expect(screen.getByRole('link', { name: /Simular meu financiamento/ }).getAttribute('href')).toBe(
    '#/simulador',
  );
  expect(screen.getByRole('link', { name: /Conhecer o exercício/ }).getAttribute('href')).toBe(
    '#/exercicio',
  );
});
it('calcula exercício e remove resultado antigo ao editar', async () => {
  page('/exercicio');
  const user = userEvent.setup();
  await user.selectOptions(screen.getByLabelText('Sexo conforme o exercício'), 'masculino');
  await user.type(screen.getByLabelText('Idade (anos completos)'), '18');
  await user.type(screen.getByLabelText('Salário (R$)'), '5000');
  await user.click(screen.getByRole('button', { name: /Calcular pelo fator/ }));
  expect(screen.getByRole('heading', { name: /375.000,00/ })).toBeTruthy();
  await user.type(screen.getByLabelText('Idade (anos completos)'), '0');
  expect(screen.queryByRole('heading', { name: /375.000,00/ })).toBeNull();
});
it('explica ausência de fator sem exibir financiamento', async () => {
  page('/exercicio');
  const user = userEvent.setup();
  await user.selectOptions(screen.getByLabelText('Sexo conforme o exercício'), 'feminino');
  await user.type(screen.getByLabelText('Idade (anos completos)'), '51');
  await user.type(screen.getByLabelText('Salário (R$)'), '5000');
  await user.click(screen.getByRole('button', { name: /Calcular pelo fator/ }));
  expect(screen.getByRole('alert').textContent).toContain('Não há fator');
  await waitFor(() => expect(document.activeElement).toBe(screen.getByRole('alert')));
});
it('não converte idade vazia em zero e permite corrigir', async () => {
  page('/exercicio');
  const user = userEvent.setup();
  await user.click(screen.getByRole('button', { name: /Calcular pelo fator/ }));
  expect(screen.getByRole('alert').textContent).toContain('Informe a idade');
  await user.selectOptions(screen.getByLabelText('Sexo conforme o exercício'), 'masculino');
  await user.type(screen.getByLabelText('Idade (anos completos)'), '18');
  await user.type(screen.getByLabelText('Salário (R$)'), '0');
  await user.click(screen.getByRole('button', { name: /Calcular pelo fator/ }));
  expect(screen.queryByRole('alert')).toBeNull();
  expect(screen.getByRole('heading', { name: /R\$\s*0,00/ })).toBeTruthy();
});
it('compara cenários, troca tabela e limpa ao alterar entrada', async () => {
  page('/simulador');
  const user = userEvent.setup();
  await user.click(screen.getByRole('button', { name: /Comparar financiamento/ }));
  expect(screen.getByRole('heading', { name: /400.000,00/ })).toBeTruthy();
  expect(screen.getByRole('region', { name: 'Cronograma sac' })).toBeTruthy();
  await user.click(screen.getByRole('button', { name: 'Price' }));
  expect(screen.getByRole('region', { name: 'Cronograma price' })).toBeTruthy();
  expect(screen.getByRole('img', { name: /Saldo devedor/ })).toBeTruthy();
  await user.type(screen.getByLabelText('Entrada (R$)'), '0');
  expect(screen.queryByRole('region', { name: 'Cronograma price' })).toBeNull();
});
it('recusa entrada igual ao imóvel', async () => {
  page('/simulador');
  fireEvent.change(screen.getByLabelText('Entrada (R$)'), { target: { value: '500000' } });
  fireEvent.submit(screen.getByRole('button', { name: /Comparar financiamento/ }).closest('form')!);
  expect(screen.getByRole('alert').textContent).toContain('entrada');
});
it('mostra página inexistente e mantém retorno', () => {
  page('/inexistente');
  expect(screen.getByRole('heading', { name: 'Página não encontrada' })).toBeTruthy();
  expect(screen.getByRole('link', { name: 'Voltar ao início' }).getAttribute('href')).toBe('#/');
});

it('associa mensagens ao campo inválido e limpa após correção', async () => {
  page('/exercicio');
  const user = userEvent.setup();
  await user.click(screen.getByRole('button', { name: /Calcular pelo fator/ }));
  const age = screen.getByLabelText('Idade (anos completos)');
  expect(age.getAttribute('aria-invalid')).toBe('true');
  expect(age.getAttribute('aria-describedby')).toContain('age-error');
  expect(document.getElementById('age-error')?.textContent).toContain('18 e 55');
  await user.type(age, '18');
  expect(age.getAttribute('aria-invalid')).toBe('false');
  expect(document.getElementById('age-error')).toBeNull();
});
it('permite preencher e enviar o exercício por teclado', async () => {
  page('/exercicio');
  const user = userEvent.setup();
  const gender = screen.getByLabelText('Sexo conforme o exercício');
  gender.focus();
  await user.selectOptions(gender, 'masculino');
  await user.tab();
  expect(document.activeElement).toBe(screen.getByLabelText('Idade (anos completos)'));
  await user.keyboard('18');
  await user.tab();
  await user.keyboard('5000');
  await user.tab();
  expect(document.activeElement).toBe(screen.getByRole('button', { name: /Calcular pelo fator/ }));
  await user.keyboard('{Enter}');
  expect(screen.getByRole('heading', { name: /375.000,00/ })).toBeTruthy();
});
it('salto de conteúdo preserva rota e move foco', async () => {
  page('/exercicio');
  await userEvent.click(screen.getByRole('link', { name: 'Pular para o conteúdo' }));
  expect(location.hash).toBe('#/exercicio');
  expect(document.activeElement?.id).toBe('content');
});
