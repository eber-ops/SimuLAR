import { parseMoney } from './calculations';
export type Values = { property: string; entry: string; months: string; annual: string; gender: string; age: string; salary: string };
export function validateForm(v: Values, finance: boolean): Record<string,string> {
  const errors: Record<string,string> = {};
  const monetary = (field: 'property'|'entry'|'salary', max: number, min=0) => {
    try {const n=parseMoney(v[field]);if(n<min || n>max) errors[field]=field==='salary'?'O salário deve estar entre R$ 0,00 e R$ 10.000,00.':'Valor fora do limite permitido.';return n;}
    catch {errors[field]='Informe um valor sem milhares e com até duas casas decimais.';return NaN;}
  };
  const numeric = (field:'age'|'months'|'annual', min:number,max:number,integer:boolean) => {
    const text=v[field].trim();const n=Number(text.replace(',','.'));
    if(!/^\d+(?:[,.]\d+)?$/.test(text)||!Number.isFinite(n)||n<min||n>max||(integer&&!Number.isInteger(n))) errors[field]=field==='age'?'Informe a idade inteira entre 18 e 55 anos.':field==='months'?'Informe um prazo inteiro de 1 a 600 meses.':'Informe uma taxa de 0% a 100%.';
    return n;
  };
  if(finance){const property=monetary('property',10_000_000_000,100);const entry=monetary('entry',10_000_000_000);if(Number.isFinite(property)&&Number.isFinite(entry)&&entry>=property) errors.entry='A entrada deve ser menor que o valor do imóvel.';numeric('months',1,600,true);numeric('annual',0,100,false);}
  else {if(!['masculino','feminino'].includes(v.gender))errors.gender='Selecione o sexo conforme a tabela do exercício.';const age=numeric('age',18,55,true);monetary('salary',1_000_000);if(!errors.age&&v.gender==='feminino'&&age>50)errors.age='Não há fator definido para esta faixa etária.';}
  return errors;
}
