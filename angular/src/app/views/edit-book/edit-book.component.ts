import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import {BookService} from "../../services/book.service";
import {BookModel} from "../../model/book.model";

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  bookForm!: FormGroup;
  bookId!: number | null;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private bookService: BookService, private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.bookId = parseInt(id);
    } else {
      throw new Error('Missing book ID');
    }
    if (this.bookId) {
      this.bookService.getBook(this.bookId).subscribe(book =>
        this.bookForm = this.fb.group({
          Name: book.Name,
          Author: book.Author
        })
      );
    }
  }

  onSubmit() {
    if (this.bookId) {
      this.bookService.updateBook(this.bookId, this.bookForm.value).subscribe(() => this.router.navigate(['..'], { relativeTo: this.route }));
    }
  }
}
