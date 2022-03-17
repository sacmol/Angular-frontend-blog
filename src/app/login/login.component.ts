import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthenticateService } from '../authenticate.service';
import { Payload } from '../payload';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  loginPayload!: Payload;
  constructor(private authService: AuthenticateService, private router: Router) { }

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  ngOnInit(): void {

    this.loginPayload = {
      username: '',
      password: ''
    };
  }
  onSubmit(){
    const { username, email, password } = this.form;
    console.log("AAA")
    console.log(this.form.username);
  this.loginPayload.username = this.form.username;
  this.loginPayload.password = this.form.password;
    console.log(this.loginPayload.username)
    console.log(this.loginPayload)


    this.authService.login(this.loginPayload).subscribe(data => {
      if (data) {
        console.log('login success');
        this.router.navigateByUrl('/home');
      } else {
        console.log('Login failed');
      }
    });
  }
}
