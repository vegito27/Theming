import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ColorService } from 'src/app/service/color.service';
import { ThemeService } from 'src/app/service/theme.service';


@Component({
  selector: 'app-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class CustomComponent implements OnInit {

  custom_theme:boolean=true
  bootstrap_theme:boolean=false
  material_theme:boolean=false
  isDarkmode!:boolean
  isDarkMode!:boolean

  @Output('changeMode') changeMode=new EventEmitter;


  constructor(private themeservice:ThemeService,private service:ColorService) {
    this.service.invert.subscribe(val=>{
      this.isDarkmode=val
    })
  }
  showOptions!: boolean;
  ngOnInit(): void {
  }


  showOption(){
    this.showOptions=!this.showOptions
    console.log(this.showOptions)
  }

  selectTheme(event:any){

    let name=event.target.name

    if(name=='custom'){
      this.bootstrap_theme=false
      this.custom_theme=true
      this.material_theme=false;
      this.themeservice.changeThemeType('custom')


    }

    if(name=='bootstrap'){
      this.bootstrap_theme=true
      this.custom_theme=false
      this.material_theme=false
      this.themeservice.changeThemeType('bootstrap')
    }

    if(name=="material"){
      this.bootstrap_theme=false
      this.custom_theme=false
      this.material_theme=true
      this.themeservice.changeThemeType('material')
    }
  }
  toggleDarkMode(){
    this.isDarkMode=!this.isDarkMode
    console.log('toggle called')
    this.changeMode.emit(this.isDarkMode)
    this.service.change(!this.isDarkmode)
    this.isDarkMode=this.themeservice.isDarkMode()
    this.isDarkMode? this.themeservice.updateTheme('light-mode'):this.themeservice.updateTheme('dark-mode')
  }

}
