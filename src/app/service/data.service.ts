import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  localBaseUrl: string = "http://localhost:3000"
  baseUrl: string = 'https://jsonplaceholder.typicode.com';
  weatherBaseAPI: string = "https://api.openweathermap.org/data/2.5/weather";
  api_key= "b5e3d8937f462295387346e1ec4d0c7c";

  constructor(private httpClient: HttpClient) { }

  getToDos() {
    return this.httpClient.get(`${this.baseUrl}/todos`);
  }

  getToDoByID(id: any) {
    return this.httpClient.get(`${this.baseUrl}/todos/${id}`);
  }

  getUsers() {
    // return this.httpClient.get(`${this.baseUrl}/users/`);
    return this.httpClient.get(`${this.localBaseUrl}/users`)
  }

  getGoldPrice(currency: any, date: any) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', "x-access-token": "goldapi-zpcrlspyu8mr-io" })
  };
    // return this.httpClient.post('https://www.goldapi.io/api/XAU', body, httpOptions);
    return this.httpClient.get(`https://www.goldapi.io/api/XAU/${currency}/${date}`, httpOptions).pipe(catchError(this.handleError));
  }

  getUsersByID(id: any) {
    return this.httpClient.get(`${this.localBaseUrl}/users/${id}`).pipe(catchError(this.handleError));
  }

  getPostsByUserID(id: any) {
    return this.httpClient.get(`${this.baseUrl}/users/${id}/posts`).pipe(catchError(this.handleError));
  }

  updateUser(id: any, payload: any) : Observable<any> {
    if(id) {
      return this.httpClient.patch(`${this.localBaseUrl}/users/${id}` , payload).pipe(catchError(this.handleError));
    }
    return this.httpClient.post(this.localBaseUrl+'/users', payload).pipe(catchError(this.handleError));
  }

  getCurrentWeatherStatus(city: string) {
    return this.httpClient.get(`${this.weatherBaseAPI}?q=${city}&appid=${this.api_key}`).pipe(catchError(this.handleError));
  }

  deleteUser(id: any) {
    // return this.httpClient.delete(`${this.baseUrl}/Users/${id}`).pipe(catchError(this.handleError));
    return this.httpClient.delete(`${this.localBaseUrl}/Users/${id}`).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }


  addUsers(data: any): Observable<any> {
    return this.httpClient.post(`${this.localBaseUrl}/users`, data);
  }

}