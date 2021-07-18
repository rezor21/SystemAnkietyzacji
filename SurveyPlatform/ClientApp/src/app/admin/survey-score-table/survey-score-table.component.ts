import { Component, OnInit, Output, EventEmitter,Input } from '@angular/core';
import { AdminService } from '../admin.service';
import { DataScore } from 'src/app/_models/score';

@Component({
  selector: 'app-survey-score-table',
  templateUrl: './survey-score-table.component.html',
  styleUrls: ['./survey-score-table.component.css']
})
export class SurveyScoreTableComponent implements OnInit {
  @Input() surveyid;
  @Output() close:EventEmitter<any> = new EventEmitter();
  dataScore:DataScore;
  constructor(private adminService:AdminService) { 
     
  }

 
  ngOnInit() {
    this.dataScore = new DataScore();
    this.adminService.getScoreData(this.surveyid,val=>{
        this.dataScore = val;
    })
  }
  closed(){
    this.close.emit(null);
  }
}
