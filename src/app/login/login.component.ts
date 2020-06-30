import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() loginData = { email: '', password: '' };

  constructor() { }

  ngOnInit(): void {
    
  }

  login(){
    console.log(this.loginData)
  }
}
