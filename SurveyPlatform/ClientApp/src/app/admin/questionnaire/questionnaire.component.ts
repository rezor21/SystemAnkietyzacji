import { Component, OnInit } from '@angular/core';
import {Questionnaire,QuestionnaireItem} from '../../_models/questionnaire';
import {ToolMenuService} from '../tool-menu/tool-menu.service'
import { first,take,last } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { ActivatedRoute  } from '@angular/router';
import {AdminService} from '../admin.service';
@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {
  
  questionnaire:Questionnaire;
  subscription: Subscription;

  openSuccessPopUp:boolean = false;
  openFailPopUp:boolean = false;

  selectedItems:boolean[];
  constructor(private adminService:AdminService,private route:ActivatedRoute,private toolMenuService:ToolMenuService) {   
    this.questionnaire = new Questionnaire();
    this.adminService.setActivAddSurveyButton(false);
    this.route.paramMap.subscribe(params => {
      this.adminService.getQuestionaire(params.get("id"),val=>{
        this.questionnaire = val;
        this.initSelectItems();
        this.adminService.setHeaderMenuTitle(this.questionnaire.title);       
      });
     
    })
   
  }

  ngOnInit() {
   
  }
  updateItem(data,index){
    var result = new QuestionnaireItem();
    this.adminService.addQuestion(data,this.questionnaire.id).subscribe(val=>{           
      result.id = val.id;
      result.question = val.question;
      val.answers.forEach(element => {
        result.answers.push({
          id: element.id,
          title:element.title,
          value:false
        })
      });     
      this.questionnaire.items[index] =  result
   })
  }

  private trySaveQuestionaireAnswers(){
     let canSave:boolean = true;
      this.questionnaire.items.forEach(item => { 
        let filled:boolean = false;
        item.answers.forEach(answer => {
          if(answer.value){ 
            filled=true;           
          }

        });
        if(!filled){
          canSave = false;
        }
      });
      if(canSave){
        this.openSuccessPopUp = true;
      }else{
        this.openFailPopUp = true;
      }
  }
  onAccept(){
      if(this.openFailPopUp){
        this.openFailPopUp =false;
      }else if(this.openSuccessPopUp){
        this.openSuccessPopUp =false;
      }
  }
  unselectItems(){
    for(let i = 0 ;i< this.selectedItems.length;i++){  
      this.selectedItems[i] = false;
    }
  }
  selectItem(index:any){
    if(!this.selectedItems[index]){
      this.unselectItems();
      this.selectedItems[index] = true;
    }   
 }
  initSelectItems(){
    this.selectedItems = new Array<boolean>();
    let index = 0 ;
    this.questionnaire.items.forEach(item => {
      this.selectedItems[index] = false;
      index+=1;
    });
  }
  addNewQuestionItem(){
    let question:QuestionnaireItem =new QuestionnaireItem();
    question.id = 0;
    question.answers = [];
    this.questionnaire.items.push(question);
    this.unselectItems();
    this.selectedItems.push(true);
  }
  removeItem(index:any){
    this.questionnaire.items.splice(index,1);
    this.selectedItems.splice(index,1);
  }
  ngOnDestroy() {
    
  }
  

}
