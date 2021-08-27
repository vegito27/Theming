import { Component, OnInit } from '@angular/core';
import { ComponentsService } from 'src/app/services/components.service';

@Component({
  selector: 'app-header-list',
  templateUrl: './header-list.component.html',
  styleUrls: ['./header-list.component.scss']
})
export class HeaderListComponent implements OnInit {

  constructor(private components:ComponentsService) { }

  isSidebarVisible=true

  toggleSideBar(){
    this.isSidebarVisible=!this.isSidebarVisible
    this.components.isSideBarVisible.next(this.isSidebarVisible)
  }

  ngOnInit(): void {
  }

}
