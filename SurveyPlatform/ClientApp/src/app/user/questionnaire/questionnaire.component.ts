import { Component, OnInit } from '@angular/core';
import {Questionnaire,QuestionnaireItem} from '../../_models/questionnaire';
import {ToolMenuService} from '../tool-menu/tool-menu.service'
import { first,take,last } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { Router,ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {
  
  questionnaire:Questionnaire;
  subscription: Subscription;
  isSaveActiv: boolean = false;
  openSuccessPopUp:boolean = false;
  openFailPopUp:boolean = false;

  constructor(private toolMenuService:ToolMenuService,
              private router:Router,
              private userService:UserService,
              private activatedRoute: ActivatedRoute) {      
                this.questionnaire = new Questionnaire();
                let id = +this.activatedRoute.snapshot.params['id'];     
                this.userService.getQuestionaire(id,val=>{
                    this.questionnaire.id = val.id,
                    this.questionnaire.title = val.title;
                    val.questions.forEach(element => {
                       this.questionnaire.items.push({
                         id:element.id,
                         question:element.question,
                         answers: element.answers
                       })
                    });
                }); 
               
                this.subscription = this.toolMenuService.clickedSaveButton$.subscribe(val=>{
                  this.trySaveQuestionaireAnswers();
                })

    this.toolMenuService.activSaveButton$.subscribe(val => {
      this.isSaveActiv = val;
    })
  }

  ngOnInit() {   

  }
  updateItem(data,index){
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
       
        console.log(this.questionnaire.items);
        this.questionnaire.items.forEach(element => {
          let id=0;
          element.answers.forEach(a => {
            if(a.value){
               id = a.id
            }else{
              return 0;
            }
         });
          let data = {
            QuestionId:element.id,
            AnswerId: id
          }
          this.userService.saveQuestions(data);
        });
       
       
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
        this.router.navigate(['user/survey']);
      }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSave() {
    this.toolMenuService.saveButtonClicked(true);
  }
}
