import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AmbienteService } from '../../../service/ambiente.service';
import { Pacote, PacoteQa } from '../../../../model/PacoteQaDto';
import { InformacoesAmbienteService } from '../../../service/informacoes-ambiente.service';
import { LiberarAmbiente, TipoAmbiente } from '../../../../model/LiberarAmbiente';
import { LoaderService } from '../../../../dashboard/service/loader.service';
import { ActivatedRoute } from '@angular/router';
import { SistemaSignature } from '../../../../model/signature/sistemaSignature';

@Component({
  selector: 'app-tabela-ambiente-qa',
  templateUrl: './tabela-ambiente-qa.component.html',
  styleUrl: './tabela-ambiente-qa.component.scss'
})
export class TabelaAmbienteQaComponent {

  @Input() listAmbienteQa: PacoteQa;
  habilitarBotao = false;
  loader: boolean = true;

  @Input() sistema: string;
    nomeTela: string = "";

  constructor(private comunicacaoExterna: InformacoesAmbienteService, private loaderService: LoaderService, private route: ActivatedRoute) {
  }

  openEditarModalQa(listPacoteQa: PacoteQa) {
    debugger;
    this.comunicacaoExterna.informacoesAmbienteQa.emit(listPacoteQa);
  }

  openLiberarModalQa() {
    const rota = this.route.snapshot.paramMap.get('sistema') ?? '';
    let liberarAmbiente = new LiberarAmbiente();
    liberarAmbiente.titulo = `Deseja liberar o ambiente de Qa`;
    liberarAmbiente.ambiente = TipoAmbiente.qa;
    liberarAmbiente.stage = 1 ;
    this.comunicacaoExterna.liberarAmbienteQa.emit(liberarAmbiente);
  }

}
