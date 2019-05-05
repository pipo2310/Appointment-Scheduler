import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeEstudiantePruebaComponent } from './estudiante/home-estudiante-prueba/home-estudiante-prueba.component';
import { HomeProfesorPruebaComponent } from './profesor/home-profesor-prueba/home-profesor-prueba.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeEstudiantePruebaComponent,
    HomeProfesorPruebaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
