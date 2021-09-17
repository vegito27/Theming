import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/services/layout.service';
import { SidebarsService } from 'src/app/services/sidebars.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private layoutServices:LayoutService,private sidebars:SidebarsService) { }
  isdashboardFull:boolean=false
  layout!:Number

  ngOnInit(): void {
    this.sidebars.sideBarVisible.subscribe(data=>{
      this.isdashboardFull=data
    })

    this.layoutServices.curretLayout.subscribe(value=>{
      this.layout=value
    })
  }

}
