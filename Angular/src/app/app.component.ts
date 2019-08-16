import { Component } from '@angular/core';
import { ProdutoAVService } from './produtoav/produtoav.service';
import { ProdutoAV } from './produtoav/produtoav';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'UvaPassa.TOP!!!';
  marquee = "Uma pequena passa para o arroz, uma grande passa para a farofa";
  baseUrl = "https://image.tmdb.org/t/p/w500/";

  produtosavBkp = [
    {
      "popularity":40.219,
      "id":603,
      "video":false,
      "vote_count":14850,
      "vote_average":8.1,
      "title":"The Matrix",
      "release_date":"1999-03-30",
      "original_language":"en",
      "original_title":"The Matrix",
      "genre_ids":[28,878],
      "backdrop_path":"\/icmmSD4vTTDKOq2vvdulafOGw93.jpg",
      "adult":false,
      "overview":"Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents fighting the vast and powerful computers who now rule the earth.",
      "poster_path":"\/hEpWvX6Bp79eLxY1kX5ZZJcme5U.jpg"
    },
    {"popularity":20.363,"vote_count":5901,"video":false,"poster_path":"\/ezIurBz2fdUc68d98Fp9dRf5ihv.jpg","id":604,"adult":false,"backdrop_path":"\/Fp3piEuHXxKnPBO5R0Wj4wjZHg.jpg","original_language":"en","original_title":"The Matrix Reloaded","genre_ids":[28,12,878,53],"title":"The Matrix Reloaded","vote_average":6.9,"overview":"Six months after the events depicted in The Matrix, Neo has proved to be a good omen for the free humans, as more and more humans are being freed from the matrix and brought to Zion, the one and only stronghold of the Resistance.  Neo himself has discovered his superpowers including super speed, ability to see the codes of the things inside the matrix and a certain degree of pre-cognition. But a nasty piece of news hits the human resistance: 250,000 machine sentinels are digging to Zion and would reach them in 72 hours. As Zion prepares for the ultimate war, Neo, Morpheus and Trinity are advised by the Oracle to find the Keymaker who would help them reach the Source.  Meanwhile Neo's recurrent dreams depicting Trinity's death have got him worried and as if it was not enough, Agent Smith has somehow escaped deletion, has become more powerful than before and has fixed Neo as his next target.","release_date":"2003-05-15"},{"popularity":18.232,"id":605,"video":false,"vote_count":5305,"vote_average":6.6,"title":"The Matrix Revolutions","release_date":"2003-11-05","original_language":"en","original_title":"The Matrix Revolutions","genre_ids":[12,28,53,878],"backdrop_path":"\/pdVHUsb2eEz9ALNTr6wfRJe5xVa.jpg","adult":false,"overview":"The human city of Zion defends itself against the massive invasion of the machines as Neo fights to end the war at another front while also opposing the rogue Agent Smith.","poster_path":"\/2aJvwc4zXqtVUDbEu62e14J0mhe.jpg"},{"popularity":6.034,"id":14543,"video":false,"vote_count":105,"vote_average":6.8,"title":"The Matrix Revisited","release_date":"2001-11-20","original_language":"en","original_title":"The Matrix Revisited","genre_ids":[99],"backdrop_path":"\/lBdXACywnLwKUZmZkZ87djDQBeV.jpg","adult":false,"overview":"The film goes behind the scenes of the 1999 sci-fi movie The Matrix.","poster_path":"\/kR4xt6eVdTS1agmUiL4RHXEYkDs.jpg"}
  ];

  
  produtosav:ProdutoAV[] = [];

  constructor(produtoAVService: ProdutoAVService){
    
    produtoAVService.listMovies('Matrix', 1)
      .subscribe(resposta => {
          this.produtosav = resposta.results;
      },
      err => console.log(err.message));

  }

}