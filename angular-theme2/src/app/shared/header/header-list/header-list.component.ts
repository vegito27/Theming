import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LayoutService } from 'src/app/services/layout.service';
import { SidebarsService } from 'src/app/services/sidebars.service';

@Component({
  selector: 'app-header-list',
  templateUrl: './header-list.component.html',
  styleUrls: ['./header-list.component.scss']
})
export class HeaderListComponent implements OnInit {

  constructor(private sidebars:SidebarsService,private layoutServices:LayoutService) { }

  showSideBar:boolean = false
  showOptionsBar:boolean=false
  layout!:Number;
  @Output() sidebarAnimation=new EventEmitter()

  ngOnInit(): void {
    this.layoutServices.curretLayout.subscribe(value=>{
      this.layout=value
    })
    this.sidebars.sideBarVisible.subscribe(data=>{
      console.log(data)
      this.showSideBar=data
    })
    this.sidebars.optionBarVisible.subscribe(data=>{
      this.showOptionsBar=data
    })

  }

  toggleSideBar()
  {
    this.showSideBar=!this.showSideBar
    this.sidebars.sideBarVisible.next(this.showSideBar)
  }

  toggleOptionsBar(){
    this.showOptionsBar=!this.showOptionsBar
    this.sidebars.optionBarVisible.next(this.showOptionsBar)
  }

}
