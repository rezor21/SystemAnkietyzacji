import { Component, OnInit } from '@angular/core';
import {AuthorizationService} from '../authorization.service'
@Component({
  selector: 'app-register-info',
  templateUrl: './register-info.component.html',
  styleUrls: ['./register-info.component.css']
})
export class RegisterInfoComponent implements OnInit {

  constructor(private authorizationService:AuthorizationService) { }
  succes:boolean = false;
  ngOnInit() {
    this.authorizationService.authorize().subscribe(
      user =>{  
          this.succes =true;
          
      },
      error =>{
        console.log(error);
        
        this.succes=false;
      }    
   )
  }

  success(){
      this.authorizationService.resetAuthorizationData();
  }

}
