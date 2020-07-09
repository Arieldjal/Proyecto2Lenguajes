import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type' : 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  loginProfessor(professor): Observable<any>{
    const endpoint = 'http://localhost:8181/api/user/professorlogin';
    return this.http.post(endpoint + '', JSON.stringify(professor), httpOptions).pipe(map(data => data));
  }

  loginStudent(student): Observable<any>{
    const endpoint = 'http://localhost:8181/api/user/studentlogin';
    return this.http.post(endpoint + '', JSON.stringify(student), httpOptions).pipe(map(data => data));
  }

  setUser(user): void {
    let user_string = JSON.stringify(user);
    localStorage.setItem('currentUser', user_string);
  }

  getCurrentUser(){
    let user_string = localStorage.getItem('currentUser');
    if (!isNullOrUndefined(user_string)) {
      let user = JSON.parse(user_string);
      return user;
    } else {
      return null;
    }
  }

  logoutUser() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

}
