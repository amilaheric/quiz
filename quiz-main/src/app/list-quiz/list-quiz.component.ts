import { Component } from '@angular/core';
import { Quiz } from '../models/quiz_model';
import { QuizService } from '../services/quiz_service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-quiz',
  templateUrl: './list-quiz.component.html',
  styleUrls: ['./list-quiz.component.css'],
})
export class ListQuizComponent {
  public quiz: Quiz[] = [];

  constructor(private quizService: QuizService, private router: Router) {
    this.quiz = quizService.getQuiz();
  }
  onDeleteQuiz(id: number) {
    this.quizService.deleteQuiz(id);
  }
  onEditQuiz(quizId: number) {
    this.router.navigate(['/edit', quizId]);
  }

  onSlideQuiz(quizId: number) {
    this.router.navigate(['/slide', quizId]);
  }
}
