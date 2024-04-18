import { Component, OnInit } from '@angular/core';
import { DriveDto } from '../model/driveDto';
import { SinacorDto } from '../model/sinacorDto';
import { MonitorService } from './service/monitor.service';
import { SmartBrainDto } from '../model/smartBrainDto';
import { InfotreasuryDto } from '../model/infotreasuryDto';
import { SisfinanceDto } from '../model/sisfinanceDto';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss']
})
export class MonitorComponent implements OnInit {

  constructor(private monitorService:MonitorService) { }

  driveDto = new DriveDto();
  sinacorDto = new SinacorDto();
  smartBrainDto = new SmartBrainDto();
  infotreasureDto = new InfotreasuryDto();
  sisfinanceDto = new SisfinanceDto();

  status_drive : string = "consulta";
  status_sinacor : string = "consulta";
  status_smart_brain : string = "consulta";
  status_infotreasure : string = "consulta";
  status_sisfinance : string = "consulta";


  btn_drive : boolean;
  btn_sinacor : boolean;
  btn_smart_brain : boolean = true;
  btn_infotreasure : boolean;
  btn_sisfinance : boolean;

  ngOnInit() {
      this.ObterStatusDriverAMnet();
      this.ObterStatusSinacor();
      this.ObterStatusSmartBrain();
      this.obterStatusInfotreasure();
      this.obterStatusSisFinance();
  }

  iniciarlizarBotao(){
    this.btn_drive = false;
    this.btn_sinacor = false;
    this.btn_smart_brain = false;
  }

obterStatusSisFinance()
{
  this.monitorService.ObterStatusSisfinance().subscribe(x =>{
      this.sisfinanceDto = x    
      if(this.sisfinanceDto.login){
        this.status_sisfinance = "sucesso"        
      }else{
        this.status_sisfinance = "erro"
      }
      this.btn_sisfinance = true;
    }, error => {
      if(error.status == 404){
        if(error.error === null){
          this.status_sisfinance = "erro";
          this.sisfinanceDto.text = "Erro desconhecido";
        }else{
          this.sisfinanceDto.text = "Sem permissão para comunicação";
          this.status_sisfinance = "erro";
        }        
      }else{
        this.status_sisfinance = "erro";
        this.sisfinanceDto.text = "Não foi possível comunicar";
      }
    })
}


  obterStatusInfotreasure(){
    this.infotreasureDto = new InfotreasuryDto();
    this.monitorService.ObterStatusInfotreasury().subscribe(x => {
      this.infotreasureDto.DataGiro = "Data Giro = "+ x.dataGiro;     
      this.infotreasureDto.message = x.message
      this.status_infotreasure = "sucesso";
    }, error =>{
      if(error.status == 404){
        if(error.error === null){
          this.status_infotreasure = "erro";
          this.infotreasureDto.message = error.error.message;
        }else{
          this.infotreasureDto.message = error.error.message;
          this.status_infotreasure = "erro";
        }        
      }else{
        this.status_infotreasure = "erro";
        this.infotreasureDto.message = error.message;
      }
    })
  }

  ObterStatusDriverAMnet(){
   this.driveDto = new DriveDto();
   this.monitorService.ObterStatusDriveAMnet().subscribe(x => {  
    this.driveDto = x;
      if(this.driveDto.type == 1){
        this.status_drive = "sucesso";
      }else{
        this.status_drive = "erro";
      }
    },error => {
      if(error.status == 404){
        if(error.error === null){
          this.status_drive = "erro";
          this.driveDto.message = error.message;
        }else{
          this.driveDto.message = error.error.message;
          this.status_drive = "erro";
        }        
      }else{
        this.status_drive = "erro";
        this.driveDto.message = error.statusText;
      }

    })
  }

  ObterStatusSinacor(){
    this.sinacorDto = new SinacorDto();
    this.monitorService.ObterStatusSinacor().subscribe( x => {
      this.sinacorDto = x;
      if(this.sinacorDto.isAuthenticated === "Y"){
        this.status_sinacor = "sucesso"
      }else{
        this.status_sinacor = "erro"
      }
    }, error => {

      if(error.status == 404){
        if(error.error === null){
          this.status_sinacor = "erro";
          this.sinacorDto.text = error.message;
        }else{
          this.sinacorDto.text = error.error.text;
          this.status_sinacor = "erro";
        }        
      }else{
        this.status_sinacor = "erro";
        this.sinacorDto.text = error.statusText;
      }

    })
  }

  ObterStatusSmartBrain(){
    this.smartBrainDto = new SmartBrainDto();
    this.monitorService.ObterStatusSmartBrain().subscribe(x =>{
      this.smartBrainDto = x    
      if(this.smartBrainDto.login){
        this.status_smart_brain = "sucesso"        
      }else{
        this.status_smart_brain = "erro"
      }
      this.btn_smart_brain = true;
    }, error => {
      if(error.status == 404){
        if(error.error === null){
          this.status_smart_brain = "erro";
          this.smartBrainDto.text = "Erro desconhecido";
        }else{
          this.smartBrainDto.text = "Sem permissão para comunicação";
          this.status_smart_brain = "erro";
        }        
      }else{
        this.status_smart_brain = "erro";
        this.smartBrainDto.text = "Não foi possível comunicar";
      }
    })
  }


  obterDataAtual() : string
  {
    var data = new Date(); // Cria um objeto Date com a data atual
    var dia = data.getDate(); // Obtém o dia do mês (1-31)
    var mes = data.getMonth() + 1; // Obtém o mês (0-11) e adiciona 1 para ter valores de 1 a 12
    var ano = data.getFullYear(); // Obtém o ano com 4 dígitos

    var dataFormatada = dia + '/' + mes + '/' + ano;
    return dataFormatada
  }

  AtualizarStatusDrive(){
    this.ObterStatusDriverAMnet();
    this.status_drive = "consulta";
  }

  AtualizarStatusSinacor(){
    this.ObterStatusSinacor();
    this.status_sinacor = "consulta";
  }

  AtualizarStatusSmartBrasin(){
    this.ObterStatusSmartBrain();
    this.status_smart_brain = "consulta";
  }  

  AtualizarStatusInfotreasure(){
    this.obterStatusInfotreasure();
    this.status_infotreasure = "consulta";
  }

  AtualizarStatusSisfinance(){
    this.obterStatusSisFinance();
    this.status_sisfinance = "consulta";
  }

}
