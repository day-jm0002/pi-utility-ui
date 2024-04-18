import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gestor } from '../../model/data';

@Injectable({
  providedIn: 'root'
})
export class GestorService {

  constructor(private http : HttpClient) { }
  
  urlApiPI : string = "http://sdaysp06d006/PortalInvestimentosApi/"
  ulrApi : string = "http://sdaysp06d005/LimparCacheApi/api/";

  obterGestores = `${this.ulrApi}Fundos/ObterGestores`;  

  public ObterGestoresApi():Observable<Gestor[]>{
    return this.http.get<Gestor[]>(this.obterGestores);
  }
}
