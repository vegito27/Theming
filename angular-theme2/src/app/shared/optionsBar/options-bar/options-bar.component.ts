import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/services/layout.service';
import { SidebarsService } from 'src/app/services/sidebars.service';

@Component({
  selector: 'app-options-bar',
  templateUrl: './options-bar.component.html',
  styleUrls: ['./options-bar.component.scss']
})
export class OptionsBarComponent implements OnInit {

  constructor(private sidebars:SidebarsService,private layoutService:LayoutService ) { }

  isOptionBarVisible:boolean=false
  layout!:Number

  ngOnInit(): void {
    this.sidebars.optionBarVisible.subscribe(data=>{
      this.isOptionBarVisible=data
    })

    this.layoutService.curretLayout.subscribe(value=>{
      this.layout=value
    })
  }

  closeOptionsBar(){
    this.isOptionBarVisible=!this.isOptionBarVisible
    this.sidebars.optionBarVisible.next(this.isOptionBarVisible)
  }

  selectLayout(val: number){
    this.layoutService.curretLayout.next(val)
  }

}
