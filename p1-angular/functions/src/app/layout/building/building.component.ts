import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.scss']
})
export class BuildingComponent implements OnInit {

  constructor(private router:Router,private route:ActivatedRoute) { }

  buildingId=false
  allData:any | undefined
  buildingForm:any
  isEditForm=false
  buttonValue='Submit'



  ngOnInit(): void {

   let URL=this.router.url
   if(URL==='/edit'){
    this.buttonValue="Update"
    this.feedForm()
   }else{
    this.buttonValue="Submit"
    this.initValue()
   }

  }

  initValue(){

  }

  feedForm(){
    let getData:any=localStorage.getItem('userName')
    let data=JSON.parse(getData)
    console.log(data)
  }

  submitForm(){

    if(this.buttonValue==="Update"){



    }else{
      let existedData=localStorage.getItem('userData')
      if(existedData==null){
        localStorage.setItem('userData','[]')
      }
    }

    let newData=JSON.stringify(this.buildingForm)
    localStorage.setItem('userData',newData)

    if(this.buttonValue==="Update" || this.buttonValue==="Submit"){
      this.router.navigate(['/'])
    }else{
      this.router.navigate(['/edit'])
    }

  }

  setData(val:any){
    this.buildingForm={
      ...this.buildingForm,
      ...val
    }

    this.allData=[...this.buildingForm.manager,...this.buildingForm.superVisor]

  }

  showForm(value:any){
    console.log(value)
    this.buildingForm={
      ...this.buildingForm,
      ...value
    }
    console.log(this.buildingForm)
  }


}
