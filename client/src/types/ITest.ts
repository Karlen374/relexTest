export interface IQuestion{
  id:string;
  body:{
    question: string;
    answers: string[];
    correctAnswerId: number;
  }
}
export interface ITest{
  id:string;
  status:boolean;
  name:string;
  questions: IQuestion[]
}
