import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { RegistrationDialogComponent } from './authentication/registration-dialog/registration-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationDoneDialog } from './authentication/registration-done-dialog/registration-done-dialog.component';
import { LoginComponent } from './authentication/login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { BasicInformationComponent } from './profile/basic-information/basic-information.component';
import { ContactInformationComponent } from './profile/contact-information/contact-information.component';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';
import { ChangePasswordComponent } from './profile/change-password/change-password.component';
import { EmployerJobsComponent } from './employer-jobs/employer-jobs.component';
import { MyJobsComponent } from './employer-jobs/my-jobs/my-jobs.component';
import { JobHandleComponent } from './employer-jobs/job-handle/job-handlecomponent';
import { SanitizerPipe } from './pipes/sanitizer.pipe';
import { JobComponent } from './job/job.component';
import { PreferedCategoriesComponent } from './profile/prefered-categories/prefered-categories.component';
import { HomeSearchComponent } from './home/home-search/home-search.component';
import { HomeCategoriesComponent } from './home/home-categories/home-categories.component';
import { HomeRegisterComponent } from './home/home-register/home-register.component';
import { HomeJobsComponent } from './home/home-jobs/home-jobs.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryComponent } from './category/category.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { JobsComponent } from './jobs/jobs.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ProfileDialogComponent } from './profile-dialog/profile-dialog.component';
import { AnswerToAppliedUserDialogComponent } from './employer-jobs/my-jobs/answer-to-applied-user-dialog/answer-to-applied-user-dialog.component';
import { AppliedJobsComponent } from './profile/applied-jobs/applied-jobs.component';
import { EventsComponent } from './employer-jobs/events/events.component';
import { VideoEventComponent } from './video-event/video-event.component';
import { CallInfoDialogComponent } from './video-event/call-info-dialog/call-info-dialog.component';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    RegistrationDialogComponent,
    RegistrationDoneDialog,
    LoginComponent,
    ProfileComponent,
    BasicInformationComponent,
    ContactInformationComponent,
    MessageDialogComponent,
    ChangePasswordComponent,
    EmployerJobsComponent,
    MyJobsComponent,
    JobHandleComponent,
    SanitizerPipe,
    JobComponent,
    PreferedCategoriesComponent,
    HomeSearchComponent,
    HomeCategoriesComponent,
    HomeRegisterComponent,
    HomeJobsComponent,
    CategoriesComponent,
    CategoryComponent,
    FooterComponent,
    ContactComponent,
    JobsComponent,
    ProfileDialogComponent,
    AnswerToAppliedUserDialogComponent,
    AppliedJobsComponent,
    EventsComponent,
    VideoEventComponent,
    CallInfoDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    ClipboardModule,
    MatSnackBarModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
