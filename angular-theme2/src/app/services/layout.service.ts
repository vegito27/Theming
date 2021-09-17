import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  layouts=[1,2,3,4]
  curretLayout:Subject<Number>=new Subject<Number>();

  constructor() {
    this.curretLayout.next(1)
  }








}
