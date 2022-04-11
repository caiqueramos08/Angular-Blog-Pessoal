import { Router } from '@angular/router';
import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  nome = environment.nome;
  foto = environment.foto;
  idUser = environment.id

  constructor(private route: Router) {}

  ngOnInit(): void {}

  sair() {
    environment.foto = '';
    environment.nome = '';
    environment.token = '';
    environment.usuario = '';
    environment.id = 0;
    this.route.navigate(['/entrar'])
  }
}
