import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarsService {

  sideBarVisible=new Subject<boolean>();
  optionBarVisible=new Subject<boolean>()

  constructor() {
    this.sideBarVisible.next(false)
    this.optionBarVisible.next(true)
  }

  updateSideBar(){





  }

  updateOptionsBar(){



  }







}
