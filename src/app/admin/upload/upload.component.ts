import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '../../models/book-model';
import { ServerServiceService } from 'src/app/services/server-service.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Router } from '@angular/router';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnDestroy {
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
  }

  ngOnDestroy(): void {
    this.serverServiceSubscribtion?.unsubscribe();
  }


  onSubmit(): void {
    const formData: Book = this.bookForm.value;
    formData.urlHandle = formData.title.replace(' ', '') + formData.price
    this.serverServiceSubscribtion = this.serverService.addBook(formData).subscribe({
      next: (res)=> {
        this.router.navigate(['/dashboard']);
          console.log('Book Added')
      },
      error: (error)=>{
          console.log(error)
      }
    });
  }
}
