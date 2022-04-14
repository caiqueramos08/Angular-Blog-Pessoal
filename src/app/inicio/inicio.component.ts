import { TemaService } from './../service/tema.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { Postagem } from '../model/Postagem';
import { PostagemService } from '../service/postagem.service';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  postagem: Postagem = new Postagem();
  listaPostagens: Postagem[]

  listaTemas: Tema[];
  tema: Tema = new Tema();
  idTema: number;

  idUser = environment.id;
  usuario: Usuario = new Usuario()

  constructor(
    private route: Router,
    private temaService: TemaService,
    private postagemService: PostagemService,
    public auth: AuthService
  ) {}

  ngOnInit() {
    window.scroll(0, 0);

    if (environment.token == '') {
      alert('Você precisa estar logado pra ficar aqui');
      this.route.navigate(['/entrar']);
    }

    this.auth.refreshToken();
    this.buscarTemas();
    this.buscarPostagens();
  }

  usuarioPorId(){
    this.auth.getUserById(this.idUser).subscribe((resp: Usuario) => {
      this.usuario = resp
    })
  }

  buscarTemas() {
    this.temaService.getTemas().subscribe((resp: Tema[]) => {
      this.listaTemas = resp;
    });
  }

  buscarTemaPorId() {
    this.temaService.getTemaById(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp;
    });
  }

  buscarPostagens() {
    this.postagemService.getPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp;
    });
  }

  criarPostagem() {
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.usuario.id = this.idUser
    this.postagem.usuario = this.usuario

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp;
      alert('Postagem criada com sucesso')
      this.postagem = new Postagem()
      this.buscarPostagens()
    })
  }

  

}
