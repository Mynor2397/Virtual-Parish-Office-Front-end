import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

import { Notification } from '../models/notification.model'

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  sendNotification(notification: Notification) {
    return this.http.post(`${environment.URL}/documents/mail/send`, JSON.stringify(notification))
  }
}
