import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-course-update',
  templateUrl: './course-update.component.html',
  styleUrls: ['./course-update.component.css']
})
export class CourseUpdateComponent implements OnInit {

  @Input() courseData:any = { courseId: 0, name:'',initials:'',modality:'',description:''};

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
  this.rest.getCourse(this.route.snapshot.params['id']).subscribe((data: {}) => {
    console.log(data);
    this.courseData = data;
  });
}

updateCourse() {

  if (!this.courseForm.valid) {
    return;
  }

  this.rest.updateCourse(this.courseData.courseId,this.courseData).subscribe((result) => {
    this.router.navigate(['/courses']);
  }, (err) => {
    console.log(err);
  });
}

cancel() {
  this.router.navigate(['/courses']);
}


get id() { return this.courseForm.get('courseId'); }
get name() { return this.courseForm.get('name'); }
get initials() { return this.courseForm.get('initials'); }
get active() { return this.courseForm.get('active'); }
get modality() { return this.courseForm.get('modality'); }
get description() { return this.courseForm.get('description'); }

}
