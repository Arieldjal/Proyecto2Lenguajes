import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private auth: AuthService, private httpClient: HttpClient, private rest: RestService, private router: Router) { }
  user: any;
  selectedFile: File = null;
  ngOnInit(): void {
    this.user = this.auth.getCurrentUser();
    console.log(this.user);
  }

  disableUser(id){
    this.rest.disableUser(id)
      .subscribe(res => {
          
        }, (err) => {
          console.log(err);
        }
      );
  }

  editProfile(){
    this.router.navigate(['/edit-profile']);
  }

  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload(){
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.httpClient.post('url del rest', fd)
    .subscribe(result => {
      console.log(result);
    });
  }

}
