import { Component, OnInit } from '@angular/core';
import { Alert } from '../../model/alertaDto';
import { AlertService } from '../../dashboard/service/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  alert = new Alert();
  
  constructor(private alertService : AlertService) { }

  ngOnInit() {
    this.alert.exibir = false;
    this.alertService.appAlert.subscribe(x =>{
      this.alert.exibir = x.exibir;
      this.alert.tipo = x.tipo;
      this.alert.mensagem = x.mensagem;

      setTimeout(() =>{
        this.alert.exibir = false;
      },2000)
    })
  }

}

export { AlertService };
