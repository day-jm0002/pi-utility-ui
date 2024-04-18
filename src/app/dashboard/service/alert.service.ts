import { EventEmitter, Injectable } from '@angular/core';
import { Alert, AlertaDto } from '../../model/alertaDto';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  public appAlert: EventEmitter<Alert> = new EventEmitter();
  constructor() { }

  abrirAlertSucess(mensagem : string)  {
    var alert = new Alert();
    alert.exibir = true;
    alert.tipo = AlertaDto.sucesso;
    alert.mensagem = mensagem;
    this.appAlert.emit(alert);
  }

  abrirAlertError(mensagem : string)  {
    var alert = new Alert();
    alert.exibir = true;
    alert.tipo = AlertaDto.erro;
    alert.mensagem = mensagem;
    this.appAlert.emit(alert);
  }

  abrirAlertInfo(mensagem : string)
  {
    var alert = new Alert();
    alert.exibir = true;
    alert.tipo = AlertaDto.info;
    alert.mensagem = mensagem;
    this.appAlert.emit(alert);
  }

  abrirAlertLight(mensagem : string)
  {
    var alert = new Alert();
    alert.exibir = true;
    alert.tipo = AlertaDto.ligth;
    alert.mensagem = mensagem;
    this.appAlert.emit(alert);
  }


  fecharAlert() {
    var alert = new Alert();
    alert.exibir = false;
    this.appAlert.emit(alert);
  }
}
