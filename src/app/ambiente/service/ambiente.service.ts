import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AmbienteDto } from '../../model/ambientesDto';
import { AmbienteSignature, AmbienteSignatureQa } from '../../model/signature/ambienteSignature';
import { PacoteQa } from '../../model/PacoteQaDto';
import { LimparCacheSignature } from '../../model/signature/limparCacheSignature';
import { LimparCacheResult } from '../../model/limparCacheResult';

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

  urlApiPI : string = "http://sdaysp06d006/PortalInvestimentosApi/"
  ulrApi : string = "https://localhost:44326/api/Desenvolvedor/ObterTodosDev";
  urlDevNegocio = "https://localhost:44326/api/Negocios/ObterTodosNegocio";
  ulrApiAmbiente : string = "https://localhost:44326/api/Ambiente/ObterAmbientes";
  ulrApiPacoteQa: string = "https://localhost:44326/api/Ambiente/ObterPacoteQa";
  urlApiAmbienteAtualizar : string = "https://localhost:44326/api/Ambiente/AtualizarAmbientes";
  urlApiAmbienteAtualizarQa : string = "https://localhost:44326/api/Ambiente/AtualizarAmbientesQa";

  limparCacheUrlDev :string = "https://localhost:44326/LimparCacheStage";

  limparCacheUrl :string = "http://sdaysp06d005/LimparCacheApi/LimparCacheStage";

  urlProdDesenvolvedores = "http://sdaysp06d005/LimparCacheApi/api/Desenvolvedor/ObterTodosDev";
  urlProdNegocio = "http://sdaysp06d005/LimparCacheApi/api/Negocios/ObterTodosNegocio";
  urlProdObterAmbientes = "http://sdaysp06d005/LimparCacheApi/api/Ambiente/ObterAmbientes";
  urlProdAtualizarAmbientes = "http://sdaysp06d005/LimparCacheApi/api/Ambiente/AtualizarAmbientes"
  urlProdAtualizarAmbientesQa = "http://sdaysp06d005/LimparCacheApi/api/Ambiente/AtualizarAmbientesQa"

  ulrApiPacoteProduto: string = "http://sdaysp06d005/LimparCacheApi/api/Ambiente/ObterPacoteQa";

  ulrApiPacoteProdutoQa: string = "http://sdaysp06d005/LimparCacheApi/api/Ambiente/ObterPacoteQa";
  urlApiAmbienteProdutoAtualizar : string = "http://sdaysp06d005/LimparCacheApi/api/Ambiente/AtualizarAmbientesQa";

  urlTesteNovoAmbiente : string = "https://localhost:44326/api/Ambiente/AtualizarAmbientesQa"

  obterFundosGestores = `${this.ulrApi}Fundos/ObterFundosGestores`;

  urlProdObterSituacao : string = "http://sdaysp06d005/LimparCacheApi/ObterStatusSituacao";



  public ObterDesenvolvedores():Observable<any[]>
  {
    return this.http.get<any[]>(this.urlProdDesenvolvedores);
  }

  public ObterNegocio():Observable<any[]>
  {
    return this.http.get<any[]>(this.urlProdNegocio);
  }

  public ObterStatusSituacao():Observable<any[]>
  {
    return this.http.get<any[]>(this.urlProdObterSituacao);
  }


  public ObterAmbientes():Observable<AmbienteDto[]>
  {
    return this.http.get<any[]>(this.urlProdObterAmbientes);
  }

  public ObterPacoteQa():Observable<PacoteQa>
  {
    return this.http.get<any>(this.ulrApiPacoteQa);
  }


  public AtualizarAmbiente(ambienteSignature: AmbienteSignature):Observable<any>
  {
    return this.http.post<any>(this.urlProdAtualizarAmbientes,ambienteSignature,this.options);
  }

  public AtualizarAmbienteQa(ambienteSignatureQa: AmbienteSignatureQa):Observable<any>
  {
    return this.http.post<any>(this.urlTesteNovoAmbiente,ambienteSignatureQa,this.options);
  }

  public LimparCache(signature: LimparCacheSignature):Observable<LimparCacheResult>
  {
    return this.http.post<any>(this.limparCacheUrl,signature);
  }

}
