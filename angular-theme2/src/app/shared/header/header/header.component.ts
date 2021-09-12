import { Component, OnInit } from '@angular/core';
import { SidebarsService } from 'src/app/services/sidebars.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private sidebars:SidebarsService) { }

  isheaderFull:boolean=false

  ngOnInit(): void {
    this.sidebars.sideBarVisible.subscribe(data=>{
      this.isheaderFull=data
      console.log(data)
    })
  }

}
