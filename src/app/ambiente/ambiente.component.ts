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
import { Subject, takeUntil } from 'rxjs';
declare var window : any;

@Component({
  selector: 'app-ambiente',
  templateUrl: './ambiente.component.html',
  styleUrls: ['./ambiente.component.scss']
})
export class AmbienteComponent implements OnInit  , OnDestroy{

  private unsubscribe$ = new Subject<void>();

  listaDev : AmbienteDto[]=[];
  listaQa : PacoteQa;

  ambiente : number;
  modalLimparCache:any;

  listAmbiente:AmbienteDto[]=[];
  informacoesAmbiente:AmbienteDto;

  listDesenvolvedores:Desenvolvedor[]=[];
  listSituacao:Situacao[]=[];
  listNegocio:Negocio[]=[];

  NomeStage:string="";

  constructor(private ambienteService : AmbienteService , private loader : LoaderService, private comunicacaoExterna : InformacoesAmbienteService) {    

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

    this.modalLimparCache = new window.bootstrap.Modal(
      document.getElementById('myLimparCacheModal')
    )
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


  obterAmbientes(){
    this.ambienteService.ObterAmbientes().subscribe(result => {      
      this.listaDev = result;  
    });    
  }

  obterAmbienteQa(){
    this.ambienteService.ObterPacoteQa().subscribe(result => {
      this.listaQa = result;
    });    
  }





  FecharModal()
  {
   
  }


  cache : AmbienteDto;

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
    this.habilitarBotao = true;
    this.tempoStatus = 10000;

    var signature = new LimparCacheSignature();
    signature.Ambiente = this.cache.nome  == "qa" ? "qa" : "dev";
    signature.Stage = this.removerEspacosNoMeio(this.cache.nome);
    this.stageCache = signature.Stage;

    this.modalLimparCache.hide();

    this.exibirStatus = true;

    this.carteiraDeGerentes = "warning"; 
    this.fundosRelacao = "warning";
    this.listaDeProdutos = "warning";

    this.mensagemCarteiraDeGerentes = "Em andamento";
    this.mensagemFundosRelacao = "Em andamento";
    this.mensagemListaDeProdutos = "Em andamento";

    this.ambienteService.LimparCache(signature).subscribe(x => {
      if(x.carteiraDeGerente == 200)
      {
        this.carteiraDeGerentes = "success";
        this.mensagemCarteiraDeGerentes = "Realizado com sucesso";
      }else
      {
        this.carteiraDeGerentes = "danger";
        this.mensagemCarteiraDeGerentes = "Não foi possível realizar a limpeza de cache";
      }

      if(x.fundosRelacao == 200)
      {
        this.fundosRelacao = "success";
        this.mensagemFundosRelacao = "Realizado com sucesso";
      }
      else{
        this.fundosRelacao = "danger";
        this.mensagemFundosRelacao = "Não foi possível realizar a limpeza de cache";
      }

      if(x.listaDeProdutos == 200)
      {
        this.listaDeProdutos = "success";
        this.mensagemListaDeProdutos = "Realizado com sucesso";
      }      
      else{
        this.listaDeProdutos = "danger";
        this.mensagemListaDeProdutos = "Não foi possível realizar a limpeza de cache";
      }

      setTimeout(() => {
        this.exibirStatus = false;
        this.habilitarBotao = false;
      }, this.tempoStatus);
    },error => {

      this.carteiraDeGerentes = "danger";
      this.mensagemCarteiraDeGerentes = "Não foi possível realizar a limpeza de cache";

      this.fundosRelacao = "danger";
      this.mensagemFundosRelacao = "Não foi possível realizar a limpeza de cache";

      this.listaDeProdutos = "danger";
      this.mensagemListaDeProdutos = "Não foi possível realizar a limpeza de cache";

      setTimeout(() => {
        this.exibirStatus = false;
        this.habilitarBotao = false;
      }, this.tempoStatus);
    })

  }

  removerEspacosNoMeio(str: string): string {
    return str.replace(/\s/g, '');
  }

  LimparStage(ambiente:AmbienteDto)
  {
    this.cache = ambiente;   
    this.NomeStage = this.cache.nome;
    this.modalLimparCache.show();  
  }

  LimparStageQa()
  {
    this.cache = new AmbienteDto();
    this.cache.nome = "qa";
    this.NomeStage = "QA";
    this.modalLimparCache.show();
  }  
}
