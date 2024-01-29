import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {BookModel} from "../model/book.model";
import {BorrowedModel} from "../model/borrowed.model";
import {Page} from "../model/page.model";

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:8080/api/books';

  constructor(private http: HttpClient) { }

  getAllBooks(pageNumber: number, pageSize: number): Observable<Page<BookModel>> {
    return this.http.get<Page<BookModel>>(`${this.apiUrl}?page=${pageNumber}&size=${pageSize}`);
  }

  getBook(id: number): Observable<BookModel> {
    return this.http.get<BookModel>(`${this.apiUrl}/${id}`);
  }

  getAvailableBooks(): Observable<BookModel[]> {
    return this.http.get<BookModel[]>(`${this.apiUrl}/available`);
  }

  getBorrowedBooks(): Observable<BookModel[]> {
    return this.http.get<BookModel[]>(`${this.apiUrl}/borrowed`);
  }

  addBook(book: BookModel): Observable<BookModel> {
    return this.http.post<BookModel>(this.apiUrl, book);
  }

  updateBook(id: number, book: BookModel): Observable<BookModel> {
    return this.http.put<BookModel>(`${this.apiUrl}/${id}`, book);
  }

  returnBook(id: number): Observable<BookModel> {
    return this.http.patch<BookModel>(`${this.apiUrl}/${id}/return`, {});
  }

  borrowBook(id: number, borrowed: BorrowedModel): Observable<BookModel> {
    return this.http.patch<BookModel>(`${this.apiUrl}/${id}/borrow`, borrowed);
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
