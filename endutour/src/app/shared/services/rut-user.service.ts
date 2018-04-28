import { Injectable } from '@angular/core';

import { Rut_user } from '../../rut_user';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RutUserService {

  baseUrl: string = "http://localhost:3000/ruts_users";

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<Rut_user[]>(`${this.baseUrl}`)
      .map(rut => rut);
  }

  add(newRut: Rut_user) {
   
    return this.http.post<Rut_user>(`${this.baseUrl}`, newRut)
      .map(rut => rut);
  }

  update(newRut: Rut_user) {
    return this.http.put(`${this.baseUrl}/${newRut.id}`, newRut)
      .map(res => res);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`)
      .map(res => res);
  }
}