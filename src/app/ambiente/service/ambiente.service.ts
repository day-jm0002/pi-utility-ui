import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AmbienteDto } from '../../model/ambientesDto';
import { AmbienteChamadoSignature, AmbienteSignature, AmbienteSignatureQa } from '../../model/signature/ambienteSignature';
import { PacoteQa } from '../../model/PacoteQaDto';
import { LimparCacheSignature } from '../../model/signature/limparCacheSignature';
import { LimparCacheResult } from '../../model/limparCacheResult';
import { UrlHelper } from '../../helper/UlrHelper';

@Injectable({
  providedIn: 'root'
})
export class AmbienteService {

  options = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  
  constructor(private http : HttpClient) { }

  public ObterDesenvolvedores():Observable<any[]>
  {
    return this.http.get<any[]>(UrlHelper.Desenvolvedor.ObterTodosDev);
  }

  public ObterNegocio():Observable<any[]>
  {
    return this.http.get<any[]>(UrlHelper.Negocio.ObterTodosNegocio);
  }

  public ObterStatusSituacao():Observable<any[]>
  {
    return this.http.get<any[]>(UrlHelper.Situacao.ObterStatusSituacao);
  }


  public ObterAmbientes():Observable<AmbienteDto[]>
  {
    return this.http.get<any[]>(UrlHelper.Ambiente.ObterAmbientes);
  }

  public ObterPacoteQa():Observable<PacoteQa>
  {
    return this.http.get<PacoteQa>(UrlHelper.Ambiente.ObterPacoteQa);
  }


  public AtualizarAmbiente(ambienteSignature: AmbienteSignature):Observable<any>
  {
    return this.http.post<any>(UrlHelper.Ambiente.AtualizarAmbientes,ambienteSignature,this.options);
  }

  public AtualizarAmbienteQa(ambienteSignatureQa: AmbienteSignatureQa):Observable<any>
  {
    return this.http.post<any>(UrlHelper.Ambiente.AtualizarAmbientesQa,ambienteSignatureQa,this.options);
  }

  public LimparCache(signature: LimparCacheSignature):Observable<LimparCacheResult>
  {
    return this.http.post<any>(UrlHelper.LimparCache.LimparCache,signature);
  }

  public AtualizarChamadoAmbienteQa(signature : AmbienteChamadoSignature):Observable<any>
  {
    return this.http.post<any>(UrlHelper.Ambiente.AtualizarChamadoAmbientesQa,signature);
  }

  public LiberarChamadoAmbientesQa():Observable<any>
  {
    return this.http.post<any>(UrlHelper.Ambiente.LiberarChamadoAmbientesQa,'');
  }


}
