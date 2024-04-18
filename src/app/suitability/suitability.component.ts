import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SuitabilityService } from './suitability.service';
import { SuitabilitySignature } from '../model/signature/suitabilitySignature';
import { SuitabilityDto } from '../model/suitabilityDto';
import { AlertService } from '../dashboard/service/alert.service';
import { LoaderService } from '../shared/loader/loader.component';

@Component({
  selector: 'app-suitability',
  templateUrl: './suitability.component.html',
  styleUrl: './suitability.component.scss'
})
export class SuitabilityComponent implements OnInit {


  constructor(private suitabilityService : SuitabilityService,
    private alert : AlertService){
  }

  formulario : any;
  suitabilitDto = new SuitabilityDto();
  exibir = false;
  exibirLoader = false;


  ngOnInit(): void {

    this.formulario = new FormGroup({
      pesquisa : new FormControl("", [Validators.required,Validators.minLength(1),Validators.maxLength(10)]),
    })
  }



  Filtrar(){

    this.exibirLoader = true;

    let pesquisa : string =this.formulario.controls.pesquisa.value;
    let signature = new SuitabilitySignature();
    signature.CodCliente = pesquisa;
    this.suitabilitDto = new SuitabilityDto();

    this.suitabilityService.ObterPerfilSuitability(signature).subscribe(x =>{
      if(x == null)
      {
        this.alert.abrirAlertError("Cliente sem informações de suitability");
        this.exibir = false;
      }else{
        this.exibir = true;
        this.suitabilitDto = x
        this.alert.abrirAlertSucess("Cliente encontrado");
      }

      this.exibirLoader = false;
    }),error =>{
      this.exibirLoader = false;
      this.alert.abrirAlertError("Não foi possível realizar a consulta");
    }
  }

  Limpar(){
    this.exibirLoader =false;
    const qa = this.formulario.get('pesquisa') as FormControl;
    qa.setValue("");
    this.suitabilitDto = new SuitabilityDto();
    this.exibir = false;
  }

}
