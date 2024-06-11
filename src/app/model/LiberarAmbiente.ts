export class LiberarAmbiente{

    constructor() {
        this.titulo = "";
            
    }
    titulo : string;
    ambiente : TipoAmbiente;
    stage : number;
}

export enum TipoAmbiente{
    dev = 0,
    qa = 1
}