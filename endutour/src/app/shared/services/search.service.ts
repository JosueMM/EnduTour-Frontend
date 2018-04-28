import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Rut } from '../../rut';
import { Rut_user } from '../../rut_user';

@Injectable()
export class SearchService {

  baseUrl: string = "http://localhost:3000/ruts";

  constructor(private http: HttpClient) { }

  getRut() {
    return this.http.get<Rut[]>(`${this.baseUrl}`)
      .map(rut => rut);
  }

  addRut(newRut: Rut) {
   
    return this.http.post<Rut>(`${this.baseUrl}`, newRut)
      .map(rut => rut);
  }

  updateRut(newRut: Rut) {
    return this.http.put(`${this.baseUrl}/${newRut.id}`, newRut)
      .map(res => res);
  }

  deletrut(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`)
      .map(res => res);
  }

}
