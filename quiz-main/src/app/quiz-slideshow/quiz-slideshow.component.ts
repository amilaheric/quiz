import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Quiz } from '../models/quiz_model';
import { QuizService } from '../services/quiz_service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quiz-slideshow',
  templateUrl: './quiz-slideshow.component.html',
  styleUrls: ['./quiz-slideshow.component.css'],
})
export class QuizSlideshowComponent implements AfterViewInit {
  quiz: Quiz;
  quizId: number;
  public currentItemIndex = 0;
  answerVisible = false;

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute
  ) {}

  ngAfterViewInit(): void {
    this.loadQuizData(this.quizId);
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.quizId = +params['id'];
      this.loadQuizData(this.quizId);
    });
  }

  nextSlide() {
    if (this.quiz && this.quiz.questions) {
      this.answerVisible = false;
      this.currentItemIndex =
        (this.currentItemIndex + 1) % this.quiz.questions.length;
    }
  }

  prevSlide() {
    if (this.quiz && this.quiz.questions) {
      this.answerVisible = false;
      this.currentItemIndex =
        (this.currentItemIndex - 1 + this.quiz.questions.length) %
        this.quiz.questions.length;
    }
  }

  loadQuizData(quizId: number): void {
    this.quiz = this.quizService.getQuizById(quizId);
    console.log(this.quiz);
  }

  showAnswer(): void {
    this.answerVisible = !this.answerVisible;
  }
}
