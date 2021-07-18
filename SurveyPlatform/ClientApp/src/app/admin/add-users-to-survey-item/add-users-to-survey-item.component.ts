import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-add-users-to-survey-item',
  templateUrl: './add-users-to-survey-item.component.html',
  styleUrls: ['./add-users-to-survey-item.component.css']
})
export class AddUsersToSurveyItemComponent implements OnInit {

  @Input() surveyid;
  @Output() close:EventEmitter<any> = new EventEmitter();
  @Output() save:EventEmitter<any> = new EventEmitter();

  users:User[] = new Array();
  constructor(private adminServic:AdminService) {   
  }

  ngOnInit() {
    this.adminServic.getSurveyUsers(this.surveyid,val=>{
        val.data.forEach(element => {
           this.users.push({
              login:element.userId,
              username:element.userName,
              role:"",
              authdata:"",
              select:element.surveyUser            
           })          
        });      
    })
  }

  saved(){
    let userData = [];
    if(this.users.length>0){
      this.users.forEach(element => {
        userData.push({
           UserId:element.login,
           UserName:element.username,
           SurveyUser:element.select
        })
      });
      let data = {
        SurveyId: +this.surveyid,
        Data: userData
      }
      this.adminServic.setSurveyPermissions(data,()=>{
        this.save.emit();
      })
    }else{
      this.save.emit();
    }
   
  }
  closed(){
    this.close.emit(); 
  }

  selectAll(evt){
      this.users.forEach(user => {
        user.select = evt.target.checked;
      });
  }
  select(index:any){
    this.users[index].select = !this.users[index].select;
  }
  

}
