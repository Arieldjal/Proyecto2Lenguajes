import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'; 
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const endpoint = 'http://localhost:8080/api/professor';
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
