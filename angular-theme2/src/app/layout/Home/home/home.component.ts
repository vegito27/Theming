import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/services/layout.service';
import { SidebarsService } from 'src/app/services/sidebars.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private layoutServices:LayoutService,private sidebars:SidebarsService) { }
  layout!:Number
  optionBar:boolean=false
  isOptionBarVisible:boolean=false

  ngOnInit(): void {
    this.layoutServices.curretLayout.subscribe(value=>{
      this.layout=value
    })

    this.sidebars.optionBarVisible.subscribe(data=>{
      this.optionBar=data
      this.isOptionBarVisible=data
    })

  }

  hide(){

    this.isOptionBarVisible=!this.isOptionBarVisible

  }


}
