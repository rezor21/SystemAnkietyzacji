import { Routes, RouterModule } from '@angular/router'
import { ModuleWithProviders } from '@angular/core'
import { HeaderMenuComponent } from './header-menu/header-menu.component'
import { UserComponent } from './user.component'
import { SurveyComponent} from './survey/survey.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';


export const routes: Routes = [
    {
      path:'',
      redirectTo:'survey'
    },
    { path: '', 
      component: UserComponent,    
      children: [
        {
          path: 'survey', 
          component: SurveyComponent 
        },    
        {
          path:'questionnaire/:id',
          component: QuestionnaireComponent
        }
      ]} ,
   
]

export const routing: ModuleWithProviders = RouterModule.forChild(routes)
