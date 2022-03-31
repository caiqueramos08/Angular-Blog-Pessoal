import { CadastrarComponent } from './cadastrar/cadastrar.component';
import {LoginComponent} from './login/login.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {path: '', redirectTo: 'login', pathMatch: 'full'},

  {path:'login', component: LoginComponent},
  {path: 'cadastrar', component: CadastrarComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
