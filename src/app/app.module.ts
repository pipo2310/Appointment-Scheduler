import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeEstudiantePruebaComponent } from './estudiante/home-estudiante-prueba/home-estudiante-prueba.component';
import { HomeProfesorPruebaComponent } from './profesor/home-profesor-prueba/home-profesor-prueba.component';
import { AppRoutingModule } from './app-routing.module';
import { ProfesorComponent } from './profesor/profesor/profesor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeEstudiantePruebaComponent,
    HomeProfesorPruebaComponent,
    ProfesorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
