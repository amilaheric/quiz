import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListQuizComponent } from './list-quiz/list-quiz.component';
import { AddQuizComponent } from './add-quiz/add-quiz.component';
import { EditQuizComponent } from './edit-quiz/edit-quiz.component';
import { QuizSlideshowComponent } from './quiz-slideshow/quiz-slideshow.component';

const routes: Routes = [
  { path: '', component: ListQuizComponent },
  { path: 'add', component: AddQuizComponent },
  { path: 'edit/:id', component: EditQuizComponent },
  { path: 'slide/:id', component: QuizSlideshowComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
