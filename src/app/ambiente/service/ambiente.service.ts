import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AmbienteDto } from '../../model/ambientesDto';
import { AmbienteChamadoSignature, AmbienteSignature, AmbienteSignatureQa, ExcluirAmbienteSignature } from '../../model/signature/ambienteSignature';
import { PacoteQa } from '../../model/PacoteQaDto';
import { LimparCacheSignature } from '../../model/signature/limparCacheSignature';
import { LimparCacheResult } from '../../model/limparCacheResult';
import { UrlHelper } from '../../helper/UlrHelper';
import { SistemaSignature } from '../../model/signature/sistemaSignature';

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

  public ObterSistemas():Observable<any[]>
  {
    return this.http.get<any[]>(UrlHelper.Sistemas.ObterTodosSistemas);
  }

  public ObterAmbientes():Observable<AmbienteDto[]>
  {
    return this.http.get<any[]>(`${UrlHelper.Ambiente.ObterAmbientes}`)
     .pipe(
        catchError((error) => {
          debugger;
          console.error('Erro ao buscar ambientes:', error);
          return throwError(() => error); // repassa o erro para o componente
        })
      );
    ;
  }

  public ObterPacoteQa():Observable<PacoteQa>
  {
    return this.http.get<PacoteQa>(`${UrlHelper.Ambiente.ObterPacoteQa}`);
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
    return this.http.post<any>(UrlHelper.Ambiente.AtualizarChamadoAmbientesQa,signature,this.options);
  }

  public LiberarChamadoAmbientesQa(ambienteSignatureQa : AmbienteSignatureQa):Observable<any>
  {
    return this.http.post<any>(UrlHelper.Ambiente.LiberarChamadoAmbientesQa,ambienteSignatureQa);
  }

  public AdicionarAmbiente(): Observable<any>{
    return this.http.post<any>(UrlHelper.Ambiente.AdicionarAmbiente,{})
  }

    public ExcluirAmbiente(signature : ExcluirAmbienteSignature): Observable<any>{
    return this.http.post<any>(UrlHelper.Ambiente.ExcluirAmbiente,signature);
  }

}
