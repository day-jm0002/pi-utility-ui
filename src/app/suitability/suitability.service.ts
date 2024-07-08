import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SuitabilitySignature } from '../model/signature/suitabilitySignature';
import { Observable } from 'rxjs';
import { SuitabilityDto } from '../model/suitabilityDto';
import { UrlHelper } from '../helper/UlrHelper';

@Injectable({
  providedIn: 'root'
})
export class SuitabilityService {

  options = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  constructor(private http : HttpClient) { }

  public ObterPerfilSuitability(suitabilitySignature:SuitabilitySignature):Observable<SuitabilityDto>{
    return this.http.post<SuitabilityDto>(UrlHelper.LimparCache.ObterPerfilSuitability,suitabilitySignature,this.options);
  }
}
