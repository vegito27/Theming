import { Component } from '@angular/core';
import { ThemeService } from './service/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dark-theme-yt';
  isDarkMode!:boolean;
  showFiller=false

  constructor(private themeservice:ThemeService){
    this.themeservice.initTheme()
    this.isDarkMode=this.themeservice.isDarkMode()
  }

  toggleDarkMode(){
    this.isDarkMode=this.themeservice.isDarkMode()
    this.isDarkMode? this.themeservice.updateTheme('light-mode'):this.themeservice.updateTheme('dark-mode')
  }

  openDialog(){
    
  }

}
