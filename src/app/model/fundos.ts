export interface FundosRoot {
    data: Daum[]
  }
  
  export interface Daum {
    idFundo: number;
    idGestor: number;
    cnpj: string;
    tipoNome: string;
    inativo: string;
    calculado: string;
    integracao: string;
    valorCotaDecimals: string;
    quantidadeCotaDecimals: string;
    coberturaAutoCaixa: string;
    bCoEncerr: string;
    contaSELIC: string;
    contaCETIP: string;
    codCETIP: string;
    nome: string;
    nomeCompleto: string;
    isinCode: string;
  }

  export class Fundos implements Daum {
    idFundo: number;
    idGestor: number;
    cnpj: string;
    tipoNome: string;
    inativo: string;
    calculado: string;
    integracao: string;
    valorCotaDecimals: string;
    quantidadeCotaDecimals: string;
    coberturaAutoCaixa: string;
    bCoEncerr: string;
    contaSELIC: string;
    contaCETIP: string;
    codCETIP: string;
    nome: string;
    nomeCompleto: string;
    isinCode: string;
}