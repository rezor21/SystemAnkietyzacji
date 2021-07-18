import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { nextTick } from 'process';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, publish, refCount } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  public login:BehaviorSubject<string>;
  public password: BehaviorSubject<string>;
  
  constructor(private http: HttpClient) { 
     this.login =  new BehaviorSubject('');
     this.password = new BehaviorSubject('');
  }

  public setLogin(login){
    this.login.next(login);
  }
  public setPassword(password){
    this.password.next(password);
  }
  public resetAuthorizationData(){
    this.login.next('');
    this.password.next('');
  }
  public authorize(){
    
    var data = {
      Username: this.login.value,
      Password: this.password.value    
      };
    var httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
     return this.http.post<any>(`${environment.apiUrl}/users/register`, data, httpOptions);
  }
}
