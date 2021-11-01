import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Subscription } from 'rxjs';
import { Job } from 'src/app/interfaces/job';
import { DataService } from 'src/app/services/data.service';
import { LanguageService } from 'src/app/services/language.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-jobs',
  templateUrl: './my-jobs.component.html',
  styleUrls: ['./my-jobs.component.scss']
})
export class MyJobsComponent implements OnInit, OnDestroy {
  myJobsTitleText: string = '';
  myJobs: Job[] = new Array();
  languageSubscription: Subscription = new Subscription();
  constructor(private dataService: DataService, private languageService: LanguageService) { }

  ngOnInit(): void {
    forkJoin([
      this.dataService.getAllData('/api/jobs/public/getJobsByToken', this.dataService.getAuthHeader()),
      this.dataService.getAllData('/api/publicContents/getByPagePlaceKey/employerJobs/public')
    ]).subscribe(res => {
      this.myJobs = res[0];
      this.languageSubscription = this.languageService.languageObservable$.subscribe(lang => {
        if(lang){
          this.myJobs = this.myJobs.map(element => {
            element.logoUrl = element.logoUrl;
            element.selectedTranslation = this.languageService.getTranslation(lang, element.JobTranslations);
            element.Category.selectedTranslation = this.languageService.getTranslation(lang, element.Category.CategoryTranslations);
            return element;
          });
          this.myJobsTitleText = this.languageService.getTranslationByKey(lang, res[1], 'title', 'myJobsTitleText', 'PublicContentTranslations');
        }
      });
    });
  }

  ngOnDestroy(){
    this.languageSubscription.unsubscribe();
  }

}
