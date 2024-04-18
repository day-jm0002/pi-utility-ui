import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {SsoDto} from '../../model/ssoDto';
import {TokenDto} from '../../model/tokenDto'; 
import { SSOsignature } from '../model/SsoSignature';
import { SerializedObject } from '../../model/responseDto';
import { PosicaoSsoSignature } from '../model/posicaoSSoSignature';

@Injectable({
  providedIn: 'root'
})
export class LoginSSOService {

 url :string = "http://sdaysp06d006/PortalInvestimentosApi/api/AcessoExternoUsuario/SalvarAsync"
 urlToken:string = "http://sdaysp06d005/LimparCacheApi/api/AccessoControl/ObterLoginToken"
 urlSSo : string = "http://sdaysp06d005/LimparCacheApi/api/AccessoControl/AutenticacaoSSO";

 urlTokenLocal:string = "https://localhost:44326/api/AccessoControl/AutenticacaoSSO"

  constructor(private httpClient : HttpClient) { }

  public obterTicketSSO():Observable<SsoDto>{
    return this.httpClient.get<SsoDto>(this.urlSSo);
  }

  public obterTicketPorCodigoClienteSSO(posicaoSSoSignature:PosicaoSsoSignature):Observable<SsoDto>
  {
    return this.httpClient.post<SsoDto>(this.urlSSo,posicaoSSoSignature);
  }

  public integracaoSSO(ssoSignature : SSOsignature):Observable<SerializedObject>{
    return this.httpClient.post<SerializedObject>(this.url,ssoSignature)
  }

  public obterToken():Observable<TokenDto[]>{
    return this.httpClient.get<TokenDto[]>(this.urlToken);
  }

}
