import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProdutoManterComponent } from './modules/produto-manter/produto-manter.component';
import { LoginComponent } from './modules/login/login.component';
import { PrincipalComponent } from './modules/principal/principal.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'principal', component: PrincipalComponent },
  { path: 'manter-produto', component: ProdutoManterComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRotaModule { }
