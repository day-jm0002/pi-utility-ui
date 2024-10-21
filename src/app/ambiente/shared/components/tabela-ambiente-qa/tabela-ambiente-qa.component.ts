import { Component, Input, OnInit } from '@angular/core';
import { AmbienteService } from '../../../service/ambiente.service';
import { Pacote, PacoteQa } from '../../../../model/PacoteQaDto';
import { InformacoesAmbienteService } from '../../../service/informacoes-ambiente.service';
import { LiberarAmbiente, TipoAmbiente } from '../../../../model/LiberarAmbiente';
import { LoaderService } from '../../../../dashboard/service/loader.service';

@Component({
  selector: 'app-tabela-ambiente-qa',
  templateUrl: './tabela-ambiente-qa.component.html',
  styleUrl: './tabela-ambiente-qa.component.scss'
})
export class TabelaAmbienteQaComponent implements OnInit {

  @Input() listAmbienteQa : PacoteQa;
  habilitarBotao = false;
  loader : boolean = true; 

  constructor(private comunicacaoExterna :InformacoesAmbienteService, private loaderService : LoaderService) {
  }

  ngOnInit(): void {

  }



  openEditarModalQa(listPacoteQa : PacoteQa)
  {
    this.comunicacaoExterna.informacoesAmbienteQa.emit(listPacoteQa);
  }

  openLiberarModalQa()
  {
    let liberarAmbiente = new LiberarAmbiente();
    liberarAmbiente.titulo = `Deseja liberar o ambiente de Qa` ;
    liberarAmbiente.ambiente = TipoAmbiente.qa;
    liberarAmbiente.stage = 1;
    this.comunicacaoExterna.liberarAmbienteQa.emit(liberarAmbiente);


  }

}
