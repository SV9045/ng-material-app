import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Exercise } from './exercise.model';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  private availableExercise: Exercise[] = [
    { id: 'crunches', name: 'Cruncehs', duration: 150, caloriesBurned: 10 },
    { id: 'lunges', name: 'Side Lunges', duration: 180, caloriesBurned: 16 },
    { id: 'dips', name: 'Dips', duration: 120, caloriesBurned: 18 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 60, caloriesBurned: 8 },
  ];

  private onGoingExercise: Exercise;
  private exercises: Exercise[] = [];
  isExerciseChanged = new Subject<Exercise>();

  constructor() {}

  get getAvailableExercise() {
    return this.availableExercise;
  }

  startExercise(selectId: string) {
    this.onGoingExercise = this.availableExercise.find(
      (exercise) => exercise.id === selectId
    );
    this.isExerciseChanged.next({ ...this.onGoingExercise });
  }

  completeExercise() {
    this.exercises.push({ ...this.onGoingExercise,
                          date: new Date(),
                          state: 'completed',
                        });
    this.onGoingExercise = null;
    this.isExerciseChanged.next(null);
  }

  cancelxercise(progress) {
    this.exercises.push({ ...this.onGoingExercise,
                          duration: this.onGoingExercise.duration * (progress / 100),
                          caloriesBurned: this.onGoingExercise.caloriesBurned * (progress / 100),
                          date: new Date(),
                          state: 'cancelled',
                        });
    this.onGoingExercise = null;
    this.isExerciseChanged.next(null);
  }

  get currentExercise() {
    return { ...this.onGoingExercise };
  }

  get allExercises() {
    // making copy of exercises[]
    return this.exercises.slice();
  }
}
