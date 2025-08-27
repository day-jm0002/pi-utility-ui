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

  listaDev: AmbienteDto[];
  listaQa = new PacoteQa();

  ambiente: number;
  modalLimparCache: any;

  listAmbiente: AmbienteDto[] = [];
  informacoesAmbiente: AmbienteDto;

  listDesenvolvedores: Desenvolvedor[] = [];
  listSituacao: Situacao[] = [];
  listNegocio: Negocio[] = [];

  sistema: SistemaSignature;
  rota: any;




  constructor(private ambienteService: AmbienteService,
    private comunicacaoExterna: InformacoesAmbienteService,
    private route: ActivatedRoute
  ) {
    this.comunicacaoExterna.informacoesTodosAmbiente
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
        if (x) {
          this.obterAmbientes(this.rota);
          this.obterAmbienteQa(this.rota);
        }
      })
  }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
    this.rota = params.get('sistema');
    this.obterAmbientes(String(this.rota));
    this.obterAmbienteQa(String(this.rota));
    });

  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


  obterAmbientes(ambiente: string) {
    let sistema = new SistemaSignature(ambiente);
    this.ambienteService.ObterAmbientes(sistema)
      .subscribe(result => {
        this.listaDev = result;
        if (result) {
          this.loaderDev = false;
        }
      });
  }

  obterAmbienteQa(ambiente: string) {
    let sistema = new SistemaSignature(ambiente);

    this.ambienteService.ObterPacoteQa(sistema)
      .subscribe(result => {
        this.listaQa = result;
        if (result) {
          this.loaderQa = false;
        }
      });
  }
}

