import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Place } from '../models/place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(private http:HttpClient) { }

  getPlaces(){
    return this.http.get(`${environment.URL}/place/many`)
  }

  insertPlace(place:Place){
    console.log(place)
    return this.http.post(`${environment.URL}/place/create`, JSON.stringify(place))
  }

  getCountPlaces(){
    return this.http.get(`${environment.URL}/place/all`)
  }
}
