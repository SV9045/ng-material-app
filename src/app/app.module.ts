import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './core/store/reducers/index.reducer'

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    CoreModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AuthModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
