import { Component, OnInit } from '@angular/core';
import {AdminService} from '../admin.service';
@Component({
  selector: 'app-error-pop-up',
  templateUrl: './error-pop-up.component.html',
  styleUrls: ['./error-pop-up.component.css']
})
export class ErrorPopUpComponent implements OnInit {

  title:string;
  description:string;
  
  open:boolean = false;
  constructor(private adminService:AdminService) { 
    this.adminService.errorPopup$.subscribe(message=>{
       this.title = message.title,
       this.description = message.description
       this.open = true;
    })
  }
  Ok(){
    console.log("eeeee");
    this.open =false;
  }
  ngOnInit() {
  }

}
