import { Component, OnInit } from '@angular/core';
import { ToggleService } from 'src/app/service/toggle.service';

@Component({
  selector: 'app-header-list',
  templateUrl: './header-list.component.html',
  styleUrls: ['./header-list.component.scss']
})
export class HeaderListComponent implements OnInit {


  showSidebar:Boolean=false

  constructor(private sidebar:ToggleService) { }
  ngOnInit(): void {
    this.sidebar.sidebar.subscribe(value =>{
      this.showSidebar=value

    })
  }

  toggleSidebar(){
    this.showSidebar=!this.showSidebar
    console.log(this.showSidebar)
    this.sidebar.sidebar.next(this.showSidebar)

  }

}
