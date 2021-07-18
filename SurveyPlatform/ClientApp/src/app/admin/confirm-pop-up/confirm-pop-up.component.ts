import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-confirm-pop-up',
  templateUrl: './confirm-pop-up.component.html',
  styleUrls: ['./confirm-pop-up.component.css']
})
export class ConfirmPopUpComponent implements OnInit {

  constructor() { }

  @Input() title;
  @Input() description;
  @Output() confirm:EventEmitter<any> = new EventEmitter();
  @Output() cancel:EventEmitter<any> = new EventEmitter();
  ngOnInit() {
  }
  confirmed(){
    this.confirm.emit(null);
  }
  canceled(){
    this.cancel.emit(null);
  }
}
