import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore'; 
import { AngularFireAuthModule } from 'angularfire2/auth'; 
import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SiginComponent } from './auth/sigin/sigin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';
import { TrainingComponent } from './training/training.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NewTrainingComponent } from './training/new-training/new-training.component';
import { PastTrainingComponent } from './training/past-training/past-training.component';
import { CurrentTrainingComponent } from './training/current-training/current-training.component';
import { StopTrainingComponent } from './training/current-training/stop-training/stop-training.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SiginComponent,
    TrainingComponent,
    WelcomeComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    CurrentTrainingComponent,
    StopTrainingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AppRoutingModule,
    AngularFireAuthModule
  ],
  entryComponents: [StopTrainingComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
