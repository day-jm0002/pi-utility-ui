export class SSOsignature {

    constructor(){
        this.email = new Email();
        this.documento = new Documento();
    }

    nome: string
    email: Email
    documento: Documento
    login: string
    codTipoUsuario: number
    serialToken: string
    cpfCnpjCliente: string
  }
  
  export class Email {
    endereco: string
  }
  
  export class Documento {
    numero: string
  }