import { Component, OnInit } from '@angular/core';
import { ToggleService } from 'src/app/service/toggle.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor( private sidebar:ToggleService) { }

  sidebarOpen:Boolean=false

  ngOnInit(): void {
    this.sidebar.sidebar.subscribe(value =>{
      this.sidebarOpen=value
    })
  }

}
