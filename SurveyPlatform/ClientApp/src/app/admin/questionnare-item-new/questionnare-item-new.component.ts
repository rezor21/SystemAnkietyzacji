import { Component, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-questionnare-item-new',
  templateUrl: './questionnare-item-new.component.html',
  styleUrls: ['./questionnare-item-new.component.css']
})
export class QuestionnareItemNewComponent implements OnInit {

  @Output() add = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  onAdd(){
    this.add.emit(null);
  }

}
