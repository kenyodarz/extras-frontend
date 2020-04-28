// Angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Componentes
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BoardUserComponent } from './components/board-user/board-user.component';
import { BoardModeratorComponent } from './components/board-moderator/board-moderator.component';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
import { AboutComponent } from './components/about/about.component';
import { EntradasComponent } from './components/entradas/entradas.component';
import { RegistrosComponent } from './components/registros/registros.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { PersonasComponent } from './components/personas/personas.component';
import { InformesComponent } from './components/informes/informes.component';


const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "profile", component: ProfileComponent },
  { path: "user", component: BoardUserComponent },
  { path: "mod", component: BoardModeratorComponent },
  { path: "admin", component: BoardAdminComponent },
  { path: "about", component: AboutComponent },
  { path: "personas", component: PersonasComponent },
  { path: "proyectos", component: ProyectosComponent },
  { path: "registros", component: RegistrosComponent },
  { path: "entradas", component: EntradasComponent },
  { path: "informes", component: InformesComponent },
  { path: "**", pathMatch: "full", redirectTo: "home" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true} )],
  exports: [RouterModule]
})
export class AppRoutingModule {}
