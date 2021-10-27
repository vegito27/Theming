import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.scss']
})
export class LeadComponent implements OnInit {

  constructor(private fb:FormBuilder) { }

  form!:FormGroup
  customersData=[]
  customers=["C-1",'C-2',"C-3","C-4","C-5","C-6","C-7","C-8"]
  managers=["M1",'M2',"M-3","M-4","M-6","M-7","M-8","M-9"]

  @Input() formData:any
  @Output('updatedForm') updatedForm=new EventEmitter()
  @Output('setData') setData=new EventEmitter()

  get manager(){
    return this.form.get('manager')
  }

  get superVisor(){
    return this.form.get('superVisor')
  }

  customersAndManagers=[]

  ngOnInit(): void {

    this.form=this.fb.group({
      manager:[''],
      superVisor:['',Validators.required],
    })

    this.form.valueChanges.subscribe(data=>{

      this.customersAndManagers=data
      this.customersData=data['customer']
      this.customersData=data
      this.setCustomerData()
    })
  }


  setCustomerData(){
    this.setData.emit(this.customersData)
  }


}
