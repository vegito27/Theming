import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorService {


  invert=new Subject<boolean>();

  constructor() {
    this.invert.next(false)
   }

  change(x:boolean){
    this.invert.next(x)
  }


}
