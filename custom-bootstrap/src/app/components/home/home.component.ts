import { Component, OnInit, Output } from '@angular/core';
import { ThemeService } from 'src/app/service/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // isDarkMode:boolean=true
  isDarkMode!:boolean;
  showFiller=false
  showSideBar=false

  constructor(private themeservice:ThemeService) {
    this.themeservice.initTheme()
    this.isDarkMode=this.themeservice.isDarkMode()
   }

  ngOnInit(): void {
  }

  toggleDarkMode(){
    this.isDarkMode=!this.isDarkMode
    // console.log(this.isDarkMode)
    this.isDarkMode=this.themeservice.isDarkMode()
    this.isDarkMode? this.themeservice.updateTheme('light-mode'):this.themeservice.updateTheme('dark-mode')
  }

  toggleSideBar(){
    this.showSideBar=!this.showSideBar
    this.themeservice.changeWidth(this.showSideBar)
  }

  changeTheme(event:any){
   this.isDarkMode=event

  }




}
