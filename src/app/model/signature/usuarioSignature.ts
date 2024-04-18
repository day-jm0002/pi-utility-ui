export class UsuarioSignature{
    CodUsuario : number;
}

export class EditarUsuarioSignature {
    CodUsuario : number;
    CodTipoUsuario : number;
    tipoUsuario: number;
    codTipoAutenticacao : number;
    tipoAutenticacao: number;
    codRole:number;
    role: string;
    CodExterno: string;
    Nome: string;
    Cpf: string;
    login: string;
    CodAtivo : number;
    Ativo: boolean;
}