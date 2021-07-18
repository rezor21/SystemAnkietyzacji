import { Component, OnInit,ElementRef, NgZone } from '@angular/core';
import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { first, publish } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  returnUrl: string;
  error = '';
  loading = false;
  displayError:Boolean =false;

  constructor(
    private formBuilder: FormBuilder, 
    private elRef:ElementRef,
    private authenticationService:AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private zone:NgZone
    ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      login: ['',Validators.required],
      password: ['',Validators.required],
    }) 
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  focusLoginInput(){
    var loginInput = this.elRef.nativeElement.querySelector("input[name='login']");
    loginInput.focus();
  }
  focusPasswordInput(){
    var passwordInput = this.elRef.nativeElement.querySelector("input[name='password']");
    passwordInput.focus();
  }
  onSubmit(){
    this.displayError = false;
    if (this.loginForm.invalid) {
        return;
    }
    if(!this.loading){
      this.loading = true;
      this.authenticationService.login(this.login.value, this.password.value)
          .pipe(first())
          .subscribe(
              user => {
               
                if (user.role === 'Użytkownik') {                               
                   this.router.navigate(['user'], { relativeTo: this.route.root });
                   console.log(user);
                } else if (user.role === 'Administrator') {
                  this.router.navigate(['admin'], { relativeTo: this.route.root });
                }          
                publish();             
              },
              error => {
                  this.error = error;             
                  this.loading = false;
                  this.displayError = true;
              });
    } 
  }
  Register() {
    this.router.navigate(['register'], { relativeTo: this.route.root });
    
  }
  get login() { return this.loginForm.controls.login; }
  get password() { return this.loginForm.controls.password; }
}
