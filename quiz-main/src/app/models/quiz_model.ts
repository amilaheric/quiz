export class Quiz {
  constructor(
    public id: number,
    public name: string,
    public questions: Question[]
  ) {}
}

export class Question {
  constructor(
    public question_id: number,
    public text: string,
    public answer: string
  ) {}
}
