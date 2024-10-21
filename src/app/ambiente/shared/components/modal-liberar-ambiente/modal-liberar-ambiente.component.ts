import { Component, OnDestroy, OnInit } from '@angular/core';
import { AmbienteSignature } from '../../../../model/signature/ambienteSignature';
import { AmbienteService } from '../../../service/ambiente.service';
import { InformacoesAmbienteService } from '../../../service/informacoes-ambiente.service';
import { LiberarAmbiente, TipoAmbiente } from '../../../../model/LiberarAmbiente';
import { Subject, takeUntil } from 'rxjs';
declare var window : any;


@Component({
  selector: 'app-modal-liberar-ambiente',
  templateUrl: './modal-liberar-ambiente.component.html',
  styleUrl: './modal-liberar-ambiente.component.scss'
})
export class ModalLiberarAmbienteComponent implements OnInit , OnDestroy {

  private unsubscribe$ = new Subject<void>();
  modalLiberar:any;
  liberarAmbiente = new LiberarAmbiente();

  constructor(private ambienteService : AmbienteService,private comunicacaoExterna : InformacoesAmbienteService) {
    this.comunicacaoExterna.liberarAmbiente
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(x =>{
      this.liberarAmbiente = x;
      this.modalLiberar.show();
    })

    this.comunicacaoExterna.liberarAmbienteQa
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(x =>{
      this.liberarAmbiente = x;
      this.modalLiberar.show();
    })

  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  
  ngOnInit(): void {
    this.modalLiberar = new window.bootstrap.Modal(
      document.getElementById('myLiberarModal')
    );
  }


  LiberarAmbiente(ambienteId : number)
  {
    if(this.liberarAmbiente.ambiente == TipoAmbiente.dev)
    {
    let editarAmbiente = new AmbienteSignature();
    editarAmbiente.id = ambienteId;
    editarAmbiente.branch =""
    editarAmbiente.numeroChamado = ""
    editarAmbiente.descricao = ""
    editarAmbiente.devId = 1
    editarAmbiente.negId = 1
    editarAmbiente.sitId = 1
    editarAmbiente.dependencia = ""

    this.ambienteService.AtualizarAmbiente(editarAmbiente).subscribe(x => {  
     if(x)
     {
      this.comunicacaoExterna.informacoesTodosAmbiente.emit(true);
      this.modalLiberar.hide();
     }
    })
    }
    else{
      this.ambienteService.LiberarChamadoAmbientesQa().subscribe(x => {  
        if(x)
        {
         this.comunicacaoExterna.informacoesTodosAmbiente.emit(true);
         this.modalLiberar.hide();
        }
       })
    }  
  }




}
