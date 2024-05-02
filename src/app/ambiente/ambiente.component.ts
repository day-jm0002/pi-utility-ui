import { Component, OnInit } from '@angular/core';
import { Desenvolvedor } from '../model/desenvolvedor';
import { AmbienteService } from './service/ambiente.service';
import { AmbienteDto } from '../model/ambientesDto';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AmbienteChamadoSignature, AmbienteSignature, AmbienteSignatureQa } from '../model/signature/ambienteSignature';
import { Negocio } from '../model/negocio';
import { LoaderService } from '../dashboard/service/loader.service';
import { Pacote, PacoteQa } from '../model/PacoteQaDto';
import { LimparCacheSignature } from '../model/signature/limparCacheSignature';
import { Situacao } from '../model/situacao';
declare var window : any;

@Component({
  selector: 'app-ambiente',
  templateUrl: './ambiente.component.html',
  styleUrls: ['./ambiente.component.scss']
})
export class AmbienteComponent implements OnInit {
  ambiente : number;

  form : any;
  formChamadoQa : any;
  modalEditar:any;
  modalLiberar:any;

  formQa : any;
  modalEditaQa:any;
  modalLiberarQa:any;
  modalChamadoQa:any;

  modalLimparCache:any;

  listAmbiente:AmbienteDto[]=[];

  listPacoteQa: PacoteQa = new PacoteQa();
  listaPacote : Array<Pacote>=[];
  
  listDesenvolvedores:Desenvolvedor[]=[];

  listSituacao:Situacao[]=[];

  listNegocio:Negocio[]=[];
  listRelease:string[]=[];
  listBranchQa:string[]=[];

  NomeStage:string="";

  constructor(private ambienteService : AmbienteService , private loader : LoaderService , private fb: FormBuilder) {    
    this.loader.abrirLoader();
  }

  ngOnInit() {
    this.listRelease.push('')
    this.obterAmbientes();
    this.obterAmbienteQa();

     this.ambienteService.ObterDesenvolvedores().subscribe(result => {
       this.listDesenvolvedores = result;
     })

     this.ambienteService.ObterNegocio().subscribe(result => {
      this.listNegocio = result;      
    })

    this.ambienteService.ObterStatusSituacao().subscribe(result =>{
      this.listSituacao = result;
    })

    this.modalEditar = new window.bootstrap.Modal(
      document.getElementById('myEditarModal')      
    );

    this.modalEditaQa = new window.bootstrap.Modal(
      document.getElementById('myEditarModalQa')      
    );

    this.modalLiberar = new window.bootstrap.Modal(
      document.getElementById('myLiberarModal')
    );

    this.modalLiberarQa = new window.bootstrap.Modal(
      document.getElementById('myLiberarModalQa')
    );

    this.modalLimparCache = new window.bootstrap.Modal(
      document.getElementById('myLimparCacheModal')
    )

    this.modalChamadoQa = new window.bootstrap.Modal(
      document.getElementById('myEditarModalChamadosQa')      
    );


    this.form = new FormGroup({
      AmbienteId : new FormControl(),
      Nome : new FormControl(),
      Branch : new FormControl(),
      NumeroChamado : new FormControl(),
      Descricao : new FormControl(),
      ResponsavelDev : new FormControl(),     
      ResponsavelNeg : new FormControl(),
      Status : new FormControl()
    }); 
      
    this.formQa= new FormGroup({
      releaseId : new FormControl(),
      requisicao : new FormControl(),
      nome : new FormControl(),
      branch : new FormControl('',Validators.required),   
      responsavelDevQa : new FormControl(),     
      responsavelNegQa : new FormControl(),
      dataImplantacao : new FormControl(),

      responsavelNegQaTeste : new FormControl(),
      statusTeste: new FormControl()
    }); 

    this.formChamadoQa = new FormGroup({
      ChamadoResponsavelNeg : new FormControl(),
      ChamadoStatus : new FormControl()
    })
    
  }


  openEditarModal(ambiente:AmbienteDto) {  
    this.InformacoesAmbiente(ambiente);    
    this.modalEditar.show();   
  }

  openLiberarModal(ambienteId: number) {
    this.ambiente = ambienteId;
    this.modalLiberar.show();
  }

  FecharModal()
  {
   
  }

  EditarAmbiente() {
    this.AtualizarInformacoesAmbiente()   
  }

  obterAmbientes(){
    this.ambienteService.ObterAmbientes().subscribe(result => {
      this.listAmbiente = result;  
      this.loader.fecharLoader();
    });    
  }

