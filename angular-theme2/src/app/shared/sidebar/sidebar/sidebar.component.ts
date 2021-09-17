import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/services/layout.service';
import { SidebarsService } from 'src/app/services/sidebars.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  layout!:Number
  showSideBar=true

  constructor(private sidebars:SidebarsService,private layoutServices:LayoutService) { }

  isSideBarVisible:boolean=true

  ngOnInit(): void {
    this.sidebars.sideBarVisible.subscribe(data=>{
      this.isSideBarVisible=!data
    })

    this.layoutServices.curretLayout.subscribe(value=>{
      this.layout=value
    })
  }

  toggleSideBar()
  {
    this.showSideBar=!this.showSideBar
    this.sidebars.sideBarVisible.next(this.showSideBar)
  }

}
