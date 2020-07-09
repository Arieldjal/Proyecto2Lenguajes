import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'; 
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const endpoint = 'http://localhost:8181/api/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-type' : 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { 
  
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getStudents(): Observable<any> {
    return this.http.get(endpoint + 'student/getOutsatadingStudent').pipe(
      map(this.extractData),
      catchError(this.handleError<any>('getStudents'))
    );
  }

  addStudent (student): Observable<any> {
    console.log(student);
    return this.http.post<any>(endpoint + 'student/insertStudent', JSON.stringify(student), httpOptions).pipe(
    tap((student) => console.log('added student')),
    catchError(this.handleError<any>('addStudent'))
    );
  }

  editProfile(app_User): Observable<any> {
    console.log(app_User);
    return this.http.put(endpoint + 'user/updateUser', JSON.stringify(app_User), httpOptions).pipe(
      tap((profile) => console.log('updated profile')),
      catchError(this.handleError<any>('updateProfile'))
    );
  }

  getProfessors(): Observable<any> {
    return this.http.get(endpoint + 'professor/getAllProfessors').pipe(
      map(this.extractData),
      catchError(this.handleError<any>('getProfessors'))
    );
  }

  getProvinces (): Observable<any> {
    return this.http.get(endpoint + 'user/getAllProvinces').pipe(
      map(this.extractData),
      catchError(this.handleError<any>('getProvinces'))
    );
  }

  getCantons (): Observable<any> {
    return this.http.get(endpoint + 'user/getAllCantons').pipe(
      map(this.extractData),
      catchError(this.handleError<any>('getCantons'))
    );
  }

  getDistricts (): Observable<any> {
    return this.http.get(endpoint + 'user/getAllDistricts').pipe(
      map(this.extractData),
      catchError(this.handleError<any>('getDistricts'))
    );
  }

  getProfessor (id): Observable<any> {
    return this.http.get(endpoint + 'professor/getProfessorById/' + id, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError<any>('getProfessorById'))
      );
  }

  addProfessor (professor): Observable<any> {
    console.log(professor);
    return this.http.post<any>(endpoint + 'professor/insertProfessor', JSON.stringify(professor), httpOptions).pipe(
    tap((professor) => console.log('added professor')),
    catchError(this.handleError<any>('addProfessor'))
    );
  }

  updateStudent (professor): Observable<any> {
    return this.http.put(endpoint + 'professor/updateProfessor', JSON.stringify(professor), httpOptions).pipe(
      tap((professor) => console.log('updated professor')),
      catchError(this.handleError<any>('updateProfessor'))
    );
  }

  deleteProfessor (id): Observable<any> {
    return this.http.delete<any>(endpoint + 'professor/deleteProfessor/' + id, httpOptions).pipe(
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

  getActiveCourses(): Observable<any> {
    return this.http.get(endpoint + 'coursesActive').pipe(
      map(this.extractData),
      catchError(this.handleError<any>('getActiveCourses'))
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

  aceptStudent (id): Observable<any> {
    return this.http.put(endpoint + 'student/admitedStudent/' + id, httpOptions).pipe(
      tap(_ => console.log(`id=${id}`)),
      catchError(this.handleError<any>('admitedStudent'))
    );
  }

  denyStudent (id): Observable<any> {
    console.log(id);
    return this.http.delete(endpoint + 'student/deleteStudent/' + id, httpOptions).pipe(
      tap(_ => console.log(`id=${id}`)),
      catchError(this.handleError<any>('admitedStudent'))
    );
  }

  disableUser (id): Observable<any> {
    console.log(id);
    return this.http.put(endpoint + 'user/disableUser/' + id, httpOptions).pipe(
      tap(_ => console.log(`id=${id}`)),
      catchError(this.handleError<any>('disableUser'))
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

}
