import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ComponentsService } from 'src/app/services/components.service';

@Component({
  selector: 'app-header-list',
  templateUrl: './header-list.component.html',
  styleUrls: ['./header-list.component.scss']
})
export class HeaderListComponent implements OnInit {

  constructor(private components:ComponentsService) { }

  isSidebarVisible=true
  isOptionBar!:boolean;
  @Output() changeOptions=new EventEmitter()

  ngOnInit(): void {
    this.components.isOptionBarVisible.subscribe(data=>{
      this.isOptionBar=data
    })
  }

  toggleSideBar(){
    this.isSidebarVisible=!this.isSidebarVisible
    this.components.isSideBarVisible.next(this.isSidebarVisible)
  }

  changeOptionBar(){
    this.isOptionBar=!this.isOptionBar
    console.log(this.isOptionBar)
    this.components.isOptionBarVisible.next(this.isOptionBar)
    this.changeOptions.emit(this.isOptionBar)
  }

}
