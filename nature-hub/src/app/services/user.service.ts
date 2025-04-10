import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  addUser(newList: User) {
    return this.http.post<any>('https://localhost:44337/api/User', newList, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  loginUser(oldUser: Omit<User, 'name'>) {
    return this.http.post('https://localhost:44337/api/Auth/Login', oldUser, {
      headers: { 'content-Type': 'application/json' },
    });
  }
}
