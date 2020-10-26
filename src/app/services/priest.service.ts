import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Bpriest } from '../models/priest.model';

@Injectable({
  providedIn: 'root'
})
export class PriestService {

  constructor( private http: HttpClient) { }

  getPriest(){
    return this.http.get<any>(`${environment.URL}/persons/priest`)
  }
  
  getPriestByFilter(filter: string){
    return this.http.get<any>(`${environment.URL}/persons/priest/${filter}`)
  }

  createPriest(priest: Bpriest){
    return this.http.post(`${environment.URL}/persons/priest`, JSON.stringify(priest))
  }

  getPriestCount(){
    return this.http.get(`${environment.URL}/persons/priests/count`)
  }
}
