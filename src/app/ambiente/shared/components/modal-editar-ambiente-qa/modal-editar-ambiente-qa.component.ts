import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Desenvolvedor } from '../../../../model/desenvolvedor';
import { Situacao } from '../../../../model/situacao';
import { Negocio } from '../../../../model/negocio';
import { Pacote, PacoteQa } from '../../../../model/PacoteQaDto';
import { AmbienteService } from '../../../service/ambiente.service';
import { InformacoesAmbienteService } from '../../../service/informacoes-ambiente.service';
import { AmbienteSignatureQa } from '../../../../model/signature/ambienteSignature';
import { Subject, takeUntil } from 'rxjs';
declare var window : any;

@Component({
  selector: 'app-modal-editar-ambiente-qa',
  templateUrl: './modal-editar-ambiente-qa.component.html',
  styleUrl: './modal-editar-ambiente-qa.component.scss'
})
export class ModalEditarAmbienteQaComponent implements OnInit , OnDestroy{

private unsubscribe$ = new Subject<void>();

formQa : any;
modalEditaQa:any;
listDesenvolvedores:Desenvolvedor[]=[];
listSituacao:Situacao[]=[];
listNegocio:Negocio[]=[];
pacoteQa : PacoteQa;
listaPacote : Array<Pacote>=[];

constructor(private ambienteService: AmbienteService , private comunicacaoExterna : InformacoesAmbienteService) {

  this.comunicacaoExterna.informacoesAmbienteQa
  .pipe(takeUntil(this.unsubscribe$))
  .subscribe((x =>{
    debugger;
    this.modalEditaQa.show();
    this.InformacoesPacoteQa(x);
  }));
  
}

ngOnDestroy(): void {
  this.unsubscribe$.next();
  this.unsubscribe$.complete();
}

  ngOnInit(): void {

    this.ambienteService.ObterDesenvolvedores().subscribe(result => {
      this.listDesenvolvedores = result;
    })
  
    this.ambienteService.ObterNegocio().subscribe(result => {
     this.listNegocio = result;      
   })
  
   this.ambienteService.ObterStatusSituacao().subscribe(result =>{
     this.listSituacao = result;
   })

   this.modalEditaQa = new window.bootstrap.Modal(
    document.getElementById('myEditarModalQa')      
  );

    this.formQa= new FormGroup({
      releaseId : new FormControl(),
      requisicao : new FormControl(),
      nome : new FormControl(),
      branch : new FormControl('',Validators.required),   
      responsavelDevQa : new FormControl(),     
      responsavelNegQa : new FormControl(),
      dataImplantacao : new FormControl(),
      responsavelNegQaTeste : new FormControl('1'),
      statusTeste: new FormControl('1'),
      dependencia : new FormControl()
    }); 
  }

  InformacoesPacoteQa(pacote : PacoteQa){

    debugger;
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

    const data = this.formQa.get('dataImplantacao') as FormControl;
    data.setValue(this.formatarDataParaInput(pacote.dataImplantacao))

    const a = this.formQa.get('responsavelNegQaTeste') as FormControl;
    a.setValue('1');
    const b = this.formQa.get('statusTeste') as FormControl;
    b.setValue('1');

    this.listaPacote = pacote.pacote;    
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

  FecharModal(){
    this.modalEditaQa.hide();
  }


  AssociarChamadoQa()
  {
    debugger;
    let pacote = new Pacote();
    pacote.branch = this.formQa.get('branch').value;
    pacote.negocioTesteId = this.listNegocio.find(item => item.id == this.formQa.get('responsavelNegQaTeste').value)?.id;
    pacote.situacaoId = this.listSituacao.find(item => item.id == this.formQa.get('statusTeste').value)?.id;
    pacote.negocioTeste = this.listNegocio.find(item => item.id == this.formQa.get('responsavelNegQaTeste').value)?.nome;
    pacote.situacao = this.listSituacao.find(item => item.id == this.formQa.get('statusTeste').value)?.descricao;
    pacote.dependencia = this.formQa.get('dependencia').value;
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
    debugger;
    let editarAmbienteQa = new AmbienteSignatureQa();
    editarAmbienteQa.id = this.formQa.get('releaseId').value;
    editarAmbienteQa.release = this.formQa.get('nome').value;
    editarAmbienteQa.requisicao = this.formQa.get('requisicao').value;
    this.listaPacote.forEach(x => editarAmbienteQa.branch.push(x));
    editarAmbienteQa.devId = Number(this.formQa.get('responsavelDevQa').value);
    editarAmbienteQa.negId = Number(this.formQa.get('responsavelNegQa').value);
    editarAmbienteQa.dataImplantacao = this.formQa.get('dataImplantacao').value;

     this.ambienteService.AtualizarAmbienteQa(editarAmbienteQa).subscribe(x => {

       if(x)
       {
        this.comunicacaoExterna.informacoesTodosAmbiente.emit(true);
         this.modalEditaQa.hide();
       }

     })
  }

  get Branch() :string
  {
   var branch = this.formQa.get('Branch').value;
   return branch;
  }


}
