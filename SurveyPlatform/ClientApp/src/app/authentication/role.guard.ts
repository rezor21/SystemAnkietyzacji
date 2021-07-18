import { Injectable } from '@angular/core';
import { Router, CanActivate,ActivatedRouteSnapshot} from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  
  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot){
    const expectedRole = route.data.expectedRole;
    const currentUser = this.authenticationService.currentUserValue;
    if(currentUser){
        if(currentUser.role !== expectedRole){      
            this.router.navigate(['/login']);
            return false;
        }else {
          return true;
        }
    }else{
      this.router.navigate(['/login']);
      return false;   
    } 
  
  }
}