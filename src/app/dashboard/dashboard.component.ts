import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../models/book-model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ServerServiceService } from '../services/server-service.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  
  public books: Book[] = [];
  serverServiceSubscribtion!: Subscription;

  constructor(private router: Router, private http: HttpClient, private serverService: ServerServiceService) {
    this.getBooks();
  }

  getBooks(){
    this.http.get<Book[]>(environment.baseUrl + 'Books').subscribe(result => {
      this.books = result;
    }, error => console.error(error));
  }

  addBook(): void {
      this.router.navigate(['/upload']);
  }

 editBook(book: Book){
  this.serverService.selectedBook = book;
  this.router.navigate(['/update']);
 }


 deleteBook(book: Book){
  if (confirm('Are you sure you want to delete this book?')) {
    this.serverServiceSubscribtion = this.serverService.deleteBook(book.urlHandle!).subscribe({
      next: (res)=> {
        this.getBooks();
        console.log('Book Deleted')
      },
      error: (error)=>{
          console.log(error)
      }
    });
  }
 }

}
