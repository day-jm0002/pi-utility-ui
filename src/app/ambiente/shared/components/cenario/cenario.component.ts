import { Component, OnInit } from '@angular/core';
import { Situacao } from '../../../../model/situacao';
import { Negocio } from '../../../../model/negocio';
import { AmbienteService } from '../../../service/ambiente.service';

@Component({
  selector: 'app-cenario',
  templateUrl: './cenario.component.html',
  styleUrl: './cenario.component.scss'
})
export class CenarioComponent implements OnInit {

  listSituacao:Situacao[]=[];
  listNegocio:Negocio[]=[];


  constructor(private ambienteService : AmbienteService) {
    
  }
  ngOnInit(): void {
    this.ambienteService.ObterNegocio().subscribe(result => {
      this.listNegocio = result;      
    });
    this.ambienteService.ObterStatusSituacao().subscribe(result => {
      this.listSituacao = result;      
    });
  }

  AdicionarCenario()
  {
  
  }

}
