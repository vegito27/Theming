import { Component, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';



export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  action?:any
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H',action:'edit'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He',action:'edit'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li',action:'edit'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be',action:'edit'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B',action:'edit'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C',action:'edit'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N',action:'edit'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O',action:'edit'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F',action:'edit'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne',action:'edit'},
];


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  data:any=[]

  displayedColumns: string[] = ['demo-position', 'demo-name', 'demo-weight', 'demo-symbol',"action"];
  dataSource = ELEMENT_DATA;

  ngOnInit(): void {
  }

}
