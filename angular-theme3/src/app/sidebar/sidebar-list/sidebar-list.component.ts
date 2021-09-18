import { Component, OnInit } from '@angular/core';
import { ToggleService } from 'src/app/service/toggle.service';

@Component({
  selector: 'app-sidebar-list',
  templateUrl: './sidebar-list.component.html',
  styleUrls: ['./sidebar-list.component.scss']
})
export class SidebarListComponent implements OnInit {

  constructor( private sidebar:ToggleService) { }

  sidebarOpen:Boolean=false

  ngOnInit(): void {
    this.sidebar.sidebar.subscribe(value =>{
      this.sidebarOpen=value
    })
  }

}
