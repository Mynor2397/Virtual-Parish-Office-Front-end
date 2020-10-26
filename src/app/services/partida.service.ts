import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Book } from '../models/books.model';
import { Partida } from '../models/partida.model';

@Injectable({
  providedIn: 'root'
})
export class PartidaService {

  constructor(private http: HttpClient) { }

  createPartida(partida) {
    let p = new Partida()
    p = partida

    var dateborn = new Date(p.borndate)
    var datepatism = new Date(p.baptism_date)

    var borndate = `${dateborn.getFullYear()}-${dateborn.getMonth() + 1}-${dateborn.getDate()}`
    var baptismdate = `${datepatism.getFullYear()}-${datepatism.getMonth() + 1}-${datepatism.getDate()}`
    // var data = {}
    var data = {
      firstname: p.firstname,
      secondname: p.secondname,
      lastname: p.lastname,
      secondlastname: p.secondlastname,
      borndate: borndate,
      dpi: p.dpi,
      sex: p.sex,
      folio: p.folio,
      baptism_date: baptismdate,
      priest: {
        id_priest: p.priest
      },
      place: {
        id: p.place
      },
      address: p.address,
      father: {
        id_father: p.id_father
      },
      mother: {
        id_mother: p.id_mother
      },
      godfather: {
        id_godfather: p.id_godfather
      },
      godmother: {
        id_godmother: p.id_godmother
      },
      manager: {
        id_manager: p.id_manager
      }
    }
    return this.http.post(`${environment.URL}/documents/baptisms`, data)
  }

  getFolios(book: string) {
    return this.http.get(`${environment.URL}/documents/folio/${book}`)
  }

  getBooks() {
    return this.http.get(`${environment.URL}/documents/books`)
  }

  getCountBoks(){
    return this.http.get(`${environment.URL}/documents/books/all`)
  }

  createBook(book: Book){
    return this.http.post(`${environment.URL}/documents/books`, JSON.stringify(book))
  }

  getAudit(){
    return this.http.get(`${environment.URL}/documents/audits`)
  }

  postAudit(id:string){
    let data = {
      id_baptism: id
    }
    return this.http.post(`${environment.URL}/documents/audits`, JSON.stringify(data))
  }
}
