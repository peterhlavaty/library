import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {BookService} from "../../services/book.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-borrow-book',
  templateUrl: './borrow-book.component.html',
  styleUrl: './borrow-book.component.css'
})
export class BorrowBookComponent implements OnInit {
  bookForm!: FormGroup;
  bookId!: number;

  constructor(private fb: FormBuilder, private bookService: BookService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.bookId = parseInt(id);
    } else {
      throw new Error('Missing book ID');
    }
    this.bookForm = this.fb.group({
      firstName: '',
      lastName: ''
    });
  }

  onSubmit() {
    this.bookService.borrowBook(this.bookId, {FirstName: this.bookForm.value.firstName,
      LastName: this.bookForm.value.lastName, From: new Date().toDateString()}).subscribe(() => this.router.navigate(['..'], { relativeTo: this.route }));
  }
}
