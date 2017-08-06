import {Component, OnInit} from '@angular/core';
import {LoginInfo} from './login.model';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
      selector: 'app-login-form',
      templateUrl: './login.component.html'
})


export class LoginComponent implements OnInit {
  public loginInfo: LoginInfo = new LoginInfo();
  managerForm: FormGroup;
  values: any;
  Fail= false;
  Pass= false;
  Status: any;
  constructor(private _formBuilder: FormBuilder, private _http: Http) { }
  ngOnInit() {
    this.managerForm = this._formBuilder.group({
        UserId  :  new FormControl(),
      Password : new FormControl()
    });
  }
  public login() {
    console.log(this.managerForm.value);
    this.values = {
      'UserId': this.managerForm.value.userId,
      'Password': this.managerForm.value.password
    }
    this._http.post('http://localhost:8080/rentalbook/test/alldata', this.values)
      .map((response: Response) => response.json()).subscribe(status => this.Status = status);
    if ( this.Status === true) {
      this.Pass = true;
    } else {
      this.Fail = true;
    }
  }
}
