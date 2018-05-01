import { Component, OnInit } from '@angular/core';
import { User } from '../../../user';
import { Rut } from '../../../rut';
import { RutUserService } from '../../services/rut-user.service';
import { SearchService } from '../../services/search.service';
import { UserService } from '../../../user/services/user.service';

@Component({
  selector: 'app-premios',
  templateUrl: './premios.component.html',
  styleUrls: ['./premios.component.css']
})
export class PremiosComponent implements OnInit {

  users: User[] = [];
  user: User;

  constructor(private searchService: SearchService, private rutService: RutUserService, private userService: UserService) { }

  ngOnInit() {
    var email = sessionStorage.getItem("email")

    if(email === undefined || email === ""){
window.location.href = "http://localhost:4200/NotFound";
    }
  }


  puntos(puntos: number,produtc: string) {
    this.getUser();

    var can = false;

    for (let i = 0; i < this.users.length; i++) {

      var email = sessionStorage.getItem("email");
      if (email === this.users[i].email) {
        if (this.users[i].point >= puntos) {
          this.user = this.users[i];
          this.user.point -= puntos;
          sessionStorage.setItem("puntos", this.user.point.toString());
          can = true;
          this.updateUser();
        }
      }
    }
    if (can) {
      alert("Usuario: " + this.user.username + "\n"
        + "Haz reclamado " + produtc + "\n"
        + "Por lo que se te descontaron " + puntos+" puntos\n"
        + "Codigo: " + this.user.username + "Enduro-Tour" + produtc + puntos+"\n"
        + "Deberás ir a los lugares de los patrocinadores a reclamar tu cupón"
      );
    }else{
      alert("No tienes los suficientes puntos para este premio");
    }
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

      });
  }

}
