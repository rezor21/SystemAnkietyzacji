import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ToolMenuService {
  private activSaveButton = new Subject<boolean>();
  activSaveButton$ = this.activSaveButton.asObservable();

  private clickedSaveButton = new Subject<boolean>();
  clickedSaveButton$ = this.clickedSaveButton.asObservable();

  constructor() { }
  public setActivSaveButton(activ:boolean){
     this.activSaveButton.next(activ);
  }
  public saveButtonClicked(data:any){
    this.clickedSaveButton.next(data);
  }
  
}
