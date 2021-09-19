import { Component } from '@angular/core';
import { LayoutService } from './services/layout.service';
import { SidebarsService } from './services/sidebars.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-theme2';

  constructor(private layoutServices:LayoutService,private sidebars:SidebarsService) { }
  layout!:Number
  optionBar:boolean=false
  isOptionBarVisible:boolean=false

  ngOnInit(): void {

    // this.sidebars.optionBarVisible.next(false)
    // this.sidebars.sideBarVisible.next(false)
    this.layoutServices.curretLayout.next(1)

    this.layoutServices.curretLayout.subscribe(value=>{
      this.layout=value
    })

    this.sidebars.optionBarVisible.subscribe(data=>{
      this.optionBar=data
    })

    this.sidebars.optionBarVisible.subscribe(data=>{
      this.isOptionBarVisible=data
    })

  }

  hide(){
    this.isOptionBarVisible=!this.isOptionBarVisible
  }
}