  obterAmbienteQa(){
    this.ambienteService.ObterPacoteQa().subscribe(result => {
      this.listPacoteQa = result;
    });    
  }

  get Branch() :string
  {
   var branch = this.formQa.get('Branch').value;
   return branch;
  }



  InformacoesAmbiente(ambiente : AmbienteDto){

    const ambienteID = this.form.get('AmbienteId') as FormControl;
    ambienteID.setValue(ambiente.id);

    const nome = this.form.get('Nome') as FormControl;
    nome.setValue(ambiente.nome);

    const branch = this.form.get('Branch') as FormControl;
    branch.setValue(ambiente.branch);

    const numeroChamado = this.form.get('NumeroChamado') as FormControl;
    numeroChamado.setValue(ambiente.numeroChamado);

    const descricao = this.form.get('Descricao') as FormControl;
    descricao.setValue(ambiente.descricao);

    const responsavelDev = this.form.get('ResponsavelDev') as FormControl;
    responsavelDev.setValue(ambiente.devId);

    const responsavelNeg = this.form.get('ResponsavelNeg') as FormControl;
    responsavelNeg.setValue(ambiente.negId);

    const situacaoId = this.form.get('Status') as FormControl;
    situacaoId.setValue(ambiente.situacaoId);


  }

  LiberarAmbiente()
  {
    let editarAmbiente = new AmbienteSignature();
    editarAmbiente.id = this.ambiente;
    editarAmbiente.branch =""
    editarAmbiente.numeroChamado = ""
    editarAmbiente.descricao = ""
    editarAmbiente.devId = 1
    editarAmbiente.negId = 1
    editarAmbiente.sitId = 1

    this.ambienteService.AtualizarAmbiente(editarAmbiente).subscribe(x => {  
     if(x)
     {
      this.obterAmbientes();
      this.modalLiberar.hide();
     }
    })
  }


  AtualizarInformacoesAmbiente()
  {   
    let editarAmbiente = new AmbienteSignature();
    editarAmbiente.id = this.form.get('AmbienteId').value;
    editarAmbiente.branch = this.form.get('Branch').value;
    editarAmbiente.numeroChamado = this.form.get('NumeroChamado').value;
    editarAmbiente.descricao = this.form.get('Descricao').value;
    editarAmbiente.devId = Number(this.form.get('ResponsavelDev').value);
    editarAmbiente.negId = Number(this.form.get('ResponsavelNeg').value);
    editarAmbiente.sitId = Number(this.form.get('Status').value);

    this.ambienteService.AtualizarAmbiente(editarAmbiente).subscribe(x => {   
      if(x)
      {
        this.obterAmbientes();
        this.modalEditar.hide();
      }      
    })
  }

  //------------
  
  openEditarModalQa(pacote : PacoteQa) {  
    this.InformacoesPacoteQa(pacote);
    this.modalEditaQa.show();   

  }

  AssociarChamadoQa()
  {
    let pacote = new Pacote();
    pacote.branch = this.formQa.get('branch').value;
    pacote.negocioTesteId = this.listNegocio.find(item => item.id == this.formQa.get('responsavelNegQaTeste').value)?.id;
    pacote.situacaoId = this.listSituacao.find(item => item.id == this.formQa.get('statusTeste').value)?.id;
    pacote.negocioTeste = this.listNegocio.find(item => item.id == this.formQa.get('responsavelNegQaTeste').value)?.nome;
    pacote.situacao = this.listSituacao.find(item => item.id == this.formQa.get('statusTeste').value)?.descricao;
    pacote.chamadoId = 0;
    this.listaPacote.push(pacote);

    const ambienteID = this.formQa.get('branch') as FormControl;
    ambienteID.setValue('');
  }

  isButtonDisabled() {
    return this.formQa.get('branch').invalid;
  }

  removerItem(indice : number)
  {
    this.listaPacote[indice].apagar = true
  }

  EditarAmbienteQa()
  {
    let editarAmbienteQa = new AmbienteSignatureQa();
    editarAmbienteQa.id = 1;
    editarAmbienteQa.release = this.formQa.get('nome').value;
    editarAmbienteQa.requisicao = this.formQa.get('requisicao').value;
    this.listaPacote.forEach(x => editarAmbienteQa.branch.push(x));
    editarAmbienteQa.devId = Number(this.formQa.get('responsavelDevQa').value);
    editarAmbienteQa.negId = Number(this.formQa.get('responsavelNegQa').value);
    editarAmbienteQa.dataImplantacao = this.formQa.get('dataImplantacao').value;

    this.ambienteService.AtualizarAmbienteQa(editarAmbienteQa).subscribe(x => {

      if(x)
      {
        this.obterAmbienteQa();
        this.modalEditaQa.hide();
      }

    })
  }

