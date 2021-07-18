import { RegisterComponent} from './register/register.component'
import { Routes, RouterModule } from '@angular/router'
import { ModuleWithProviders } from '@angular/core'


export const routes: Routes = [
    { path: '', component: RegisterComponent}
]

export const routing: ModuleWithProviders = RouterModule.forChild(routes)