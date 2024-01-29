import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BookService} from "../../services/book.service";

@Component({
  selector: 'app-return-book',
  templateUrl: './return-book.component.html',
  styleUrl: './return-book.component.css'
})
export class ReturnBookComponent implements OnInit {
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
      this.bookService.returnBook(this.bookId).subscribe(() => this.router.navigate(['..'], { relativeTo: this.route }));
    }
  }
}
