import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AmbienteDto } from '../../model/ambientesDto';
import { AmbienteChamadoSignature, AmbienteSignature, AmbienteSignatureQa } from '../../model/signature/ambienteSignature';
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

  localhost  = "https://localhost:5001"

  urlApiPI : string = `${this.localhost}/PortalInvestimentosApi/`
  ulrApi : string = this.localhost+"/api/Desenvolvedor/ObterTodosDev";
  urlDevNegocio = "https://localhost:44326/api/Negocios/ObterTodosNegocio";
  ulrApiAmbiente : string = "https://localhost:44326/api/Ambiente/ObterAmbientes";
  ulrApiPacoteQa: string = "https://localhost:44326/api/Ambiente/ObterPacoteQa";
  urlApiAmbienteAtualizar : string = "https://localhost:44326/api/Ambiente/AtualizarAmbientes";
  urlApiAmbienteAtualizarQa : string = "https://localhost:44326/api/Ambiente/AtualizarAmbientesQa";

  limparCacheUrlDev :string = "https://localhost:44326/LimparCacheStage";

  limparCacheUrl :string = "http://sdaysp06d005/LimparCacheApi/LimparCacheStage";

  urlProdDesenvolvedores = this.localhost+"/api/Desenvolvedor/ObterTodosDev";
  urlProdNegocio = this.localhost+"/api/Negocios/ObterTodosNegocio";
  urlProdObterAmbientes = this.localhost+"/api/Ambiente/ObterAmbientes";
  urlProdAtualizarAmbientes = this.localhost+"/api/Ambiente/AtualizarAmbientes"
  urlProdAtualizarAmbientesQa = this.localhost+"/api/Ambiente/AtualizarAmbientesQa"

  ulrApiPacoteProduto: string = this.localhost+"/api/Ambiente/ObterPacoteQa";

  ulrApiPacoteProdutoQa: string = this.localhost+"/api/Ambiente/ObterPacoteQa";
  urlApiAmbienteProdutoAtualizar : string = this.localhost+"/api/Ambiente/AtualizarAmbientesQa";

  urlTesteNovoAmbiente : string = this.localhost+"/api/Ambiente/AtualizarAmbientesQa"
  urlTesteNovoChamadoAmbiente : string = this.localhost+"/api/Ambiente/AtualizarChamadoAmbientesQa"


  obterFundosGestores = `${this.ulrApi}Fundos/ObterFundosGestores`;
  urlProdObterSituacao : string = this.localhost+"/ObterStatusSituacao";



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
    return this.http.get<PacoteQa>(this.ulrApiPacoteProdutoQa);
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

  public AtualizarChamadoAmbienteQa(signature : AmbienteChamadoSignature):Observable<any>
  {
    return this.http.post<any>(this.urlTesteNovoChamadoAmbiente,signature);
  }

}
