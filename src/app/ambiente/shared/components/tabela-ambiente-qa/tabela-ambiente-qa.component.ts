import { Component, Input } from '@angular/core';
import { AmbienteService } from '../../../service/ambiente.service';
import { Pacote, PacoteQa } from '../../../../model/PacoteQaDto';
import { InformacoesAmbienteService } from '../../../service/informacoes-ambiente.service';
import { LiberarAmbiente, TipoAmbiente } from '../../../../model/LiberarAmbiente';

@Component({
  selector: 'app-tabela-ambiente-qa',
  templateUrl: './tabela-ambiente-qa.component.html',
  styleUrl: './tabela-ambiente-qa.component.scss'
})
export class TabelaAmbienteQaComponent {

  @Input() listAmbienteQa : PacoteQa;
  habilitarBotao = false;

  constructor(private comunicacaoExterna :InformacoesAmbienteService) {
  }

  openEditarModalQa(listPacoteQa : PacoteQa)
  {
    this.comunicacaoExterna.informacoesAmbienteQa.emit(listPacoteQa);
  }

  openLiberarModalQa()
  {
    let liberarAmbiente = new LiberarAmbiente();
    liberarAmbiente.titulo = `Deseja liberar o ambiente de Qa` ;
    liberarAmbiente.ambiente = TipoAmbiente.dev;
    liberarAmbiente.stage = 1;
    this.comunicacaoExterna.liberarAmbienteQa.emit(liberarAmbiente);


  }

  LimparStageQa()
  {

  }

  

  
}
