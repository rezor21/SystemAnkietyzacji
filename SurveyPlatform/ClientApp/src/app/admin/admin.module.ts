import {routing} from './admin.routing';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { AdminComponent } from './admin.component';
import { MainMenuComponent} from './main-menu/main-menu.component'
import { ToolMenuComponent} from './tool-menu/tool-menu.component'
import { SurveyComponent} from './survey/survey.component'
import { SurveyItemComponent } from './survey-item/survey-item.component';
import { SurveyItemEditComponent } from './survey-item-edit/survey-item-edit.component';
import { ConfirmPopUpComponent } from './confirm-pop-up/confirm-pop-up.component';
import { QuestionnaireComponent} from './questionnaire/questionnaire.component';
import { QuestionnaireItemComponent} from './questionnaire-item/questionnaire-item.component';
import { QuestionnareItemNewComponent } from './questionnare-item-new/questionnare-item-new.component';
import { AddUsersToSurveyItemComponent } from './add-users-to-survey-item/add-users-to-survey-item.component';
import { ErrorPopUpComponent } from './error-pop-up/error-pop-up.component';
import { SurveyScoreTableComponent } from './survey-score-table/survey-score-table.component';



@NgModule({
  declarations: [
    HeaderMenuComponent, 
    AdminComponent,
    MainMenuComponent,
    ToolMenuComponent,
    SurveyComponent,
    SurveyItemComponent,
    SurveyItemEditComponent,
    ConfirmPopUpComponent,
    QuestionnaireComponent,
    QuestionnaireItemComponent,
    QuestionnareItemNewComponent,
    AddUsersToSurveyItemComponent,
    ErrorPopUpComponent,
    SurveyScoreTableComponent
  ],
  imports: [
    CommonModule,
    routing
  ],
  exports:[
    HeaderMenuComponent
  ]
})
export class AdminModule { }
