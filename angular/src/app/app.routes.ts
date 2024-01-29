import { Routes } from '@angular/router';
import {authenticationGuard} from "./auth/auth.guard";
import {BookListComponent} from "./views/book-list/book-list.component";
import {AvailableBooksComponent} from "./views/available-books/available-books.component";
import {BorrowedBooksComponent} from "./views/borrowed-books/borrowed-books.component";
import {AddNewBookComponent} from "./views/add-new-book/add-new-book.component";
import {EditBookComponent} from "./views/edit-book/edit-book.component";
import {DeleteBookComponent} from "./views/delete-book/delete-book.component";
import {LoginComponent} from "./views/login/login.component";
import {BorrowBookComponent} from "./views/borrow-book/borrow-book.component";
import {ReturnBookComponent} from "./views/return-book/return-book.component";

export const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'books', component: BookListComponent, canActivate: [authenticationGuard]},
  { path: 'available-books', component: AvailableBooksComponent, canActivate: [authenticationGuard] },
  { path: 'borrowed-books', component: BorrowedBooksComponent, canActivate: [authenticationGuard] },
  { path: 'add-new-book', component: AddNewBookComponent, canActivate: [authenticationGuard] },
  { path: 'edit-book/:id', component: EditBookComponent, canActivate: [authenticationGuard] },
  { path: 'delete-book/:id', component: DeleteBookComponent, canActivate: [authenticationGuard] },
  { path: 'borrow-book/:id', component: BorrowBookComponent, canActivate: [authenticationGuard] },
  { path: 'return-book/:id', component: ReturnBookComponent, canActivate: [authenticationGuard] },
  { path: '**', redirectTo: '/books' }
];
