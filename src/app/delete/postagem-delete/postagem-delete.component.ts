import { Postagem } from './../../model/Postagem';
import { environment } from 'src/environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostagemService } from 'src/app/service/postagem.service';

@Component({
  selector: 'app-postagem-delete',
  templateUrl: './postagem-delete.component.html',
  styleUrls: ['./postagem-delete.component.css']
})
export class PostagemDeleteComponent implements OnInit {

  postagem: Postagem = new Postagem()

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    if(environment.token == ''){
      alert('Ah não... vc denovo aqui?');
      this.router.navigate(['/entrar'])
    }

    let id = this.route.snapshot.params['id']
    this.getPostagemById(id)
  }

  getPostagemById(id: number) {
    this.postagemService.getPostagemById(id).subscribe((resp: Postagem) => {
      this.postagem = resp
      console.log(this.postagem)
    })
  }

  apagarPostagem() {
    this.postagemService.deletePostagem(this.postagem.id).subscribe(() => {
      alert('Postagem foi de base... 😥')
      this.router.navigate(['/inicio'])
    })
  }

}
