import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { UserService } from '../../../user/services/user.service';

import { User } from '../../../user';
import { Static } from '../../../static';
import { forEach } from '@angular/router/src/utils/collection';
import { FlashMessage } from 'angular-flash-message';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {


  closeResult: string;
  mensaje: string;
  email_login: string;
  password_login: string;
  users: User[];
  current_user: User = new User();
  


  operation = { is_new: true };

  constructor(private modalService: NgbModal, private userService: UserService, private flashMessage: FlashMessagesService) { }

  open(content, id) {
    if (this.operation.is_new) {
      this.current_user = new User();
      this.current_user.point = 0;

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

  ngOnInit() {
    
    this.getUsers();
  }


  login() {
    this.getUsers();


    var exist = true;
    for (var i = 0; i < this.users.length; i++) {
      if (this.users[i].email === this.email_login && this.users[i].password == this.password_login) {


        exist = false;
        sessionStorage.setItem("username", this.users[i].username);
        sessionStorage.setItem("id", (this.users[i].id).toString());
        sessionStorage.setItem("email", (this.users[i].email));
        sessionStorage.setItem("puntos", (this.users[i].point).toString());


        window.location.href = 'http://localhost:4200/principal';
      }
    }
    if (exist) {
      alert("Credenciales incorrectos");
    }

  }

  editUser(user: User) {
    this.current_user = user;
    this.operation.is_new = false;
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe(users => {
        this.users = users;
      });
  }

  addUser() {
    if (this.operation.is_new) {
      this.userService.addUser(this.current_user)
        .subscribe(res => {
          this.operation.is_new = false;
          this.current_user = new User();
          this.ngOnInit();
        });
      return;
    }
  
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id)
      .subscribe(res => {
        this.ngOnInit();
      });
  }

}
