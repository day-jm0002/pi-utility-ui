import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fundos } from '../../model/fundos';

@Injectable({
  providedIn: 'root'
})
export class FundosService {

  constructor(private http : HttpClient) { }

  urlApiPI : string = "http://sdaysp06d006/PortalInvestimentosApi/"
  ulrApi : string = "http://sdaysp06d005/LimparCacheApi/api/";

  obterFundosGestores = `${this.ulrApi}Fundos/ObterFundosGestores`;

  public ObterFundosPorGestorApi():Observable<Fundos[]>
  {
    return this.http.get<Fundos[]>(this.obterFundosGestores);
  }
}
