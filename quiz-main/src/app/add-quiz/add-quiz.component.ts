import { Component } from '@angular/core';
import { Question, Quiz } from '../models/quiz_model';
import { QuizService } from '../services/quiz_service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css'],
})
export class AddQuizComponent {
  formData: FormGroup;
  SelectListQ: Question[] = [];
  quiz: Quiz;
  constructor(
    private fb: FormBuilder,
    private quizService: QuizService,
    private router: Router
  ) {
    this.formData = this.fb.group({
      quizName: '',
      questions: this.fb.array([]),
      selectedQuestionId: null,
      answer: '',
    });
  }

  ngOnInit() {
    this.fetchQuestions();
  }

  addInputField() {
    this.questionsArray.push(this.fb.control(''));
  }
  fetchQuestions() {
    this.SelectListQ = this.quizService.getQuestions();
  }

  selectQuestion(event: any) {
    //this.formData.patchValue({ selectedQuestionId: event.target.value });
    const selectedQuestionId = event.target.value;
    this.formData.patchValue({ selectedQuestionId: selectedQuestionId });

    // Retrieve and set the answer for the selected question
    const selectedQuestion = this.SelectListQ.find(
      (question) => question.question_id === selectedQuestionId
    );

    if (selectedQuestion) {
      this.formData.get('answer').setValue(selectedQuestion.answer);
    }
  }

  get questionsArray() {
    return this.formData.get('questions') as FormArray;
  }

  saveForm() {
    if (this.formData.valid) {
      const formData = this.formData.value;
      const newQuiz = new Quiz(
        this.quizService.generateUniqueQuizID(),
        formData.quizName,
        []
      );

      if (formData.selectedQuestionId) {
        const selectedQuestion = this.SelectListQ.find(
          (question) => question.question_id == formData.selectedQuestionId
        );

        if (selectedQuestion) {
          const newQuestion = new Question(
            1,
            selectedQuestion.text,
            formData.selectedQuestionId.toString()
          );
          newQuiz.questions.push(newQuestion);
        }
      }

      const filteredQuestions = formData.questions.filter(
        (question) => question.trim() !== ''
      );
      newQuiz.questions = newQuiz.questions.concat(
        filteredQuestions.map(
          (questionText, index) => new Question(index + 1, questionText, '')
        )
      );

      this.quizService.addQuiz(newQuiz);
      this.formData.reset();
      this.router.navigate(['/']);
    }
  
  }
}
