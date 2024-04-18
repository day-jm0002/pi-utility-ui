import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Parametros } from './parametros';
import { retry } from 'rxjs/operators';
import { ResponseDto, SerializedObject } from '../../model/responseDto';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http : HttpClient) { }

  urlApiPI : string = "http://sdaysp06d006/PortalInvestimentosApi/"
  ulrApi : string = "http://sdaysp06d005/LimparCacheApi/api/";

  url : string = "http://sdaysp06d006/PortalInvestimentosApi";

  stageOctopus: string =`${this.urlApiPI}/api/Health/Check`;
  stage1 : string = `${this.urlApiPI}Stage1/api/Health/Check`;
  stage2 : string = `${this.urlApiPI}Stage2/api/Health/Check`;
  stage3 : string = `${this.urlApiPI}Stage3/api/Health/Check`;

  public LimparAmbienteOctopus(parametros:Parametros):Observable<SerializedObject>{
    return this.http.post<SerializedObject>(`${this.url}/api/Sistema/LimparCacheAsync`,parametros);
  }  

  public LimparAmbiente(ambiente:number, parametros:Parametros):Observable<SerializedObject>{
    return this.http.post<SerializedObject>(`${this.url}/Stage${ambiente}/api/Sistema/LimparCacheAsync`,parametros);
  }  

  public AutenticarStageOctopus(): Observable<string>{    
    return this.http.get<string>(this.stageOctopus);    
  }

  public AutenticarStage1(): Observable<string>{    
    return this.http.get<string>(this.stage1);    
  }
  public AutenticarStage2(): Observable<string>{    
    return this.http.get<string>(this.stage2);    
  }
  public AutenticarStage3(): Observable<string>{    
    return this.http.get<string>(this.stage3);  
  }

}
