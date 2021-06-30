import { Component, OnInit, Renderer2 } from '@angular/core';
import * as FusionCharts from "fusioncharts";
import { ColorService } from 'src/app/service/color.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  isDark!:any
  public lineChartOptions!:any

  constructor(private service:ColorService) {
    this.service.invert.subscribe(val=>{
      this.isDark=val
    })

   }

  ngOnInit(): void {

    if(this.isDark){
      this.lineChartOptions = {
        scaleShowVerticalLines: false,
        responsive: true,
        scales: {
          yAxes: [{
              ticks: {
                  fontColor: 'white' // y-Axes color you want to add
              },
          }],
        xAxes: [{
              ticks: {
                beginAtZero:true,
                  fontColor: 'white'// y-Axes color you want to add
              },
          }]
      }
      };
    }else{
      this.lineChartOptions = {
        scaleShowVerticalLines: false,
        responsive: true
      };
    }
  }

    public barChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true
    };
    public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];

    public barChartType:any = 'bar';
    public lineChart:any = 'line';

    public barChartLegend = true;

    public barChartData = [
      {data: [65, 59, 80, 81, 56, 55, 40], label: 'Active',backgroundColor:'rgb(255,99,71,.75)', hoverBorderColor: 'green', borderColor: '#000',opacity:1,fontColor:'white'},
      {data: [28, 48, 40, 19, 86, 27, 90], label: 'Non-Active',backgroundColor: 'rgba(54, 162, 235,0.75)', hoverBorderColor: 'green', borderColor: '#000',opacity:0.9}
    ];

    public lineChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];


    // public lineChartLegend = true;

    public lineChartData = [
      {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A',backgroundColor: 'transparent'},
      {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B',backgroundColor: 'transparent', hoverBorderColor: 'lightgreen', borderColor: 'lightgreen'}
    ];


}
