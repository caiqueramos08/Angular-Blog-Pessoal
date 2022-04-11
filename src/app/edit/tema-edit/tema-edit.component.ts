import { Tema } from './../../model/Tema';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-edit',
  templateUrl: './tema-edit.component.html',
  styleUrls: ['./tema-edit.component.css']
})
export class TemaEditComponent implements OnInit {

  tema: Tema = new Tema()

  constructor(
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    window.scroll(0,0)
    if(environment.token == ''){
      alert('Ta de brinks né irmão?')
      this.router.navigate(['/entrar'])
    }

    let id = this.route.snapshot.params['id']
    this.buscarTemaPorId(id)
  }

  buscarTemaPorId(id:number){
    this.temaService.getTemaById(id).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  editarTema(){
    this.temaService.putTema(this.tema).subscribe((resp: Tema) => {
      this.tema = resp;
      alert('Tema editadinho.... é noiz')
      this.router.navigate(['/temas'])
    })
  }

}
