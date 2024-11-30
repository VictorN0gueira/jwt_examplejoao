import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { HomeComponent } from './components/home/home.component';

import { UsuarioService } from './services/usuario.service';
import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    HomeComponent, // Adicionando HomeComponent ao módulo
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule, // Certifique-se de incluir aqui
    RouterModule.forRoot(routes),
  ],
  providers: [UsuarioService],
  bootstrap: [AppComponent],
})
export class AppModule {}
