import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import * as jsPDF from 'jspdf';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  

  insectos = [
    {
      "num": "1",
        "nombreCien": "San Vicente - Zarcero",
        "nombreCom": "2/6/1018",
        "Orden": "6:00 pm",
     
    },
    {
      "num": "2",
      "nombreCien": "Porvenir - San Vicente",
      "nombreCom": "10/4/2018",
      "Orden": "1:00 pm",
    
    },
    {
      "num": "3",
      "nombreCien": "Porvenir- Congo",
      "nombreCom": "10/4/2018",
      "Orden": "	2:00 pm",
   
    }];


  closeResult: string;

  downloadPDF(){
    const doc = new jsPDF();
    doc.text("Esto esta quemado hay que pasar el seleccionado \n num: 1 \n nombreCien: Morpho \n nombreCom: Mariposa \n Orden:  Lepidopter \n familia:Nymphalidae n\ filo:Arthropoda",10,10);

    doc.save('entopedia.pfd');
  }


  constructor(private modalService: NgbModal) {}

  open(content,id) {
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
      return  `with: ${reason}`;
    }
  }
  




  ngOnInit() {
  }

}
