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

 url :string = "http://wdaymtspr04737:8070/api/AcessoExternoUsuario/SalvarAsync"
 urlToken:string = "http://wdaymtspr04737:8070/api/AccessoControl/ObterLoginToken"
 urlSSo : string = "http://wdaymtspr04737:8070/api/AccessoControl/AutenticacaoSSO";

 urlTokenLocal:string = "http://wdaymtspr04737:8070/api/AccessoControl/AutenticacaoSSO"

  constructor(private httpClient : HttpClient) { }

  public obterTicketSSO():Observable<SsoDto>{
    return this.httpClient.get<SsoDto>(this.urlSSo);
  }

  public obterTicketPorCodigoClienteSSO(posicaoSSoSignature:PosicaoSsoSignature):Observable<SsoDto>
  {
    return this.httpClient.post<SsoDto>(this.urlTokenLocal,posicaoSSoSignature);
  }

  public integracaoSSO(ssoSignature : SSOsignature):Observable<SerializedObject>{
    return this.httpClient.post<SerializedObject>(this.url,ssoSignature)
  }

  public obterToken():Observable<TokenDto[]>{
    return this.httpClient.get<TokenDto[]>(this.urlToken);
  }

}
