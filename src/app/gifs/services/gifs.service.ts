import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'qcrjrkpMsqWJv52Ks3Ua3uOTwbehoDiD';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  // TODO: cambiar any por su tipo
  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor( private http: HttpClient) {

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
    

    // if(localStorage.getItem('historial')){
    //   this._historial = JSON.parse(localStorage.getItem('historial')!);
    // }

  }//esto es un modulo que hemos importado en el app.module.ts para hacer las peticiones

  buscarGifs(query: string = '') {
  // async buscarGifs(query: string = '') {

    query = query.trim().toLowerCase();

    if (!this._historial.includes(query)) {

      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial) )
    }

    const params = new HttpParams()
    .set('api_key',this.apiKey)
    .set('limit','10')
    .set('q',query)

    // console.log(params.toString())

    // this.http.get<SearchGifsResponse>(`${ this.servicioUrl}/search?api_key=${this.apiKey}&q=${query}&limit=10`)
    this.http.get<SearchGifsResponse>(`${ this.servicioUrl}/search`, { params:params } ) //para hacer la peticion mas bonita y mas repetible
      .subscribe((resp)=>{
        // console.log(resp.data);
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados) )

      }) //esto es como un fecth, pero en vez de ser una promesa (objeto asincrono) devuelve un OBSERVABLE

    // const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=qcrjrkpMsqWJv52Ks3Ua3uOTwbehoDiD&q=dragon ball z&limit=10');
    // const data = await resp.json();
    // console.log(data)  // fetch hecho con async await

    // fetch('https://api.giphy.com/v1/gifs/search?api_key=qcrjrkpMsqWJv52Ks3Ua3uOTwbehoDiD&q=dragon ball z&limit=10')
    // .then(r=>r.json())
    // .then(data=>{
    //   console.log(data)
    // }) // Tipico fetch de los que he hecho siempre

    // console.log(this._historial);
  }

}
