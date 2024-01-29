import { Component, OnInit } from '@angular/core';
import {BookService} from "../../services/book.service";
import {BookModel} from "../../model/book.model";
import {BorrowedModel} from "../../model/borrowed.model";

@Component({
  selector: 'app-available-books',
  templateUrl: './available-books.component.html',
  styleUrls: ['./available-books.component.css']
})
export class AvailableBooksComponent implements OnInit {
  books!: BookModel[];

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.bookService.getAvailableBooks().subscribe(books => this.books = books);
  }
}
