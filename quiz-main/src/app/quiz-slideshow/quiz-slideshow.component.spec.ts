import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizSlideshowComponent } from './quiz-slideshow.component';

describe('QuizSlideshowComponent', () => {
  let component: QuizSlideshowComponent;
  let fixture: ComponentFixture<QuizSlideshowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizSlideshowComponent]
    });
    fixture = TestBed.createComponent(QuizSlideshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
