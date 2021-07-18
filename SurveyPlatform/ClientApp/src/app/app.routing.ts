import { Routes, RouterModule } from '@angular/router'
import { ModuleWithProviders } from '@angular/core'
import {AuthGuard} from './authentication/auth.guard'
import { RoleGuard} from './authentication/role.guard'

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'register',
    loadChildren: () => import('./authorization/authorization.module').then(m => m.AuthorizationModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./authentication/authentication-module').then(m => m.AuthenticationModule),
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    canActivate: [RoleGuard], 
    data: { 
      expectedRole: 'Użytkownik'
    }     
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [RoleGuard], 
    data: { 
      expectedRole: 'Administrator'
    } 
  }
]

export const routing: ModuleWithProviders = RouterModule.forRoot(routes,{useHash:true})
