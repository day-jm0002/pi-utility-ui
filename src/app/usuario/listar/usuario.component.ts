import { Component, OnInit } from '@angular/core';
import { UsuarioPiDto } from '../../model/usuarioPiDto';
import { UsuarioService } from '../service/usuario.service';
import { Router } from '@angular/router';
import { LoaderService } from '../../dashboard/service/loader.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  page = 0;
	pageSize = 10;

  formulario : any;
  public listaApi : UsuarioPiDto[]=[];
  public listaPage : UsuarioPiDto[];
  public listaAuxiliar : UsuarioPiDto[]=[];
  exibirMensagem : boolean =false;
  mostrarPaginacao : boolean;


  options = [
    { id: 1, label: 'Dev', selected : false},
    { id: 2, label: 'Qa' , selected : false}
  ];

  constructor(private usuarioService: UsuarioService,private router:Router,private loader : LoaderService) { 
    this.refreshUsuario();
  }

  refreshUsuario() {
		this.listaPage = this.listaApi.map((country, i) => ({ id: i + 1, ...country })).slice(
			(this.page - 1) * this.pageSize,
			(this.page - 1) * this.pageSize + this.pageSize,
		);
	}


  ngOnInit() {
    this.mostrarPaginacao = true;
   this.formulario = new FormGroup({
    pesquisa : new FormControl("", [Validators.required,Validators.minLength(1)]),
    dev : new FormControl(true),
    qa : new FormControl(false)
  })
   this.usuarioService.ObterUsuarioListaPi().subscribe(x =>{
    this.listaApi = x;
    this.listaAuxiliar = x;
    this.loader.fecharLoader();
   })
  }

   Filtrar(){
     let pesquisa : string =this.formulario.controls.pesquisa.value;
     this.listaPage = this.listaAuxiliar;
     this.mostrarPaginacao = false;
     this.listaPage = this.listaPage
                    .filter(x => x.codExterno.toString() == pesquisa || 
                            x.cpf.indexOf(pesquisa.toUpperCase()) !==  -1 ||
                            
                            x.login.indexOf(pesquisa.toLowerCase()) !==  -1 ||
                            x.login.indexOf(pesquisa.toUpperCase()) !==  -1 ||

                            
                            x.email.indexOf(pesquisa.toLowerCase()) !== -1 ||
                            x.email.indexOf(pesquisa.toUpperCase()) !== -1 ||


                            x.nome.indexOf(pesquisa.toLowerCase()) !== -1 ||
                            x.nome.indexOf(pesquisa.toUpperCase()) !== -1 );
                            this.Mensagem();
                            this.page = 1;
                            this.pageSize = 1;
   }

   Limpar(){
    this.listaPage = this.listaAuxiliar;
    this.page = 0;
    this.pageSize = 10;

 
    const qa = this.formulario.get('pesquisa') as FormControl;
    qa.setValue("");
 
    this.exibirMensagem = false;
    this.mostrarPaginacao = true;
  }

  Mensagem(){
    if(this.listaApi.length == 0){
      this.exibirMensagem = true
    }else{
      this.exibirMensagem = false;
    }
   }

  Editar(CodUsuario:number){

    let ambiente : string = "";

    const qa = this.formulario.get('qa') as FormControl;    
    if(qa.value){ambiente = "qa"}
    
    const dev = this.formulario.get('dev') as FormControl;
    if(dev.value){ambiente = "dev"}

    this.router.navigateByUrl('/usuario/editar/'+ambiente+"/"+CodUsuario)
  }

  Carregar(ambiente:string)
  {
    if(ambiente == 'dev')
    {
      this.SelecionarAmbienteDev();
    }
    else
    {
      this.SelecionarAmbienteQa();
    }
  }

  SelecionarAmbienteDev()
  {
    const qa = this.formulario.get('qa') as FormControl;
    qa.setValue(false);      
    const dev = this.formulario.get('dev') as FormControl;
    dev.setValue(true);
  }

  SelecionarAmbienteQa()
  {
    const dev = this.formulario.get('dev') as FormControl;
    dev.setValue(false);
    const qa = this.formulario.get('qa') as FormControl;
    qa.setValue(true);  
  }

}
