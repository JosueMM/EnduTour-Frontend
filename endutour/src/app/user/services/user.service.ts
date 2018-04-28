import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { User } from '../../user';

@Injectable()
export class UserService {

  baseUrl: string = "http://localhost:3000/users";

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<User[]>(`${this.baseUrl}`)
      .map(user => user);
  }

  addUser(newUser: User) {
   
    return this.http.post<User>(`${this.baseUrl}`, newUser)
      .map(user => user);
  }

  updateUser(newUser: User) {
    return this.http.put(`${this.baseUrl}/${newUser.id}`, newUser)
      .map(res => res);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`)
      .map(res => res);
  }
}
