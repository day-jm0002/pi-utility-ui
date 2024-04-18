import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SuitabilitySignature } from '../model/signature/suitabilitySignature';
import { Observable } from 'rxjs';
import { SuitabilityDto } from '../model/suitabilityDto';

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


  urlLocal : string = "http://sdaysp06d005/LimparCacheApi/ObterPerfilSuitability";


  public ObterPerfilSuitability(suitabilitySignature:SuitabilitySignature):Observable<SuitabilityDto>{
    return this.http.post<SuitabilityDto>(this.urlLocal,suitabilitySignature,this.options);
  }
}
