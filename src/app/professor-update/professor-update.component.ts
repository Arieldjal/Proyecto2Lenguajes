import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-professor-update',
  templateUrl: './professor-update.component.html',
  styleUrls: ['./professor-update.component.css']
})
export class ProfessorUpdateComponent implements OnInit {

  professorForm: FormGroup;
  errorMessage: any;

  @Input() professorData:any = { professor_id: 0, name: '', last_name: '', phone: '' };

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private rest: RestService, private router: Router) {

    this.professorForm = this.fb.group({
      professor_id: [],
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
      last_name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{8,8}$')
      ])
    })

  }

  ngOnInit(): void {
    this.rest.getProfessor(this.route.snapshot.params['professor_id']).subscribe((data: {}) => {
      console.log(data);
      this.professorData = data;
    });
  }

  cancel() {
    this.router.navigate(['/professor-registry']);
  }

  updateProfessor() {

    if (!this.professorForm.valid) {
      return;
    }

    this.rest.updateStudent(this.professorForm.value).subscribe((result) => {
      this.router.navigate(['/professor-registry']);
    }, (err) => {
      console.log(err);
    });
  }

}
