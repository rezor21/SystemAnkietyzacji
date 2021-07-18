import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { title } from 'process';

@Component({
  selector: 'app-survey-item',
  templateUrl: './survey-item.component.html',
  styleUrls: ['./survey-item.component.css']
})
export class SurveyItemComponent implements OnInit {

  @Input() openMenu:string;
  @Input() title:string;
  @Input() description:string;
  @Output() remove:EventEmitter<any> = new EventEmitter();
  @Output() edit:EventEmitter<any> = new EventEmitter();
  @Output() addquestion:EventEmitter<any> = new EventEmitter();
  @Output() addusers:EventEmitter<any> = new EventEmitter();
  @Output() score:EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
    
  }
  removed(){
    this.remove.emit(null);
  }
  scored(){
    this.score.emit(null);
  }
  edited(){
    this.edit.emit(null);
  }
  movedToQA(){
    this.addquestion.emit(null);
  }
  addUsers(){
    this.addusers.emit(null);
  }
  

}
