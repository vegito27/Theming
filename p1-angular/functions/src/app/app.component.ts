import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from './store/app.interface';
import { login } from './store/actions/app.actions';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngrx-store-walkthrough';

  form:FormGroup

  constructor(private fb: FormBuilder,private store: Store<IAppState>) {

    this.form=this.fb.group({
      username:[''],
      password:[''],
      authenticationMessage:['']
    })

  }

  login(): void {
    this.store.dispatch(login({ username: 'username', password: 'password' }));
  }

  onsubmit(form:FormGroup){
    this.store.dispatch(login({ username: form.value.username, password: form.value.password }))
  }

  toppings = new FormControl();

  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

}
