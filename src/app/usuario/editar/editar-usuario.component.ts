import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';
import { EditarUsuarioSignature, UsuarioSignature } from '../../model/signature/usuarioSignature';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioPiDto } from '../../model/usuarioPiDto';
import { TipoAutenticacaoDto } from '../../model/tipoAutenticacaoDto';
import { TipoUsuarioDto } from '../../model/tipoUsuarioDto';
import { TipoRoleDto } from '../../model/tipoRoleDto';
import { FormControl, FormGroup} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AlertService } from '../../dashboard/service/alert.service';
import { StatusUsuario } from '../../model/statusUsuario';
import { GerenteService } from '../../gerente/service/gerente.service';
import { GerenteSignature } from '../../model/signature/gerenteSignature';
import { GerenteDto } from '../../model/gerenteDto';
import { LoaderService } from '../../dashboard/service/loader.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent implements OnInit{

  form : any;
  ExibirFormulario: boolean = false;
  exibirInformacoesGerente: boolean = false;
  usuario : UsuarioPiDto = {
    codUsuario: 0,
    codTipoUsuario: 0,
    tipoUsuario: '',
    codTipoAutenticacao: 0,
    tipoAutenticacao: '',
    codRole: 0,
    role: '',
    codExterno: 0,
    nome: '',
    cpf: '',
    login: '',
    email: '',
    codAtivo: false,
    ativo: ''
  };
  gerente : GerenteDto = {
    codExterno: '',
    nome: '',
    tipoGerente: '',
    email: '',
    codccusto: ''
  };
  gerentes : GerenteDto[]=[];
  tipoAutenticacao : TipoAutenticacaoDto[]=[];
  tipoUsuario : TipoUsuarioDto[]=[];
  tipoRole : TipoRoleDto[]=[];
  statusUsuario : StatusUsuario[]=[];
  usuarioSignature = new UsuarioSignature();
  gerenteSignature = new GerenteSignature();

  editar = new EditarUsuarioSignature();

  constructor(
              private usuarioService : UsuarioService , 
              private gerenteService : GerenteService,
              private activatedRoute : ActivatedRoute,
              private loader : LoaderService,
              private router : Router ,  
              private alert : AlertService) {   
  }

  ngOnInit() {  
    this.loader.abrirLoader();
    this.activatedRoute.params.subscribe( params =>{
      this.usuarioSignature.CodUsuario =  Number(params['CodUsuario']);      
      this.usuarioService.ObterUsuarioPi(this.usuarioSignature).subscribe( res => {
        this.usuario = res       
        this.ExibirFormulario = true;

        console.log(this.usuario)

        this.usuarioService.ObterTipoAutenticacao().subscribe(x =>{
          this.tipoAutenticacao = x
          console.log(this.tipoAutenticacao)
        })
        this.usuarioService.ObterTipoUsuario().subscribe(x =>{
          this.tipoUsuario = x;
          console.log(this.tipoUsuario)
        })
        this.usuarioService.ObterTipoRole().subscribe(x =>{
          this.tipoRole = x;
          console.log(this.tipoRole)
        })      

        this.usuarioService.ObterTipoStatus().subscribe(x =>{
          this.statusUsuario = x
        })

         this.gerenteSignature.CodExterno = String(res.codExterno)
         this.gerenteService.ObterGerentePorCodigo(this.gerenteSignature).subscribe(x=>{  
          
          if(x !== null){
            this.gerente = x;                       
            this.gerenteService.ObterListaGerente().subscribe(x =>{                  
              this.gerentes = x;
              this.AtualizarInformacoesGerente();
              this.AtualizarComboBoxGerentes();
              this.exibirInformacoesGerente = true; 
              this.loader.fecharLoader();   
             })

          }else{
            this.loader.fecharLoader();
            this.exibirInformacoesGerente = false;
          }
         })      
        this.form = new FormGroup({
          TipoAutenticacao : new FormControl(this.usuario.codTipoAutenticacao),
          TipoUsuario : new FormControl(this.usuario.codTipoUsuario),
          TipoRole : new FormControl(this.usuario.codRole),
          CodigoUsuario : new FormControl(this.usuario.codUsuario),
          NomeGerente : new FormControl(),
          TipoGerente : new FormControl(),
          Email : new FormControl(),
          Nome : new FormControl(this.usuario.nome),
          Cpf : new FormControl(this.usuario.cpf),
          Login : new FormControl(this.usuario.login),
          Ativo : new FormControl(this.usuario.codAtivo === true ? 1 : 0),
          Gestores : new FormControl()
        });    
      })
     
    })
  }

  Editar(){  
    this.editar.CodUsuario = this.form.get('CodigoUsuario').value;
    this.editar.CodExterno = this.form.get('Gestores').value;
    this.editar.Nome = this.form.get('Nome').value;
    this.editar.Cpf = this.form.get('Cpf').value;
    var ativo =this.form.get('Ativo').value;

    if(ativo == 1){
      this.editar.Ativo = true;
    }else{
      this.editar.Ativo = false;
    }

    this.usuarioService.EditarUsuario(this.editar).subscribe(res =>{
      if(res.status){
        this.alert.abrirAlertSucess(res.mensagem);
      }else{
        this.alert.abrirAlertError(res.mensagem);
      }
    })
  }

  AtualizarInformacoesGerente(){
    const nomeGerente = this.form.get('NomeGerente') as FormControl;
    nomeGerente.setValue(this.gerente.nome);

    const tipoGerente = this.form.get('TipoGerente') as FormControl;
    tipoGerente.setValue(this.gerente.tipoGerente);

    const email = this.form.get('Email') as FormControl;
    email.setValue(this.gerente.email);

  }

  AtualizarComboBoxGerentes(){
    const gerentes = this.form.get('Gestores') as FormControl;
    gerentes.setValue(this.gerente.codExterno);
  }


  Voltar(){
    this.router.navigateByUrl('/usuario');
  }

  atualizarCampo(event:any)
  {
    let popular = this.gerentes.filter(x => x.codExterno === event)

    const nomeGerente = this.form.get('NomeGerente') as FormControl;
    nomeGerente.setValue(popular[0].nome);

    const tipoGerente = this.form.get('TipoGerente') as FormControl;
    tipoGerente.setValue(popular[0].tipoGerente);

    const email = this.form.get('Email') as FormControl;
    email.setValue(popular[0].email);

  }
}

