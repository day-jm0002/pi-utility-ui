import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlHelper } from '../../helper/ulrHelper';
import { CacheRendaFixaSignature, TipoCacheRendaFixa } from '../../model/enum/tipoCacheRendaFixa';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http : HttpClient) { }

  public LimparCacheCatalogoRendaFixa(signature : CacheRendaFixaSignature):Observable<any>{
    return this.http.post<CacheRendaFixaSignature>(`${UrlHelper.Monitoramento.ObterCacheInfo}`,signature);
  }  

}
