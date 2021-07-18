import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service'
@Component({
  selector: 'user-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  title:string;
  showBackBooton:boolean;
  constructor(private userService:UserService) {
    this.userService.headerMenutitle$.subscribe(value => {
      this.title = value;
      if (this.title === 'Moja Lista Ankiet'){
         this.showBackBooton = false;
      }else{
        this.showBackBooton =true;
      }
    })
   }

  ngOnInit() {
  }

}
