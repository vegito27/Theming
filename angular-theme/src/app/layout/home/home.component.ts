import { Component, OnInit } from '@angular/core';
import { ComponentsService } from 'src/app/services/components.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isSideBar!:boolean;
  sidebarList=[false,false,false,false,false,false]
  currentIndex:any;
  previousIndex:any
  isOptionBar:boolean=true

  constructor(private components:ComponentsService,private themeService:ThemeService ) { }

  ngOnInit(): void {

        this.components.isSideBarVisible.subscribe(val =>{
          this.isSideBar=!val
        })
        this.themeService.updateLayout(2)

  }

  applyChanges(event:any){
    this.isOptionBar=event
    console.log(event)
  }

}
