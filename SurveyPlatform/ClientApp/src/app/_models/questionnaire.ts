import { Title } from "@angular/platform-browser";

//wszystkie pytania dla ankiety
export class Questionnaire {
   public id:any
   public title: string;
   public description:string;
   public items: QuestionnaireItem[];

   constructor(){
       this.items = [];
   }
}
//jedno pytanie z odpowiedziami w ankiecie
export class QuestionnaireItem{
    public id;
    public question: string;
    public answers: Answer[];
    constructor(){
        this.answers = [];
    }
}
export class Answer{
    public id;
    public title: string;
    public value:boolean
    constructor(){
        this.value = false;
    }
}