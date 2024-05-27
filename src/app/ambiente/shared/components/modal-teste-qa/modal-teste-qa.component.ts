import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AmbienteChamadoSignature } from '../../../../model/signature/ambienteSignature';
import { AmbienteService } from '../../../service/ambiente.service';
import { Situacao } from '../../../../model/situacao';
import { Negocio } from '../../../../model/negocio';
import { InformacoesAmbienteService } from '../../../service/informacoes-ambiente.service';
import { Pacote } from '../../../../model/PacoteQaDto';
import { Subject, takeUntil } from 'rxjs';
declare var window : any;

@Component({
  selector: 'app-modal-teste-qa',
  templateUrl: './modal-teste-qa.component.html',
  styleUrl: './modal-teste-qa.component.scss'
})
export class ModalTesteQaComponent implements OnInit , OnDestroy{

  private unsubscribe$ = new Subject<void>();

  formChamadoQa : any;
  modalChamadoQa:any;
  ambienteChamadoSignature= new  AmbienteChamadoSignature();
  
  pacote = new  Pacote();
  listSituacao:Situacao[]=[];
  listNegocio:Negocio[]=[];

  constructor(private ambienteService : AmbienteService , private comunicacaoExterna : InformacoesAmbienteService) {      
    
    this.comunicacaoExterna
    .informacoesPacote
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(x => {
      if(x)
      {
      this.pacote = x;
      this.Metodo();
      this.modalChamadoQa.show();
      }
    })
  }
  ngOnInit(): void {

    this.ambienteService.ObterStatusSituacao().subscribe(result =>{
      this.listSituacao = result;
    });

    this.ambienteService.ObterNegocio().subscribe(result => {
      this.listNegocio = result;      
    });
 
     
    this.formChamadoQa = new FormGroup({
      ChamadoResponsavelNeg : new FormControl(),
      ChamadoStatus : new FormControl()
    })    

    this.modalChamadoQa = new window.bootstrap.Modal(
      document.getElementById('myEditarModalChamadosQa')      
    );

  }

  EditarChamadoQa(){
  
    const ChamadoResponsavelNeg = this.formChamadoQa.get('ChamadoResponsavelNeg') as FormControl;
    const ChamadoStatus = this.formChamadoQa.get('ChamadoStatus') as FormControl;

    this.ambienteChamadoSignature.negocioTesteId = Number(ChamadoResponsavelNeg.value);
    this.ambienteChamadoSignature.situacaoId = Number(ChamadoStatus.value);

    this.ambienteService.AtualizarChamadoAmbienteQa(this.ambienteChamadoSignature).subscribe(x => {

      if(x)
      {
//        this.obterAmbienteQa();
        this.modalChamadoQa.hide();
      }

    })
  }

  Metodo()
  {
    this.ambienteChamadoSignature.chamadoId = this.pacote.chamadoId;

    const ChamadoResponsavelNeg = this.formChamadoQa.get('ChamadoResponsavelNeg') as FormControl;
    ChamadoResponsavelNeg.setValue(this.pacote.negocioTesteId);

    const ChamadoStatus = this.formChamadoQa.get('ChamadoStatus') as FormControl;
    ChamadoStatus.setValue(this.pacote.situacaoId);

  }

  FecharModal()
  {

  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  

}
