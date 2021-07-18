import { Component, OnInit,ElementRef, NgZone,Input,Output,EventEmitter } from '@angular/core';
import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';
import { first, publish } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthorizationService} from '../authorization.service';
@Component({
  selector: 'app-register-password',
  templateUrl: './register-password.component.html',
  styleUrls: ['./register-password.component.css']
})
export class RegisterPasswordComponent implements OnInit {

  passwordForm: FormGroup;
  returnUrl: string;
  error = '';
  
  constructor(
    private formBuilder: FormBuilder, 
    private elRef:ElementRef,
    private route: ActivatedRoute,
    private router: Router,
    private zone:NgZone,
    private authorizationService:AuthorizationService
    ) { }

  ngOnInit() {
    this.passwordForm = this.formBuilder.group({
        password: ['',[Validators.required]],
        repeatedpassword: ['',Validators.required],
      },
      { validator: [this.checkPasswords,
                    this.checkPasswordLength,
                    this.checkPasswordUpperCase,
                    this.checkPasswordNumbers,
                    this.checkPasswordLowerCase,
                    this.checkPasswordSpecialChar] },
    ) 
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  focusPasswordInput(){
    var loginInput = this.elRef.nativeElement.querySelector("input[name='password']");
    loginInput.focus();
  }
  focusRepeatedPasswordInput(){
    var repeatedloginInput = this.elRef.nativeElement.querySelector("input[name='repeatedpassword']");
    repeatedloginInput.focus();
  }
  checkPasswords(passwords: FormGroup) { 
    let passowrd = passwords.get('password').value;
    let repeatedpassword = passwords.get('repeatedpassword').value;

    return passowrd === repeatedpassword ? null : { notSame: true }     
  }
  checkPasswordLength(passwords: FormGroup) { 
    let passowrd = passwords.get('password').value;
    return passowrd.length > 5 ? null : { minLengthReg: true }     
  }
  checkPasswordNumbers(passwords: FormGroup) { 
    let passowrd = passwords.get('password').value;
    let pattern = new RegExp('[0-9]');
   
    return pattern.test(passowrd)? null : { numbersReq: true }     
  }
  checkPasswordUpperCase(passwords: FormGroup) { 
    let passowrd = passwords.get('password').value;
    let pattern = new RegExp('[A-Z]');
  
    return pattern.test(passowrd)? null : { upperCaseReq: true }     
  }
  checkPasswordLowerCase(passwords: FormGroup) { 
    let passowrd = passwords.get('password').value;
    let pattern = new RegExp('[a-z]');
   
    return pattern.test(passowrd)? null : { lowerCaseReq: true }     
  }
  checkPasswordSpecialChar(passwords: FormGroup) { 
    let passowrd = passwords.get('password').value;
    let pattern = new RegExp('[^A-Za-z0-9]');
   
    return pattern.test(passowrd)? null : { specialCharReq: true }     
  }
  onSubmit(){
    if(!this.passwordForm.invalid){
       this.authorizationService.setPassword(this.password.value);
    }
  }
  get password() { return this.passwordForm.controls.password; }
  get repeatedpassword() { return this.passwordForm.controls.repeatedpassword; }

}
