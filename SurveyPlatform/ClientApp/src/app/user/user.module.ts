import {routing} from './user.routing';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { UserComponent } from './user.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { ToolMenuComponent } from './tool-menu/tool-menu.component';
import { SurveyComponent } from './survey/survey.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { SurveyItemComponent } from './survey-item/survey-item.component';
import { QuestionnaireItemComponent } from './questionnaire-item/questionnaire-item.component';
import { PopUpComponent } from './pop-up/pop-up.component';



@NgModule({
  declarations: [
    HeaderMenuComponent, 
    UserComponent, 
    MainMenuComponent, 
    ToolMenuComponent, 
    SurveyComponent, 
    QuestionnaireComponent, 
    SurveyItemComponent, QuestionnaireItemComponent, PopUpComponent],
  imports: [
    CommonModule,
    routing
  ],
  exports:[HeaderMenuComponent],
  bootstrap: [UserComponent]
  
})
export class UserModule { }
