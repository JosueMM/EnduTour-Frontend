import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { Image } from '../../../image';
import { IMAGES } from '../../../mock-images';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  images: Image[];

  constructor(private homeService: HomeService) { }

  ngOnInit() {
   this.getImages();
  }

  getImages(): void {
    this.homeService.getImages()
      .subscribe(images => this.images = images);
  }



}
