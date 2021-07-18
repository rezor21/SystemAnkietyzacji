import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';
import { SurveyItem } from 'src/app/_models/survey';


@Component({
  selector: 'app-survey-item-edit',
  templateUrl: './survey-item-edit.component.html',
  styleUrls: ['./survey-item-edit.component.css']
})
export class SurveyItemEditComponent implements OnInit {

  constructor() { }
  @Output() save:EventEmitter<any> = new EventEmitter();
  @Output() close:EventEmitter<any> = new EventEmitter();
  @Input() surveyItem:SurveyItem;
  @Output() ediedItem:EventEmitter<any> = new EventEmitter();

  itemToEdit:SurveyItem; 

  ngOnInit() {
    this.itemToEdit = new SurveyItem();
    this.itemToEdit.title  = this.surveyItem.title;
    this.itemToEdit.description  = this.surveyItem.description;
  }
  saved(){
    this.save.emit(null);
    this.ediedItem.emit(this.itemToEdit);  
  }
  changeTitle(value: any){
    this.itemToEdit.title = value;
  }
  changeDescription(value:any){
     this.itemToEdit.description = value;
  }
  closed(){
    this.close.emit(null);
  }

}
