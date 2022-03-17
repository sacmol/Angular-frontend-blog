import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../authenticate.service';
import {LocalStorageService} from 'ngx-webstorage'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  logged: any;
  constructor(public authService: AuthenticateService,private storage:LocalStorageService,private router: Router) { }

  ngOnInit(): void {
    this.logged = this.storage.retrieve('username');
  }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
