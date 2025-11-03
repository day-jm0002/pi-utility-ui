import { Component, OnInit } from '@angular/core';
import { DashboardService } from './service/dashboard.service';
import { Parametros } from './service/parametros';
import { delay } from 'rxjs/operators';
import { ResponseDto } from '../model/responseDto';
import { forkJoin } from 'rxjs';
import { CacheInfoResult } from '../model/response/cacheInfoResult';
import { CacheRendaFixaSignature, TipoCacheRendaFixa } from '../model/enum/tipoCacheRendaFixa';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private dashboardService : DashboardService
              ) { }


  apiCatalog : string = "";
  opcaoSelecionada: string = '';
  mensagem: string = "";
  showCard = false;
  private timeoutId?: any;

  ngOnInit() {   
  }

  limparCache(tipo: string)
  {
  const tipoNumero = Number(tipo);
  const tipoNome = TipoCacheRendaFixa[tipoNumero];

    
    var cacheSignature = new CacheRendaFixaSignature();
    cacheSignature.tipo = tipoNumero;
    this.apiCatalog = "consulta";
    this.mensagem = `Atualização em andamento - ${tipoNome}`
    this.showCard = true;

     this.dashboardService.LimparCacheCatalogoRendaFixa(cacheSignature).subscribe({
      next: () => {
        this.apiCatalog = "sucesso";
        this.mensagem = `Atualizado com Sucesso - ${tipoNome}`
         this.timeoutId = setTimeout(() => this.showCard = false, 5000);
      },
      error: (err) =>{
        this.apiCatalog = "erro";
        this.mensagem = `Não foi possível atualizar o cache - ${tipoNome}`
        this.timeoutId = setTimeout(() => this.showCard = false, 5000);
      } 
    });

  }
  
  spinner():boolean{
    if(true){
      return false;
    }else
    {
      return true;
    }
  }
}

