import { Component,OnInit } from '@angular/core';
import { Gestor } from '../model/data';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoaderService } from '../dashboard/service/loader.service';
import { GestorService } from './service/gestor.service';

@Component({
  selector: 'app-gestor',
  templateUrl: './gestor.component.html',
  styleUrls: ['./gestor.component.scss']
})
export class GestorComponent implements OnInit{

  formulario : FormGroup;
  public listaAuxiliar : Gestor[];
  public lista  : Gestor[];

  public listaApi : Gestor[]=[];

  constructor(private gestorService:GestorService,private loader : LoaderService) 
  { 
    
  }

  ngOnInit() {
    this.formulario = new FormGroup({
      cnpj : new FormControl("", [Validators.required,Validators.minLength(1)])
    })

    this.gestorService.ObterGestoresApi().subscribe(data => {
      this.listaApi = data;
      this.listaAuxiliar = data;
      this.loader.fecharLoader();
    })

  }

  Filtrar(){
   let cnpj : string =this.formulario.controls.cnpj.value;
   this.listaApi = this.listaAuxiliar;
   this.listaApi = this.listaApi
                  .filter(x => x.cpfCNPJ == cnpj || 
                          x.idGestor.toString() == cnpj || 
                          x.nome.indexOf(cnpj.toUpperCase()) !== -1 ||
                          x.nomeCompleto.indexOf(cnpj.toUpperCase()) !== -1                          
                          );    
  }

  Limpar(){
    this.listaApi = this.listaAuxiliar;
    this.formulario = new FormGroup({
      cnpj : new FormControl("", [Validators.required,Validators.minLength(1)])
    })
  }

}
