import { Component, OnInit } from '@angular/core';
import { SidebarsService } from 'src/app/services/sidebars.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private sidebars:SidebarsService) { }

  isSideBarVisible:boolean=true

  ngOnInit(): void {
    this.sidebars.sideBarVisible.subscribe(data=>{
      this.isSideBarVisible=!data
    })
  }

}
