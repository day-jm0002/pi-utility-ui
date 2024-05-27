import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AmbienteSignature } from '../../../../model/signature/ambienteSignature';
import { FormControl, FormGroup } from '@angular/forms';
import { AmbienteService } from '../../../service/ambiente.service';
import { Desenvolvedor } from '../../../../model/desenvolvedor';
import { Situacao } from '../../../../model/situacao';
import { Negocio } from '../../../../model/negocio';
import { AmbienteDto } from '../../../../model/ambientesDto';
import { InformacoesAmbienteService } from '../../../service/informacoes-ambiente.service';
import { Subject, takeUntil } from 'rxjs';
declare var window : any;

@Component({
  selector: 'app-modal-editar-ambiente',
  templateUrl: './modal-editar-ambiente.component.html',
  styleUrl: './modal-editar-ambiente.component.scss'
})
export class ModalEditarAmbienteComponent implements OnInit , OnDestroy {

private unsubscribe$ = new Subject<void>();

form : any;
modalEditar:any;
ambienteDto : AmbienteDto;

listDesenvolvedores:Desenvolvedor[]=[];
listSituacao:Situacao[]=[];
listNegocio:Negocio[]=[];

 constructor(private ambienteService : AmbienteService , private comunicacaoExterna : InformacoesAmbienteService) {

    this.comunicacaoExterna.informacoesAmbiente
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((x => {
      this.modalEditar.show();
      this.ambienteDto = x;      
      this.InformacoesAmbiente();
    }))

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

    
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {

    this.modalEditar = new window.bootstrap.Modal(
      document.getElementById('myEditarModal')      
    );
  
    this.ambienteService.ObterDesenvolvedores().subscribe(result => {
      this.listDesenvolvedores = result;
    })
  
    this.ambienteService.ObterNegocio().subscribe(result => {
     this.listNegocio = result;      
   })
  
   this.ambienteService.ObterStatusSituacao().subscribe(result =>{
     this.listSituacao = result;
   })
  
  }
  


  EditarAmbiente() {
    this.AtualizarInformacoesAmbiente()   
  }

  InformacoesAmbiente(){

    if(this.ambienteDto)
  {
    console.log(this.ambienteDto);
    const ambienteID = this.form.get('AmbienteId') as FormControl;
    ambienteID.setValue(this.ambienteDto.id);

    const nome = this.form.get('Nome') as FormControl;
    nome.setValue(this.ambienteDto.nome);

    const branch = this.form.get('Branch') as FormControl;
    branch.setValue(this.ambienteDto.branch);

    const numeroChamado = this.form.get('NumeroChamado') as FormControl;
    numeroChamado.setValue(this.ambienteDto.numeroChamado);

    const descricao = this.form.get('Descricao') as FormControl;
    descricao.setValue(this.ambienteDto.descricao);

    const responsavelDev = this.form.get('ResponsavelDev') as FormControl;
    responsavelDev.setValue(this.ambienteDto.devId);

    const responsavelNeg = this.form.get('ResponsavelNeg') as FormControl;
    responsavelNeg.setValue(this.ambienteDto.negId);

    const situacaoId = this.form.get('Status') as FormControl;
    situacaoId.setValue(this.ambienteDto.situacaoId);
    }
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
        this.comunicacaoExterna.informacoesTodosAmbiente.emit(true);        
        this.modalEditar.hide();
      }      
    })
  }
 
  FecharModal()
  {
    this.modalEditar.hide();
  }
}
