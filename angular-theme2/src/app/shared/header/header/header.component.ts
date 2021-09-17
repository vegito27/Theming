import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/services/layout.service';
import { SidebarsService } from 'src/app/services/sidebars.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private sidebars:SidebarsService,private layoutServices:LayoutService) { }

  isheaderFull:boolean=false
  layout!:Number

  ngOnInit(): void {
    this.sidebars.sideBarVisible.subscribe(data=>{
      this.isheaderFull=data
    })
    this.layoutServices.curretLayout.subscribe(value=>{
      this.layout=value
    })
  }

}
