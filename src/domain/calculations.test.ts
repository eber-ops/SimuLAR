import { describe, expect, it } from 'vitest';
import { academic, compare, parseMoney } from './calculations';
describe('modelo acadêmico',()=>{
 it.each([['masculino',18,75],['masculino',35,75],['masculino',36,55],['masculino',45,55],['masculino',46,30],['masculino',55,30],['feminino',18,70],['feminino',30,70],['feminino',31,50],['feminino',40,50],['feminino',41,35],['feminino',50,35]])('fator de %s aos %i anos',(g,a,f)=>expect(academic(String(g),Number(a),500000)).toEqual({factor:f,total:500000*Number(f)}));
 it('não inventa fator ausente',()=>expect(()=>academic('feminino',51,500000)).toThrow('Não há fator'));
 it('rejeita idade fracionária',()=>expect(()=>academic('masculino',18.5,500000)).toThrow());
 it('aceita salário zero',()=>expect(academic('masculino',18,0).total).toBe(0));
});
describe('valores monetários',()=>{it('converte centavos sem truncamento',()=>expect(parseMoney('5000,50')).toBe(500050));it.each(['','1.000,00','10,001','NaN','-1'])('rejeita %s',s=>expect(()=>parseMoney(s)).toThrow());});
describe('SAC e Price',()=>{
 it('confere cálculo manual em dois meses',()=>{const r=compare(100000,0,2,12.682503013196978);expect(r.sac.rows.map(x=>x.payment)).toEqual([51000,50500]);expect(r.price.rows.map(x=>x.payment)).toEqual([50751,50751]);});
 it.each([0,10,100])('conserva principal e liquida saldo com taxa %i',rate=>{const r=compare(50000000,10000000,rate===100?12:360,rate);for(const s of [r.sac,r.price]){expect(s.rows.reduce((v,x)=>v+x.amortization,0)).toBe(r.principal);expect(s.rows.at(-1)?.balance).toBe(0);expect(s.total).toBe(r.principal+s.interest);expect(s.rows.every(x=>x.balance>=0 && Number.isInteger(x.payment))).toBe(true);}if(rate>0)expect(r.sac.interest).toBeLessThan(r.price.interest);});
 it('taxa zero não gera juros',()=>{const r=compare(100000,0,3,0);expect(r.sac.interest).toBe(0);expect(r.price.total).toBe(100000);});
 it('rejeita entrada igual ao imóvel',()=>expect(()=>compare(100000,100000,12,10)).toThrow());
 it('rejeita prazo fracionário',()=>expect(()=>compare(100000,0,12.5,10)).toThrow());
});

