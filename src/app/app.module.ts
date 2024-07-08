import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { FundosComponent } from './fundos/fundos.component';
import { HomeComponent } from './home/home.component';
import { MonitorComponent } from './monitor/monitor.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { AlertComponent } from './shared/alert/alert.component';
import { AmbienteComponent } from './ambiente/ambiente.component';
import { UsuarioComponent } from './usuario/listar/usuario.component';
import { EditarUsuarioComponent } from './usuario/editar/editar-usuario.component';
import { GerenteComponent } from './gerente/gerente.component';
import { MensagemComponent } from './shared/mensagem/mensagem.component';
import { LoginSSOComponent } from './login-sso/login-sso.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { GestorComponent } from './gestor/gestor.component';
import { DashboardService } from './dashboard/service/dashboard.service';
import { SuitabilityComponent } from './suitability/suitability.component';
import { StatusComponentComponent } from './ambiente/shared/components/status-component/status-component.component';
import { ModalEditarAmbienteComponent } from './ambiente/shared/components/modal-editar-ambiente/modal-editar-ambiente.component';
import { ModalEmmiterComponent } from './ambiente/emmiter/modal-emmiter/modal-emmiter.component';
import { TabelaAmbientesComponent } from './ambiente/shared/components/tabela-ambientes/tabela-ambientes.component';
import { TabelaAmbienteQaComponent } from './ambiente/shared/components/tabela-ambiente-qa/tabela-ambiente-qa.component';
import { TabelaTestesQaComponent } from './ambiente/shared/components/tabela-testes-qa/tabela-testes-qa.component';
import { ModalEditarAmbienteQaComponent } from './ambiente/shared/components/modal-editar-ambiente-qa/modal-editar-ambiente-qa.component';
import { ModalLiberarAmbienteComponent } from './ambiente/shared/components/modal-liberar-ambiente/modal-liberar-ambiente.component';
import { ModalTesteQaComponent } from './ambiente/shared/components/modal-teste-qa/modal-teste-qa.component';
import { ModalLimparCacheComponent } from './ambiente/shared/components/modal-limpar-cache/modal-limpar-cache.component';
import { StatusCacheComponent } from './ambiente/shared/components/status-cache/status-cache.component';
import { NewLoaderComponent } from './shared/new-loader/new-loader.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    GestorComponent,
    FundosComponent,
    HomeComponent,
    MonitorComponent,
    LoaderComponent,
    AlertComponent,
    AmbienteComponent,
    UsuarioComponent,
    EditarUsuarioComponent,
    GerenteComponent,
    MensagemComponent,
    LoginSSOComponent,
    SuitabilityComponent,
    StatusComponentComponent,
    ModalEditarAmbienteComponent,
    ModalEmmiterComponent,
    TabelaAmbientesComponent,
    TabelaAmbienteQaComponent,
    TabelaTestesQaComponent,
    ModalEditarAmbienteQaComponent,
    ModalLiberarAmbienteComponent,
    ModalTesteQaComponent,
    ModalLimparCacheComponent,
    StatusCacheComponent,
    NewLoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NgbModule
  ],
  providers: [
    DashboardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
