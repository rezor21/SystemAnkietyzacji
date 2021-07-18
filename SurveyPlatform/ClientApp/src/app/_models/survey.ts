//wszystkie ankiety dla użytkownika
export class Survey {
    constructor(){
        this.items = [];
    }
    public items: SurveyItem[];
}
//pojedyncza ankieta
export class SurveyItem{
    public id: Number;
    public title: string;
    public description;
}