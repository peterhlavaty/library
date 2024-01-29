import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BookModel} from "../../model/book.model";
import {BookService} from "../../services/book.service";
import {Page} from "../../model/page.model";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: BookModel[] = [];
  pageNumber = 1;
  pageSize = 5;
  tests = [{test: "asdf"}, {test: "qwer", yxcv: "1234"}];

  constructor(private bookService: BookService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    // const page = JSON.parse('{}') as Page<BookModel>;
    // this.books = page.content;
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getAllBooks(this.pageNumber, this.pageSize)
      .subscribe(response => {
        this.books = response.content;
        this.cd.detectChanges()
      });
  }

  nextPage(): void {
    this.pageNumber++;
    this.loadBooks();
  }

  prevPage(): void {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.loadBooks();
    }
  }

  editBook(book: BookModel) {
    console.log("edit");
    this.bookService.updateBook(book.id, book).subscribe();
  }

  deleteBook(id: number) {
    this.bookService.deleteBook(id).subscribe();
  }
}
