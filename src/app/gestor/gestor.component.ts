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

  page = 0
  pageSize = 10
  public listaPage : Gestor[];


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
      this.refreshGestor()
    })
  }

  Filtrar(){
   let cnpj : string =this.formulario.controls.cnpj.value;
   this.listaPage = this.listaAuxiliar;
   this.listaPage = this.listaApi
                  .filter(x => x.cpfCNPJ == cnpj || 
                          x.idGestor.toString() == cnpj || 
                          x.nome.indexOf(cnpj.toUpperCase()) !== -1 ||
                          x.nomeCompleto.indexOf(cnpj.toUpperCase()) !== -1                          
                          );    

                          this.page = 0
                          this.pageSize = 1
                        
  }

  Limpar(){
    
  this.page = 0
  this.pageSize = 10
    this.listaApi = this.listaAuxiliar;
    this.formulario = new FormGroup({
      cnpj : new FormControl("", [Validators.required,Validators.minLength(1)])
    })
  }


  refreshGestor(){

    this.listaPage = this.listaApi.map((country, i) => ({ id: i + 1, ...country })).slice(
			(this.page - 1) * this.pageSize,
			(this.page - 1) * this.pageSize + this.pageSize,
		);

  }


}
