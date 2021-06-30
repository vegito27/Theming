import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { ThemeService } from 'src/app/service/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // isDarkMode:boolean=true
  isDarkMode!:boolean;
  showFiller=false
  showSideBar=false

  constructor(private themeservice:ThemeService,private renderer:Renderer2) {
    this.themeservice.initTheme()
    this.isDarkMode=this.themeservice.isDarkMode()
   }

  ngOnInit(): void {
  }

  toggleDarkMode(){
    this.isDarkMode=this.themeservice.isDarkMode()
    this.isDarkMode? this.themeservice.updateTheme('light-mode'):this.themeservice.updateTheme('dark-mode')
  }

  @HostListener('document:click', ['$event'])
  hide(){
    if(!this.showSideBar){
      this.showSideBar=!this.showSideBar
     }
     this.showSideBar=false
  }

  @HostListener('click', ['$event'])
  toggleSideBar(){
    this.showSideBar=!this.showSideBar
    this.themeservice.changeWidth(this.showSideBar)
    // this.renderer.setStyle(document.getElementsByClassName('container'),'width','100%')
  }

}
