import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonitorService {

  constructor(private http : HttpClient) { }

  urlTeste : string = "https://localhost:44326/api/Monitor/StatusSisfinance"

  urlApiPI : string = "http://sdaysp06d006/PortalInvestimentosApi/"
  ulrApi : string = "http://sdaysp06d005/LimparCacheApi/api/";

  driveAMnet : string = `${this.ulrApi}Monitor/StatusDriveAMnet`;
  sinacor : string =  `${this.ulrApi}Monitor/StatusSinacor`;
  smartBrain : string = `${this.ulrApi}Monitor/StatusSmartBrain`;
  sisfinance : string = `${this.ulrApi}Monitor/StatusSmartBrain`;
  infotreasurey : string = "http://sdaysp06d005/LimparCacheApi/ObterStatusInfotreasury";


  public ObterStatusSisfinance():Observable<any>
  {
    return this.http.get<any>(this.sisfinance);
  }

  public ObterStatusDriveAMnet():Observable<any>
  {
    return this.http.get<any>(this.driveAMnet);
  }

  public ObterStatusSinacor():Observable<any>
  {
    return this.http.get<any>(this.sinacor);
  }

  public ObterStatusSmartBrain():Observable<any>
  {
    return this.http.get<any>(this.smartBrain);
  }

  public ObterStatusInfotreasury():Observable<any>
  {
    return this.http.get<any>(this.infotreasurey);
  }

}
