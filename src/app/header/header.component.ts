import { HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { LoginComponent } from '../authentication/login/login.component';
import { RegistrationDialogComponent } from '../authentication/registration-dialog/registration-dialog.component';
import { RegistrationDoneDialog } from '../authentication/registration-done-dialog/registration-done-dialog.component';
import { UserData } from '../interfaces/user-data';
import { DataService } from '../services/data.service';
import { ProfileService } from '../services/profile.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isRegistrationOpen: boolean = false;
  isLoginOpen: boolean = false;
  userLoggedIn: boolean = false;
  registrationDialogSubscription: Subscription = new Subscription();
  registrationDoneDialogSubscription: Subscription = new Subscription();
  userLoggedInSubscription: Subscription = new Subscription();
  userDataSubscription: Subscription = new Subscription();
  profileDataSubscription: Subscription = new Subscription();
  loginDialogSubscription: Subscription = new Subscription();
  userData!: UserData;
  isProfileMenuOpen: boolean = false;
  isUserMenuOpen: boolean = false;

  @ViewChild('userButton') userButton!: ElementRef;
  @ViewChild('userContainer') userContainer!: ElementRef;
  @ViewChild('profileButton') profileButton!: ElementRef;
  @ViewChild('profileContainer') profileContainer!: ElementRef;

  constructor(
    public dialog: MatDialog,
    private sessionService: SessionService,
    private dataService: DataService,
    private renderer: Renderer2,
    private profileService: ProfileService
  ) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (this.profileButton && this.profileContainer) {
        if (e.target !== this.profileButton.nativeElement && e.target !== this.profileContainer.nativeElement) {
          this.isProfileMenuOpen = !this.isProfileMenuOpen;
        }
      }

      if (this.userButton && this.userContainer) {
        if (e.target !== this.userButton.nativeElement && e.target !== this.userContainer.nativeElement) {
          this.isUserMenuOpen = !this.isUserMenuOpen;
        }
      }
    });
  }

  ngOnInit(): void {
    this.userLoggedInSubscription = this.sessionService.userLoggedInObservable$.subscribe(state => {
      this.userLoggedIn = state;
    });
    this.userDataSubscription = this.sessionService.userDataObservable$.subscribe(data => {
      this.userData = data;
    });
    if (this.sessionService.getSession()) {
      this.profileDataSubscription = this.profileService.refreshProfileDataObservable$.subscribe(refresh => {
        if (refresh) {
         this.getUserData();
        }
      });
      this.getUserData();
    }
  }

  getUserData(){
    let headers = new HttpHeaders().set("Authorization", 'Bearer ' + this.sessionService.getSession());
    this.dataService.getOneData('/api/users/getDataForPublic', headers).subscribe(data => {
      this.userData = data;
    });
  }

  openUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  ngOnDestroy() {
    this.registrationDialogSubscription.unsubscribe();
    this.registrationDoneDialogSubscription.unsubscribe();
    this.userLoggedInSubscription.unsubscribe();
    this.userDataSubscription.unsubscribe();
    this.profileDataSubscription.unsubscribe();
  }

  openProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  openRegistrationDialog() {
    this.isRegistrationOpen = true;
    this.isUserMenuOpen = false;
    const registrationDialogRef = this.dialog.open(RegistrationDialogComponent, {
      backdropClass: 'general-dialog-background', panelClass: 'general-dialog-panel',
      disableClose: true
    });
    this.registrationDialogSubscription = registrationDialogRef.afterClosed().subscribe(() => {
      this.isRegistrationOpen = false;
      if (registrationDialogRef.componentInstance.isRegistrationSuccess) {
        const registrationDoneDialogRef = this.dialog.open(RegistrationDoneDialog, {
          backdropClass: 'general-dialog-background', panelClass: 'general-dialog-panel',
          disableClose: true
        });
        this.registrationDoneDialogSubscription = registrationDoneDialogRef.afterClosed().subscribe(() => {
          if (registrationDoneDialogRef.componentInstance.openLoginNeeded) {
            this.openLoginDialog();
          }
        });
      }
    });
  }

  openLoginDialog() {
    this.isLoginOpen = true;
    this.isUserMenuOpen = false;
    const loginDialogRef = this.dialog.open(LoginComponent, {
      backdropClass: 'general-dialog-background', panelClass: 'general-dialog-panel',
      disableClose: true
    });
    this.loginDialogSubscription = loginDialogRef.afterClosed().subscribe(() => {
      this.isLoginOpen = false;
    });
  }

  logout() {
    this.isProfileMenuOpen = false;
    this.sessionService.clearSession();
  }
}
