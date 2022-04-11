import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  usuarioLogin: UsuarioLogin = new UsuarioLogin();

  constructor(
    private auth: AuthService,
    private route: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }


  logar(){
    this.auth.logar(this.usuarioLogin).subscribe({
      next: (resp: UsuarioLogin) => {
        this.usuarioLogin = resp;

        environment.foto = this.usuarioLogin.foto
        environment.nome = this.usuarioLogin.nome
        environment.token = this.usuarioLogin.token
        environment.usuario = this.usuarioLogin.usuario
        environment.tipo = this.usuarioLogin.tipo
        environment.id = this.usuarioLogin.id

        this.route.navigate(['/inicio'])
      },
      error:
      erro => {
      if(erro.status == 401) {
        alert('Usuário ou senha inválidos')
      }
    },
  })
  }

}
