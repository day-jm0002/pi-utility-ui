import { Component, OnInit } from '@angular/core';
import { Fundos, FundosRoot } from '../model/fundos';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoaderService } from '../dashboard/service/loader.service';
import { AlertService } from '../dashboard/service/alert.service';
import { FundosService } from './service/fundos.service';

@Component({
  selector: 'app-fundos',
  templateUrl: './fundos.component.html',
  styleUrls: ['./fundos.component.scss']
})
export class FundosComponent implements OnInit {

  constructor
  (
    private fundosService:FundosService , 
    private route: ActivatedRoute , 
    private loader : LoaderService,
    private alert : AlertService
  ) { }

  id : number= 0;
  nomeGestor : string = "";
  exibirMensagem : boolean = false;
  public fundos : FundosRoot;
  public lista : Fundos[];
  formulario : FormGroup;

  public listaApi : Fundos[]=[];
  public listaAuxiliar : Fundos[]=[];
  

  ngOnInit() {   

    this.alert.fecharAlert();

    this.formulario = new FormGroup({
      idFundo : new FormControl("", [Validators.required,Validators.minLength(1)])
    })

    this.id = +this.route.snapshot.paramMap.get('IdGestor')!;
    this.nomeGestor = this.route.snapshot.paramMap.get('NomeGestor')!;

     this.fundosService.ObterFundosPorGestorApi().subscribe(data => {
      this.listaApi = data;
      this.listaAuxiliar = this.listaApi;
      this.loader.fecharLoader();
      if(this.id > 0){
        this.listaApi = this.listaApi.filter(x => x.idGestor === this.id);
        this.listaAuxiliar = this.listaApi;
        this.Mensagem();
        this.loader.fecharLoader();
        }
     }, error => {
      this.loader.fecharLoader();
      this.alert.abrirAlertError("Não foi possível obter os fundos");
     })
  }

  Mensagem(){
    if(this.listaApi.length == 0){
      this.alert.abrirAlertError("Este gestor não possui fundos");
    }
  }

  Filtrar(){
    let idFundo =this.formulario.controls.idFundo.value;
    this.listaApi = this.listaAuxiliar;
    this.listaApi = this.listaApi.
                    filter(x => x.idFundo == idFundo || 
                      x.nome.indexOf(idFundo.toUpperCase()) !== -1 || 
                      x.nomeCompleto.indexOf(idFundo.toUpperCase()) !== -1 );    
   }
 
   Limpar(){
     this.listaApi = this.listaAuxiliar;
     this.formulario = new FormGroup({
      idFundo : new FormControl("", [Validators.required,Validators.minLength(1)])
     })
   }



}
