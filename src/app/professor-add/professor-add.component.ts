import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-professor-add',
  templateUrl: './professor-add.component.html',
  styleUrls: ['./professor-add.component.css']
})
export class ProfessorAddComponent implements OnInit {

  professorForm: FormGroup;
  errorMessage: any;

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private rest: RestService, private router: Router) {

    this.professorForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
      last_name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
      email: ['', [Validators.required]],
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{8,8}$')
      ]),
      admin: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  cancel() {
    this.router.navigate(['/professor-registry']);
  }

  addProfessor() {

    if (!this.professorForm.valid) {
      return;
    }

    this.rest.addProfessor(this.professorForm.value).subscribe((result) => {
      this.router.navigate(['/professor-registry']);
    }, (err) => {
      console.log(err);
    });
  }

}
