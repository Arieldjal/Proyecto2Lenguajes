import { Component, OnInit } from '@angular/core';
import {RestService} from '../rest.service';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  courses:any = [];
  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }


  ngOnInit() {

    this.getCourses();
    
  }

  getCourses() {
    this.courses = [];
    this.rest.getCourses().subscribe((data: {}) => {
      console.log(data);
      this.courses = data;
    });
  }
  add() {
    this.router.navigate(['/course-add']);
  }

  delete(id) {
    this.rest.deleteCourse(id)
      .subscribe(res => {
          this.getCourses();
        }, (err) => {
          console.log(err);
        }
      );
  }

}
