import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {BookService} from "../../services/book.service";
import {AppModule} from "../../app.module";

@Component({
  providers: [AppModule],
  selector: 'app-add-new-book',
  templateUrl: './add-new-book.component.html',
  styleUrls: ['./add-new-book.component.css'],
})
export class AddNewBookComponent implements OnInit {
  bookForm!: FormGroup;

  constructor(private fb: FormBuilder, private bookService: BookService) { }

  ngOnInit() {
    this.bookForm = this.fb.group({
      Name: '',
      Author: ''
    });
  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log('Name', form.value.Title);
    this.bookService.addBook(this.bookForm.value).subscribe(book => {
      console.log(book);
    });
  }
}
