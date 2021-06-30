import { Component } from '@angular/core';
import { ThemeService } from './service/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'custom-bootstrap';

  isDarkMode!:boolean;
  showFiller=false

  constructor(private themeservice:ThemeService){
    this.themeservice.initTheme()
    this.isDarkMode=this.themeservice.isDarkMode()
  }


}
