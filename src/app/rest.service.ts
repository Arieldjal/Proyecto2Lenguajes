import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'; 
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const endpoint = '';

@Injectable({
  providedIn: 'root'
})
export class RestService {

<<<<<<< Updated upstream
  constructor() { }
=======
  constructor(private http: HttpClient) { 
  
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getStudents(): Observable<any> {
    return this.http.get(endpoint + '/getAllStudents').pipe(
      map(this.extractData),
      catchError(this.handleError<any>('getStudents'))
    );
  }

  getProfessors(): Observable<any> {
    return this.http.get(endpoint + '/getAllProfessors').pipe(
      map(this.extractData),
      catchError(this.handleError<any>('getProfessors'))
    );
  }

  getProfessor (id): Observable<any> {
    return this.http.get(endpoint + '/getProfessorById/' + id, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError<any>('getProfessorById'))
      );
  }

  addProfessor (professor): Observable<any> {
    console.log(professor);
    return this.http.post<any>(endpoint + '/insertProfessor', JSON.stringify(professor), httpOptions).pipe(
    tap((professor) => console.log('added professor')),
    catchError(this.handleError<any>('addProfessor'))
    );
  }

  updateStudent (professor): Observable<any> {
    return this.http.put(endpoint + '/updateProfessor', JSON.stringify(professor), httpOptions).pipe(
      tap((professor) => console.log('updated professor')),
      catchError(this.handleError<any>('updateProfessor'))
    );
  }

  deleteProfessor (id): Observable<any> {
    return this.http.delete<any>(endpoint + '/deleteProfessor/' + id, httpOptions).pipe(
      tap(_ => console.log(`deleted professor id=${id}`)),
      catchError(this.handleError<any>('deleteProfessor'))
    );
  }

  getCourses(): Observable<any> {
    return this.http.get(endpoint + 'courses').pipe(
      map(this.extractData),
      catchError(this.handleError<any>('getCourses'))
      );
  }
  
  getCourse(id): Observable<any> {
    console.log(id);
    
    return this.http.get(endpoint + 'courses/' + id).pipe(
      map(this.extractData),
      catchError(this.handleError<any>('getCourse'))
      );
  }

  addCourse(course): Observable<any> {
    return this.http.post<any>(endpoint + 'courses/add', JSON.stringify(course), httpOptions).pipe(
      tap((course) => console.log('added course')),
      catchError(this.handleError<any>('addCourse'))
    );
  }

  deleteCourse (id): Observable<any> {
    return this.http.delete<any>(endpoint + 'courses/delete/' + id, httpOptions).pipe(
      tap(_ => console.log(`deleted course id=${id}`)),
      catchError(this.handleError<any>('deleteCourse'))
    );
  }

  updateCourse (id, course): Observable<any> {
    console.log(course);
    return this.http.put(endpoint + 'courses/update/' + id, JSON.stringify(course), httpOptions).pipe(
      tap((course) => console.log('updated course')),
      catchError(this.handleError<any>('updateCourse'))
    );
  }

  private handleError<T> (operation = "operation", result?: T){
    return (error:any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    }
  }

>>>>>>> Stashed changes
}
