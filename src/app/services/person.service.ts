import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Person } from '../models/person.model';
import { Place } from '../models/place.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) { }

  insertPerson(person: Person) {
    return this.http.post(`${environment.URL}/persons/create`, JSON.stringify(person))
  }

  getPerson(sex: string) {
    return this.http.get(`${environment.URL}/persons/many/${sex}`)
  }

  getBaptizedPerson(limit) {
    return this.http.get(`${environment.URL}/persons/baptized/by/${limit || 0}`)
  }

  getBaptizedPersonByFilter(filter: string) {
    return this.http.get(`${environment.URL}/persons/baptized/${filter}`)
  }

  getPartida(id: string) {
    return this.http.get(`${environment.URL}/persons/partida/${id}`)
  }

  deletePartida(id:string){
    return this.http.delete(`${environment.URL}/persons/partida/${id}`)
  }

  getPersonByLimitAndFilter(limit, filter){
    return this.http.get(`${environment.URL}/persons/by/${limit || 0}/${filter || 'GMF'}`)
  }

  personUpdate(person:Person){
    return this.http.put(`${environment.URL}/persons/${person.id}`, JSON.stringify(person))
  }

}
