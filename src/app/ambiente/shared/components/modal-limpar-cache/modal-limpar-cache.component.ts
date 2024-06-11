import { Component, OnDestroy, OnInit } from '@angular/core';
import { AmbienteDto } from '../../../../model/ambientesDto';
import { LimparCacheSignature } from '../../../../model/signature/limparCacheSignature';
import { AmbienteService } from '../../../service/ambiente.service';
import { InformacoesAmbienteService } from '../../../service/informacoes-ambiente.service';
import { Subject, takeUntil } from 'rxjs';
import { LimparCache } from '../../../../model/signature/LimparCache';
declare var window : any;


@Component({
  selector: 'app-modal-limpar-cache',
  templateUrl: './modal-limpar-cache.component.html',
  styleUrl: './modal-limpar-cache.component.scss'
})
export class ModalLimparCacheComponent implements OnInit , OnDestroy{

  private unsubscribe$ = new Subject<void>();
  cache : string = "";

  modalLimparCache:any;

  constructor(private comunicacaoExterna : InformacoesAmbienteService) {
    this.comunicacaoExterna.modalLimparCache
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(x => {
      if(x.Modal){
        this.NomeStage = x.Stage
        this.cache = x.Ambiente
        this.modalLimparCache.show();  
      }
      else{
        this.modalLimparCache.hide();
      }
    })
  }

  ngOnInit(): void {
    this.modalLimparCache = new window.bootstrap.Modal(
      document.getElementById('myLimparCacheModal')
    )
  }


  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


  FecharModal()
  {
   
  }

  NomeStage:string="";

  carteiraDeGerentes : string = "secondary";
  mensagemCarteiraDeGerentes : string;

  fundosRelacao : string = "secondary";
  mensagemFundosRelacao: string;
  
  listaDeProdutos : string = "secondary";
  mensagemListaDeProdutos : string;

  exibirStatus = false;
  stageCache : string ="";
  tempoStatus: number;
  habilitarBotao = false;

  Confirmar()
  {
    let limparCache = new LimparCache();
    limparCache.Stage = this.NomeStage;
    limparCache.Ambiente = "dev";
    this.comunicacaoExterna.limparCache.emit(limparCache);
  }

  removerEspacosNoMeio(str: string): string {
    return str.replace(/\s/g, '');
  }
}
