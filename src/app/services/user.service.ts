import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators'

import { Claims } from '../models/claims.model';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject: BehaviorSubject<Claims>;
  public user: Observable<Claims>;

  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<Claims>(JSON.parse(localStorage.getItem('claims')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): Claims {
    return this.userSubject.value;
  }

  login(user: User) {
    return this.http.post<Claims>(`${environment.URL}/login`, JSON.stringify(user))
      .pipe(map(Claims => {
        if (Claims && Claims.token) {
          localStorage.setItem('claims', JSON.stringify(Claims));
          this.userSubject.next(Claims)
        }

        return Claims;
      }))
  }

  logout() {
    localStorage.removeItem('claims');
    this.userSubject.next(null);
  }

  crearUsuario(user: User){
    console.log(user)
    return this.http.post(`${environment.URL}/users/register`, JSON.stringify(user))
  }

  usermany(){
    return this.http.get(`${environment.URL}/users/many`)
  }

  rols(){
    return this.http.get(`${environment.URL}/users/rols`)
  }
}
