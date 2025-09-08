import { Component, OnDestroy, OnInit } from '@angular/core';
import { Desenvolvedor } from '../model/desenvolvedor';
import { AmbienteService } from './service/ambiente.service';
import { AmbienteDto } from '../model/ambientesDto';
import { Negocio } from '../model/negocio';
import { PacoteQa } from '../model/PacoteQaDto';
import { Situacao } from '../model/situacao';
import { InformacoesAmbienteService } from './service/informacoes-ambiente.service';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SistemaSignature } from '../model/signature/sistemaSignature';
declare var window: any;

@Component({
  selector: 'app-ambiente',
  templateUrl: './ambiente.component.html',
  styleUrls: ['./ambiente.component.scss']
})
export class AmbienteComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();

  loaderDev: boolean = true;
  loaderQa: boolean = true;

  alertDev: boolean = false;
  alertQa: boolean = false;

  listaDev: AmbienteDto[];
  listaQa = new PacoteQa();

  ambiente: number;
  modalLimparCache: any;

  listAmbiente: AmbienteDto[] = [];
  informacoesAmbiente: AmbienteDto;

  listDesenvolvedores: Desenvolvedor[] = [];
  listSituacao: Situacao[] = [];
  listNegocio: Negocio[] = [];

  constructor(private ambienteService: AmbienteService,
    private comunicacaoExterna: InformacoesAmbienteService,
  ) {
    this.comunicacaoExterna.informacoesTodosAmbiente
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
        if (x) {
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


  mostrarAlertaDev() {
    this.alertDev = true;
    setTimeout(() => {
      this.alertDev = false;
    }, 3000); // 3 segundos
  }

  mostrarAlertaQa() {
    this.alertQa = true;
    setTimeout(() => {
      this.alertQa = false;
    }, 3000);
  }


  obterAmbientes() {
    this.ambienteService.ObterAmbientes()
      .subscribe({
        next: (result) => {
          this.listaDev = result;
          this.loaderDev = false;
        },
        error: (err) => {
          this.loaderDev = false;
          this.mostrarAlertaDev();
        }
      });
  }


  obterAmbienteQa() {
    this.ambienteService.ObterPacoteQa()
      .subscribe({
        next : (result) =>{
       this.listaQa = result;
       this.loaderQa = false;
        },error : (err) =>{
          this.loaderQa =false;
          this.mostrarAlertaQa()
        }
      });
  }
}

