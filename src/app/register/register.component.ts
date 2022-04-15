import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { AuthenticateService } from '../authenticate.service';
import { ConfirmedValidator } from '../ConfirmedValidator';
import { Payload } from '../payload';
import { RegisterPayload } from '../registerpayload';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  // form: any = {
  //   username: null,
  //   email: null,
  //   password: null,
  //   confirmPassword: null
  // };
  registerForm!: FormGroup;
   registerPayload!: RegisterPayload;
  constructor(private formBuilder: FormBuilder,private router:Router, private authService: AuthenticateService) { 

    this.form = formBuilder.group({
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    }, { 
      validator: ConfirmedValidator('password', 'confirm_password')
    })
  }

  ngOnInit(): void {
    this.registerPayload = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  }
  get f(){
    return this.form.controls;
  }
  onSubmit(){
    console.log(this.form.get('password')?.value);
    this.registerPayload.username = this.form.get('username')?.value
    console.log(this.registerPayload.username);
    // this.registerPayload.username = this.form.username;
    this.registerPayload.email = this.form.get('email')?.value;
    this.registerPayload.password = this.form.get('password')?.value;
    this.registerPayload.confirmPassword = this.form.get('confirm_password')?.value;

    this.authService.register(this.registerPayload).subscribe(data =>{
      console.log(data)
      
      console.log('register succes');
      this.router.navigateByUrl('/register-success');
    }, error => {
      console.log('register failed');
    });
  }

}
