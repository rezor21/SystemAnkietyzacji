import { Component, OnInit } from '@angular/core';
import {Survey,SurveyItem} from '../../_models/survey';
import  {Router} from '@angular/router';
import {HeaderService} from '../header-menu/header.service';
import {ToolMenuService} from '../tool-menu/tool-menu.service'
import { Subscription } from 'rxjs';
import {AdminService} from '../admin.service';
@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  survey:Survey;
  selectedItems:boolean[];
  constructor(private router: Router,
              private toolMenuService:ToolMenuService,
              private headerService:HeaderService,
              private adminService:AdminService ) { 
    
  }
  editedSurveyItem:SurveyItem;
  editedSurveyIndex:any;

  isEditSurveyItem:boolean = false;
  isAddSurveyItem:boolean = false;

  displayAddUsers:boolean = false;
  displayScore:boolean = false;
  displayConfirmRemovePopUp:boolean = false;
  selectedSurveyId;

  subscription: Subscription;

  ngOnInit() {
    this.survey = this.adminService.getAllSurveys();
    this.initSelectItems();

    this.adminService.setHeaderMenuTitle("Lista Ankiet");
    this.headerService.setHeaderMenuTitle("Moja Lista Ankiet");
    this.adminService.setActivAddSurveyButton(true);
    this.subscription = this.adminService.clickedAddSurveyItemButton$.subscribe(()=>{
      this.addSurveyItem();
    })
  }
  addSurveyItem(){
    this.editedSurveyItem = new SurveyItem();
    this.isAddSurveyItem=true;
  }
  onAddNewSurveyItem(survey:any){
    //####Adding new survey item
    if(survey.title == "" || survey.title == undefined){
      this.adminService.displayErrorPopup({title:"Błąd",description:"Tytuł nie może być pusty"});
      this.isAddSurveyItem = true;
    }else{
      this.adminService.addSurveyItem(survey).subscribe(val =>{
        console.log(val);
        this.survey.items.unshift(val);
        this.unselectItems();
        this.selectedItems.unshift(true);
      })
    }
  }
  editSurveyItem(index:any){

    this.editedSurveyIndex = index;
    this.editedSurveyItem = this.survey.items[this.editedSurveyIndex] as SurveyItem;
    this.isEditSurveyItem=true;

  }
  saveEditedSurveyItem(survey:any){
      // #############Edit survey item
      this.adminService.getQuestionaire(this.survey.items[this.editedSurveyIndex].id,
        val=>{        
          val.title = survey.title;
          val.description = survey.description;         
          this.survey.items[this.editedSurveyIndex] = val;
          this.adminService.updateQuestionaire(val);
        });   
  }
  removeSurveyItem(){
    //set item to remove
    this.displayConfirmRemovePopUp =true;
  }
  saveSurveyItem(){
  }
  onCloseEdit(){
    this.isEditSurveyItem = false;
    this.isAddSurveyItem = false;
  }
  onSaveEdit(){
    this.isEditSurveyItem = false;
    this.isAddSurveyItem = false;
  }
  onRemoveSurveyItem(){
    // #############Remove survey item accept
    this.displayConfirmRemovePopUp =false;
  }
  onCacelRemoveSurveyItem(){
    //decline remove
    this.displayConfirmRemovePopUp =false;
  }
  openAddUsers(){
    this.displayAddUsers = true;
  }
  onCloseAddUsers(){
      this.displayAddUsers = false;
  }
  onScore(){
    this.displayScore = true;
  }
  onCloseScore(){
    this.displayScore = false;
  }
  onSaveAddUsers(){
      this.displayAddUsers = false;
  }
  initSelectItems(){
    this.selectedItems = new Array<boolean>();
    let index = 0 ;
    this.survey.items.forEach(item => {
      this.selectedItems[index] = false;
      index+=1;
    });
  }
  selectItem(index:any){
     this.unselectItems();
     this.selectedItems[index] = true;
     
     this.selectedSurveyId = this.survey.items[index].id;
  }
  unselectItems(){
    for(let i = 0 ;i< this.selectedItems.length;i++){
      this.selectedItems[i] = false;
    }
  }
  goToAddQuestions(index:any){
    console.log(this.survey.items[index]);
    this.router.navigate(['admin/questionnaire', 
      this.survey.items[index].id
    ]);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
