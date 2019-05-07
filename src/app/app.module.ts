import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import {EstudianteComponent} from './estudiante/estudiante.component'
import{ProfesorComponent} from './profesor/profesor/profesor.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EstudianteComponent,
    ProfesorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
