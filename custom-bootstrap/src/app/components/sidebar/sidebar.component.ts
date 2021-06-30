import { Component, Input, OnInit } from '@angular/core';
import { trigger,state,style,animate,transition } from '@angular/animations';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations:[

    trigger('openClose',[
    state('open',style({
      // top:"0px",
      left:"0",
      opacity: 1,
      backgroundColor: 'yellow'
  })),

    state('closed',style({
      left:"-300px",
      // height:"100vh",
      opacity: 0.8,
      backgroundColor: '#c6ecff'
     })),

    transition('open=>closed',[animate('0.5s')]),
    transition('closed=>open',[animate('0.5s')])
  ]
  )]
})
export class SidebarComponent implements OnInit {

  constructor() { }

  @Input('sidebar') showSideBar!:boolean;

  ngOnInit(): void {
  }

}
