import { Component, Input, OnInit } from '@angular/core';
import { ComponentsService } from 'src/app/services/components.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private components:ComponentsService) { }
  isSideBar!:boolean;
  sidebarList=[false,false,false,false,false,false]
  currentIndex:any;
  previousIndex:any


  ngOnInit(): void {
    this.components.isSideBarVisible.subscribe(val =>{
      this.isSideBar=!val
    } )
  }

  enableList(index:any){
    if(this.previousIndex !=null || this.previousIndex!=undefined ){
      if( this.previousIndex==index){
       if( this.sidebarList[this.previousIndex]==true){
        this.sidebarList[index]=false
       }else{
        this.sidebarList[index]=true
       }
      }else{
        this.sidebarList[this.previousIndex]=false
        this.sidebarList[index]=!this.sidebarList[index];
      }
      this.previousIndex=index;
    }else{
      this.sidebarList[index]=!this.sidebarList[index];
      this.previousIndex=index
    }
  }

}
