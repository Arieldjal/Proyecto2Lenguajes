import { Component, OnInit } from '@angular/core';
import {RestService} from '../rest.service';
import {ActivatedRoute, Router} from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.css']
})
export class CourseAddComponent implements OnInit {

  courseForm: FormGroup;
  errorMessage: any;


  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private rest:RestService, private router: Router) {
      
      this.courseForm = this.fb.group({
        name: ['', [Validators.required]],
        initials: ['', [Validators.required]],
        modality: ['', [Validators.required]],
        description: ['', [Validators.required]],
        active: []
    })

}

  ngOnInit() {
  }

  cancel() {
    this.router.navigate(['/courses-registry']);
  }

  addCourse() {
    if (!this.courseForm.valid) {
      return;
    }

    this.rest.addCourse(this.courseForm.value).subscribe((result) => {
      this.router.navigate(['/courses-registry']);
    }, (err) => {
      console.log(err);
    });
  }

  


  // get id() { return this.courseForm.get('studentId'); }
  get name() { return this.courseForm.get('name'); }
  get initials() { return this.courseForm.get('initials'); }
  get active() { return this.courseForm.get('active'); }
  get modality() { return this.courseForm.get('modality'); }
  get description() { return this.courseForm.get('description'); }


}

