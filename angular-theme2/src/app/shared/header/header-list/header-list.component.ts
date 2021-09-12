import { Component, OnInit } from '@angular/core';
import { SidebarsService } from 'src/app/services/sidebars.service';

@Component({
  selector: 'app-header-list',
  templateUrl: './header-list.component.html',
  styleUrls: ['./header-list.component.scss']
})
export class HeaderListComponent implements OnInit {

  constructor(private sidebars:SidebarsService) { }

  showSideBar:boolean = false
  showOptionsBar:boolean=false


  ngOnInit(): void {
    this.sidebars.sideBarVisible.subscribe(data=>{
      console.log(data)
      this.showSideBar=data
    })
    this.sidebars.optionBarVisible.subscribe(data=>{
      console.log(data)
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
