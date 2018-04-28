import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { User } from "../../../user"
import { SearchService } from '../../../shared/services/search.service';
import { RutUserService } from '../../../shared/services/rut-user.service';
import { UserService } from '../../services/user.service';
import { Rut_user } from '../../../rut_user';
import { Rut } from '../../../rut';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})



export class IndexComponent implements OnInit {
  log: string;
  email: string;
  points: string;
  ruts: Rut[] = [];
  ruts_users: Rut_user[] = [];
  users: User[] = [];
  current_rut: Rut = new Rut();
  user: User;
  putButton: boolean;

  constructor(private searchService: SearchService, private rutService: RutUserService, private userService: UserService) {

  }

  ngOnInit() {
    this.log = sessionStorage.getItem("username");
    this.email = sessionStorage.getItem("email");
    this.points = sessionStorage.getItem("puntos");
    this.getRuts();



  }

  puntos() {
    this.getUser();
    this.getRut_User();
    for (let i = 0; i < this.ruts_users.length; i++) {
      for (let j = 0; j < this.users.length; j++) {
        if (this.ruts_users[i].rut_id === this.current_rut.id && this.ruts_users[i].user_id === this.users[j].id) {
          this.user = this.users[j];
          this.user.point += 20;
          this.updateUser();
        }
      }
    }
    this.viewIndex();
  }

  viewIndex(){
    this.getUser();
    for (let i = 0; i < this.users.length; i++) {
      if(this.users[i].email === sessionStorage.getItem("email") && this.users[i].username === sessionStorage.getItem("username")){
         sessionStorage.setItem("puntos",this.users[i].point.toString());
      }
    }
    this.ngOnInit();
  }

  editRut(id: number) {

    for (let i = 0; i < this.ruts.length; i++) {
      if (this.ruts[i].id === id) {
        this.current_rut = this.ruts[i];
        this.current_rut.status = false;
        this.puntos();
        this.updateRut();
      }
    }
    this.ngOnInit();
  }




  getRuts() {
    this.searchService.getRut()
      .subscribe(ruts => {
        this.ruts = ruts;
        var id = parseInt(sessionStorage.getItem("id"))
        for (let i = 0; i < this.ruts.length; i++) {
          if (id != this.ruts[i].id_user) {
            var pos = this.ruts.indexOf(this.ruts[i]);
            var elementoEliminado = this.ruts.splice(pos, 1);
          }
        }
      });
  }



  updateRut() {
    this.searchService.updateRut(this.current_rut)
      .subscribe(res => {
        this.ngOnInit();
      });
  }


  getRut_User() {
    this.rutService.get()
      .subscribe(ruts => {
        this.ruts_users = ruts;
      });
  }

  getUser() {
    this.userService.getUsers()
      .subscribe(users => {
        this.users = users;
      });
  }

  updateUser() {
    this.userService.updateUser(this.user)
      .subscribe(res => {
        this.ngOnInit();
      });
  }



}


