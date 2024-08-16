import { Component, OnInit } from '@angular/core';
import { GerenteService } from './service/gerente.service';
import { Gestor } from '../model/data';
import { GerenteDto } from '../model/gerenteDto';
import { LoaderService } from '../dashboard/service/loader.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-gerente',
  templateUrl: './gerente.component.html',
  styleUrls: ['./gerente.component.scss']
})
export class GerenteComponent implements OnInit {

  constructor(private gerenteService : GerenteService , private loader : LoaderService) { 
//    this.refresh()
  }

  page = 0
  pageSize = 10
  public listaPage : GerenteDto[];


  formulario : FormGroup;
  listaApi : GerenteDto[]=[];
  listaAuxiliar : GerenteDto[]=[];
  exibirMensagem : boolean =false;

  ngOnInit() {
    this.loader.abrirLoader();
    this.formulario = new FormGroup({
      pesquisa : new FormControl("", [Validators.required,Validators.minLength(1)])
    })
    this.gerenteService.ObterListaGerente().subscribe(x =>{
      this.listaApi = x
      this.listaAuxiliar = x
//      this.refresh();
      this.loader.fecharLoader();
    },error => {
      this.loader.fecharLoader();
    })
  }


  Filtrar(){
    let pesquisa : string =this.formulario.controls.pesquisa.value;
    this.listaApi = this.listaAuxiliar;
    this.listaApi = this.listaApi
                   .filter(x => x.codExterno.toString() == pesquisa || 
                           x.tipoGerente.indexOf(pesquisa.toUpperCase()) !==  -1 ||
                           x.email.indexOf(pesquisa.toLowerCase()) !==  -1 ||
                           x.nome.indexOf(pesquisa.toUpperCase()) !== -1
                           );    
                           this.Mensagem();
   }

   Mensagem(){
    if(this.listaApi.length == 0){
      this.exibirMensagem = true
    }else{
      this.exibirMensagem = false;
    }
   }

 
   Limpar(){
     this.listaApi = this.listaAuxiliar;
     this.formulario = new FormGroup({
      pesquisa : new FormControl("", [Validators.required,Validators.minLength(1)])
    })
    this.exibirMensagem = false;
   }

   refresh(){

    this.listaPage = this.listaApi.map((country, i) => ({ id: i + 1, ...country })).slice(
			(this.page - 1) * this.pageSize,
			(this.page - 1) * this.pageSize + this.pageSize,
		);
  }



}
