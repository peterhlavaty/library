package hlavaty.peter.library.controller;

import hlavaty.peter.library.entity.BookEntity;
import hlavaty.peter.library.entity.BorrowedEntity;
import hlavaty.peter.library.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public ResponseEntity<Page<BookEntity>> getAllBooks(Pageable pageable) {
        Page<BookEntity> bookEntities = bookService.getAllBooks(pageable);
        return ResponseEntity.ok(bookEntities);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookEntity> getBook(@PathVariable Long id) {
        BookEntity book = bookService.getBook(id);
        return ResponseEntity.ok(book);
    }

    @GetMapping("/available")
    public ResponseEntity<List<BookEntity>> getAvailableBooks() {
        List<BookEntity> bookEntities = bookService.getAvailableBooks();
        return ResponseEntity.ok(bookEntities);
    }

    @GetMapping("/borrowed")
    public ResponseEntity<List<BookEntity>> getBorrowedBooks() {
        List<BookEntity> bookEntities = bookService.getBorrowedBooks();
        return ResponseEntity.ok(bookEntities);
    }

    @PostMapping
    public ResponseEntity<BookEntity> addBook(@RequestBody BookEntity bookEntity) {
        BookEntity savedBookEntity = bookService.addBook(bookEntity);
        return ResponseEntity.ok(savedBookEntity);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookEntity> updateBook(@PathVariable Long id, @RequestBody BookEntity bookEntity) {
        BookEntity updatedBookEntity = bookService.updateBook(id, bookEntity);
        return ResponseEntity.ok(updatedBookEntity);
    }

    @PatchMapping("/{id}/return")
    public ResponseEntity<BookEntity> returnBook(@PathVariable Long id) {
        BookEntity updatedBookEntity = bookService.returnBook(id);
        return ResponseEntity.ok(updatedBookEntity);
    }

    @PatchMapping("/{id}/borrow")
    public ResponseEntity<BookEntity> borrowBook(@PathVariable Long id, @RequestBody BorrowedEntity borrowed) {
        BookEntity updatedBookEntity = bookService.borrowBook(id, borrowed);
        return ResponseEntity.ok(updatedBookEntity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return ResponseEntity.ok().build();
    }
}
