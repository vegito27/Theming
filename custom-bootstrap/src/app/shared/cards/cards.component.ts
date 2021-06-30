import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  constructor() { }

  cardsData=[{title:'Total User',value:'1,200'},{title:'Total Posts',value:'2,900'},{title:'Active Users',value:'876'}]

  ngOnInit(): void {
  }

}
