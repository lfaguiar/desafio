import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule }    from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";

import { AppComponent } from './app.component';
import { PrincipalComponent } from './modules/principal/principal.component';
import { ProdutoService } from './services/produto.service';
import { TemplateCabecalhoComponent } from './modules/template-cabecalho/template-cabecalho.component';
import { TemplateMenuComponent } from './modules/template-menu/template-menu.component';
import { LoginComponent } from './modules/login/login.component';
import { AppRotaModule } from './app-rota.module';
import { ProdutoManterComponent } from './modules/produto-manter/produto-manter.component';
import { OutroService } from './services/outro.service';


let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("833954718952-vjvitclfqpc22nice5ltmeao1urobtoi.apps.googleusercontent.com")
  }
]);

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    TemplateCabecalhoComponent,
    ProdutoManterComponent,
    TemplateMenuComponent,
    LoginComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    HttpModule,
    SocialLoginModule.initialize(config),
    AppRotaModule
  ],
  providers: [ProdutoService, OutroService],
  bootstrap: [AppComponent]
})
export class AppModule { }