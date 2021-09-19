import { Component, Input, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/services/layout.service';
import { SidebarsService } from 'src/app/services/sidebars.service';

@Component({
  selector: 'app-option-bar-layout',
  templateUrl: './option-bar-layout.component.html',
  styleUrls: ['./option-bar-layout.component.scss']
})
export class OptionBarLayoutComponent implements OnInit {

  constructor(private sidebars:SidebarsService,private layoutServices:LayoutService) { }

  layout!:Number;
  isOptionBarVisible:boolean=false

  ngOnInit(): void {
    this.layoutServices.curretLayout.subscribe(value=>{
      this.layout=value
    })

    this.sidebars.optionBarVisible.subscribe(data=>{
      this.isOptionBarVisible=data
    })
  }

  selectLayout(val: number){
    this.layoutServices.curretLayout.next(val)
    this.sidebars.optionBarVisible.next(false)
    val!==4?this.sidebars.sideBarVisible.next(true):this.sidebars.sideBarVisible.next(false)
  }
}
