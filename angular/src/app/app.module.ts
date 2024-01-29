import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookListComponent } from './views/book-list/book-list.component';
import { AvailableBooksComponent } from './views/available-books/available-books.component';
import { BorrowedBooksComponent } from './views/borrowed-books/borrowed-books.component';
import { AddNewBookComponent } from './views/add-new-book/add-new-book.component';
import { EditBookComponent } from './views/edit-book/edit-book.component';
import { DeleteBookComponent } from './views/delete-book/delete-book.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginComponent} from "./views/login/login.component";
import {HttpClientModule} from "@angular/common/http";
import {AppMenuComponent} from "./components/app-menu/app-menu.component";
import {RouterLink} from "@angular/router";
import {ReturnBookComponent} from "./views/return-book/return-book.component";
import {BorrowBookComponent} from "./views/borrow-book/borrow-book.component";


@NgModule({
  declarations: [
    BookListComponent,
    AvailableBooksComponent,
    BorrowedBooksComponent,
    AddNewBookComponent,
    EditBookComponent,
    DeleteBookComponent,
    LoginComponent,
    AppMenuComponent,
    BorrowBookComponent,
    ReturnBookComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    RouterLink
  ],
  exports: [
  ],
  providers: []
})
export class AppModule { }
