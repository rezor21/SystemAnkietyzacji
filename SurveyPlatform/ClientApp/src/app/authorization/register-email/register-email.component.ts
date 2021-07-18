import { Component, OnInit,ElementRef, NgZone,Input,Output,EventEmitter } from '@angular/core';
import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../../authentication/authentication.service';
import { first, publish } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthorizationService} from '../authorization.service';

@Component({
  selector: 'app-register-email',
  templateUrl: './register-email.component.html',
  styleUrls: ['./register-email.component.css']
})

export class RegisterEmailComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;
  error = '';
  
  constructor(
    private formBuilder: FormBuilder, 
    private elRef:ElementRef,
    private authenticationService:AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private zone:NgZone,
    private authorizationService:AuthorizationService
    ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        login: ['',[Validators.required,Validators.minLength(6)]],
        repeatedlogin: ['',Validators.required],
      },
      {
        validator: this.checkEmails
      }
    ) 
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  focusLoginInput(){
    var loginInput = this.elRef.nativeElement.querySelector("input[name='login']");
    loginInput.focus();
  }
  focusRepeatedemailInput(){
    var repeatedloginInput = this.elRef.nativeElement.querySelector("input[name='repeatedlogin']");
    repeatedloginInput.focus();
  }
  checkEmails(logins: FormGroup) { // here we have the 'passwords' group
    let login = logins.get('login').value;
    let repeatedlogin = logins.get('repeatedlogin').value;

    return login === repeatedlogin ? null : { notSame: true }     
  }
  onSubmit(){
    if(!this.loginForm.invalid){
      this.authorizationService.setLogin(this.login.value)
    }
  }
  get login() { return this.loginForm.controls.login; }
  get repeatedlogin() { return this.loginForm.controls.repeatedlogin; }

}
