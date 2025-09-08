export class AmbienteDto {


  /**
   *
   */
  constructor() {
      this.id = 0;
      this.nome = "";
      this.branch = "";
      this.numeroChamado = "";
      this.descricao = "";
      this.devId =1;
      this.desenvolvedor = "";
      this.negocio = "";
      this.negId = 0;
      this.link = ""; 
      this.situacao = "";
      this.situacaoId = 0;  
      this.sistema = "";
      this.dependencia = "";
  }

    public id: number;
    public nome: string;
    public branch: string;
    public numeroChamado: string;
    public descricao: string;
    public devId : number;
    public desenvolvedor: string;
    public negId : number;
    public negocio : string;
    public link: string;
    public situacaoId : number;
    public situacao : string;
    public sistema : string;
    public sistemaId : number;
    public dependencia : string;      
  }