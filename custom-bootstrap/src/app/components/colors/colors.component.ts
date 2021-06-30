import { Component, OnInit, Renderer2 } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ThemeService } from 'src/app/service/theme.service';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.scss']
})
export class ColorsComponent implements OnInit {

  current='class-1';
  previous:any='class-1';

  constructor(private themeservice:ThemeService) {}

  colors:any=['red','yellow','blue','green'];

  ngOnInit(): void {
    // this.themeservice.initClass('class-1')
  }

  select(event:any){
    let value=event.target.classList[1];
    this.previous=this.current
    this.current=value
    if(this.current!=this.previous){
      this.themeservice.select(value,this.previous)
    }
  }


}
