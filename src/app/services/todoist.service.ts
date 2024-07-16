import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, map } from 'rxjs/operators';
import { NewTask } from '../data.models/data.model';

@Injectable({
  providedIn: 'root'
})
export class TodoistService {
  private apiUrl = 'https://api.todoist.com/rest/v2';
  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {
    //console.log('TodoistService initialized');
  }

  setToken(token: string) {
    this.tokenSubject.next(token);
  }

  private getHeaders() {
    const token = this.tokenSubject.getValue();
    if (!token) {
      throw new Error('Token is not set');
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getTasks(): Observable<any> {
    return this.tokenSubject.pipe(
      filter(token => !!token),
      switchMap(() => {
        return this.http.get(`${this.apiUrl}/tasks`, { headers: this.getHeaders() }).pipe(
          catchError(this.handleError)
        );
      }),
    );
  }

  newTask(task: NewTask): Observable<void> {
    const newTask = {
      content: task.content,
      description: task.description,
      due_date: task.due_date,
      labels: task.labels
    };
    // Checking payload format and content
    //console.log('Task Payload:', newTask);

    return this.tokenSubject.pipe(
      filter(token => !!token),
      switchMap(() => {
        return this.http.post(`${this.apiUrl}/tasks`, newTask, { headers: this.getHeaders() }).pipe(
          catchError(this.handleError)
        );
      }),
      map(() => void 0) // to not leave 'any' type Observable
    );
  }

  completeTask(taskId: number): Observable<void> {
    return this.tokenSubject.pipe(
      filter(token => !!token),
      switchMap(() => {
        return this.http.post(`${this.apiUrl}/tasks/${taskId}/close`, {}, { headers: this.getHeaders() }).pipe(
          catchError(this.handleError)
        );
      }),
      map(() => void 0) // to not leave 'any' type Observable
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
