export enum AlertaDto{
    sucesso = "success",
    erro = "danger",
    info = "info",
    ligth = "light"
}

export class Alert{
    exibir : boolean
    tipo : AlertaDto
    mensagem : string
}