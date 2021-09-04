import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(private themeService:ThemeService) { }

  isSelected=[true,false,false,false];
  current:number=0

  ngOnInit(): void {
  }

  changeLayout(type:number){
    this.themeService.updateLayout(type)
    this.isSelected[type]=true
    this.isSelected[this.current]=false
    this.current=type
  }

}
