import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { RestService } from '../rest.service';

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
    private route: ActivatedRoute, private rest: RestService, private auth: AuthService, private router: Router) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      type: ['', [Validators.required]]
    })

    this.registerForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
      last_name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{8,8}$')
      ]),
    })

  }

  public isLogged: boolean = false;
  public isProfessor: boolean = false;
  public isAdmin: boolean = false;
  private user: any;

  ngOnInit(): void {
    this.onCheckUser();
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

    if (this.loginForm.controls.type.value == 'estudiante') {
      this.auth.loginStudent(this.loginForm.value).subscribe((result) => {
        this.auth.setUser(result)
        this.modalLogin.hide();
        this.ngOnInit();
        this.router.navigate(['/home']);

      }, (err) => {
        console.log(err);
      });
    } else {
      this.auth.loginProfessor(this.loginForm.value).subscribe((result) => {
        this.auth.setUser(result)
        this.modalLogin.hide();
        this.ngOnInit();
        this.router.navigate(['/home']);

      }, (err) => {
        console.log(err);
      });
    }


  }

  register() {

    if (!this.registerForm.valid) {
      return;
    }

    console.log(this.registerForm);
    this.rest.addStudent(this.registerForm.value).subscribe((result) => {
      this.modalRegister.hide();
      this.router.navigate(['/home']);
    }, (err) => {
      console.log(err);
    });

  }

  logout() {
    this.auth.logoutUser();
    this.ngOnInit();
    this.router.navigate(['/home']);
  }

  onCheckUser(): void {
    if (this.auth.getCurrentUser() == null) {
      this.isLogged = false;
    } else {
      this.isLogged = true;
      this.onCheckUserType();
    }
  }

  onCheckUserType(): void {
    this.user = this.auth.getCurrentUser()

    if (this.user.type == 'E') {
      this.isProfessor = false;
    } else {
      this.isProfessor = true;
      this.onCheckAdmin();
    }
  }

  onCheckAdmin(): void {
    if (this.user.admin == false) {
      this.isAdmin = false;
    } else {
      this.isAdmin = true;
    }
  }

}
