import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentsService {

  isSideBarVisible=new Subject<boolean>();

  constructor() {
    this.isSideBarVisible.next(false)
   }
}
