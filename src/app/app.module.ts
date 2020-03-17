import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

/* Modulos */
import { AppRoutingModule } from "./app-routing.module";
import { MaterialModule } from "./material.module";
import { PrimengModule } from "./primeng.module";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";

/* Componentes */
import { AppComponent } from "./app.component";
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { DatosRegistrosComponent } from "./components/datos-registros/datos-registros.component";
import { RegistroComponent } from "./components/registro/registro.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { HomeComponent } from "./components/home/home.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { BoardAdminComponent } from "./components/board-admin/board-admin.component";
import { BoardModeratorComponent } from "./components/board-moderator/board-moderator.component";
import { BoardUserComponent } from "./components/board-user/board-user.component";
import { BoardSupervisorComponent } from "./components/board-supervisor/board-supervisor.component";

/* Servicios */
import { MessageService } from "primeng/api";
import { ConfirmationService } from "primeng/api";
import { authInterceptorProviders } from "src/app/helpers/auth.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    DatosRegistrosComponent,
    RegistroComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    BoardSupervisorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    PrimengModule
  ],
  providers: [MessageService, ConfirmationService, authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {}
