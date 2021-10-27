import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.component.html',
  styleUrls: ['./supervisor.component.scss']
})
export class SupervisorComponent implements OnInit {

  constructor(private fb:FormBuilder) { }

  form!:FormGroup

  @Input() data:any
  @Output('updateForm') updatedForm=new EventEmitter();
  newData=[]

  ngOnInit(): void {

    this.form=this.fb.group({
      name:['',Validators.required],
      type:['',Validators.required],
      email:['',Validators.required]
    })

    this.form.valueChanges.subscribe((data)=>{
      this.newData=data
      this.updatedForm.emit(data)
    })
  }

}
