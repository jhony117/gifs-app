import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResponse, Gif } from '../interfaces/gifs.interfaces';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';


//? provide in : root hace que cualquir archivo pueda consumir este servicio
  //* de no tenerlo se tendira qeu declarar como una nueva caracteristica de la clase en el modulo "providers"
@Injectable({providedIn: 'root'})
export class GifsService {

  public gifList : Gif[] = [];

  private _tagsHistory : string[] = [];
  private apiKey :       string = 'xqVnMPBTkAMUTcxZbrMcjJcSxKSfbFJT';
  private serviceUrl:      string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) { 

    this.loadLocalStorage();
    console.log('Gifs SErvice Ready')
  }
  

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizaHistory(tag:string){
      tag = tag.toLowerCase();

      if (this._tagsHistory.includes(tag)){   //? solo deja pasar a los tag difetrentes del que se esta almacenando
        this._tagsHistory=this._tagsHistory.filter((oldTag) => oldTag !== tag)
           //* filter : regresa todos los elementos cuya funcion regerse verdadero
      }

      this._tagsHistory.unshift(tag);
        this._tagsHistory = this._tagsHistory.splice(0,10);
        this.saveLocalStorage();
 
    }

      private loadLocalStorage():void{


        if(!localStorage.getItem('history') ) return;
        this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
        // this.searchTag( JSON.parse(localStorage.getItem('history')![0]));

        if (this._tagsHistory.length === 0) return;
        this.searchTag(this._tagsHistory[0]);
       
      }

    private saveLocalStorage():void{
      localStorage.setItem('history', JSON.stringify(this._tagsHistory))
    }

     searchTag(tag:string):void {

    if (tag.length === 0) return;

      this.organizaHistory(tag);

      const params = new HttpParams()
         .set('api_key', this.apiKey)
         .set('limit', '12')
         .set('q', tag)

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, {params})
      .subscribe(res => {
          this.gifList = res.data;
          console.log({gifs : this.gifList})
      })

      return; 
  }
}