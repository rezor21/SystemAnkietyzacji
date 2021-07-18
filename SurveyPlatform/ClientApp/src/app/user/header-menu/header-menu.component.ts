import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication/authentication.service'
import { Router, ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs'
import {UserService} from '../user.service'
@Component({
  selector: 'user-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css']
})
export class HeaderMenuComponent implements OnInit {
  username:string;

  constructor(
    private authenticationService:AuthenticationService,
    private router:Router,
    private route:ActivatedRoute,
    private userService:UserService
    ) { 
       
    }

  ngOnInit() {
    this.username = this.authenticationService.currentUserValue.username;   
  }
  logout(){
     this.authenticationService.logout();
     this.router.navigate(['login'], { relativeTo: this.route.root });
  }

}
