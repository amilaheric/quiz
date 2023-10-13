import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListQuizComponent } from './list-quiz/list-quiz.component';
import { QuizService } from './services/quiz_service';
import { AddQuizComponent } from './add-quiz/add-quiz.component';
import { FormsModule } from '@angular/forms';
import { EditQuizComponent } from './edit-quiz/edit-quiz.component';
import { QuizSlideshowComponent } from './quiz-slideshow/quiz-slideshow.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ListQuizComponent,
    AddQuizComponent,
    EditQuizComponent,
    QuizSlideshowComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [QuizService],
  bootstrap: [AppComponent],
})
export class AppModule {}
