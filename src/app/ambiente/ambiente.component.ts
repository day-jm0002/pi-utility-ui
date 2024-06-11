import { Component, OnDestroy, OnInit } from '@angular/core';
import { Desenvolvedor } from '../model/desenvolvedor';
import { AmbienteService } from './service/ambiente.service';
import { AmbienteDto } from '../model/ambientesDto';
import { Negocio } from '../model/negocio';
import { LoaderService } from '../dashboard/service/loader.service';
import { PacoteQa } from '../model/PacoteQaDto';
import { LimparCacheSignature } from '../model/signature/limparCacheSignature';
import { Situacao } from '../model/situacao';
import { InformacoesAmbienteService } from './service/informacoes-ambiente.service';
import { Subject, delay, interval, takeUntil } from 'rxjs';
declare var window : any;

@Component({
  selector: 'app-ambiente',
  templateUrl: './ambiente.component.html',
  styleUrls: ['./ambiente.component.scss']
})
export class AmbienteComponent implements OnInit  , OnDestroy{

  private unsubscribe$ = new Subject<void>();

  loaderDev : boolean = true;
  loaderQa : boolean = true;

  listaDev : AmbienteDto[];
  listaQa = new PacoteQa();

  ambiente : number;
  modalLimparCache:any;

  listAmbiente:AmbienteDto[]=[];
  informacoesAmbiente:AmbienteDto;

  listDesenvolvedores:Desenvolvedor[]=[];
  listSituacao:Situacao[]=[];
  listNegocio:Negocio[]=[];



  constructor(private ambienteService : AmbienteService ,              
              private comunicacaoExterna : InformacoesAmbienteService
  ) {    
    this.comunicacaoExterna.informacoesTodosAmbiente
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(x => {
      if(x){
        this.obterAmbientes();
        this.obterAmbienteQa();
      }
    })
  }

  ngOnInit() {
    this.obterAmbientes();
    this.obterAmbienteQa();

  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


  obterAmbientes(){
    this.ambienteService.ObterAmbientes()
    .subscribe(result => {      
      this.listaDev = result;  
      if(result){
        this.loaderDev = false;
      }
    });    
  }

  obterAmbienteQa(){
    this.ambienteService.ObterPacoteQa()
    .subscribe(result => {
      this.listaQa = result;
      if(result){
        this.loaderQa = false;
      }
    });    
  }
}

