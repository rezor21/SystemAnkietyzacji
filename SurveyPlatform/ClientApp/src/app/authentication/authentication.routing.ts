import { LoginComponent} from './login/login.component'
import { Routes, RouterModule } from '@angular/router'
import { ModuleWithProviders } from '@angular/core'

import { from } from 'rxjs'

export const routes: Routes = [
    { path: '', component: LoginComponent}
]

export const routing: ModuleWithProviders = RouterModule.forChild(routes)