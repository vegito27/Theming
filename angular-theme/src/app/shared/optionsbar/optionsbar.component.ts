import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-optionsbar',
  templateUrl: './optionsbar.component.html',
  styleUrls: ['./optionsbar.component.scss']
})
export class OptionsbarComponent implements OnInit {

  constructor(private themeservice:ThemeService) { }
  open:boolean=true
  isDarkMode=false


  ngOnInit(): void {
  }

  settle(){
    this.open=false
  }

  check(event:any){
    this.isDarkMode=event.target.checked
    if(this.isDarkMode){
      this.themeservice.updateTheme("dark")
    }else{
      this.themeservice.updateTheme("light")
    }
  }

}
