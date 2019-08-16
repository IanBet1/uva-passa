import { ProdutoAV } from '../produtoav/produtoav';

export interface RetornoPesquisa{
    page:number,
    total_results:number,
    total_pages:number,
    results:ProdutoAV[]
}