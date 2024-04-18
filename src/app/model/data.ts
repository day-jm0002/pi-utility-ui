export interface Root {
    data: Daum[]
  }
  
  export interface Daum {
    idGestor: number
    nome: string
    nomeCompleto: string
    cpfCNPJ: string
  }


  export class Gestor implements Daum{
      idGestor: number
      nome: string
      nomeCompleto: string
      cpfCNPJ: string

  }