import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BookService} from "../../services/book.service";

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.css']
})
export class DeleteBookComponent implements OnInit {
  bookId!: number | null;

  constructor(private route: ActivatedRoute, private bookService: BookService, private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.bookId = parseInt(id);
    } else {
      throw new Error('Missing book ID');
    }
  }

  onSubmit() {
    if (this.bookId) {
      this.bookService.deleteBook(this.bookId).subscribe(() => this.router.navigate(['..'], { relativeTo: this.route }));
    }
  }
}
