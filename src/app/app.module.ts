import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from "primeng/api";
import { ConfirmationService } from "primeng/api";
import { MaterialModule } from './material.module';
import { PrimengModule } from './primeng.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { DatosRegistrosComponent } from './components/datos-registros/datos-registros.component';
import { RegistroComponent } from './components/registro/registro.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    DatosRegistrosComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    PrimengModule
  ],
  providers: [MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule {}
