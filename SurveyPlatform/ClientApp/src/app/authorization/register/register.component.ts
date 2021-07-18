import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {AuthorizationService} from '../authorization.service';
import { BehaviorSubject, Observable } from 'rxjs';
import {} from 'rxjs/operators';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isLoginConfirm = false;
  isPasswordConfirm = false;
  constructor(private authorizationService:AuthorizationService) { 
      this.authorizationService.login.subscribe(l => {
        if(l != ''){
          this.isLoginConfirm = true;
        }else{
          this.isLoginConfirm = false;
          
        }
      });
      this.authorizationService.password.subscribe(l => {
        if(l != ''){
          this.isPasswordConfirm = true;
        }else{
          this.isPasswordConfirm = false;
        }   
     })
  }

  ngOnInit() {
   
  }

}
