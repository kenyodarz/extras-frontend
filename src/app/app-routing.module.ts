import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DatosRegistrosComponent } from './components/datos-registros/datos-registros.component';
import { RegistroComponent } from './components/registro/registro.component';

const routes: Routes = [
  { path: "", component: RegistroComponent },
  { path: "datos", component: DatosRegistrosComponent },
  { path: "registro", component: RegistroComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
