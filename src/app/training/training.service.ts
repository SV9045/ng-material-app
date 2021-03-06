import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Exercise } from './exercise.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { UiService } from '../shared/ui.service';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  private availableExercise: Exercise[] = [];
  private onGoingExercise: Exercise;
  isExerciseChanged = new Subject<Exercise>();
  exerciseChanged = new Subject<Exercise[]>();
  isCompletedExerciseChanged = new Subject<Exercise[]>();

  constructor(private db: AngularFirestore,
              private uiService: UiService) {}

  fetchAvailableExercise() {
    this.uiService.loadingStateChanged.next(true);
    this.db
      .collection('availableExercise')
      .snapshotChanges()
      .pipe(
        map((docData) => {
          return docData.map((doc) => {
            return {
              id: doc.payload.doc.id,
              // ...doc.payload.doc.data(),
              name: doc.payload.doc.data()['name'],
              duration: doc.payload.doc.data()['duration'],
              calories: doc.payload.doc.data()['calories']
            };
          });
        })
      )
      .subscribe((exercises: Exercise[]) => {
          this.uiService.loadingStateChanged.next(false);
          this.availableExercise = exercises;
          this.exerciseChanged.next([...this.availableExercise]);
        },
        (error) => {
          this.uiService.loadingStateChanged.next(false);
          this.uiService.showSnackbar('Error occured, please try again later', null, 3000);
          this.exerciseChanged.next(null);
        }
      );
  }

  startExercise(selectId: string) {
    this.onGoingExercise = this.availableExercise.find(
      (exercise) => exercise.id === selectId
    );
    this.isExerciseChanged.next({ ...this.onGoingExercise });
  }

  completeExercise() {
    this.addDataToDatabase({
      ...this.onGoingExercise,
      date: new Date(),
      state: 'completed',
    });
    this.onGoingExercise = null;
    this.isExerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.onGoingExercise,
      duration: this.onGoingExercise.duration * (progress / 100),
      calories: this.onGoingExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled',
    });
    this.onGoingExercise = null;
    this.isExerciseChanged.next(null);
  }

  get currentExercise() {
    return { ...this.onGoingExercise };
  }

  // fetching from firebase
  fetchCompeletedExercises() {
    debugger;
    this.db
      .collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises: Exercise[]) => {
        this.isCompletedExerciseChanged.next(exercises);
      });
  }

  // adding to firebase
  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}
