import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ExerciseService } from './exercise.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
})
export class TrainingComponent implements OnInit {
  onGoingTraining = false;
  exerciseSubscription: Subscription;

  constructor(private exerciseService: ExerciseService) {}

  ngOnInit(): void {
    this.exerciseSubscription = this.exerciseService.isExerciseChanged.subscribe(
      (exercise) => {
        if (exercise) {
          this.onGoingTraining = true;
        } else {
          this.onGoingTraining = false;
        }
      }
    );
  }

  onStartTraining() {
    this.onGoingTraining = true;
  }

  onStopTraining() {
    this.onGoingTraining = false;
  }
}
