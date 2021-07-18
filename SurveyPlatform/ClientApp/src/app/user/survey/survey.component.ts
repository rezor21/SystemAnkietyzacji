import { Component, OnInit } from '@angular/core';
import {Survey,SurveyItem} from '../../_models/survey';
import  {Router} from '@angular/router';
import {UserService} from '../user.service';
import {ToolMenuService} from '../tool-menu/tool-menu.service'
@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  survey:Survey;
  constructor(private router: Router,
              private userService:UserService,
              private toolMenuService:ToolMenuService) { 
    this.survey = new Survey();
    this.userService.getSurveysUser(val=>{
      val.forEach(element => {
        this.survey.items.push({
          id:element.id,
          title:element.title,
          description:element.description
        })
      });
       
    });
  }

  ngOnInit() {
    this.userService.setHeaderMenuTitle("Moja Lista Ankiet");
    this.toolMenuService.setActivSaveButton(false);
  }
  openQuestionare(item:SurveyItem){
    this.toolMenuService.setActivSaveButton(true);
    this.userService.setHeaderMenuTitle(item.title);
    this.router.navigate(['user/questionnaire', 
      item.id   
    ]);
  }
}
