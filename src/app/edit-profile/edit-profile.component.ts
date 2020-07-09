import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../rest.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  profileForm: FormGroup;
  provinces: any = [];
  cantons: any = [];
  districts: any = [];

  @Input() userData:any = { app_User: 0, name: '', last_name: '', phone: '', password: '', province: '', canton: '', district: '', interest: '' };

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private rest: RestService, private router: Router, private auth: AuthService) {

    this.profileForm = this.fb.group({
      app_User_id: [0],
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
      last_name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{8,8}$')
      ]),
      password: ['', [Validators.required]],
      province: [''],
      canton: [''],
      district: [''],
      interest: ['']
    })
  }

  private user: any;

  ngOnInit(): void {
    this.userData = this.auth.getCurrentUser();
    console.log(this.userData);
    this.loadProvinces();
    this.loadCantons();
    this.loadDistricts();
  }

  updateProfile() {
    if (!this.profileForm.valid) {
      return;
    }

    this.rest.editProfile(this.profileForm.value).subscribe((result) => {
      this.refreshUserData();
      this.router.navigate(['/profile']);
    }, (err) => {
      console.log(err);
    });
  
  }

  refreshUserData() {
    this.user = this.auth.getCurrentUser();
    this.user.name = this.profileForm.controls.name.value;
    this.user.last_name = this.profileForm.controls.last_name.value;
    this.user.phone = this.profileForm.controls.phone.value;
    this.user.password = this.profileForm.controls.password.value;
    this.user.province = this.profileForm.controls.province.value;
    this.user.canton = this.profileForm.controls.canton.value;
    this.user.district = this.profileForm.controls.district.value;
    this.user.interest = this.profileForm.controls.interest.value;
    this.auth.logoutUser();
    this.auth.setUser(this.user);
  }

  cancel() {
    this.router.navigate(['/profile']);
  }

  loadProvinces() {
    this.provinces = [];
    this.rest.getProvinces().subscribe((data: {}) => {
      console.log(data);
      this.provinces = data;
    });
  }

  loadCantons() {
    this.cantons = [];
    this.rest.getCantons().subscribe((data: {}) => {
      console.log(data);
      this.cantons = data;
    });
  }

  loadDistricts() {
    this.districts = [];
    this.rest.getDistricts().subscribe((data: {}) => {
      console.log(data);
      this.districts = data;
    });
  }

}
