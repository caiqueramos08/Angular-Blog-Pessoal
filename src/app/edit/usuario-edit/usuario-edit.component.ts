import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {

  usuario: Usuario = new Usuario()
  confirmSenha: string
  tipoUsuario: string

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService
  ) { }

  ngOnInit() {
    window.scroll(0,0)
    if (environment.token == '') {
      alert('ai você me complica né....')
      this.router.navigate(['/entrar'])
    }

    let id = this.route.snapshot.params['id']
    this.getUsuarioById(id)
  }

  getUsuarioById(id: number){
    this.auth.getUserById(id).subscribe((resp: Usuario) => {
      this.usuario = resp
      this.usuario.senha = ''
    })
  }

  confirmarSenha(event: any) {
    this.confirmSenha = event.target.value;
  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value;
  }

  editarUsuario(){
    this.auth.atualizar(this.usuario).subscribe((resp: Usuario) => {
      this.usuario = resp
      alert('Usuario atualizado, faça login novamente.')

      environment.foto = ''
      environment.nome = ''
      environment.tipo = ''
      environment.token = ''
      environment.usuario = ''
      environment.id = 0

      this.router.navigate(['/entrar'])

    })
  }

}
