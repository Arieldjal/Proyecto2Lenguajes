import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {Observable, of, pipe} from 'rxjs';
import {map, catchError, tap} from 'rxjs/operators';

const endpoint = 'http://127.0.0.1:8181/api/';
const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { 

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

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

