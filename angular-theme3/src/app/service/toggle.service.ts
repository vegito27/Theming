import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleService {

  sidebar=new Subject<Boolean>()

  constructor() {
    this.sidebar.next(false)
  }

}
