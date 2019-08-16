import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RetornoPesquisa } from '../pesquisa/retornoPesquisa';

@Injectable({providedIn: 'root'})
export class ProdutoAVService{
    constructor(public http: HttpClient) { }

    listMovies(query: string, page: number){
        const observable = this.http.get<RetornoPesquisa>("https://api.themoviedb.org/3/search/movie?api_key=1feaee1568e8ea65c78670425ea80323&query=matrix&page=1");

        return observable;

        // observable.subscribe(resposta => {
        //     console.log(resposta.results);
        //     this.produtosav = resposta.results;
        // },
        // err => console.log(err.message));
    }
}