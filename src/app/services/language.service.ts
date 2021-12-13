import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Language } from '../interfaces/language';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private languageSubject: Subject<string> = new BehaviorSubject<string>('');
  languageObservable$ = this.languageSubject.asObservable();
  private languages: Language[] = new Array();
  private languagesArraySubject: Subject<Language[]> = new BehaviorSubject<Language[]>(new Array());
  languagesArrayObservable$ = this.languagesArraySubject.asObservable();
  constructor() {
  }
  //nyelvek tömb beállítása
  nextLanguagesArray(languages: Language[]){
    this.languages = languages;
    this.languageSubject.next(this.initLanguage());
    this.languagesArraySubject.next(languages);
  }
  //aktuális nyelv beállítása
  nextLanguage(lang: string){
    localStorage.setItem('lang',lang);
    this.languageSubject.next(lang);
  }
  //aktuális nyelv visszaadása
  getLangauge(){
    return localStorage.getItem('lang');
  }
  //nyelv tömb visszaadása
  getLanguages(){
    return this.languages;
  }
  //nyelv inicializálása
  initLanguage(){
    let lang = 'hu';
    localStorage.getItem('lang') ? lang = localStorage.getItem('lang')! : localStorage.setItem('lang',lang);
    return lang;
  }
  //fordítások beállítása publikus tartalmak esetén
  getTranslationByKey(language: string, container: any[], resultAttribute: string, key: string, objectName: string){  
    let publicContent = container.find(element => element.key == key);
    if(!publicContent){
      return null;
    }
    let transArray = publicContent[objectName];
    let huLangId = this.languages.find(lang => lang.key == 'hu')?.id;
    let langId = this.languages.find(lang => lang.key == language)?.id;
    let translation = transArray.find((trans:any) => trans.languageId == langId);
    let huTranslation = transArray.find((trans:any) => trans.languageId == huLangId);
    return translation ? translation[resultAttribute] : huTranslation ? huTranslation[resultAttribute] : null;
  }
  //fordítások beállítása nem publikus tartalmak esetén
  getTranslation(language: string,transArray: any[]) {
    let huLangId = this.languages.find(lang => lang.key == 'hu')?.id;
    let langId = this.languages.find(lang => lang.key == language)?.id;
    let translation = transArray.find(trans => trans.languageId == langId);
    let huTranslation = transArray.find(trans => trans.languageId == huLangId);
    return translation ? translation : huTranslation ? huTranslation : null;
  }
}
