import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable, of } from 'rxjs';
import { UsuarioPiDto } from '../../model/usuarioPiDto';
import { EditarUsuarioSignature, UsuarioSignature } from '../../model/signature/usuarioSignature';
import { TipoAutenticacaoDto } from '../../model/tipoAutenticacaoDto';
import { TipoUsuarioDto } from '../../model/tipoUsuarioDto';
import { TipoRoleDto } from '../../model/tipoRoleDto';
import { StatusUsuario } from '../../model/statusUsuario';
import { UrlHelper } from '../../helper/UlrHelper';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  options = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  constructor(private http : HttpClient) { }
  

  public ObterUsuarioListaPi():Observable<UsuarioPiDto[]>{
    return this.http.get<UsuarioPiDto[]>(UrlHelper.Usuarios.ObterUsuariosPI);
  }

  public ObterUsuarioPi(usuarioSignature:UsuarioSignature):Observable<UsuarioPiDto>{
    return this.http.post<UsuarioPiDto>(UrlHelper.Usuarios.ObterUsuariosPIPorCodigoDeCliente,usuarioSignature,this.options);
  }

  public ObterTipoAutenticacao():Observable<TipoAutenticacaoDto[]>{
    return this.http.get<TipoAutenticacaoDto[]>(UrlHelper.Autenticacao.ObterTipoAutenticacao)
  }

  public ObterTipoUsuario():Observable<TipoUsuarioDto[]>{
    return this.http.get<TipoUsuarioDto[]>(UrlHelper.Autenticacao.ObterTipoUsuario)
  }

  public ObterTipoRole():Observable<TipoRoleDto[]>{
    return this.http.get<TipoRoleDto[]>(UrlHelper.AccessoControl.ObterListaRole);
  }

  public EditarUsuario(editarUsuarioSignature:EditarUsuarioSignature):Observable<any>{
    return this.http.post<any>(UrlHelper.Usuarios.EditarUsuario,editarUsuarioSignature,this.options);
  }

  public ObterTipoStatus():Observable<StatusUsuario[]>{
    var statusAtivo = new StatusUsuario();
    statusAtivo.CodStatus = 1;
    statusAtivo.Ativo = true;
    statusAtivo.Label = "Sim";

    var StatusDesativado = new StatusUsuario();
    StatusDesativado.CodStatus = 0;
    StatusDesativado.Ativo = false;
    StatusDesativado.Label = "Não";

    var listaStatus : StatusUsuario[]=[];
    listaStatus.push(statusAtivo);
    listaStatus.push(StatusDesativado);
    return of(listaStatus)
  }

}