  InformacoesPacoteQa(pacote : PacoteQa){

    const releaseId = this.formQa.get('releaseId') as FormControl;
    releaseId.setValue(pacote.releaseId);

    const nome = this.formQa.get('nome') as FormControl;
    nome.setValue(pacote.nome);

    const requisicao = this.formQa.get('requisicao') as FormControl;
    requisicao.setValue(pacote.requisicao);

    const devId = this.formQa.get('responsavelDevQa') as FormControl;
    devId.setValue(pacote.desenvolvedorId);

    const negId= this.formQa.get('responsavelNegQa') as FormControl;
    negId.setValue(pacote.negocioId);

    this.formQa.get('dataImplantacao').setValue(this.formatarDataParaInput(pacote.dataImplantacao));
    this.formQa.get('responsavelNegQaTeste').setValue('1')
    this.formQa.get('statusTeste').setValue('1')

    this.listaPacote = new Array<Pacote>();
    this.listPacoteQa.pacote.forEach(x => this.listaPacote.push(x));
    
  }

  private formatarDataParaInput(dataTable: string): string {
 
    const dataString = dataTable;
    const partes = dataString.split(/[\s/:]+/); // Divide a string em partes usando espaços, barras e dois pontos
    
    const dia = parseInt(partes[0], 10);
    const mes = parseInt(partes[1], 10);
    const ano = parseInt(partes[2], 10);
    const hora = parseInt(partes[3], 10);
    const minutos = parseInt(partes[4], 10);
    
    const data = new Date(ano, mes - 1, dia, hora, minutos);
    const anoAlterado = data.getFullYear();
    const mesAlterado = ('0' + (data.getMonth() + 1)).slice(-2); // Adicionando 1, pois o mês é 0-indexado
    const diaAlterado =  ('0' + data.getDate()).slice(-2);
    const horaAlterado = data.getHours();
    const minutoAlterado = data.getMinutes();
  
    return `${anoAlterado}-${mesAlterado}-${diaAlterado}T${horaAlterado}:${minutoAlterado}:00`;
  }

  private padLeft(valor: number, largura: number): string {
    return valor.toString().padStart(largura, '0');
  }



  openLiberarModalQa()
  {
    this.modalLiberarQa.show();
  }

  
  LiberarAmbienteQa()
  {
    let editarAmbienteQa = new AmbienteSignatureQa();
    editarAmbienteQa.id = 1;
    editarAmbienteQa.release = "";
    editarAmbienteQa.requisicao = "";
    this.listaPacote = new Array<Pacote>();
    editarAmbienteQa.devId = 1;
    editarAmbienteQa.negId = 1;
    editarAmbienteQa.dataImplantacao = new Date();
    this.ambienteService.AtualizarAmbienteQa(editarAmbienteQa).subscribe(x => {

      if(x)
      {
        this.obterAmbienteQa();
        
      }
      this.modalLiberarQa.hide();
    })
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


  nomeChamadoQa : string = "";
  ambienteChamadoSignature= new  AmbienteChamadoSignature();

  AbrirModalStatusChamadoQa(pacote : any){    

    this.nomeChamadoQa = pacote.branch;
    this.ambienteChamadoSignature.chamadoId = pacote.chamadoId;

    const ChamadoResponsavelNeg = this.formChamadoQa.get('ChamadoResponsavelNeg') as FormControl;
    ChamadoResponsavelNeg.setValue(pacote.negocioTesteId);

    const ChamadoStatus = this.formChamadoQa.get('ChamadoStatus') as FormControl;
    ChamadoStatus.setValue(pacote.situacaoId);

    this.modalChamadoQa.show();
  }

  EditarChamadoQa(){

    const ChamadoResponsavelNeg = this.formChamadoQa.get('ChamadoResponsavelNeg') as FormControl;
    const ChamadoStatus = this.formChamadoQa.get('ChamadoStatus') as FormControl;

    this.ambienteChamadoSignature.negocioTesteId = Number(ChamadoResponsavelNeg.value);
    this.ambienteChamadoSignature.situacaoId = Number(ChamadoStatus.value);

    this.ambienteService.AtualizarChamadoAmbienteQa(this.ambienteChamadoSignature).subscribe(x => {

      if(x)
      {
        this.obterAmbienteQa();
        this.modalChamadoQa.hide();
      }

    })
  }
  
}
