import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { FormElement } from 'src/app/interfaces/form-element';
import { UserProfileData } from 'src/app/interfaces/user-data';
import { DataService } from 'src/app/services/data.service';
import { LanguageService } from 'src/app/services/language.service';
import { ProfileService } from 'src/app/services/profile.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-basic-information',
  templateUrl: './basic-information.component.html',
  styleUrls: ['./basic-information.component.scss']
})
export class BasicInformationComponent implements OnInit {
  basicInfoTitleText: string = '';
  sendButtonText: string = '';
  profileData!: UserProfileData;
  basicInfoFormElements: FormElement[] = [
    { key: 'profileFirstName', placeholder: '', focus: false, profileDataKey: 'firstName' },
    { key: 'profileLastName', placeholder: '', focus: false, profileDataKey: 'lastName' },
    { key: 'profileJobTitle', placeholder: '', focus: false, profileDataKey: 'jobTitle' },
    { key: 'profileAge', placeholder: '', focus: false, profileDataKey: 'age' },
    { key: 'profileCurrentSalary', placeholder: '', focus: false, profileDataKey: 'currentSalary' },
    { key: 'profileExpectedSalary', placeholder: '', focus: false, profileDataKey: 'expectedSalary' },
    { key: 'profileDescription', placeholder: '', focus: false, fieldType: 'textarea', profileDataKey: 'description' }
  ];

  basicInfoForm: FormGroup = new FormGroup({
    profileFirstName: new FormControl(''),
    profileLastName: new FormControl(''),
    profileJobTitle: new FormControl(''),
    profileAge: new FormControl(''),
    profileCurrentSalary: new FormControl(''),
    profileExpectedSalary: new FormControl(''),
    profileDescription: new FormControl(''),
  });

  constructor(private dataService: DataService, private languageService: LanguageService,
    private profileService: ProfileService, private sessionService: SessionService) { }

  ngOnInit(): void {
   this.initData();
  }

  initData(){
    this.profileService.getProfileDataAndPublicContents().subscribe(res => {
      this.profileData = res[0];
      this.languageService.languageObservable$.subscribe(lang => {
        this.basicInfoTitleText = this.languageService.getTranslationByKey(lang, res[1], 'title', 'profileBasicInfoTitle', 'PublicContentTranslations');
        this.sendButtonText = this.languageService.getTranslationByKey(lang, res[1], 'title', 'profileSendButtonText', 'PublicContentTranslations');
        this.basicInfoFormElements = this.basicInfoFormElements.map(element => {
          this.basicInfoForm.controls[element.key].setValue(res[0][element.profileDataKey!] ? res[0][element.profileDataKey!] : res[0]['Profile'][element.profileDataKey!]);
          element.placeholder = this.languageService.getTranslationByKey(lang, res[1], 'title', element.key, 'PublicContentTranslations');
          element.value = res[0][element.profileDataKey!] ? res[0][element.profileDataKey!] : res[0]['Profile'][element.profileDataKey!]
          return element;
        });
      });
    });
  }

  saveInfos() {
    let userResult = {
      firstName: this.basicInfoForm.controls.profileFirstName.value,
      lastName: this.basicInfoForm.controls.profileLastName.value
    }
    let profileResult = {
      jobTitle: this.basicInfoForm.controls.profileJobTitle.value,
      age: this.basicInfoForm.controls.profileAge.value,
      currentSalary: this.basicInfoForm.controls.profileCurrentSalary.value,
      expectedSalary: this.basicInfoForm.controls.profileExpectedSalary.value,
      description: this.basicInfoForm.controls.profileDescription.value
    }
    let headers = new HttpHeaders().set("Authorization", 'Bearer ' + this.sessionService.getSession());
    forkJoin([
      this.dataService.httpPostMethod('/api/users/public/modifyUserData',userResult,headers),
      this.dataService.httpPostMethod('/api/profiles/public/modifyProfileData',profileResult,headers)
    ]).subscribe(res=>{
      this.profileService.nextRefreshState(true);
    });
  }

}
