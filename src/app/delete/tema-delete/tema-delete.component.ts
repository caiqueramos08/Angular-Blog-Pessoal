import { TemaService } from './../../service/tema.service';
import { Component, OnInit } from '@angular/core';
import { Tema } from 'src/app/model/Tema';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-delete',
  templateUrl: './tema-delete.component.html',
  styleUrls: ['./tema-delete.component.css']
})
export class TemaDeleteComponent implements OnInit {

  tema: Tema = new Tema()

  constructor(
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
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

  deletarTema(){
    this.temaService.deleteTema(this.tema.id).subscribe(() => {
      alert('press F to pay respect')
      this.router.navigate(['/temas'])
    })
  }

}
