import { Component, Input } from '@angular/core';
import { Pacote, PacoteQa } from '../../../../model/PacoteQaDto';
import { InformacoesAmbienteService } from '../../../service/informacoes-ambiente.service';

@Component({
  selector: 'app-tabela-testes-qa',
  templateUrl: './tabela-testes-qa.component.html',
  styleUrl: './tabela-testes-qa.component.scss'
})
export class TabelaTestesQaComponent {

  @Input() pacotes : Array<Pacote>=[];

  constructor(private comunicacaoExterna : InformacoesAmbienteService) {

  }

  AbrirModalStatusChamadoQa(pacote : Pacote){    
    this.comunicacaoExterna.informacoesPacote.emit(pacote);
  }

}
