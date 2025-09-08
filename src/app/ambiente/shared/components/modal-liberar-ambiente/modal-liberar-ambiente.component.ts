import { Component, OnDestroy, OnInit } from '@angular/core';
import { AmbienteSignature, AmbienteSignatureQa, ExcluirAmbienteSignature } from '../../../../model/signature/ambienteSignature';
import { AmbienteService } from '../../../service/ambiente.service';
import { InformacoesAmbienteService } from '../../../service/informacoes-ambiente.service';
import { LiberarAmbiente, TipoAmbiente } from '../../../../model/LiberarAmbiente';
import { Subject, takeUntil } from 'rxjs';
declare var window: any;


@Component({
  selector: 'app-modal-liberar-ambiente',
  templateUrl: './modal-liberar-ambiente.component.html',
  styleUrl: './modal-liberar-ambiente.component.scss'
})
export class ModalLiberarAmbienteComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();
  modalLiberar: any;
  liberarAmbiente = new LiberarAmbiente();

  constructor(private ambienteService: AmbienteService, private comunicacaoExterna: InformacoesAmbienteService) {
    this.comunicacaoExterna.liberarAmbiente
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
        this.liberarAmbiente = x;
        this.modalLiberar.show();
      })

    this.comunicacaoExterna.liberarAmbienteQa
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
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


  LiberarAmbiente(ambienteId: number) {
    debugger;
    if (this.liberarAmbiente.ambiente == TipoAmbiente.dev) {
      let editarAmbiente = new ExcluirAmbienteSignature();
      editarAmbiente.id = ambienteId;
      this.ambienteService.ExcluirAmbiente(editarAmbiente).subscribe(x => {
        if (x) {
          this.comunicacaoExterna.informacoesTodosAmbiente.emit(true);
          this.modalLiberar.hide();
        }
      })
    }
    else {
      let ambienteQa = new AmbienteSignatureQa();
      ambienteQa.id = this.liberarAmbiente.stage;
      ambienteQa.release = '';
      ambienteQa.requisicao = '';
      ambienteQa.branch = [];
      ambienteQa.devId = 0;
      ambienteQa.negId = 0;
      ambienteQa.dataImplantacao = new Date();


      this.ambienteService.LiberarChamadoAmbientesQa(ambienteQa).subscribe(x => {
        if (x) {
          this.comunicacaoExterna.informacoesTodosAmbiente.emit(true);
          this.modalLiberar.hide();
        }
      })
    }
  }




}
