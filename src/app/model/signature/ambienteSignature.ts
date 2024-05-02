import { Pacote } from "../PacoteQaDto";

export class AmbienteSignature {
    public id: number;
    public nome: string;
    public branch: string;
    public numeroChamado: string;
    public descricao: string;
    public devId : number;
    public negId : number;
    public sitId : number;
  }

  export class AmbienteSignatureQa {
    public id : number;
    public release : string;
    public requisicao : string;
    public branch: Array<Pacote>=[];
    public devId : number;
    public negId : number;
    public dataImplantacao : Date;

    public negTesteId : number;
    public situacaoId : number;
  }

  export class AmbienteChamadoSignature{

    public chamadoId : number;
    public negocioTesteId : number;
    public situacaoId: number;

  }