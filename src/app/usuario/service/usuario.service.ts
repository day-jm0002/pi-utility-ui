import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable, of } from 'rxjs';
import { UsuarioPiDto } from '../../model/usuarioPiDto';
import { EditarUsuarioSignature, UsuarioSignature } from '../../model/signature/usuarioSignature';
import { TipoAutenticacaoDto } from '../../model/tipoAutenticacaoDto';
import { TipoUsuarioDto } from '../../model/tipoUsuarioDto';
import { TipoRoleDto } from '../../model/tipoRoleDto';
import { StatusUsuario } from '../../model/statusUsuario';

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
  
  urlApiPI : string = "http://sdaysp06d006/PortalInvestimentosApi/"
  ulrApi : string = "http://sdaysp06d005/LimparCacheApi/ObterUsuariosPI";

  urlLocal : string = "https://localhost:44345/ObterUsuariosPI";

  urlLocalTesteUSuario : string = "https://localhost:44345/ObterUsuariosPIPorCodigoDeCliente";

  urlLocalUsuario : string = "http://sdaysp06d005/LimparCacheApi/ObterUsuariosPIPorCodigoDeCliente"
  obterTipoAutenticacao : string = "http://sdaysp06d005/LimparCacheApi/ObterTipoAutenticacao"
  obterTipoUsuario: string = "http://sdaysp06d005/LimparCacheApi/ObterTipoUsuario"
  obterTipoRole: string = "http://sdaysp06d005/LimparCacheApi/api/AccessoControl/ObterListaRole"
  editarUsuario: string = "http://sdaysp06d005/LimparCacheApi/EditarUsuario"

  public ObterUsuarioListaPi():Observable<UsuarioPiDto[]>{
    return this.http.get<UsuarioPiDto[]>(this.ulrApi);
  }

  public ObterUsuarioPi(usuarioSignature:UsuarioSignature):Observable<UsuarioPiDto>{
    return this.http.post<UsuarioPiDto>(this.urlLocalUsuario,usuarioSignature,this.options);
  }

  public ObterTipoAutenticacao():Observable<TipoAutenticacaoDto[]>{
    return this.http.get<TipoAutenticacaoDto[]>(this.obterTipoAutenticacao)
  }

  public ObterTipoUsuario():Observable<TipoUsuarioDto[]>{
    return this.http.get<TipoUsuarioDto[]>(this.obterTipoUsuario)
  }

  public ObterTipoRole():Observable<TipoRoleDto[]>{
    return this.http.get<TipoRoleDto[]>(this.obterTipoRole);
  }

  public EditarUsuario(editarUsuarioSignature:EditarUsuarioSignature):Observable<any>{
    return this.http.post<any>(this.editarUsuario,editarUsuarioSignature,this.options);
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
