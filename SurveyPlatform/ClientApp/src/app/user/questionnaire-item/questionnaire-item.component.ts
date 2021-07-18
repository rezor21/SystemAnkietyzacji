import { Component, OnInit, Input,EventEmitter,Output} from '@angular/core';
import {Questionnaire,QuestionnaireItem} from '../../_models/questionnaire';

@Component({
  selector: 'app-questionnaire-item',
  templateUrl: './questionnaire-item.component.html',
  styleUrls: ['./questionnaire-item.component.css']
})
export class QuestionnaireItemComponent implements OnInit {
  @Input() item:QuestionnaireItem
  @Input() selfIndex:Number

  @Output() itemEvent = new EventEmitter();

  selected:boolean

  constructor() { 
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
  }
  private resetAnswers(){
    if(this.item.answers!= undefined&&this.item!= undefined){
      this.item.answers.forEach(answer => {
        if(answer.value!=undefined)
          answer.value =false;
      });
    }  
  } 
  

}
