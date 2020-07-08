import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  modalLogin: BsModalRef;
  modalRegister: BsModalRef;
  loginForm: FormGroup;
  registerForm: FormGroup;
  constructor(private fb: FormBuilder, private modalService: BsModalService, 
    private route: ActivatedRoute, private router: Router) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })

    this.registerForm = this.fb.group({
      emailRegister: ['', [Validators.required]],
      passwordRegister: ['', [Validators.required]],
      nameRegister: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
      last_nameRegister: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
      phoneRegister: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{8,8}$')
      ]),
    })


  }

  ngOnInit(): void {
  }

  openLoginModal(loginTemplate: TemplateRef<any>) {
    this.modalLogin = this.modalService.show(loginTemplate);
  }

  openRegisterModal(registerTemplate: TemplateRef<any>) {
    this.modalRegister = this.modalService.show(registerTemplate)
  }

  cancelLogin() {
    this.modalLogin.hide();
  }

  cancelRegister() {
    this.modalRegister.hide();
  }

  login() {

    if (!this.loginForm.valid) {
      return;
    }

    console.log(this.loginForm);
    this.modalLogin.hide();
  }

  register(){

    if (!this.registerForm.valid) {
      return;
    }

    console.log(this.registerForm);
    this.modalRegister.hide();
  }

}
