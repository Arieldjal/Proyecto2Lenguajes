import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-professor-list',
  templateUrl: './professor-list.component.html',
  styleUrls: ['./professor-list.component.css']
})
export class ProfessorListComponent implements OnInit {

  professors:any = [];
  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getProfessors();
  }

  getProfessors() {
    this.professors = [];
    this.rest.getProfessors().subscribe((data: {}) => {
        console.log(data);
        this.professors = data;
    });
  }

  add() {
    this.router.navigate(['/professor-add']);
  }

  delete(id){
    this.rest.deleteProfessor(id)
    .subscribe(res => {
      this.getProfessors();
    }, (err) => {
      console.log(err);
    }
    );
  }

}
