import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  constructor(private fb:FormBuilder) { }

  form!:FormGroup
  @Input() formData:any
  @Output('updatedForm') updatedForm=new EventEmitter()

  ngOnInit() {
    this.form=this.fb.group({
      buildingName:[''],
      customerName:['',Validators.required],
      phone:['',Validators.required]
    })

    this.form.valueChanges.subscribe(data=>{
     this.formData={
       ...this.formData,
       ...data
     }
     console.log(this.formData)
     this.updatedForm.emit(this.formData)
    })
  }

  data=["Rishabh",'rajat',"Mukul","Manish","Archana","Anup","Vinod Customer","BABA"]

}
