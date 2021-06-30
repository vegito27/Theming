import { Component, Input, OnInit } from '@angular/core';
import { ColorService } from 'src/app/service/color.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  constructor(private service:ColorService) { }

  isDarkMode2!:boolean ;

  ngOnInit(): void {
    this.service.invert.subscribe(val=>{
      this.isDarkMode2=val

    })
  }

}
