import { Component, Input, OnInit, Output } from '@angular/core';
import { ComponentsService } from 'src/app/services/components.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-optionsbar',
  templateUrl: './optionsbar.component.html',
  styleUrls: ['./optionsbar.component.scss']
})
export class OptionsbarComponent implements OnInit {

  constructor(private themeservice:ThemeService,private componentService:ComponentsService) { }
  open:boolean=true
  isDarkMode=false
  @Input() optionsBar!:boolean;
  @Output()


  ngOnInit(): void {
    this.componentService.isOptionBarVisible.subscribe(data=>{
      this.open=data
    })
  }

  settle(){
    this.open=!this.open
    this.componentService.isOptionBarVisible.next(this.open)
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
