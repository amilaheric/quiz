import { Question, Quiz } from '../models/quiz_model';

export class QuizService {
  private quiz: Quiz[] = [];
  constructor() {
    this.quiz = [
      new Quiz(1, 'Sport Quiz', [
        new Question(
          1,
          'Where did the first modern Summer Olympic games take place in 1896?',
          'Athens, Greece'
        ),
        new Question(2, 'What is the nickname for Arsenal FC?', 'The Gunners'),
      ]),
      new Quiz(2, 'Music Quiz', [
        new Question(3, 'Who was the lead singer of Nirvana?', 'Kurt Cobain'),
        new Question(
          4,
          '‘Wuthering Heights’ was the first UK number one for which artist?',
          'Kate Bush'
        ),
      ]),
    ];
  }

  public getQuiz(): Quiz[] {
    return this.quiz;
  }

  public deleteQuiz(id: number) {
    const index = this.quiz.findIndex((item) => item.id == id);

    if (index !== -1) {
      this.quiz.splice(index, 1);
    }
  }
  public getQuestions() {
    const allQuestions: Question[] = [];

    this.quiz.forEach((quiz) => {
      allQuestions.push(...quiz.questions);
    });

    return allQuestions;
  }

  public getQuizById(id: number) {
    return this.quiz.find((quiz) => quiz.id === id);
  }
  public saveQuiz(formData: any) {
    this.quiz.push(formData);
    console.log(formData);
  }
  public updateQuiz(updatedQuiz: Quiz) {
    const index = this.quiz.findIndex((quiz) => quiz.id === updatedQuiz.id);

    if (index !== -1) {
      this.quiz[index] = updatedQuiz;
    }
  }

  public addQuiz(newQuiz: Quiz): void {
    newQuiz.id = this.generateUniqueQuizID();

    this.quiz.push(newQuiz);
  }

  public generateUniqueQuizID(): number {
    let newID = 1;

    const maxID = this.quiz.reduce(
      (max, quiz) => (quiz.id > max ? quiz.id : max),
      0
    );

    newID = maxID + 1;

    return newID;
  }
}
