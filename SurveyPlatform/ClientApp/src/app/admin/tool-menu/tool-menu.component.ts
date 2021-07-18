import { Component, OnInit } from '@angular/core';
import {ToolMenuService} from './tool-menu.service'
@Component({
  selector: 'admin-tool-menu',
  templateUrl: './tool-menu.component.html',
  styleUrls: ['./tool-menu.component.css']
})
export class ToolMenuComponent implements OnInit {
  isAddSurveyActiv:boolean
  constructor(private toolMenuService:ToolMenuService ) { 
    this.isAddSurveyActiv = false;
    this.toolMenuService.activAddSurveyItemButton$.subscribe(val=>{
      this.isAddSurveyActiv = val;
    })
  }

  ngOnInit() {
  }
  onAddSurvey(){
    this.toolMenuService.addSurveyButtonClicked(true);
  }

}
