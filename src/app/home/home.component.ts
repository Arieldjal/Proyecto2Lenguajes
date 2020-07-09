import { Component, OnInit } from '@angular/core';  
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap'
import { RestService } from '../rest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  courses:any = [];

  constructor(private _config:NgbCarouselModule, public rest:RestService) { }

  ngOnInit(): void {
    this.getActiveCourses();
  }

  getActiveCourses() {
    this.courses = [];
    this.rest.getActiveCourses().subscribe((data: {}) => {
        console.log(data);
        this.courses = data;
    });
  }

}
