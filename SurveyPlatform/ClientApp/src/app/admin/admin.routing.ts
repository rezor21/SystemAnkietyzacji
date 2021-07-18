import { Routes, RouterModule } from '@angular/router'
import { ModuleWithProviders } from '@angular/core'
import { SurveyComponent} from './survey/survey.component'
import { AdminComponent } from './admin.component'
import {QuestionnaireComponent} from './questionnaire/questionnaire.component'
import { from } from 'rxjs'
import { importExpr } from '@angular/compiler/src/output/output_ast'

export const routes: Routes = [
    {  
         path:'',
        redirectTo:'survey'
    },
    { 
        path: '',
        component: AdminComponent,
        children: [{
            path:'survey',
            component: SurveyComponent 
        }, 
        {
          path:'questionnaire/:id',
          component: QuestionnaireComponent
        }]
    }     
]

export const routing: ModuleWithProviders = RouterModule.forChild(routes)