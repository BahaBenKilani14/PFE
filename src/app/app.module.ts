import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { TraiteurHomeComponent } from './traiteur-home/traiteur-home.component';
import { HomeComponent } from './pages/home/home.component';
import { AppComponent } from './app.component';


@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    HttpClientModule,
    LoginComponent,
    TraiteurHomeComponent,
    HomeComponent,
    AppComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  
  ],
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,]
})  
export class AppModule {}
