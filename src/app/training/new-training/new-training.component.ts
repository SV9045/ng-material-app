import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  exerciseSubscription: Subscription;
  isLoading = true;
  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe(
      (exrecises) => {
        this.isLoading = false;
        this.exercises = exrecises;
      }
    );
    this.tryAgain();
  }

  onStart(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  tryAgain() {
    this.trainingService.fetchAvailableExercise();
  }

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
  }
}
