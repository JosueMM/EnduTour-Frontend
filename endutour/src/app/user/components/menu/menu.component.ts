import { Component, OnInit } from '@angular/core';
import { MENUOPTIONS } from '../../../mock-menu';
import { MenuOptions } from '../../../menu-options';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menu_options: MenuOptions[] = MENUOPTIONS;
  
  
  user_log:string;

  constructor() { }

  ngOnInit() {

  }

logout(){
  sessionStorage.setItem("email","");
  sessionStorage.setItem("id","");
  sessionStorage.setItem("username","");
  window.location.href = "http://localhost:4200/inicio"

}



}
