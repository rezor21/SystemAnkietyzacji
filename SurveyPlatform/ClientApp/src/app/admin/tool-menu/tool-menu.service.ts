import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ToolMenuService {
  private activAddSurveyItemButton = new Subject<boolean>();
  activAddSurveyItemButton$ = this.activAddSurveyItemButton.asObservable();

  private clickedAddSurveyItemButton = new Subject<boolean>();
  clickedAddSurveyItemButton$ = this.clickedAddSurveyItemButton.asObservable();

  constructor() { }
  public setActivAddSurveyButton(activ:boolean){
     this.activAddSurveyItemButton.next(activ);
  }
  public addSurveyButtonClicked(data:any){
    this.clickedAddSurveyItemButton.next(data);
  }
  
}
