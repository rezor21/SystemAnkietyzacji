import { Injectable } from '@angular/core';
import { Subject, EmptyError }    from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map, publish, refCount } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { SurveyItem, Survey } from '../_models/survey';
import { Questionnaire, QuestionnaireItem } from '../_models/questionnaire';
import { DataScore } from '../_models/score';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private headerMenutitle = new Subject<string>();
  headerMenutitle$ = this.headerMenutitle.asObservable();

  private errorPopup = new Subject<any>();
  errorPopup$ = this.errorPopup.asObservable();


  private activAddSurveyItemButton = new Subject<boolean>();
  activAddSurveyItemButton$ = this.activAddSurveyItemButton.asObservable();

  private clickedAddSurveyItemButton = new Subject<boolean>();
  clickedAddSurveyItemButton$ = this.clickedAddSurveyItemButton.asObservable();

  constructor(private http: HttpClient) { }
  setHeaderMenuTitle(value:string){
      this.headerMenutitle.next(value);
  }


  public setActivAddSurveyButton(activ: boolean) {
    this.activAddSurveyItemButton.next(activ);
  }
  public addSurveyButtonClicked(data: any) {
    this.clickedAddSurveyItemButton.next(data);
  }


  displayErrorPopup(message:any){
      this.errorPopup.next(message);
  }
  addSurveyItem(survey:SurveyItem){  
    var data = {
      Id: 0,
      Title: survey.title,
      Description: survey.description,
      Questions: null
    };
    var httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<any>(`${environment.apiUrl}/Surveys/add`, data, httpOptions);
  }
  getAllSurveys(){
     var survey:Survey;
     survey = new Survey();
     var httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
     };
     this.http.get<any[]>(`${environment.apiUrl}/Surveys`,httpOptions).subscribe(
      value =>{  
          value.forEach(element => {        
          survey.items.push({
              id: element.id,
              title:element.title,
              description: element.description
          })
        });         
      },
      error =>{
        console.log(error);     
      })   
      return survey;
  }
  getQuestionaire(id:any,callback){
    var questionaire:Questionnaire;
    questionaire = new Questionnaire();
    var httpOptions = {
       headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
     this.http.get<any>(`${environment.apiUrl}/Surveys/`+id ,httpOptions).subscribe(
     value =>{  
          questionaire.id = id;
          questionaire.title = value.title;
          questionaire.description = value.description;
          value.questions.forEach(element => {
          questionaire.items.push({
             id:element.id,
             question: element.question,
             answers: element.answers
         })                      
       });    
       callback(questionaire); 
        
     },
     error =>{
       console.log(error);     
     })   
  }
  getSurveyUsers(id:any, callback){
    var httpOptions = {
       headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    
     this.http.get<any>(`${environment.apiUrl}/Surveys/getsurveyusers/`+id ,httpOptions).subscribe(
     value =>{  console.log(value);
        callback(value);       
     },
     error =>{
       console.log(error);     
     })   
  }
  setSurveyPermissions(data,callback){
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
   };
    this.http.post<any>(`${environment.apiUrl}/Surveys/setsurveyusers`,data,httpOptions).subscribe(val=>{
        callback();
    },
    eror=>{
      console.log(eror);
    });
  }
  updateQuestionaire(newQuestionair:Questionnaire){
    var httpOptions = {
       headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    var questions = [];
    newQuestionair.items.forEach(element => {
       questions.push({
          Question:element.question
       })
    });
    var data = {
       Id:newQuestionair.id,
       Title:newQuestionair.title,
       Description:newQuestionair.description,
       Questions:[

       ]
    }
    this.http.post<any>(`${environment.apiUrl}/Surveys/update`,newQuestionair,httpOptions).subscribe(val=>{

    },
    eror=>{
      console.log(eror);
    });
  }
  addQuestion(question:QuestionnaireItem,id){

    var answers = [];
    var result:QuestionnaireItem = new QuestionnaireItem();
    question.answers.forEach(element => {
       answers.push({
         Id:element.id ==undefined? 0:+element.id ,
         Title: element.title,
         Value: false
       })
    });
    var data = {
      Id:+question.id,
      SurveyId:+id,
      Question:question.question,
      Answers:answers
    }
    var httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<any>(`${environment.apiUrl}/Surveys/addquestion`,data,httpOptions);
  }
  getScoreData(id:any,callback){
  
    var httpOptions = {
       headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
     this.http.get<any>(`${environment.apiUrl}/Surveys/getdatarows/`+id ,httpOptions).subscribe(
     value =>{  
       let data:DataScore = new DataScore(); 
       value.forEach(element => {
          data.data.push(element);
       });
       console.log(data);
       callback(data);
        
     },
     error =>{
       console.log(error);     
     })  
  }
}
