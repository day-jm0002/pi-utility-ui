import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GestorComponent } from './gestor/gestor.component';
import { FundosComponent } from './fundos/fundos.component';
import { MonitorComponent } from './monitor/monitor.component';
import { UsuarioComponent } from './usuario/listar/usuario.component';
import { EditarUsuarioComponent } from './usuario/editar/editar-usuario.component';
import { GerenteComponent } from './gerente/gerente.component';
import { LoginSSOComponent } from './login-sso/login-sso.component';
import { AmbienteComponent } from './ambiente/ambiente.component';
import { SuitabilityComponent } from './suitability/suitability.component';
import { CenarioComponent } from './ambiente/shared/components/cenario/cenario.component';
import { FormularioGmudComponent } from './formulario-gmud/formulario-gmud.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent

  }
  ,
  {
    path: "home",
    component: HomeComponent
  }
  ,
  {
    path: "dashboard",
    component: DashboardComponent
  }
  ,
  {
    path: "gestor",
    component: GestorComponent
  }
  ,
  {
    path: "fundos",
    component: FundosComponent
  }
  ,
  {
    path: "monitor",
    component: MonitorComponent
  }
  ,
  {
    path: "fundos/:IdGestor/:NomeGestor",
    component: FundosComponent
  }
  ,
  {
    path: "usuario",
    component: UsuarioComponent
  }
  ,
  {
    path: "usuario/editar/:Ambiente/:CodUsuario",
    component: EditarUsuarioComponent
  },
  {
    path: "gerente",
    component: GerenteComponent
  }
  ,
  {
    path: "Login-sso",
    component: LoginSSOComponent
  }
  ,
  {
    path: "ambiente/:sistema",
    component: AmbienteComponent
  }
  ,
  {
    path: "suitability",
    component: SuitabilityComponent
  }
  ,
  {
    path: "cenario",
    component: CenarioComponent
  },
  {
    path: 'formularioGMUD',
    component: FormularioGmudComponent
  },
  { path: '', redirectTo: '/formulario-gmud', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
