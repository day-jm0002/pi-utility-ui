import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlHelper } from '../../helper/UlrHelper';

@Injectable({
  providedIn: 'root'
})
export class MonitorService {

  constructor(private http : HttpClient) { }

  urlApiPI : string = "http://sdaysp06d006/PortalInvestimentosApi/"
  ulrApi : string = "http://sdaysp06d005/LimparCacheApi/api/";

  driveAMnet : string = `${this.ulrApi}Monitor/StatusDriveAMnet`;
  sinacor : string =  `${this.ulrApi}Monitor/StatusSinacor`;
  smartBrain : string = `${this.ulrApi}Monitor/StatusSmartBrain`;
  sisfinance : string = `${this.ulrApi}Monitor/StatusSisfinance`;
  infotreasurey : string = "http://sdaysp06d005/LimparCacheApi/ObterStatusInfotreasury";


  public ObterStatusSisfinance():Observable<any>
  {
    return this.http.get<any>(UrlHelper.Monitoramento.Sisfinance);
  }

  public ObterStatusDriveAMnet():Observable<any>
  {
    return this.http.get<any>(UrlHelper.Monitoramento.DriveAMnet);
  }

  public ObterStatusSinacor():Observable<any>
  {
    return this.http.get<any>(UrlHelper.Monitoramento.Sinacor);
  }

  public ObterStatusSmartBrain():Observable<any>
  {
    return this.http.get<any>(UrlHelper.Monitoramento.SmartBrain);
  }

  public ObterStatusInfotreasury():Observable<any>
  {
    return this.http.get<any>(UrlHelper.Monitoramento.Infotreasury);
  }

  public ObterStatusIcatu():Observable<any>
  {
    return this.http.get<any>(UrlHelper.Monitoramento.Icatu)
  }

}
