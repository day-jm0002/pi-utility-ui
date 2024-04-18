import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GerenteDto } from '../../model/gerenteDto';
import { GerenteSignature } from '../../model/signature/gerenteSignature';

@Injectable({
  providedIn: 'root'
})
export class GerenteService {

  constructor(private http : HttpClient) { }

  urlLocal : string = "http://sdaysp06d005/LimparCacheApi/api/InfoBanc/ObterGerentes";
  urlLocalGerente : string = "http://sdaysp06d005/LimparCacheApi/api/InfoBanc/ObterGerentePorCodExterno"

  public ObterListaGerente():Observable<GerenteDto[]>{
    return this.http.get<GerenteDto[]>(this.urlLocal);
  }

  public ObterGerentePorCodigo(signature : GerenteSignature):Observable<GerenteDto>
  {
    return this.http.post<GerenteDto>(this.urlLocalGerente,signature);
  }
}
