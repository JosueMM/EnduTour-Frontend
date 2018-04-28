import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { SearchService } from '../../services/search.service';
import { RutUserService } from '../../services/rut-user.service';
import { Rut } from '../../../rut';
import { Rut_user } from '../../../rut_user';
import { Session } from 'protractor';
import { Join } from '../../../joinIntegrantes';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {





  closeResult: string;
  joins: Join[];
  join: Join;
  ruts: Rut[] = [];
  ruts_users: Rut_user[];
  current_rut: Rut;
  current_rut_user: Rut_user;
  idRut: number;
  mensaje: string;
  operation = { is_new: true };
  inicio: number;
  buscar: string;



  constructor(private modalService: NgbModal, private searchService: SearchService, private ruts_userService: RutUserService) { }


  open(content, id) {
    if (this.operation.is_new) {

      this.current_rut = new Rut();


    }
    this.modalService.open(content).result.then((result) => {

      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  addme(id: number) {
    sessionStorage.setItem("idRut", id.toString());
    this.getRut_user();
    for (let i = 0; i < this.ruts.length; i++) {
      if (this.ruts[i].id === id) {
        this.current_rut = this.ruts[i];
      }

    }
    if (!this.registred()) {
      this.current_rut_user = new Rut_user();
      this.current_rut_user.rut_id = id;
      this.current_rut_user.user_id = parseInt(sessionStorage.getItem("id"));
      if (this.current_rut.inte === this.current_rut.intefull) {
        this.current_rut.intefull += 1;
        this.updateRute(this.current_rut);
        this.addRut_user();
        alert("Unido al Tour!");
      } else {
        alert("El Tour ya esta lleno!");
      }
    } else {
      alert("Solo te puedes  unir una vez a  las rutas");
    }
  }

  registred() {
    this.getRut_user();
    this.current_rut_user = new Rut_user();
    this.current_rut_user.rut_id = parseInt(sessionStorage.getItem("idRut"));
    this.current_rut_user.user_id = parseInt(sessionStorage.getItem("id"));
    var exist = false;
    for (var i = 0; i < this.ruts_users.length; i++) {
      if (this.current_rut_user.rut_id === this.ruts_users[i].rut_id && this.current_rut_user.user_id === this.ruts_users[i].user_id) {
        exist = true;
      }
    }
    return exist;
  }



  ngOnInit() {

    if (this.buscar === undefined || this.buscar === "") {
      this.buscar = "";
      this.getRuts();
      this.getRut_user();
    }
  }



  editRuts(user: Rut) {
    this.current_rut = user;
    this.operation.is_new = false;
  }

  getRuts() {
    this.ruts = [];
    this.searchService.getRut()
      .subscribe(ruts => {
        for (let i = 0; i < ruts.length; i++) {
          if(ruts[i].status === true){
       this.ruts.push(ruts[i]);
          }
          
        }
      });
  }

  addRuts() {
    if (this.operation.is_new) {
      this.current_rut_user = new Rut_user();

      this.current_rut.intefull = 1;
      this.current_rut.status = true;
      this.current_rut.id_user = parseInt(sessionStorage.getItem("id"));

      this.searchService.addRut(this.current_rut)
        .subscribe(res => {
          this.current_rut_user.user_id = parseInt(sessionStorage.getItem("id"));
          this.current_rut_user.rut_id = res.id
          this.addRut_user();

          alert("Ruta Creada!");
          this.operation.is_new = false;
          this.current_rut = new Rut();
          this.ngOnInit();
        });

      return;
    }
    this.searchService.updateRut(this.current_rut)
      .subscribe(res => {
        this.current_rut = new Rut();
        this.operation.is_new = true;
        this.ngOnInit();
      });
  }

  updateRute(rut: Rut) {
    this.current_rut = rut;
    this.searchService.updateRut(this.current_rut)
      .subscribe(res => {
        this.current_rut = new Rut();
        this.operation.is_new = true;
        this.ngOnInit();
      });
  }

  deleterut(id: number) {
    this.searchService.deletrut(id)
      .subscribe(res => {
        this.ngOnInit();
      });
  }



  //Rut_Users
  getRut_user() {
    this.ruts_userService.get()
      .subscribe(ruts_users => {
        this.ruts_users = ruts_users;
      });
  }

  addRut_user() {

    if (this.operation.is_new) {

      this.ruts_userService.add(this.current_rut_user)
        .subscribe(res => {
          this.operation.is_new = false;
          this.current_rut_user = new Rut_user();
          this.ngOnInit();
        });
      return;
    }
    this.ruts_userService.update(this.current_rut_user)
      .subscribe(res => {
        this.current_rut_user = new Rut_user();
        this.operation.is_new = true;
        this.ngOnInit();
      });
  }

  burcar() {
    
    this.buscar = this.buscar.toLowerCase();
    for (let i = 0; i < this.ruts.length; i++) {
      var busqueda = this.ruts[i].end.toLowerCase();
      var busquedaV2 = this.ruts[i].start.toLowerCase();
      if(this.buscar === busqueda || this.buscar === busquedaV2 ){
      }else{
        var pos = this.ruts.indexOf(this.ruts[i]);
        alert(pos);
        this.ruts.splice(pos,1);
      }
    }

  }


}
