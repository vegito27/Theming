import { Component, OnInit } from '@angular/core';
import { ComponentsService } from 'src/app/services/components.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private component:ComponentsService) { }
  isFullWidth:boolean=false

  ngOnInit(): void {
    this.component.isSideBarVisible.subscribe(val=>{
      this.isFullWidth=!val
    })
  }

}
