import { Component, OnInit } from '@angular/core';
import { DashboardService } from './service/dashboard.service';
import { Parametros } from './service/parametros';
import { delay } from 'rxjs/operators';
import { ResponseDto } from '../model/responseDto';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private dashboardService : DashboardService
              ) { }

  botaoAmbiente0 : boolean = true;
  botaoAmbiente1 : boolean = true;
  botaoAmbiente2 : boolean = true;
  botaoAmbiente3 : boolean = true;

  respondeDto = new ResponseDto();

  chamada1 : boolean = false;
  chamada2 : boolean = false;
  chamada3 : boolean = false;

  integracao : boolean = false;
  NomeAmbiente : string = "";

  statusFundosRelacao : string = "";
  statusLimparListaDeProdutos : string = "";
  statusCarteiraDeGerentes : string = "";
  
  mensagemfundosRelacao : string = "";
  mensagemLimparListaDeProdutos : string = "";
  mensagemCarteiraDeGerentes : string = "";
  
  stageOctopus : boolean = false;
  stage1: boolean = false;
  stage2: boolean = false;
  stage3: boolean = false;

  stage_octopus_status : string = "consulta";
  stage1_status : string = "consulta";
  stage2_status : string = "consulta";
  stage3_status : string = "consulta";
  //Stage1
  // Consultado
  // Ambiente com falha
  // Ambiente em funcionamento


  mensagem : string = "";

  ngOnInit() {   
    this.botaoAmbiente0 = true;
    this.botaoAmbiente1 = true;
    this.botaoAmbiente2 = true;
    this.botaoAmbiente3 = true;

    this.dashboardService.AutenticarStageOctopus().pipe(delay(1000)).subscribe(x =>{
   if(x.length > 0){
        this.stageOctopus = true;
        this.stage_octopus_status = "sucesso"
        this.botaoAmbiente0 = false;
      }else{
        this.stageOctopus = false;
        this.stage_octopus_status = "erro"
        this.botaoAmbiente0 = true;
      }  

    });

    this.dashboardService.AutenticarStage1().pipe(delay(1500)).subscribe(x =>{
      if(x.length > 0){
        this.stage1 = true;
        this.stage1_status = "sucesso"
        this.botaoAmbiente1 = false;
      }else{
        this.stage1 = false;
        this.stage1_status = "erro"
        this.botaoAmbiente1 = true;
      }
    });
    
    this.dashboardService.AutenticarStage2().pipe(delay(2000)).subscribe(x =>{
      if(x.length > 0){
        this.stage2 = true;
        this.stage2_status = "sucesso"
        this.botaoAmbiente2 = false;
      }else{
        this.stage2 = false;
        this.stage2_status = "erro"
        this.botaoAmbiente2 = true;
      }
    });;
    
    this.dashboardService.AutenticarStage3().pipe(delay(1500)).subscribe(x =>{
      if(x.length > 0){
        this.stage3 = true;
        this.stage3_status = "sucesso"
        this.botaoAmbiente3 = false;
      }else{
        this.stage3 = false;
        this.stage3_status = "erro"
        this.botaoAmbiente3 = true;
      }  
    });;

   /* forkJoin([chamada1,chamada2,chamada3]).subscribe(result => {

      if(result[0].length > 0){
        this.stage1 = true;
        this.stage1_status = "sucesso"
        this.botaoAmbiente1 = false;
      }else{
        this.stage1 = false;
        this.stage1_status = "erro"
        this.botaoAmbiente1 = true;
      }

      if(result[1].length > 0){
        this.stage2 = true;
        this.stage2_status = "sucesso"
        this.botaoAmbiente2 = false;
      }else{
        this.stage2 = false;
        this.stage2_status = "erro"
        this.botaoAmbiente2 = true;
      }

      if(result[2].length > 0){
        this.stage3 = true;
        this.stage3_status = "sucesso"
        this.botaoAmbiente3 = false;
      }else{
        this.stage3 = false;
        this.stage3_status = "erro"
        this.botaoAmbiente3 = true;
      }  
      
   
    }) */
  }

  LimparAmbienteOctopus()
  {
    this.IniciarProcessamento();
    this.Ambiente(0);  
    let signature = new Parametros();

    signature.funcionalidade = signature.obterFuncionalidade(1);    
    this.dashboardService.LimparAmbienteOctopus(signature).pipe(delay(3000)).subscribe(x => {
      if(x.isResponseOk){
        this.statusFundosRelacao = "Sucesso";
        this.mensagemfundosRelacao = "Sucesso";
      }else{
        this.mensagemfundosRelacao = x.ErrorMessage[0]
        this.statusFundosRelacao = "Erro";
      }
      this.chamada1 = false;  
      this.ControleDeVisualizacaoBotao();
    },error => {
      if(error.status == 404){
        this.statusFundosRelacao = "Erro";
        this.mensagemfundosRelacao = `${error.statusText} - ${error.name}`;
      }else{
        this.statusFundosRelacao = "Erro";
        this.mensagemfundosRelacao = `${error.statusText} - ${error.name}`;
      }
      this.chamada1 = false;
      this.ControleDeVisualizacaoBotao();
    })

    signature.funcionalidade = signature.obterFuncionalidade(2);
    this.dashboardService.LimparAmbienteOctopus(signature).pipe(delay(3000)).subscribe(x => {
      if(x.isResponseOk){
        this.statusLimparListaDeProdutos = "Sucesso";
        this.mensagemLimparListaDeProdutos = "Sucesso";
      }else{
        this.mensagemLimparListaDeProdutos = x.ErrorMessage[0]
        this.statusLimparListaDeProdutos = "Erro";
      }
      this.chamada2 = false;
      this.ControleDeVisualizacaoBotao();
    },error => {
      if(error.status == 404){
        this.statusLimparListaDeProdutos = "Erro";
        this.mensagemLimparListaDeProdutos = `${error.statusText} - ${error.name}`;
      }else{
        this.statusLimparListaDeProdutos = "Erro";
        this.mensagemLimparListaDeProdutos = `${error.statusText} - ${error.name}`;
      }
      this.chamada2 = false;
      this.ControleDeVisualizacaoBotao();
    })

    signature.funcionalidade = signature.obterFuncionalidade(3);
    this.dashboardService.LimparAmbienteOctopus(signature).pipe(delay(3000)).subscribe(x => {
      if(x.isResponseOk){
        this.statusCarteiraDeGerentes = "Sucesso";
        this.mensagemCarteiraDeGerentes = "Sucesso";
      }else{
        this.mensagemCarteiraDeGerentes = x.ErrorMessage[0]
        this.statusCarteiraDeGerentes ="Erro";
      }
      this.chamada3 = false;
      this.ControleDeVisualizacaoBotao();
    },error => {
      if(error.status == 404){
        this.statusCarteiraDeGerentes = "Erro";
        this.mensagemCarteiraDeGerentes = `${error.statusText} - ${error.name}`;
      }else{
        this.statusCarteiraDeGerentes = "Erro";
        this.mensagemCarteiraDeGerentes = `${error.statusText} - ${error.name}`;
      }
      this.chamada3 = false;
      this.ControleDeVisualizacaoBotao();
    })
  }


  LimparAmbiente(ambiente:number)
  {
    this.IniciarProcessamento();
    this.Ambiente(ambiente);  
    let signature = new Parametros()

    //FUNDOS RELACAO
    signature.funcionalidade = signature.obterFuncionalidade(1);    
    this.dashboardService.LimparAmbiente(ambiente,signature).pipe(delay(1000)).subscribe(x => {
      if(x.isResponseOk){
        this.statusFundosRelacao = "Sucesso";
        this.mensagemfundosRelacao = "Sucesso";
      }else{
        this.mensagemfundosRelacao = x.ErrorMessage[0]
        this.statusFundosRelacao = "Erro";
      }
      this.chamada1 = false;  
      this.ControleDeVisualizacaoBotao();
    },error => {
      if(error.status == 404){
        this.statusFundosRelacao = "Erro";
        this.mensagemfundosRelacao = `${error.statusText} - ${error.name}`;
      }else{
        this.statusFundosRelacao = "Erro";
        this.mensagemfundosRelacao = `${error.statusText} - ${error.name}`;
      }
      this.chamada1 = false;
      this.ControleDeVisualizacaoBotao();
    })

    signature.funcionalidade = signature.obterFuncionalidade(2);
    this.dashboardService.LimparAmbiente(ambiente,signature).pipe(delay(1000)).subscribe(x => {
      if(x.isResponseOk){
        this.statusLimparListaDeProdutos = "Sucesso";
        this.mensagemLimparListaDeProdutos = "Sucesso";
      }else{
        this.mensagemLimparListaDeProdutos = x.ErrorMessage[0]
        this.statusLimparListaDeProdutos = "Erro";
      }
      this.chamada2 = false;
      this.ControleDeVisualizacaoBotao();
    },error => {
      if(error.status == 404){
        this.statusLimparListaDeProdutos = "Erro";
        this.mensagemLimparListaDeProdutos = `${error.statusText} - ${error.name}`;
      }else{
        this.statusLimparListaDeProdutos = "Erro";
        this.mensagemLimparListaDeProdutos = `${error.statusText} - ${error.name}`;
      }
      this.chamada2 = false;
      this.ControleDeVisualizacaoBotao();
    })

    signature.funcionalidade = signature.obterFuncionalidade(3);
    this.dashboardService.LimparAmbiente(ambiente,signature).pipe(delay(1000)).subscribe(x => {
      if(x.isResponseOk){
        this.statusCarteiraDeGerentes = "Sucesso";
        this.mensagemCarteiraDeGerentes = "Sucesso";
      }else{
        this.mensagemCarteiraDeGerentes = x.ErrorMessage[0]
        this.statusCarteiraDeGerentes ="Erro";
      }
      this.chamada3 = false;
      this.ControleDeVisualizacaoBotao();
    },error => {
      if(error.status == 404){
        this.statusCarteiraDeGerentes = "Erro";
        this.mensagemCarteiraDeGerentes = `${error.statusText} - ${error.name}`;
      }else{
        this.statusCarteiraDeGerentes = "Erro";
        this.mensagemCarteiraDeGerentes = `${error.statusText} - ${error.name}`;
      }
      this.chamada3 = false;
      this.ControleDeVisualizacaoBotao();
    })
  }

  Ambiente(numero:number){
    switch(numero){
      case 0 :{
        this.NomeAmbiente = "Ambiente Octopus"
        this.botaoAmbiente1 = true;
        this.botaoAmbiente2 = true;
        this.botaoAmbiente3 = true;
        break;
      }
      case 1 :{
        this.NomeAmbiente = "Ambiente 1"
        this.botaoAmbiente0 = true;
        this.botaoAmbiente2 = true;
        this.botaoAmbiente3 = true;
        break;
      }
      case 2 :{
        this.NomeAmbiente = "Ambiente 2"
        this.botaoAmbiente0 = true;
        this.botaoAmbiente1 = true;
        this.botaoAmbiente3 = true;
        break;
      }
      case 3 :{
        this.NomeAmbiente = "Ambiente 3"
        this.botaoAmbiente0 = true;
        this.botaoAmbiente1 = true;
        this.botaoAmbiente2 = true;
        break;
      }
      default :{
        this.NomeAmbiente = "";
      }
    }
  }

  ControleDeVisualizacaoBotao(){
    if(!this.chamada1 && !this.chamada2 && !this.chamada3){
      this.botaoAmbiente0 = false;
      this.botaoAmbiente1 = false;
      this.botaoAmbiente2 = false;
      this.botaoAmbiente3 = false;
    }
  }

  IniciarProcessamento(){
    this.integracao = true;
    this.statusFundosRelacao = "Em andamento";
    this.mensagemfundosRelacao = "Em andamento";

    this.statusLimparListaDeProdutos = "Em andamento";
    this.mensagemLimparListaDeProdutos = "Em andamento";
    
    this.statusCarteiraDeGerentes = "Em andamento";
    this.mensagemCarteiraDeGerentes = "Em andamento";

    this.chamada1 , this.chamada2 , this.chamada3 = true;

  }

  spinner():boolean{
    if(this.chamada1 == false && this.chamada2 == false && this.chamada3 == false){
      return false;
    }else
    {
      return true;
    }
  }

  LogarApiInvestimentos1(){
    this.dashboardService.AutenticarStage1().pipe(delay(1000)).subscribe(x =>{      
      if(x.length > 0){
          this.stage1 = true;
      }else{
        this.stage1 = false
      }
    })
  }

  LogarApiInvestimentos2(){
    this.dashboardService.AutenticarStage2().pipe(delay(2000)).subscribe(x =>{
      if(x.length > 0){
          this.stage2 = true;
      }else{
        this.stage2 = false
      }
    })
  }

  LogarApiInvestimentos3(){
    this.dashboardService.AutenticarStage3().pipe(delay(3000)).subscribe(x =>{
      if(x.length > 0){
          this.stage3 = true;
      }else{
        this.stage3 = false
      }
    });      
  }

}

