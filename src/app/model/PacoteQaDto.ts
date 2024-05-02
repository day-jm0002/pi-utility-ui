export class PacoteQa{

    constructor(){
        this.pacote = new Array<Pacote>();
    }
    releaseId : number;
    nome : string;
    requisicao:string;
    desenvolvedor:string;
    negocio:string;
    desenvolvedorId : number;
    negocioId : number;
    dataImplantacao : string;
    pacote: Array<Pacote>=[]
}

export class Pacote{
    constructor()
    {
        this.apagar = false;
    }
    releaseId!: number;
    branch!: string;
    negocioTesteId?: number;
    negocioTeste?:string;
    situacaoId?:number;
    situacao?:string;
    chamadoId!:number;
    apagar:boolean;
}