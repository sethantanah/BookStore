import { Inject, Injectable } from '@angular/core';
import { Book } from '../models/book-model';
import { Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ServerServiceService {

  selectedBook!: Book;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) { 

  }

  addBook(model: Book): Observable<void> {
    const headers = new HttpHeaders()
      return this.http.post<void>(environment.baseUrl + 'Books', model);
  }

  updateBook(model: Book, slug: string): Observable<void> {
    const headers = new HttpHeaders()
      return this.http.put<void>(environment.baseUrl + `Books/${slug}`, model);
  }

  deleteBook(slug: string): Observable<void> {
    return this.http.delete<void>(environment.baseUrl + `Books/${slug}`);
  }
}
