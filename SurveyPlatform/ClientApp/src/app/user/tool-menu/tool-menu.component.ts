import { Component, OnInit } from '@angular/core';
import {ToolMenuService} from './tool-menu.service'
@Component({
  selector: 'user-tool-menu',
  templateUrl: './tool-menu.component.html',
  styleUrls: ['./tool-menu.component.css']
})
export class ToolMenuComponent implements OnInit {
  isSaveActiv:boolean
  constructor(private toolMenuService:ToolMenuService ) { 
    this.isSaveActiv = false;
    this.toolMenuService.activSaveButton$.subscribe(val=>{
      this.isSaveActiv = val;
    })
  }

  ngOnInit() {
  }
  onSave(){
    this.toolMenuService.saveButtonClicked(true);
  }

}
