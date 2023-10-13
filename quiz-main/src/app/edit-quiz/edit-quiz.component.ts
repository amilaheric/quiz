import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../services/quiz_service';
import { Question, Quiz } from '../models/quiz_model';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.css'],
})
export class EditQuizComponent {
  quizId: number;
  quizz: Quiz;
  formData: FormGroup;
  SelectListQ: Question[] = [];

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.formData = this.fb.group({
      quizName: '',
      questions: this.fb.array([]),
      selectedQuestionId: null,
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.quizId = +params['id'];
      this.loadQuizData(this.quizId);
      this.fetchQuestions();
    });
  }
  loadQuizForEditing(quizData: Quiz) {
    this.formData.patchValue({
      quizName: quizData.name,
      selectedQuestionId: null,
    });

    while (this.questionsArray.length) {
      this.questionsArray.removeAt(0);
    }

    const questions = quizData.questions || [];
    questions.forEach((question) => {
      this.questionsArray.push(this.fb.control(question.text));
    });
  }
  loadQuizData(quizId: number): void {
    this.quizz = this.quizService.getQuizById(quizId);

    this.loadQuizForEditing(this.quizz);
  }
  addInputField() {
    this.questionsArray.push(this.fb.control(''));
  }
  fetchQuestions() {
    this.SelectListQ = this.quizService.getQuestions();
  }

  selectQuestion(event: any) {
    this.formData.patchValue({ selectedQuestionId: event.target.value });
  }

  get questionsArray() {
    return this.formData.get('questions') as FormArray;
  }
  saveForm() {
    if (this.formData.valid) {
      const formData = this.formData.value;

      this.quizz.name = formData.quizName;
      this.quizz.questions = formData.questions.map(
        (questionText, index) => new Question(index + 1, questionText, '')
      );

      this.quizService.updateQuiz(this.quizz);

      this.formData.reset();
      this.router.navigate(['/']);
    }
  }
}
