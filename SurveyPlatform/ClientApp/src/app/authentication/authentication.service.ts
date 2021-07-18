import { Injectable, NgZone} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, publish, refCount } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

import { environment } from '../../environments/environment';
import { User } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private zone: NgZone) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
   
    login(username: string, password: string) {

        var data = {
            Username: username,
            Password: password    
            };
        var httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
      return this.http.post<any>(`${environment.apiUrl}/users/login`, data, httpOptions)
        .pipe(map(user => {      
          user.authdata = window.btoa(username + ':' + password);
          user.role = user.rolename        
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);          
          return user;
        }));
    }

    logout() {  
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
