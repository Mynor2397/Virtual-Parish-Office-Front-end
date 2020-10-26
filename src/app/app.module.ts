import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavbarComponent } from './components/partials/navbar/navbar.component';
import { Statuserror } from './guards/statuserror.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDatepickerModule } from '@angular/material';
import { A11yModule } from '@angular/cdk/a11y';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { DialogComponent } from './components/partials/dialog/dialog.component';
import { GridComponent } from './components/grid/grid.component';
import { Jwtheader } from './guards/jwtheader.interceptor';
import { ManagementComponent } from './components/management/management.component';
import { EmailComponent } from './components/partials/email/email.component';
import { PlacemodalComponent } from './components/partials/placemodal/placemodal.component';
import { PriestmodalComponent } from './components/partials/priestmodal/priestmodal.component';
import { BookmodalComponent } from './components/partials/bookmodal/bookmodal.component';
import { CreateuserComponent } from './components/partials/createuser/createuser.component';
import { PersonsComponent } from './components/persons/persons.component';
import { PersoneditComponent } from './components/partials/personedit/personedit.component';



@NgModule({
  exports: [
    DialogComponent
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    DialogComponent,
    GridComponent,
    ManagementComponent,
    EmailComponent,
    PlacemodalComponent,
    PriestmodalComponent,
    BookmodalComponent,
    CreateuserComponent,
    PersonsComponent,
    PersoneditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatNativeDateModule,
    
    MatDatepickerModule,
    A11yModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatSelectModule,
    
    AppRoutingModule,
  ],
  entryComponents: [
    DialogComponent,
    EmailComponent,
    BookmodalComponent,
    PriestmodalComponent,
    PlacemodalComponent,
    CreateuserComponent,
    PersoneditComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: Statuserror, multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: Jwtheader, multi: true,
    },
    {
      provide: MAT_DATE_LOCALE, useValue: 'en-GB'
    }
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
