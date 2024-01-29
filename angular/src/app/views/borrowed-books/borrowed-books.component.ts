import { Component, OnInit } from '@angular/core';
import {BookService} from "../../services/book.service";
import {BookModel} from "../../model/book.model";

@Component({
  selector: 'app-borrowed-books',
  templateUrl: './borrowed-books.component.html',
  styleUrls: ['./borrowed-books.component.css']
})
export class BorrowedBooksComponent implements OnInit {
  books!: BookModel[];

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.bookService.getBorrowedBooks().subscribe(books => this.books = books);
  }
}
