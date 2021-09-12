import { Component, OnInit } from '@angular/core';
import { SidebarsService } from 'src/app/services/sidebars.service';

@Component({
  selector: 'app-options-bar',
  templateUrl: './options-bar.component.html',
  styleUrls: ['./options-bar.component.scss']
})
export class OptionsBarComponent implements OnInit {

  constructor(private sidebars:SidebarsService ) { }

  isOptionBarVisible:boolean=false

  ngOnInit(): void {
    this.sidebars.optionBarVisible.subscribe(data=>{
      this.isOptionBarVisible=data
    })
  }

}
