import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserAccount } from '../models/user-account.model';
import { Page } from '../models/page.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  private baseUrl = environment.baseUrl;

  constructor(private snackBar: MatSnackBar,
              private http: HttpClient) { }

  handleError(error: any): Observable<never> {
    let errorMessage = 'Ocorreu um erro.';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else if (error.status) {
      errorMessage = `Erro ${error.status}: ${error.error.message || error.statusText}`;
    }

    this.showMessage(errorMessage, true);
    return throwError(errorMessage);
  }

   showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X',{
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: "top",
      panelClass: isError? ['msg-error'] : ['msg-sucess']
    });
  }

  create(userAccount: UserAccount): Observable<UserAccount> {
    return this.http.post<UserAccount>(this.baseUrl, userAccount).pipe(
        catchError(this.handleError)
    );
  }

  read(): Observable<UserAccount[]> {
    return this.http.get<UserAccount[]>(`${this.baseUrl}/all`).pipe(
        catchError(this.handleError)
    );
  }

  readById(userId: string): Observable<UserAccount> {
    const url = `${this.baseUrl}/${userId}`;
    return this.http.get<UserAccount>(url).pipe(
        catchError(this.handleError)
    );
  }

  update(userAccount: UserAccount): Observable<UserAccount> {
    const url = `${this.baseUrl}/${userAccount.userId}`;
    return this.http.put<UserAccount>(url, userAccount).pipe(
        catchError(this.handleError)
    );
  }

  getUsersByDateRange(start?: string, end?: string, page: number = 0, size: number = 10): Observable<Page<UserAccount>> {
    let params = new HttpParams();
    if (start) params = params.append('start', start);
    if (end) params = params.append('end', end);
    params = params.append('page', page.toString());
    params = params.append('size', size.toString());
    
    return this.http.get<Page<UserAccount>>(`${this.baseUrl}/byDateRange`, { params });
  }
  
  

  downloadPDF(start?: string, end?: string): Observable<Blob> {
    let params = new HttpParams();
    if (start) params = params.append('start', start);
    if (end) params = params.append('end', end);

    return this.http.get(`${this.baseUrl}/downloadPDF`, {
      params: params,
      responseType: 'blob'
    }).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(userId: string): Observable<UserAccount> {
    const url = `${this.baseUrl}/${userId}`;
    return this.http.delete<UserAccount>(url).pipe(
        catchError(this.handleError)
    );
  }
  
}
