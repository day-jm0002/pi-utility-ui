import { Component, Input, OnInit } from '@angular/core';
import { Pacote, PacoteQa } from '../../../../model/PacoteQaDto';
import { InformacoesAmbienteService } from '../../../service/informacoes-ambiente.service';
import { LoaderService } from '../../../../dashboard/service/loader.service';

@Component({
  selector: 'app-tabela-testes-qa',
  templateUrl: './tabela-testes-qa.component.html',
  styleUrl: './tabela-testes-qa.component.scss'
})
export class TabelaTestesQaComponent implements OnInit {

  @Input() pacotes : Array<Pacote>=[];
  loader : boolean = true; 

  constructor(private comunicacaoExterna : InformacoesAmbienteService,private loaderService : LoaderService) {

    this.loaderService.appNewLoader.subscribe(x =>{
      this.loader = x;
    })

  }
  ngOnInit(): void {
    this.loaderService.appNewLoader.emit(true);
  }

  AbrirModalStatusChamadoQa(pacote : Pacote){    
    this.comunicacaoExterna.informacoesPacote.emit(pacote);
  }

}
