import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import{ environment} from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private headerMenutitle = new Subject<string>();
  headerMenutitle$ = this.headerMenutitle.asObservable();
  constructor(private http: HttpClient) { }
  setHeaderMenuTitle(value:string){
      this.headerMenutitle.next(value);
  }
  getSurveysUser(callback){
    var httpOptions = {
       headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    
     this.http.get<any>(`${environment.apiUrl}/Surveys/getallforuser/`,httpOptions).subscribe(
     value =>{ 
        callback(value);       
     },
     error =>{
       console.log(error);     
     })   
  }
  getQuestionaire(id:any,callback){
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
   };
   
    this.http.get<any>(`${environment.apiUrl}/Surveys/getforuser/`+id,httpOptions).subscribe(
    value =>{ 
       callback(value);       
    },
    error =>{
      console.log(error);     
    })  
  }
  saveQuestions(data){
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
   };
   
    this.http.post<any>(`${environment.apiUrl}/Surveys/addanswer`,data,httpOptions).subscribe(
    value =>{   
      
    },
    error =>{
      console.log(error);     
    })  
  }
}
