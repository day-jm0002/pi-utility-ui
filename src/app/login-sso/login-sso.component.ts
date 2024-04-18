import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SSOsignature } from './model/SsoSignature';
import { LoaderService } from '../dashboard/service/loader.service';
import { LoginSSOService } from './service/login-sso.service';
import { ResponseDto, SerializedObject } from '../model/responseDto';
import { TokenDto } from '../model/tokenDto';
import { PosicaoSsoSignature } from './model/posicaoSSoSignature';
import { AlertService } from '../dashboard/service/alert.service';

@Component({
  selector: 'app-login-sso',
  templateUrl: './login-sso.component.html',
  styleUrls: ['./login-sso.component.scss']
})
export class LoginSSOComponent implements OnInit {

  form : any;
  formularioToken: any;
  formularioPosicaoSSO: any;
  loading : boolean = false;
  rota : string = "http://sdaysp06d006:8083/loginSso?ticketSso=";
  rotaLocal : string  = "https://localhost:4200/loginSso?ticketSso=";
  rotaSSo : string =""
  sanitizer: DomSanitizer;
  url: SafeResourceUrl;
  showIframe: boolean = false;

  ExibirPosicaoSSo:boolean = false;

  public listaAuxiliar : TokenDto[];
  public listaApi : TokenDto[]=[];

  constructor(private sanitize:DomSanitizer, private ssoService:LoginSSOService ,private alert : AlertService,private loader : LoaderService) 
  { 
    this.loader.fecharLoader();
  }

  ngOnInit() {
    this.ExibirPosicaoSSo = false;
    this.url = this.sanitize.bypassSecurityTrustResourceUrl("");


    this.formularioPosicaoSSO = new FormGroup({
      CodigoCliente : new FormControl("",[Validators.required,Validators.minLength(9),Validators.maxLength(9)])
    })

    this.formularioToken = new FormGroup({
      serialToken : new FormControl("", [Validators.required,Validators.minLength(1)])
    })

 
    this.form = new FormGroup({
      Nome : new FormControl('',[Validators.required,Validators.maxLength(50)]),
      Email : new FormControl('',[Validators.required,Validators.email]),
      Documento : new FormControl('',[Validators.required,Validators.minLength(11),Validators.maxLength(11)]),
      Login : new FormControl('',[Validators.required,Validators.email]),
      TipoAutenticacao : new FormControl(5),
      SerialToken : new FormControl('',[Validators.required,Validators.minLength(12), Validators.maxLength(12)]),
      CnpjCliente : new FormControl('',[Validators.required,Validators.minLength(14),Validators.maxLength(14)])
    });    

    this.ssoService.obterToken().subscribe(x => {
      this.listaAuxiliar = x;
      this.listaApi = x;
      this.loader.fecharLoader();
    })
  }

  Filtrar(){
    let pesquisa : string =this.formularioToken.controls.serialToken.value;
    this.listaApi = this.listaAuxiliar;
    this.listaApi = this.listaApi
                   .filter(x => x.serialToken.toString() == pesquisa || 
                           x.login.indexOf(pesquisa.toUpperCase()) !==  -1 ||
                           x.login.indexOf(pesquisa.toLowerCase()) !==  -1 ||
                           x.serialToken.indexOf(pesquisa.toUpperCase()) !== -1 ||
                           x.serialToken.indexOf(pesquisa.toLocaleLowerCase()) !== -1
                           );  
  }

  Limpar(){
    this.listaApi = this.listaAuxiliar;
    this.formularioToken = new FormGroup({
      serialToken : new FormControl("", [Validators.required,Validators.minLength(1)])
   })
  }
  
  cadastroSSO(){
    this.alert.abrirAlertLight("Aguarde......")
    let ssoSignature = new SSOsignature();
    ssoSignature.nome = this.form.get('Nome').value;
    ssoSignature.email.endereco = this.form.get('Email').value;
    ssoSignature.documento.numero = this.form.get('Documento').value;
    ssoSignature.login = this.form.get('Login').value;
    ssoSignature.codTipoUsuario = this.form.get('TipoAutenticacao').value;
    ssoSignature.serialToken = this.form.get('SerialToken').value;
    ssoSignature.cpfCnpjCliente = this.form.get('CnpjCliente').value; 
  
    this.ssoService.integracaoSSO(ssoSignature).subscribe(response =>{
      let result : string;
      result = response.serializedObject;    
      const retorno = JSON.parse(result);
     if(retorno.isResponseOk === false){
        this.alert.abrirAlertError(retorno.errorMessage[0]);
      }
      else{
        this.alert.abrirAlertSucess("Integração realizada com sucesso !!!");
      }
    }, error => {
      this.alert.abrirAlertError(error)
    })
  }

  ObterUrl(){
    this.ExibirPosicaoSSo = false;    

    let posicaoSso = new PosicaoSsoSignature();
    posicaoSso.codigoCliente = this.ObterCodigoCliente();
    this.ssoService.obterTicketPorCodigoClienteSSO(posicaoSso).subscribe(x =>{
      this.ExibirPosicaoSSo = true;
      this.url = this.sanitize.bypassSecurityTrustResourceUrl(x.ticket)
    })

  }

  ObterCodigoCliente():string
  {
    const codigoCliente = this.formularioPosicaoSSO.get('CodigoCliente').value;
    return codigoCliente;

  }


}
