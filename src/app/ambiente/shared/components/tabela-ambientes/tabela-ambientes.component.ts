import { Component, Input } from '@angular/core';
import { AmbienteDto } from '../../../../model/ambientesDto';
import { AmbienteService } from '../../../service/ambiente.service';
import { InformacoesAmbienteService } from '../../../service/informacoes-ambiente.service';
import { LiberarAmbiente, TipoAmbiente } from '../../../../model/LiberarAmbiente';

@Component({
  selector: 'app-tabela-ambientes',
  templateUrl: './tabela-ambientes.component.html',
  styleUrl: './tabela-ambientes.component.scss'
})
export class TabelaAmbientesComponent {

  @Input() listAmbiente : AmbienteDto[]=[];

  constructor(private ambienteService : AmbienteService , private comunicacaoExterna : InformacoesAmbienteService) {  

  }

  openEditarModal(ambiente : AmbienteDto)
  {
    this.comunicacaoExterna.informacoesAmbiente.emit(ambiente);
  }

  openLiberarModal(ambienteId : number,nome : string)
  {
    let liberarAmbiente = new LiberarAmbiente();
    liberarAmbiente.titulo = `Deseja liberar o ambiente ${nome}` ;
    liberarAmbiente.ambiente = TipoAmbiente.dev;
    liberarAmbiente.stage = ambienteId;
    this.comunicacaoExterna.liberarAmbiente.emit(liberarAmbiente);
  }

  LimparStage()
  {

  }
}
