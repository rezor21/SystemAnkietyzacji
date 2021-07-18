import { Component, OnInit } from '@angular/core';
import {AdminService} from '../admin.service'
@Component({
  selector: 'admin-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  title:string;
  isMenuOpen:boolean = false;
  showBackBooton: boolean;
  isAddSurveyActiv: boolean;
  constructor(private adminService: AdminService) {
    this.isAddSurveyActiv = false;
    this.adminService.activAddSurveyItemButton$.subscribe(val => {
      this.isAddSurveyActiv = val;
    })
    this.adminService.headerMenutitle$.subscribe(value => {
      this.title = value;
      if(this.title === 'Lista Ankiet'){
         this.showBackBooton = false;
      }else{
        this.showBackBooton =true;
      }
    })
  }
  ngOnInit() {
  }
  openMenu(){
    this.isMenuOpen = !this.isMenuOpen;
  }
  onAddSurvey() {
    this.adminService.addSurveyButtonClicked(true);
  }

}
