import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})

export class StudentListComponent implements OnInit {
  students:any = [];
  public gridData: any;
  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents() {
    this.rest.getStudents().subscribe((data: {}) => {
        console.log(data);
        this.gridData = data;
        this.students = data
    });
  }

  accept(id) {
    this.rest.aceptStudent(id)
      .subscribe(res => {
          this.getStudents();
        }, (err) => {
          console.log(err);
        }
      );
  }

  deny(id) {
    this.rest.denyStudent(id)
      .subscribe(res => {
          this.getStudents();
        }, (err) => {
          console.log(err);
        }
      );
  }
}
