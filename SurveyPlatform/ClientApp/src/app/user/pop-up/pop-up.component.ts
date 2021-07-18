import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {
 @Input() title:string;
 @Input() text:string;
 @Output() accept :EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  accepted(){
    this.accept.emit(null);
  }


}
