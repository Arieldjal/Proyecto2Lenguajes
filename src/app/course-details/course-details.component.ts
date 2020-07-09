import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  course:any;
  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }


  ngOnInit() {
    this.rest.getCourse(this.route.snapshot.params['id']).subscribe((data: {}) => {
      console.log(data);
      this.course = data;
    });
  }

  cancel() {
    this.router.navigate(['/courses-registry']);
  }

}