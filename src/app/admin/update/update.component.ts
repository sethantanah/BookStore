import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '../../models/book-model';
import { ServerServiceService } from 'src/app/services/server-service.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Router } from '@angular/router';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {
  bookForm!: FormGroup;
  private serverServiceSubscribtion?: Subscription;

  constructor(private formBuilder: FormBuilder, private serverService: ServerServiceService, private router: Router) { }

  ngOnInit(): void {
    this.bookForm = this.formBuilder.group({
      id: [''],
      title: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      urlHandle: ['', Validators.required]
    });
    const book: Book = this.serverService.selectedBook;
    this.bookForm.setValue({
      id: book.id,
      title: book.title,
      category: book.category,
      price: book.price,
      description: book.description,
      urlHandle: book.urlHandle
    });
  }

  ngOnDestroy(): void {
    this.serverServiceSubscribtion?.unsubscribe();
  }


  onSubmit(): void {
    const formData: Book = this.bookForm.value;
  
    this.serverServiceSubscribtion = this.serverService.updateBook(formData, formData.urlHandle!).subscribe({
      next: (res)=> {
        this.router.navigate(['/dashboard']);
      },
      error: (error)=>{
          console.log(error);
      }
    });
  }
}
