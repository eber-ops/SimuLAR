export const money = (cents: number) => (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
export function parseMoney(raw: string): number {
  if (!/^\d+(?:[,.]\d{1,2})?$/.test(raw.trim())) throw new Error('Informe um valor sem separador de milhares e com até duas casas decimais.');
  const [whole, fraction = ''] = raw.trim().replace(',', '.').split('.');
  const cents = Number(whole) * 100 + Number(fraction.padEnd(2, '0'));
  if (!Number.isSafeInteger(cents)) throw new Error('Valor monetário muito alto.');
  return cents;
}
export function academic(gender: string, age: number, salary: number) {
  if (!['masculino', 'feminino'].includes(gender)) throw new Error('Selecione o sexo conforme a tabela do exercício.');
  if (!Number.isInteger(age) || age < 18 || age > 55) throw new Error('Informe uma idade inteira entre 18 e 55 anos.');
  if (!Number.isSafeInteger(salary) || salary < 0 || salary > 1_000_000) throw new Error('O salário deve estar entre R$ 0,00 e R$ 10.000,00.');
  if (gender === 'feminino' && age > 50) throw new Error('Não há fator definido para esta faixa etária.');
  const factor = gender === 'masculino' ? (age <= 35 ? 75 : age <= 45 ? 55 : 30) : (age <= 30 ? 70 : age <= 40 ? 50 : 35);
  return { factor, total: salary * factor };
}
export type Row = { month: number; interest: number; amortization: number; payment: number; balance: number };
export type Schedule = { name: 'SAC' | 'Price'; rows: Row[]; interest: number; total: number };
export function compare(property: number, entry: number, months: number, annual: number) {
  if (!Number.isSafeInteger(property) || property < 100 || property > 10_000_000_000) throw new Error('O imóvel deve custar de R$ 1,00 a R$ 100.000.000,00.');
  if (!Number.isSafeInteger(entry) || entry < 0 || entry >= property) throw new Error('A entrada deve ser menor que o imóvel e não pode ser negativa.');
  if (!Number.isInteger(months) || months < 1 || months > 600) throw new Error('O prazo deve ser inteiro, de 1 a 600 meses.');
  if (!Number.isFinite(annual) || annual < 0 || annual > 100) throw new Error('A taxa efetiva anual deve estar entre 0% e 100%.');
  const principal = property - entry;
  const rate = Math.expm1(Math.log1p(annual / 100) / 12);
  const base = Math.round(principal / months);
  const fixed = Math.round(rate === 0 ? principal / months : principal * rate / -Math.expm1(-months * Math.log1p(rate)));
  const build = (name: 'SAC' | 'Price'): Schedule => {
    let balance = principal;
    const rows: Row[] = [];
    for (let month = 1; month <= months; month++) {
      const interest = Math.round(balance * rate);
      const amortization = month === months ? balance : name === 'SAC' ? base : fixed - interest;
      if (amortization <= 0 || (month !== months && amortization >= balance)) throw new Error('O valor financiado é muito pequeno para este prazo. Aumente o valor ou reduza o prazo.');
      balance -= amortization;
      rows.push({ month, interest, amortization, payment: amortization + interest, balance });
    }
    return { name, rows, interest: rows.reduce((s, r) => s + r.interest, 0), total: rows.reduce((s, r) => s + r.payment, 0) };
  };
  return { principal, entry, rate, sac: build('SAC'), price: build('Price') };
}
