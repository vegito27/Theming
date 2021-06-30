import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { ColorService } from 'src/app/service/color.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input('src') src:any;
  @Input('title') title:any
  @Input('value') value:any
  // @Input('invert') invert!:number
  invert!:boolean;
  // private render!:Renderer2;


  constructor(private ele:ElementRef,private service:ColorService) { }

  ngOnInit(): void {
    this.service.invert.subscribe(val=>{
      this.invert=val
      console.log(val)

    })
  }

  ngOnChanges(){
    this.service.invert.subscribe(val=>{
      this.invert=val

    })
  }

}
