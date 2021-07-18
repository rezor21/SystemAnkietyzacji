import { Component, OnInit, Input,EventEmitter,Output} from '@angular/core';
import {Questionnaire,QuestionnaireItem, Answer} from '../../_models/questionnaire';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-questionnaire-item',
  templateUrl: './questionnaire-item.component.html',
  styleUrls: ['./questionnaire-item.component.css']
})
export class QuestionnaireItemComponent implements OnInit {
  @Input() item:QuestionnaireItem
  @Input() selfIndex:Number
  @Input() openMenu:boolean
  @Output() itemEvent = new EventEmitter();
  @Output() click: EventEmitter<MouseEvent> = new EventEmitter();
  @Output() remove: EventEmitter<MouseEvent> = new EventEmitter();

  selected:boolean
  isEdit:boolean
  editedText:string

  constructor(private adminService:AdminService) { 
    this.selected = false;
  }

  ngOnInit() {
    this.resetAnswers();
  }
  selectAnswer(index:any){
     this.resetAnswers();
     this.item.answers[index].value = true;
     this.itemEvent.emit(this.item);
     this.selected =true;
     this.edit(true);
  }
  private resetAnswers(){
    this.item.answers.forEach(answer => {
      answer.value =false;
    });
    this.edit(false);
  }
  createNewAnswer(){
    let newAnswer:Answer = new Answer();
    newAnswer.title = "";
    newAnswer.value = false;
    this.item.answers.push(newAnswer);
    this.edit(true);
  }
  updateAnswerTitle(title:string,index:any){
      this.item.answers[index].title = title;
      this.edit(true);
  }
  updateQuestionTitle(title:string){
      this.item.question = title;
     this.edit(true);
  }
  deleteAnswer(index:any){
    this.item.answers.splice(index,1)
    this.edit(true);
  }
  saveQuestionnaireItem(){
    var add:boolean = true;
    var info:string =" ";
    
    if(this.item.question == "" || this.item.question == undefined){
        add = false;
        info = "Pole z pytaniem nie może być puste.";
    }else{
      if(this.item.answers.length == 0){
        info = "Musisz dodać przynajmniej jedną odpowiedź przed zapisem.";
        add = false;
      }else{
        this.item.answers.forEach(element => {
          if(element.title == ""|| element.title == undefined){
              add = false;
              info = "Odpowiedź nie może być pusta.";
          }
        });
      }  
    }
    if(!add){
      this.adminService.displayErrorPopup({title:"Błąd",description:info});
    }else{    
      this.edit(false);
      this.itemEvent.emit(this.item);     
    }    
  }
  removeCard(){
      this.remove.emit();
      this.edit(true);
  }
  selectCard(){  
    if(!this.openMenu){
      this.click.emit(null);
    }   
  }
  edit(value:boolean){
    this.isEdit = value;
  }

}
